<template>
  <div class="home container">
    <div class="row my-1">
      <div class="col-5">
        <h1>Bug Tracker</h1>
      </div>
      <div class="col offset-5 d-flex align-items-center justify-content-around">
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-outline-info" data-toggle="modal" data-target="#createBugModal">
          Create
        </button>
        <CreateBugModal />
      </div>
      <div class="col-12 d-flex align-items-center justify-content-end">
        <div class="dropdown">
          <button class="btn btn-info dropdown-toggle"
                  type="button"
                  id="dropdownMenu2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
          >
            Filter by
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button class="dropdown-item" type="button" @click="filterOpen">
              Open
            </button>
            <button class="dropdown-item" type="button" @click="filterClosed">
              Closed
            </button>
            <button class="dropdown-item" type="button" @click="filterAll">
              All
            </button>
          </div>
        </div>
      </div>
    </div>
    <table class="table table-hover table-bordered table-info">
      <thead>
        <tr>
          <th scope="col">
            Title
          </th>
          <th scope="col">
            Description
          </th>
          <th scope="col">
            Creator
          </th>
          <th scope="col">
            Status
          </th>
          <th scope="col">
            Closed Date
          </th>
        </tr>
      </thead>
      <tbody id="BugTableBody">
        <BugComponent v-for="bug in state.filteredBugs" :key="bug.id" :bug-prop="bug" />
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed, onBeforeMount, reactive } from 'vue'
import { AppState } from '../AppState'
import bugsService from '../services/BugsService'
import { logger } from '../utils/Logger'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      filteredBugs: []
    })
    onBeforeMount(async() => {
      try {
        await bugsService.getAllBugs()
        state.filteredBugs = state.bugs
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      filterOpen() {
        state.filteredBugs = state.bugs.filter(bug => !bug.closed)
      },
      filterClosed() {
        state.filteredBugs = state.bugs.filter(bug => bug.closed)
      },
      filterAll() {
        state.filteredBugs = state.bugs
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>

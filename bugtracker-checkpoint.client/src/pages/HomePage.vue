<template>
  <div class="home container">
    <div class="row">
      <div class="col">
        <h1>Bug Tracker</h1>
        <button type="button" class="btn btn-primary">
          Create
        </button>
      </div>
    </div>
    <table class="table table-hover row">
      <thead>
        <tr>
          <th scope="col">
            Title
          </th>
          <th scope="col">
            Description
          </th>
          <th scope="col">
            Status
          </th>
          <th scope="col">
            Closed Date
          </th>
          <th scope="col">
            Creator
          </th>
        </tr>
      </thead>
      <tbody>
        <BugComponent v-for="bug in state.bugs" :key="bug.id" :bug-prop="bug" />
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
      bugs: computed(() => AppState.bugs)
    })
    onBeforeMount(async() => {
      try {
        await bugsService.getAllBugs()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state
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

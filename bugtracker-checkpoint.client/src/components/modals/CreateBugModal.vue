<template>
  <!-- Create Modal -->
  <div class="modal fade"
       id="createBugModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="createBugModal"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createBugModal">
            Create A New Bug Board
          </h5>
          <button id="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="createBug">
            <div class="form-group">
              <input type="text"
                     name="Bug title"
                     id="BugTitle"
                     class="form-control"
                     placeholder="Bug title"
                     v-model="state.newBug.title"
              >
              <input type="text"
                     name="Bug description"
                     id="BugDescription"
                     class="form-control"
                     placeholder="Bug description"
                     v-model="state.newBug.description"
              >
            </div>
            <button type="submit" class="btn btn-success">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../../AppState'
import { logger } from '../../utils/Logger'
import bugsService from '../../services/BugsService'
import router from '../../router'
export default {
  name: 'CreateBugModal',
  setup() {
    const state = reactive({
      newBug: {},
      activeBug: computed(() => AppState.activeBug)
    })
    return {
      state,
      async createBug() {
        try {
          await bugsService.createBug(state.newBug)
          state.newBug = {}
          document.getElementById('closeModal').click()
          router.push({ name: 'BugDetails', params: { id: state.activeBug.id } })
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

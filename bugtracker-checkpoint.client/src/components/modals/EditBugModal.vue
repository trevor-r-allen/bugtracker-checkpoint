<template>
  <!-- Edit Modal -->
  <div class="modal fade"
       id="editBugModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="editBugModal"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editBugModal">
            Edit Bug Details
          </h5>
          <button id="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="editBug">
            <div class="form-group">
              <input type="text"
                     name="Bug title"
                     id="BugTitle"
                     class="form-control"
                     placeholder="Bug title"
                     v-model="state.editedBug.title"
              >
              <input type="text"
                     name="Bug description"
                     id="BugDescription"
                     class="form-control"
                     placeholder="Bug description"
                     v-model="state.editedBug.description"
              >
            </div>
            <button type="submit" class="btn btn-success">
              Save Changes
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
import { useRoute } from 'vue-router'
export default {
  name: 'EditBugModal',
  props: {
    accountProp: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      editedBug: computed(() => AppState.activeBug),
      activeBug: computed(() => AppState.activeBug)
    })
    return {
      state,
      async editBug() {
        try {
          if (props.accountProp.id === state.activeBug.creatorId) {
            await bugsService.editBug(route.params.id, state.editedBug)
          }
          document.getElementById('closeModal').click()
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

<template>
  <!-- Create Modal -->
  <div class="modal fade"
       id="createNoteModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="createNoteModal"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createNoteModal">
            Create A New Note
          </h5>
          <button id="closeCreateNoteModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="createNote">
            <div class="form-group">
              <input type="text"
                     name="Note body"
                     id="NoteBody"
                     class="form-control"
                     placeholder="Note body"
                     v-model="state.newNote.body"
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
import { reactive } from 'vue'
import { logger } from '../../utils/Logger'
import notesService from '../../services/NotesService'
import { useRoute } from 'vue-router'
export default {
  name: 'CreateNoteModal',
  setup() {
    const route = useRoute()
    const state = reactive({
      newNote: {}
    })
    return {
      state,
      async createNote() {
        try {
          state.newNote.bug = (route.params.id)
          await notesService.createNote(state.newNote)
          state.newNote = {}
          document.getElementById('closeCreateNoteModal').click()
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

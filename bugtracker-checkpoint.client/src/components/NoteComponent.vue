<template>
  <div class="col-12 card bg-transparent border-info my-1">
    <div class="row d-flex justify-content-between align-items-center">
      <div class="col-10">
        <h6>{{ noteProp.flagged }}</h6>
        <h6>
          {{ noteProp.body }}
        </h6>
        <p v-if="noteProp.creator">
          {{ noteProp.creator.name }}
        </p>
      </div>
      <div class="col-2 text-center">
        <h1>
          <i v-if="!bugProp.closed && noteProp.creatorId === state.account.id" class="fa fa-times text-danger" aria-hidden="true" @click="deleteNote"></i>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import notesService from '../services/NotesService'
import NotificationService from '../services/NotificationService'
import { AppState } from '../AppState'
export default {
  name: 'NoteComponent',
  props: {
    noteProp: { type: Object, required: true },
    bugProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      async deleteNote() {
        if (await NotificationService.confirmAction('Are you sure you want to delete this note?', 'Once removed, this note is gone for good!', 'Delete Note')) {
          notesService.deleteNote(props.noteProp.id)
        }
      }

    }
  }
}
</script>

<style lang="scss" scoped>

</style>

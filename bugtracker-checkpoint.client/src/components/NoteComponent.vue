<template>
  <div class="col">
    <h1>Note PlaceHolder</h1>
  </div>
</template>

<script>
import notesService from '../services/NotesService'
import { logger } from '../utils/Logger'
export default {
  name: 'NoteComponent',
  props: {
    noteProp: { type: Object, required: true }
  },
  setup(props) {
    return {
      async getNotesByBugId() {
        try {
          logger.log(props.noteProp.bug)
          await notesService.getNotesByBugId(props.noteProp.bug)
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

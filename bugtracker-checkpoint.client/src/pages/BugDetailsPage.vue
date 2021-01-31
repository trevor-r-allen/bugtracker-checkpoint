<template>
  <div class="container-fluid flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="row">
      <div class="col-12">
        <h1>{{ state.activeBug.title }}</h1>
        <h6 v-if="state.activeBug.creator">
          Created by: {{ state.activeBug.creator.name }}
        </h6>
        <p>Status: {{ state.activeBug.closed ? 'Closed' : 'Open' }} <span v-if="state.activeBug.closedDate"> on {{ state.activeBug.closedDate }}</span></p>
      </div>
      <div class="col-12">
        <h6>Details:</h6>
        <p>{{ state.activeBug.description }}</p>
      </div>
    </div>
    <div class="row">
      <NoteComponent v-for="note in state.notes" :key="note.id" :note-prop="note" />
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, reactive } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import bugsService from '../services/BugsService'
import notesService from '../services/NotesService'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
export default {
  name: 'BugDetails',
  setup() {
    const route = useRoute()
    const state = reactive({
      activeBug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes)
    })
    onBeforeMount(async() => {
      try {
        await bugsService.getBugById(route.params.id)
        await notesService.getNotesByBugId(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    onBeforeRouteLeave(() => {
      AppState.activeBug = {}
      AppState.notes = []
    })

    return {
      state
    }
  }
}

</script>

<style lang="scss" scoped>

</style>

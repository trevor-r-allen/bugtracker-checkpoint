<template>
  <div class="container-fluid flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="row justify-content-center">
      <div class="col-11 card text-white bg-info mb-3">
        <div class="card-header">
          Bug Details
        </div>
        <div class="card-body">
          <h5 class="card-title">
            {{ state.activeBug.title }}
          </h5>
          <h6 v-if="state.activeBug.creator">
            Created by: {{ state.activeBug.creator.name }}
          </h6>
          <p>Status: {{ state.activeBug.closed ? 'Closed' : 'Open' }} <span v-if="state.activeBug.closedDate"> on {{ state.activeBug.closedDate }}</span></p>
          <p class="card-text">
            {{ state.activeBug.description }}
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione optio corrupti neque similique eveniet fugit at iste incidunt unde? Quasi, tempore quo delectus iste voluptas maiores placeat magnam? Repudiandae, voluptatem?
          </p>
          <button type="button" class="btn btn-danger">
            Close Bug
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <label for=""></label>
          <input type="text"
                 class="form-control"
                 name="newNoteInput"
                 id="newNoteInput"
                 aria-describedby="helpId"
                 placeholder="Add note"
          >
          <small id="helpId" class="form-text text-muted">Help text</small>
        </div>
      </div>
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

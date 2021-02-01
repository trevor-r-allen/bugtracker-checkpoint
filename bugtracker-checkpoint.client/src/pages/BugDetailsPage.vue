<template>
  <div class="container-fluid flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="row justify-content-center">
      <div class="col-11">
        <div class="card text-dark border-info bg-transparent mb-3">
          <div class="card-header border-info d-flex justify-content-between">
            <h6> Bug Details </h6>
            <!-- Button trigger modal -->
            <button v-if="!state.activeBug.closed" type="button" class="btn btn-outline-info" data-toggle="modal" data-target="#editBugModal">
              Edit
            </button>
            <EditBugModal :account-prop="state.account" />
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
            </p>
            <button v-if="!state.activeBug.closed && (state.activeBug.creatorId === state.account.id)" type="button" class="btn btn-danger" @click="closeBug">
              Close Bug
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <!-- Button trigger modal -->
        <button v-if="!state.activeBug.closed" type="button" class="btn btn-outline-info" data-toggle="modal" data-target="#createNoteModal">
          Add Note
        </button>
        <CreateNoteModal />
      </div>
      <NoteComponent v-for="note in state.notes" :key="note.id" :note-prop="note" :bug-prop="state.activeBug" />
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
import NotificationService from '../services/NotificationService'
export default {
  name: 'BugDetails',
  setup() {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
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
      state,
      async closeBug() {
        if (await NotificationService.confirmAction(`Are you sure you want to close '${state.activeBug.title}'?`, 'Once closed, this bug cannot be reopened or edited.', 'Close Bug')) {
          bugsService.closeBug(route.params.id)
        }
      }
    }
  }
}

</script>

<style lang="scss" scoped>

</style>

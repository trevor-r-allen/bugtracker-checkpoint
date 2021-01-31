<template>
  <tr :class="bugProp.closed ? 'table-danger' : 'table-info'">
    <th scope="row">
      <router-link :to="{name: 'BugDetails', params: {id: bugProp.id}}">
        {{ bugProp.title }}
      </router-link>
    </th>
    <td>{{ bugProp.description }}</td>
    <td v-if="bugProp.creator">
      {{ bugProp.creator.name }}
    </td>
    <td>{{ bugProp.closed ? 'Closed' : 'Open' }}</td>
    <td>{{ bugProp.updatedAt }}</td>
  </tr>
</template>

<script>
// import { reactive } from 'vue'
import { logger } from '../utils/Logger'
import bugsService from '../services/BugsService'
export default {
  name: 'BugComponent',
  props: {
    bugProp: { type: Object, required: true }
  },
  setup(props) {
    // const state = reactive({

    // },
    return {
      // state,
      async getBugById() {
        try {
          bugsService.getBugById(props.bugProp.id)
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

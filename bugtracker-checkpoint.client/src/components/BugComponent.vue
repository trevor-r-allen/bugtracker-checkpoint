<template>
  <tr>
    <th scope="row">
      {{ bugProp.title }}
    </th>
    <td>{{ bugProp.description }}</td>
    <td v-if="bugProp.creator">
      {{ bugProp.creator.name }}
    </td>
    <td>{{ bugProp.closed }}</td>
    <td>{{ bugProp.closedDate }}</td>
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
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>

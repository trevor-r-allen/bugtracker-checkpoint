<template>
  <div class="component">
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'BugComponent',
  props: {
    bugProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({

    }
    return {
      state,
      
      
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>

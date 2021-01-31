<template>
  <div class="col">
    <h1>Note PlaceHolder</h1>
  </div>
</template>

<script>
export default {
  name: 'NoteComponent',
  props: {
    noteProp: { type: Object, required: true }
  },
  setup(props) {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>

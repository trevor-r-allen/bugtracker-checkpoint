<template>
  <div class="col">
    <h6 v-if="noteProp.creator">
      {{ noteProp.creator.name }}
    </h6>
    <h6>{{ noteProp.flagged }}</h6>
    <p>{{ noteProp.body }}</p>
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

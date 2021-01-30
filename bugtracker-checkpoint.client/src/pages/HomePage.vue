<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center container-fluid">
    <div class="row">
      <div class="col">
        <h1>Bug Tracker</h1>
        <button type="button" class="btn btn-primary">
          Create
        </button>
      </div>
      <BugComponent />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>

<template>
  <nav id="topbar">
    <div >
    </div>
  </nav>
</template>

<script>
export default {
  name: "Topbar",
};
</script>

<style>
@import url("../assets/css/global.css");

#topbar {
    background-color: var(--primary) !important;
    height: 40px;
    margin-bottom: 40px;
    position: sticky;
    top:0;
    left: 0;
}
</style>
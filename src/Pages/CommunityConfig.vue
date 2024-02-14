<template>
  <div id="infoMonthlyPaymentModal" :class="classModal">
    <div class="modal-content">
      <div class="container">
        <h4>Informações da Comunidade</h4>
        <hr />
        <Loader :show="loading" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CommunityConfig",
};
</script>
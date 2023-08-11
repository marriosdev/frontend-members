<template>
      <i class="material-icons right" style="color: white; cursor: pointer; font-size: 13pt;">{{ icon }}</i>
  </template>
  <script>
  export default {
    props: {
      icon: String,
    },
    name: "CricularIcon",
  };
  </script>
  
  <style>
  .btn-circular {
    margin: 5px !important;
    color: white;
    background-color: #2196f3 !important;
    border: none !important;
    border-radius: 50% !important;
    display: inline-block !important;
    height: 36px !important;
    line-height: 36px !important;
    padding: 0 16px !important;
    text-transform: uppercase !important;
    vertical-align: middle !important;
    -webkit-tap-highlight-color: transparent !important;
  }
  </style>
<template>
    <div class="divider div-transparent div-dot"></div>
  </template>
  
  <script>
  
  export default {
    name: 'TextDivider',
  }
  </script>
  
  <style lang="scss" scoped>
    .divider {
        @apply my-8 relative;
        height: 1px;
    }
    .div-transparent:before {
        content: "";
        position: absolute;
        top: 0;
        left: 5%;
        right: 5%;
        width: 90%;
        height: 1px;
        background-image: linear-gradient(to right, transparent, rgb(48,49,51), transparent);
    }
    .div-dot:after {
        content: "";
        position: absolute;
        z-index: 1;
        top: -9px;
        left: calc(50% - 9px);
        width: 18px;
        height: 18px;
        background-color: white;
        border: 1px solid rgb(48,49,51);
        border-radius: 50%;
        box-shadow: inset 0 0 0 2px #FEE2E2,
                        0 0 0 4px #FEE2E2;
    }
  </style>
  
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Open Sans;
  font-size: 15px;
  color: #414444;
}

h3 {
  color: #01818c;
}

h5 {
  font-weight: bold !important;
}

#searchbar button,
#table button {
  width: 100%;
  background: rgba(0, 160, 175, 1);
  font-weight: bold;
}

#searchbar button:hover,
#table button:hover {
  background: #215158;
}
</style>

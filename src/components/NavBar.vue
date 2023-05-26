<template>
  <header class="container-fluid p-1">
    <nav class="navbar navbar-expand-sm">
      <div class="container">
        <a class="navbar-brand" href="https://www.accuenergy.com/"
          ><img alt="Accuenergy logo" src="../assets/accuenergy-logo.png"
        /></a>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style>
header {
  border-bottom: 2px solid #f68c35;
}

.navbar {
  width: 75%;
  margin: auto;
}

.navbar img {
  max-height: 40px;
}
</style>

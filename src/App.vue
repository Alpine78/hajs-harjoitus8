<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Etusivu</router-link> |
      <router-link to="/tehtava43">Tehtava 43</router-link> |
      <router-link to="/tehtava44">Tehtava 44</router-link> |
      <router-link to="/tehtava45">Tehtava 45</router-link> |
      <router-link to="/tehtava46">Tehtava 46</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

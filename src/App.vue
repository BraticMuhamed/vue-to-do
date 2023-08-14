<template>
  <div id="app">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <nav>
      <router-link to="/">ToDo List</router-link> |
      <router-link to="/add-to-do">Add new ToDo item</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

button {
  background-color: green;
  color: white;
  min-width: 25px;
  max-width: 75px;
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
}

button.delete-button {
  background-color: white;
  color: red;
}
</style>

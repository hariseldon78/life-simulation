<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Scene from "@/components/Scene.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld: Scene
  }
})
export default class Home extends Vue {}
</script>

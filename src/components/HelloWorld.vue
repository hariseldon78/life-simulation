<template>
  <div>
    <div class="canvas" ref="canvas"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Two from "two.js";
import { SquareInsect } from "@/models/SquareInsect";

@Component
export default class HelloWorld extends Vue {
  mounted() {
    const two = new Two({
      fullscreen: false,
      autostart: true
    }).appendTo(this.$refs.canvas as HTMLElement);
    const insect = new SquareInsect(two, two.width / 2, two.height / 2);
    two.bind("update", function() {
      insect.rotation += 0.01;
    });
  }
}
</script>

<style scoped>
.canvas {
  border: 2px dashed gray;
}
</style>

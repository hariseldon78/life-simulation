<template>
	<div>
		<div class="canvas" ref="canvas"></div>
		<button @click="addInsect">Insect</button>
		<button @click="addFood">Food</button>
		<div v-for="insect in insects">
			<span>insect health: {{ Math.floor(insect.health) }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Two from 'two.js';
import { SceneObject, SquareInsect } from '@/models/SquareInsect';
import { Food } from '@/models/Food';

function rollup(v: number, max: number): number {
	while (v > max) {
		v -= max;
	}
	while (v < 0) {
		v += max;
	}
	return v;
}
@Component
export default class Scene extends Vue {
	objects: SceneObject[] = [];
	two: Two = new Two({
		fullscreen: false,
		autostart: true,
	});
	mounted() {
		this.two.appendTo(this.$refs.canvas as HTMLElement);
		this.start();
	}
	get insects() {
		return this.objects.filter(o => o instanceof SquareInsect);
	}
	start() {
		this.two.bind('update', () => {
			this.objects.forEach(insect => {
				insect.update();
				insect.translation.x = rollup(insect.translation.x, this.two.width);
				insect.translation.y = rollup(insect.translation.y, this.two.height);
			});
		});
	}
	addInsect() {
		this.objects.push(
			new SquareInsect(
				this.two,
				this.objects,
				Math.random() * this.two.width,
				Math.random() * this.two.height
			)
		);
	}
	addFood() {
		this.objects.push(
			new Food(
				this.two,
				this.objects,
				Math.random() * this.two.width,
				Math.random() * this.two.height
			)
		);
	}
}
</script>

<style scoped>
.canvas {
	border: 2px dashed gray;
}
</style>

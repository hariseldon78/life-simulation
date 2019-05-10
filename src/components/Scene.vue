<template>
	<div>
		<div class="canvas" ref="canvas"></div>
		<button @click="addInsect">Insect</button>
		<button @click="addFood">Food</button>
		<div v-for="(insect,index) in insects">
			<span :key="index">insect health: {{ Math.floor(insect.health) }}</span>
		</div>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import Two from 'two.js';
	import {SquareInsect} from '@/models/SquareInsect';
	import {Food} from '@/models/Food';
	import {SceneObject} from '@/models/SceneObject';

	function rollup(v: number, max: number): number {
	while (v > max) {
		v -= max;
	}
	while (v < 0) {
		v += max;
	}
	return v;
}

function overlap(a: Two.BoundingClientRect, b: Two.BoundingClientRect): boolean {
	function between(a: number, x: number, b: number): boolean {
		const min = Math.min(a, b);
		const max = Math.max(a, b);
		return min <= x && x <= max;
	}
	const xOverlap = between(b.left, a.left, b.right) || between(b.left, a.right, b.right);
	const yOverlap = between(b.top, a.top, b.bottom) || between(b.top, a.bottom, b.bottom);
	return xOverlap && yOverlap;
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
			this.computeCollisions();
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
	computeCollisions() {
		const boxes = this.objects.map(o => o.getBoundingClientRect());
		for (let i = 0; i < boxes.length; i++) {
			const boxa = boxes[i];
			for (let j = 0; j < boxes.length; j++) {
				const boxb = boxes[j];
				if (boxa === boxb) continue;
				if (overlap(boxa, boxb)) {
					this.objects[i].collision(this.objects[j]);
					this.objects[j].collision(this.objects[i]);
				}
			}
		}
	}
}
</script>

<style scoped>
.canvas {
	border: 2px dashed gray;
}
</style>

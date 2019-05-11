<template>
	<div>
		<div class="canvas" ref="canvas"></div>
		<button @click="addInsect">Insect</button>
		<p>
			Food:
			<button
				@click="
					foodTimer -= 20;
					resetFoodGenerator();
				"
			>
				+
			</button>
			<button
				@click="
					foodTimer += 20;
					resetFoodGenerator();
				"
			>
				-
			</button>
			{{ foodTimer }}
		</p>
		<div>
			<span v-for="(insect, index) in insects" :key="index">
				insect health: {{ Math.floor(insect.health) }} -
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Two from 'two.js';
import { SquareInsect } from '@/models/SquareInsect';
import { Food } from '@/models/Food';
import { SceneObject } from '@/models/SceneObject';
import * as _ from 'lodash';
import { gridInteractions } from '@/models/grid';

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
	foodTimer = 500;

	children: SceneObject[] = [];
	foodGenerator: number = 0;
	mounted() {
		let canvas = this.$refs.canvas as HTMLElement;
		this.two.appendTo(canvas);
		this.two.width = canvas.offsetWidth;
		this.two.height = canvas.offsetHeight;
		this.start();
	}
	get insects() {
		return this.objects.filter(o => o instanceof SquareInsect);
	}
	start() {
		this.two.bind('update', () => {
			this.objects.forEach(obj => {
				obj.update();
				obj.translation.x = rollup(obj.translation.x, this.two.width);
				obj.translation.y = rollup(obj.translation.y, this.two.height);
			});
			this.computeCollisions();
			this.children.forEach(c => this.objects.push(c));
			this.children = [];
		});
		this.resetFoodGenerator();
	}
	resetFoodGenerator() {
		clearInterval(this.foodGenerator);
		this.foodGenerator = setInterval(() => this.addFood(), this.foodTimer);
	}
	addInsect() {
		this.objects.push(
			new SquareInsect(
				this.two,
				obj => this.children.push(obj),
				Math.random() * this.two.width,
				Math.random() * this.two.height
			)
		);
	}
	addFood() {
		this.objects.push(
			new Food(
				this.two,
				obj => this.objects.push(obj),
				Math.random() * this.two.width,
				Math.random() * this.two.height,
				Math.random() * 100
			)
		);
	}
	computeCollisions() {
		const part = _.partition(this.objects, obj => obj.health > 0);
		this.objects = part[0];
		part[1].forEach(obj => this.two.remove(obj));

		gridInteractions(this.two, this.objects).forEach(int =>
			this.objects[int.a].collision(this.objects[int.b])
		);
	}
}
</script>

<style scoped>
.canvas {
	border: 2px dashed gray;
}
</style>

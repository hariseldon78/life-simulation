<template>
	<div>
		<div class="canvas" ref="canvas"></div>
		<button @click="addInsect">Insect</button>
        <p>Food:
            <button @click="foodTimer-=20;resetFoodGenerator()">+</button>
            <button @click="foodTimer+=20;resetFoodGenerator()">-</button>
            {{foodTimer}}
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
	foodTimer=500;

	children: SceneObject[]=[];
	foodGenerator: number=0;
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
		this.resetFoodGenerator()
	}
    resetFoodGenerator(){
		clearInterval(this.foodGenerator);
		this.foodGenerator=setInterval(() => this.addFood(), this.foodTimer);
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
		const part=_.partition(this.objects,obj=>obj.health>0);
		this.objects = part[0];
		part[1].forEach(obj=>this.two.remove(obj));
		const boxes = this.objects.map(o => o.boundingBox());
		for (let i = 0; i < boxes.length; i++) {
			if (!this.objects[i].movable) continue;
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

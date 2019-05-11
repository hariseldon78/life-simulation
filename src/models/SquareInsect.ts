import Two from 'two.js';
import { Food } from '@/models/Food';
import { AddObjectClosure, SceneObject } from '@/models/SceneObject';
import * as _ from 'lodash';

const DIRECTION_CHANGE = 0.02;
const POSITION_CHANGE = 0.5;

export class SquareInsect extends SceneObject {
	direction = Math.random() * 2 * Math.PI;
	genes: number[] = [];
	constructor(
		two: Two,
		addObject: AddObjectClosure,
		x: number,
		y: number,
		health: number = 300,
		parent: SquareInsect | null = null
	) {
		super(two, addObject, health);
		this.movable = true;
		if (parent) {
			this.genes = _.cloneDeep(parent.genes);
			this.genes = this.genes.map(g => {
				g += Math.random() / 5 - Math.random() / 10;
				if (g > 1) g = 1;
				if (g < 0) g = 0;
				return g;
			});
		} else
			for (let i = 0; i < 10; i++) {
				this.genes.push(Math.random());
			}
		const sqrt = Math.sqrt(this.health);
		const body = two.makeRoundedRectangle(0, 0, sqrt, sqrt, sqrt / 5);
		body.fill = `rgb(${this.genes[0] * 255},${this.genes[1] * 255},${this.genes[2] * 255})`;
		const eye = two.makeCircle(
			(sqrt * this.genes[6]) / 5,
			(sqrt * this.genes[7]) / 5,
			(sqrt * this.genes[5] * 2) / 5
		);
		eye.fill = `rgb(${this.genes[3] * 255},${this.genes[4] * 255},${this.genes[5] * 255})`;
		this.add(body, eye);
		two.add(this);
		this.translation.set(x, y);
	}
	update() {
		this.scale = Math.sqrt(this.health) / Math.sqrt(this.startHealth);
		this.health -= this.genes[4];
		if (Math.random() > this.genes[8]) {
			this.direction = 2 * Math.PI * Math.random();
			this.health -= this.genes[8];
		} else {
			const deltaDirection = (Math.random() * 2 * Math.PI * this.genes[2]) / 10;
			this.direction += deltaDirection - (Math.PI * this.genes[3]) / 10;
			this.health -= this.genes[2] / 10 + this.genes[3] / 10;
		}
		this.rotation = this.direction - Math.PI / 4;
		const movement = new Two.Vector(
			this.genes[4] * Math.cos(this.direction),
			this.genes[4] * Math.sin(this.direction)
		);
		this.translation.addSelf(movement);
		this.resetBoundingBox();
		this.procreate();
	}
	collision(other: SceneObject): void {
		if (other instanceof Food) {
			const eatQuantity = Math.min(this.genes[1] * 5, other.health);
			this.health += eatQuantity;
			other.health -= eatQuantity;
		}
	}
	procreate() {
		if (this.health < this.genes[0] * 500) return;
		const child = new SquareInsect(
			this.two,
			this.addObject,
			this.translation.x,
			this.translation.y,
			this.health * this.genes[1],
			this
		);
		this.health -= child.health;
		this.addObject(child);
	}
}

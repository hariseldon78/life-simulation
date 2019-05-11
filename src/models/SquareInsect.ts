import Two from 'two.js';
import { Food } from '@/models/Food';
import {SceneObject} from '@/models/SceneObject';

const DIRECTION_CHANGE = 0.02;
const POSITION_CHANGE = 0.5;


const START_HEALTH=300;

export class SquareInsect extends SceneObject {
	direction = Math.random() * 2 * Math.PI;
	constructor(two: Two, objects: SceneObject[], x: number, y: number) {
		super(two, objects,START_HEALTH);
		const sqrt=Math.sqrt(this.health);
		const body = two.makeRoundedRectangle(0, 0,sqrt,  sqrt, sqrt/5);
		const eye = two.makeCircle(sqrt/5, sqrt/5, sqrt/5);
		this.add(body, eye);
		two.add(this);
		this.translation.set(x, y);
	}
	update() {
		this.scale=Math.sqrt(this.health)/Math.sqrt(START_HEALTH);
		this.health-=0.1;
		const deltaDirection = Math.random() * 2 * Math.PI * DIRECTION_CHANGE;
		this.direction += deltaDirection - Math.PI * DIRECTION_CHANGE;
		this.rotation = this.direction - Math.PI / 4;
		const movement = new Two.Vector(
			POSITION_CHANGE * Math.cos(this.direction),
			POSITION_CHANGE * Math.sin(this.direction)
		);
		this.translation.addSelf(movement);
	}
	collision(other: SceneObject): void {
		if (other instanceof Food) {
			this.health += 1;
			other.health -=1;
		}
	}
}

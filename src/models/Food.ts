import Two from 'two.js';
import { SceneObject } from '@/models/SceneObject';

const START_HEALTH=20;
export class Food extends SceneObject {
	constructor(two: Two, objects: SceneObject[], x: number, y: number) {
		super(two,objects,START_HEALTH);
		const piece = two.makeCircle(0, 0, this.health/10);
		this.add(piece);
		two.add(this);
		this.translation.set(x, y);
	}
	update(): void {
		super.update();
		this.scale=Math.sqrt(this.health)/Math.sqrt(START_HEALTH);
	}
	collision(other: SceneObject): void {
		super.collision(other);
	}

}

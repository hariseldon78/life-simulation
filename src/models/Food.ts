import Two from 'two.js';
import { SceneObject } from '@/models/SceneObject';

export class Food extends SceneObject {
	constructor(two: Two, objects: SceneObject[], x: number, y: number,health:number=20) {
		super(two,objects,health);
		const piece = two.makeCircle(0, 0, this.health/10);
		this.add(piece);
		two.add(this);
		this.translation.set(x, y);
	}
	update(): void {
		super.update();
		this.scale=Math.sqrt(this.health)/Math.sqrt(this.startHealth);
	}
	collision(other: SceneObject): void {
		super.collision(other);
	}

}

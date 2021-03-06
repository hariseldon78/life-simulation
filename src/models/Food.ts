import Two from 'two.js';
import {AddObjectClosure, SceneObject} from '@/models/SceneObject';

export class Food extends SceneObject {
	constructor(two: Two, addObject:AddObjectClosure, x: number, y: number,health:number=20) {
		super(two,addObject,health);
		const piece = two.makeCircle(0, 0, this.health/10);
		piece.fill='orange';
		piece.linewidth=0;
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

import Two from 'two.js';
import { SceneObject } from '@/models/SceneObject';

export class Food extends SceneObject {
	constructor(two: Two, objects: SceneObject[], x: number, y: number) {
		super(two,objects);
		const piece = two.makeCircle(8, 8, 5);
		this.add(piece);
		two.add(this);
		this.translation.set(x, y);
	}
}

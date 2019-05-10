import Two from 'two.js';
import { SceneObject } from '@/models/SquareInsect';

export class Food extends Two.Group implements SceneObject {
	constructor(two: Two, objects: SceneObject[], x: number, y: number) {
		super();
		const piece = two.makeCircle(8, 8, 5);
		this.add(piece);
		two.add(this);
		this.translation.set(x, y);
	}

	update(): void {}
}

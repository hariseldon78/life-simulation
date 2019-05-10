import Two from 'two.js';

const DIRECTION_CHANGE = 0.02;
const POSITION_CHANGE = 0.5;

export interface SceneObject {
	update(): void;
	translation: Two.Vector;
}

export class SquareInsect extends Two.Group implements SceneObject {
	health: number = 20;
	direction = Math.random() * 2 * Math.PI;
	constructor(two: Two, objects: SceneObject[], x: number, y: number) {
		super();
		const body = two.makeRoundedRectangle(0, 0, 30, 30, 5);
		const eye = two.makeCircle(8, 8, 5);
		this.add(body, eye);
		two.add(this);
		this.translation.set(x, y);
	}
	update() {
		this.scale = Math.abs(Math.sin(Date.now() / 1000)) / 2 + 0.5;
		const deltaDirection = Math.random() * 2 * Math.PI * DIRECTION_CHANGE;
		this.direction += deltaDirection - Math.PI * DIRECTION_CHANGE;
		this.rotation = this.direction - Math.PI / 4;
		const movement = new Two.Vector(
			POSITION_CHANGE * Math.cos(this.direction),
			POSITION_CHANGE * Math.sin(this.direction)
		);
		this.translation.addSelf(movement);
	}
}

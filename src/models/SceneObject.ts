import Two from 'two.js';


export class SceneObject extends Two.Group {
	constructor(two: Two, objects: SceneObject[]) {
		super();
	}
	update(): void {}
	collision(other: SceneObject): void {}
}

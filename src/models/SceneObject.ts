import Two from 'two.js';


export class SceneObject extends Two.Group {
	health:number;
	constructor(two: Two, objects: SceneObject[],health:number) {
		super();
		this.health=health;
	}
	update(): void {}
	collision(other: SceneObject): void {}
}

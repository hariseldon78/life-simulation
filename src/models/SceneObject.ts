import Two from 'two.js';


export class SceneObject extends Two.Group {
	health:number;
	startHealth:number;
	constructor(two: Two, objects: SceneObject[],health:number) {
		super();
		this.health=health;
		this.startHealth=health;
	}
	update(): void {}
	collision(other: SceneObject): void {}
}

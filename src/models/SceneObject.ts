import Two from 'two.js';

export type AddObjectClosure=(obj:SceneObject)=>void;

export class SceneObject extends Two.Group {
	health:number;
	startHealth:number;
	two: Two;
	addObject: AddObjectClosure;
	constructor(two: Two, addObject:AddObjectClosure,health:number) {
		super();
		this.two=two;
		this.addObject=addObject;
		this.health=health;
		this.startHealth=health;
	}
	update(): void {}
	collision(other: SceneObject): void {}
}

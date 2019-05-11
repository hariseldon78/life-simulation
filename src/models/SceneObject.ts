import Two from 'two.js';

export type AddObjectClosure=(obj:SceneObject)=>void;

export class SceneObject extends Two.Group {
	health:number;
	startHealth:number;
	two: Two;
	addObject: AddObjectClosure;
	movable=false;
	private oldBoundingBox: Two.BoundingClientRect|null=null;
	constructor(two: Two, addObject:AddObjectClosure,health:number) {
		super();
		this.two=two;
		this.addObject=addObject;
		this.health=health;
		this.startHealth=health;
	}
	update(): void {}
	collision(other: SceneObject): void {}
	resetBoundingBox(){
		this.oldBoundingBox=null;
	}
	boundingBox():Two.BoundingClientRect{
		if (!this.oldBoundingBox)
			this.oldBoundingBox=this.getBoundingClientRect();
		return this.oldBoundingBox;
	}
}

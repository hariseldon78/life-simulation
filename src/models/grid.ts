import {SceneObject} from '@/models/SceneObject';
import Two from 'two.js';

function center(b:Two.BoundingClientRect){
	return {x:b.left+b.width/2,y:b.top+b.height/2}
}

export class Grid{
	cells:number[][][]=[];
	constructor(two:Two,objects:SceneObject[]){
		for(let x=0;x<Math.ceil(two.width/150);x++) {
			this.cells.push([]);
			for (let y=0;y<Math.ceil(two.height/150);y++) {
				this.cells[x].push([]);
			}
		}
		const boxes = objects.map(o => o.boundingBox());

		boxes.forEach((b,i)=>{
			const c=center(b);
			const row=Math.floor(c.y/150);
			const col=Math.floor(c.x/150);
			this.cells[col][row].push(i);
		})


	}

}

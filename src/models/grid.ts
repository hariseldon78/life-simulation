import { SceneObject } from '@/models/SceneObject';
import Two from 'two.js';
import * as _ from 'lodash';
function center(b: Two.BoundingClientRect) {
	return { x: b.left + b.width / 2, y: b.top + b.height / 2 };
}
export function overlap(a: Two.BoundingClientRect, b: Two.BoundingClientRect): boolean {
	function between(a: number, x: number, b: number): boolean {
		const min = Math.min(a, b);
		const max = Math.max(a, b);
		return min <= x && x <= max;
	}
	const xOverlap = between(b.left, a.left, b.right) || between(b.left, a.right, b.right);
	const yOverlap = between(b.top, a.top, b.bottom) || between(b.top, a.bottom, b.bottom);
	return xOverlap && yOverlap;
}

export interface Interaction {
	a: number;
	b: number;
}
export function gridInteractions(two: Two, objects: SceneObject[]):Interaction[] {
	const cells: number[][][] = [];
	let interactions: Interaction[] = [];
	for (let x = 0; x < Math.ceil(two.width / 150); x++) {
		cells.push([]);
		for (let y = 0; y < Math.ceil(two.height / 150); y++) {
			cells[x].push([]);
		}
	}
	const boxes = objects.map(o => o.boundingBox());

	boxes.forEach((b, i) => {
		const c = center(b);
		const row = Math.floor(c.y / 150);
		const col = Math.floor(c.x / 150);
		cells[col][row].push(i);
	});

	for (let x = 1; x < cells.length; x++) {
		for (let y = 1; y < cells[0].length; y++) {
			const group = [
				...cells[x - 1][y - 1],
				...cells[x - 1][y],
				...cells[x][y - 1],
				...cells[x][y],
			];
			for (let i = 0; i < group.length; i++) {
				if (!objects[group[i]].movable) continue;
				const boxa = boxes[group[i]];
				for (let j = 0; j < group.length; j++) {
					const boxb = boxes[group[j]];
					if (group[i] === group[j]) continue;
					if (overlap(boxa, boxb)) {
						interactions.push({a: group[i], b: group[j]});
					}
				}
			}
		}
	}

	return _.uniq(interactions);
}

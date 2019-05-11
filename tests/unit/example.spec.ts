import { Grid } from '@/models/grid';

describe('grid', () => {
	it('correctly create an empty grid', () => {
		const mockTwo = { width: 1450, height: 870 };
		const mockObjects: any[] = [];
		// @ts-ignore
		const grid = new Grid(mockTwo, mockObjects);
		expect(grid.cells).toHaveLength(10);
		expect(grid.cells[0]).toHaveLength(6);
		expect(grid.cells[0][0]).toHaveLength(0);
	});
	it('correctly import some Sceneobject', () => {
		const mockTwo = { width: 1450, height: 870 };
		const mockObjects: any[] = [
			{
				boundingBox() {
					return {
						left: 60,
						width: 100,
						top: 200,
						height: 30,
					};
				},
			},
			{
				boundingBox() {
					return {
						left: 50,
						width: 100,
						top: 190,
						height: 30,
					};
				},
			},
		];
		// @ts-ignore
		const grid = new Grid(mockTwo, mockObjects);
		expect(grid.cells[0][0]).toHaveLength(0);
		expect(grid.cells[0][1]).toHaveLength(2);
		expect(grid.cells[1][1]).toHaveLength(0);
	});
});

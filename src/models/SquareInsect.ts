import Two from "two.js";

export class SquareInsect extends Two.Group {
  constructor(two: Two, x: number, y: number) {
    super();
    const body = two.makeRoundedRectangle(0, 0, 50, 50, 5);
    const eye = two.makeCircle(15, 15, 5);
    this.add(body, eye);
    two.add(this);
    this.translation.set(x, y);
  }
}

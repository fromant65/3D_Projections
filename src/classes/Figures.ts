export class Line {
  p1: Point3D;
  p2: Point3D;
  constructor(p1: Point3D, p2: Point3D) {
    this.p1 = p1;
    this.p2 = p2;
  }
}

export class Point2D {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Point3D {
  x: number;
  y: number;
  z: number;
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

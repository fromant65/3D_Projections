import { Line, Point3D } from "./Figures";
import { Object3D } from "./Objects";

export class Prism extends Object3D {
  // Prism recibe 2 puntos en 3D, los extremos del mismo,
  // y calcula el resto en base a su método setAllPoints
  constructor(points: Point3D[]) {
    super(points);
    this.setAllPoints();
    this.setEdges();
  }
  setAllPoints() {
    let p1 = this.points[0];
    let p8 = this.points[1];
    let p2 = new Point3D(p1.x, p1.y, p8.z);
    let p3 = new Point3D(p1.x, p8.y, p8.z);
    let p4 = new Point3D(p1.x, p8.y, p1.z);
    let p5 = new Point3D(p8.x, p1.y, p1.z);
    let p6 = new Point3D(p8.x, p1.y, p8.z);
    let p7 = new Point3D(p8.x, p8.y, p1.z);

    let newPoints = [p1, p2, p3, p4, p5, p6, p8, p7];
    this.points = newPoints;
  }

  setEdges() {
    if (this.points.length === 8) {
      const lines = [];
      for (let i = 0; i < 4; i++) {
        lines.push(new Line(this.points[i], this.points[(i + 1) % 4]));
        lines.push(
          new Line(this.points[i + 4], this.points[((i + 1) % 4) + 4])
        );
        lines.push(new Line(this.points[i], this.points[i + 4]));
      }
      this.edges = lines;
    }
  }

  getPoints() {
    return this.points;
  }
  getEdges() {
    return this.edges;
  }
}

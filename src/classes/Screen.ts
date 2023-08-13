import { Line, Point2D, Point3D } from "./Figures";
import { Objects } from "./Objects";

export class ScreenDimensions {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

export class ScreenClass extends ScreenDimensions {
  ctx: CanvasRenderingContext2D;
  pointProjecter: PointProjecter;
  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    super(width, height);
    this.ctx = ctx;
    this.pointProjecter = new PointProjecter(width, height);
  }
  drawFuguePoint() {
    this.ctx.fillStyle = "blue"; // Color de relleno
    this.ctx.fillRect(0, 0, 5, 5);
  }
  drawHorizon() {
    this.ctx.strokeStyle = "#000";
    this.ctx.moveTo(-this.width / 2, 0);
    this.ctx.lineTo(this.width / 2, 0);
    this.ctx.stroke();
  }
  drawPoint(point: Point3D, color: string) {
    let projectedPoint = this.pointProjecter.projectPoint(point);
    this.ctx.fillStyle = color;
    this.ctx.rect(projectedPoint.x, projectedPoint.y, 3, 3);
    this.ctx.fill();
  }
  drawPoints(points: Point3D[], color: string) {
    for (let point of points) {
      this.drawPoint(point, color);
    }
  }
  drawLine(line: Line, color: string) {
    let pp1 = this.pointProjecter.projectPoint(line.p1); //Projected Point 1
    let pp2 = this.pointProjecter.projectPoint(line.p2); //Projected Point 2
    this.ctx.strokeStyle = color;
    this.ctx.moveTo(pp1.x, pp1.y);
    this.ctx.lineTo(pp2.x, pp2.y);
    this.ctx.stroke();
  }
  drawLines(lines: Line[]) {
    for (let line of lines) {
      this.drawLine(line, "#000");
    }
  }
  draw(objects: Objects) {
    for (let object of objects.objects) {
      this.drawLines(object.edges);
      this.drawPoints(object.points, "blue");
    }
  }
}

class PointProjecter extends ScreenDimensions {
  constructor(width: number, height: number) {
    super(width, height);
  }
  projectPoint(point: Point3D): Point2D {
    //Si el punto está en z < 0, lo proyectamos fuera de la pantalla
    if (point.z < 0) return new Point2D(2 * this.width, 2 * this.height);
    let xProjected, yProjected;
    xProjected = (point.x * this.width) / (2 * point.z);
    yProjected = (point.y * this.height) / (2 * point.z);
    return new Point2D(xProjected, yProjected);
  }
  projectPoints(points: Point3D[]): Point2D[] {
    let projectedPoints = points.map((point) => {
      let projectedPoint = this.projectPoint(point);
      return projectedPoint;
    });
    return projectedPoints;
  }
}

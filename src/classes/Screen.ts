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
    //La fórmula anda mal si z=0 así que en ese caso lo aproximamos a 0
    let z = point.z || 0.001;
    if (point.z < 0) {
      // Si el punto está en z<0, lo tenemos que proyectar en algún punto fuera de la pantalla
      // Como Z es negativo, lo convertimos a positivo haciendo -z
      // Luego, a la fórmula original, le añadimos el producto de x * -z * ancho o alto de la pantalla /2
      // Que es el lugar fuera de la pantalla que le corresponde debido a que tiene que permanecer en
      let xProjected, yProjected;
      xProjected =
        (point.x * this.width) / (2 * -z) + (this.width / 2) * point.x * -z;
      yProjected =
        (point.y * this.height) / (2 * -z) + (this.height / 2) * point.y * -z;
      return new Point2D(xProjected, yProjected);
    } else {
      let xProjected, yProjected;
      xProjected = (point.x * this.width) / (2 * z);
      yProjected = (point.y * this.height) / (2 * z);
      return new Point2D(xProjected, yProjected);
    }
    //return new Point2D(2 * this.width, 2 * this.height);
  }
  projectPoints(points: Point3D[]): Point2D[] {
    let projectedPoints = points.map((point) => {
      let projectedPoint = this.projectPoint(point);
      return projectedPoint;
    });
    return projectedPoints;
  }
}

import { Line, Point3D } from "./Figures";
import { Observer } from "./Observer";
import { PointRotator, PointTranslator } from "./Transformers";

export class Object3D {
  points: Point3D[];
  edges: Line[];
  constructor(points: Point3D[]) {
    this.points = points;
    this.edges = [];
  }
  setEdges() {}
  setPoints(points: Point3D[]) {
    this.points = points;
  }
}

export class Objects {
  objects: Object3D[];
  observer: Observer;
  constructor(objects: Object3D[], observer: Observer) {
    this.objects = objects;
    this.observer = observer;
  }
  translateObjects() {
    const pointTranslator = new PointTranslator();
    for (let object of this.objects) {
      let translatedPoints = [];
      for (let point of object.points) {
        translatedPoints.push(
          pointTranslator.translatePoint(this.observer, point)
        );
      }
      object.setPoints(translatedPoints);
      object.setEdges();
    }
  }
  rotateObjects() {
    const pointRotator = new PointRotator();
    for (let object of this.objects) {
      let rotatedPoints = [];
      for (let point of object.points) {
        rotatedPoints.push(pointRotator.rotatePoint(this.observer, point));
      }
      object.setPoints(rotatedPoints);
      object.setEdges();
    }
  }
}

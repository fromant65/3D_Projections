import { Point3D } from "./Figures";
import { Observer } from "./Observer";

export class PointTranslator {
  translatePoint(observer: Observer, point: Point3D) {
    return new Point3D(
      point.x - observer.x,
      point.y - observer.y,
      point.z - observer.z
    );
  }
}

export class PointRotator {
  rotatePoint(observer: Observer, point: Point3D) {
    let x = point.x;
    let y = point.y;
    let z = point.z;
    let alfa = observer.alfa;
    let beta = observer.beta;
    /*console.log(
      `Calculation: x: ${x}, new x: ${
        x * Math.cos(alfa) - z * Math.sin(alfa)
      }, alfa: ${alfa}`
    );*/
    let XZRotation = new Point3D(
      x * Math.cos(alfa) - z * Math.sin(alfa),
      y,
      z * Math.cos(alfa) + x * Math.sin(alfa)
    );
    let xR = XZRotation.x;
    let yR = XZRotation.y;
    let zR = XZRotation.z;

    let YZRotation = new Point3D(
      xR,
      yR * Math.cos(beta) - zR * Math.sin(beta),
      zR * Math.cos(beta) + yR * Math.sin(beta)
    );
    /*
    console.log(
      `Point: ${point.x},${point.y}, ${point.z}\n 
      XZRotation: ${XZRotation.x},${XZRotation.y},${XZRotation.z}\n 
      YZRotation: ${YZRotation.x},${YZRotation.y},${YZRotation.z}`
    );*/
    return YZRotation;
  }
}

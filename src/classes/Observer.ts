import { Point3D } from "./Figures";

export class Observer extends Point3D {
  alfa: number = 0;
  beta: number = 0;
  constructor(x: number, y: number, z: number) {
    super(x, y, z);
  }
  advanceX() {
    this.x += 2;
  }
  advanceY() {
    this.y += 2;
  }
  advanceZ() {
    this.z += 2;
  }
  retreatX() {
    this.x -= 2;
  }
  retreatY() {
    this.y -= 2;
  }
  retreatZ() {
    this.z -= 2;
  }
  rotateRight20deg() {
    this.alfa += Math.PI / 9;
  }
  rotateLeft20deg() {
    this.alfa -= Math.PI / 9;
  }
  rotateUp20deg() {
    this.beta += Math.PI / 9;
  }
  rotateDown20deg() {
    this.beta -= Math.PI / 9;
  }
  rotateByAngle(alfa: number, beta: number) {
    this.alfa = alfa;
    this.beta = beta;
  }
  reset() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.alfa = 0;
    this.beta = 0;
  }
}

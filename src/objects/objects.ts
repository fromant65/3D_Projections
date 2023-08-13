import { Point3D } from "../classes/Figures";
import { Objects } from "../classes/Objects";
import { Observer } from "../classes/Observer";
import { Prism } from "../classes/Prism";

const observer = new Observer(0, 0, 0);
const p11 = new Point3D(10, 10, 30);
const p12 = new Point3D(5, -2, 20);
const cube1 = new Prism([p11, p12]);

const p21 = new Point3D(-100, 20, 120);
const p22 = new Point3D(-20, 0, 180);
const cube2 = new Prism([p21, p22]);

const p31 = new Point3D(-10, 10, -100);
const p32 = new Point3D(-20, 20, -110);
const cube3 = new Prism([p31, p32]);

const p41 = new Point3D(-100, 2, 10);
const p42 = new Point3D(-110, 20, 20);
const cube4 = new Prism([p41, p42]);

const p51 = new Point3D(-100, -10, 30);
const p52 = new Point3D(-120, 10, 50);
const cube5 = new Prism([p51, p52]);

const p61 = new Point3D(-80, -5, -50);
const p62 = new Point3D(-90, 15, -75);
const cube6 = new Prism([p61, p62]);

const p71 = new Point3D(100, -2, 0);
const p72 = new Point3D(120, 15, 20);
const cube7 = new Prism([p71, p72]);

const p81 = new Point3D(110, -10, 50);
const p82 = new Point3D(120, -20, 70);
const cube8 = new Prism([p81, p82]);

const p91 = new Point3D(110, -10, -50);
const p92 = new Point3D(120, -20, -70);
const cube9 = new Prism([p91, p92]);
export const objects: Objects = new Objects(
  [cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8, cube9],
  observer
);

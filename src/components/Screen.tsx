import { useState, useEffect, useCallback } from "react";
import { ScreenClass } from "../classes/Screen";
import { objects } from "../objects/objects";

const width = 600;
const height = 600;

const Screen = () => {
  const [clicks, setClicks] = useState(0);
  const [screen, setScreen] = useState<ScreenClass | undefined>(undefined);
  const [automaticRotation, setAutomaticRotation] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
  
    const tick = () => {
      if (screen && automaticRotation) {
        objects.observer.rotateByAngle(Math.PI / 180, 0);
        manageScreen();
        timeoutId = setTimeout(tick, 2000 / 360);
      }
    };
  
    if (screen && automaticRotation) {
      timeoutId = setTimeout(tick, 2000 / 360);
    }
  
    return () => {
      clearTimeout(timeoutId);
    };
  }, [screen, automaticRotation]);

  function initializeScreen(ctx: CanvasRenderingContext2D) {
    const newScreen = new ScreenClass(ctx, width, height);
    newScreen.ctx.translate(width / 2, height / 2);
    newScreen.ctx.scale(1, -1);
    newScreen.draw(objects);
    // Usar función de actualización para evitar problemas con el valor anterior
    setClicks((prev) => prev + 1);
    setScreen(newScreen);
  }

  function manageScreen() {
    const canvasMonad = document.getElementById("canvas") as HTMLCanvasElement | null;
    if (!canvasMonad) return;
    canvasMonad.width = width;
    const ctx = canvasMonad.getContext("2d") as CanvasRenderingContext2D;
    if (clicks === 0 || !screen) {
      initializeScreen(ctx);
      return;
    }
    ctx.clearRect(0, 0, width, height);
    const newScreen = new ScreenClass(ctx, width, height);
    newScreen.ctx.translate(width / 2, height / 2);
    newScreen.ctx.scale(1, -1);
    objects.translateObjects();
    objects.rotateObjects();
    objects.observer.reset();
    newScreen.draw(objects);
    setScreen(newScreen);
  }

  // Funciones de manejo de movimientos y rotaciones
  function manageAdvanceX() {
    objects.observer.advanceX();
    manageScreen();
  }
  function manageAdvanceY() {
    objects.observer.advanceY();
    manageScreen();
  }
  function manageAdvanceZ() {
    objects.observer.advanceZ();
    manageScreen();
  }
  function manageRetreatX() {
    objects.observer.retreatX();
    manageScreen();
  }
  function manageRetreatY() {
    objects.observer.retreatY();
    manageScreen();
  }
  function manageRetreatZ() {
    objects.observer.retreatZ();
    manageScreen();
  }
  function manageLookUp() {
    objects.observer.rotateByAngle(0, Math.PI / 180 * 2);
    manageScreen();
  }
  function manageLookDown() {
    objects.observer.rotateByAngle(0, Math.PI / 180 * -2);
    manageScreen();
  }
  function manageRotateLeft() {
    objects.observer.rotateByAngle(Math.PI / 180 * -2, 0);
    manageScreen();
  }
  function manageRotateRight() {
    objects.observer.rotateByAngle(Math.PI / 180 * 2, 0);
    manageScreen();
  }

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.code) {
      case "Space":
        manageAdvanceY();
        break;
      case "ShiftLeft":
        manageRetreatY();
        break;
      case "KeyA":
        manageRetreatX();
        break;
      case "KeyD":
        manageAdvanceX();
        break;
      case "KeyW":
        manageAdvanceZ();
        break;
      case "KeyS":
        manageRetreatZ();
        break;
      case "ArrowUp":
        manageLookUp();
        break;
      case "ArrowDown":
        manageLookDown();
        break;
      case "ArrowLeft":
        manageRotateLeft();
        break;
      case "ArrowRight":
        manageRotateRight();
        break;
      default:
        break;
    }
  }, [screen, clicks]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <canvas
        id="canvas"
        width={`${width}px`}
        height={`${height}px`}
        style={{ border: "1px solid black" }}
        onClick={manageScreen}
        tabIndex={0}
      ></canvas>
      <div>
      <button onClick={() => setAutomaticRotation((prev) => !prev)}>
        Toggle Automatic Rotation
      </button>
      </div>
    </>
  );
};

export default Screen;

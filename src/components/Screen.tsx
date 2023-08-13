import React, { useState, useEffect } from "react";
import { ScreenClass } from "../classes/Screen";
import { objects } from "../objects/objects";
const width = 600;
const height = 600;

const Screen = () => {
  const [clicks, setClicks] = useState(0);
  const [screen, setScreen]: [
    ScreenClass | undefined,
    React.Dispatch<React.SetStateAction<ScreenClass | undefined>>
  ] = useState();
  const [automaticRotation, setAutomaticRotation] = useState(false);
  useEffect(() => {
    console.log(automaticRotation);
    if (screen && automaticRotation) {
      objects.observer.rotateByAngle(Math.PI / 180, 0);
      manageScreen();
    }
  }, [screen]);
  function initializeScreen(ctx: CanvasRenderingContext2D) {
    const screen = new ScreenClass(ctx, width, height);
    screen.ctx.translate(width / 2, height / 2);
    screen.ctx.scale(1, -1);
    //screen.drawFuguePoint();
    screen.drawHorizon();
    screen.draw(objects);
    setClicks(clicks + 1);
    setScreen(screen);
  }

  function manageScreen() {
    const canvasMonad = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement | null;
    if (!canvasMonad) return;
    const canvas = canvasMonad;
    canvas.width = width;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (clicks === 0) {
      initializeScreen(ctx);
      return;
    }
    ctx.clearRect(0, 0, width, height);
    if (screen) {
      const newScreen = new ScreenClass(ctx, width, height);
      newScreen.ctx.translate(width / 2, height / 2);
      newScreen.ctx.scale(1, -1);
      objects.translateObjects();
      objects.rotateObjects();
      objects.observer.reset();
      newScreen.drawHorizon();
      newScreen.draw(objects);
      setScreen(newScreen);
    }
  }
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
    objects.observer.rotateUp20deg();
    manageScreen();
  }
  function manageLookDown() {
    objects.observer.rotateDown20deg();
    manageScreen();
  }
  function manageRotateLeft() {
    objects.observer.rotateLeft20deg();
    manageScreen();
  }
  function manageRotateRight() {
    objects.observer.rotateRight20deg();
    manageScreen();
  }
  return (
    <>
      <canvas
        id="canvas"
        width={`${width}px`}
        height={`${height}px`}
        style={{ border: "1px solid black" }}
        onClick={() => manageScreen()}
      ></canvas>
      <div>
        <button onClick={() => manageAdvanceX()}>AdvanceX</button>
        <button onClick={() => manageAdvanceY()}>AdvanceY</button>
        <button onClick={() => manageAdvanceZ()}>AdvanceZ</button>
        <button onClick={() => manageRetreatX()}>RetreatX</button>
        <button onClick={() => manageRetreatY()}>RetreatY</button>
        <button onClick={() => manageRetreatZ()}>RetreatZ</button>
        <button onClick={() => manageLookUp()}>LookUp</button>
        <button onClick={() => manageLookDown()}>LookDown</button>
        <button onClick={() => manageRotateLeft()}>RotateLeft</button>
        <button onClick={() => manageRotateRight()}>RotateRight</button>
        <button onClick={() => setAutomaticRotation(!automaticRotation)}>
          Toggle Automatic Rotation
        </button>
      </div>
    </>
  );
};

export default Screen;

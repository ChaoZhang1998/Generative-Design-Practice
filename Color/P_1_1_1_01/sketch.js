'use strict';

let step_x;
let step_y;

function setup() {
  // put setup code here
  createCanvas(800, 400);

  noCursor();
  noStroke();

  colorMode(HSB, width, height, 100);
}

function draw() {
  // put drawing code here
  step_x = mouseX + 2;
  step_y = mouseY + 2;

  for (let grid_y = 0; grid_y < height; grid_y += step_y) {
    for (let grid_x = 0; grid_x < width; grid_x += step_x) {
      fill(grid_x, height - grid_y ,100);
      rect(grid_x, grid_y, step_x, step_y);
    }
  }
}
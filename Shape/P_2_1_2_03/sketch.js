'use strict';

let tile_count = 30;

let rect_alpha;
let rect_color;
let max_size = 800 * 1.414;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);

  noFill();
  strokeWeight(3);

  rect_alpha = 80;
  rect_color = color(0, 0, 0, rect_alpha);
}

function draw() {
  background(0, 0, 100);

  stroke(rect_color);
  for (let grid_y = 0; grid_y < tile_count; grid_y++) {
    for (let grid_x = 0; grid_x < tile_count; grid_x++) {
      let x = grid_x * width / tile_count;
      let y = grid_y * height / tile_count;
      let w = sin(PI / 2 * dist(mouseX, mouseY, x, y) / max_size) * (width / tile_count);
      rect(x, y, w, w);
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
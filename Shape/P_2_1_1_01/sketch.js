'use strict';

let tile_count = 20;
let random_seed = 0;
let stroke_cap;

function setup() {
  createCanvas(800, 800);
  stroke_cap = ROUND;
}

function draw() {
  background(255);
  strokeCap(stroke_cap);

  randomSeed(random_seed);

  for (let grid_y = 0; grid_y < tile_count; grid_y++) {
    for (let grid_x = 0; grid_x < tile_count; grid_x++) {

      let pos_x = width / tile_count * grid_x;
      let pos_y = height / tile_count * grid_y;

      let toggle = int(random(0, 2));

      if (toggle == 0) {
        strokeWeight(mouseX / 20);
        line(pos_x, pos_y, pos_x + width / tile_count, pos_y + height / tile_count);
      }
      if (toggle == 1) {
        strokeWeight(mouseY / 20);
        line(pos_x, pos_y + height / tile_count, pos_x + width / tile_count, pos_y);
      }
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') stroke_cap = ROUND;
  if (key == '2') stroke_cap = SQUARE;
  if (key == '3') stroke_cap = PROJECT;
}
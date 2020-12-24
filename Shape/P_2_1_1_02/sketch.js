'use strict';

let tile_count = 20;
let random_seed = 0;

let stroke_cap;

var color_left;
var color_right;
var alpha_left = 255;
var alpha_right = 255;

function setup() {
  createCanvas(800, 800);
  stroke_cap = ROUND;

  color_left = color(197, 0, 123, alpha_left);
  color_right = color(87, 35, 129, alpha_right);
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
        stroke(color_left);
        strokeWeight(mouseX / 20);
        line(pos_x, pos_y, pos_x + width / tile_count, pos_y + height / tile_count);
      }
      if (toggle == 1) {
        stroke(color_right);
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
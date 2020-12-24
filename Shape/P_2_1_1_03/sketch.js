'use strict';

let tile_count = 1;
let random_seed = 0;

let stroke_cap;

let color_left;
let color_right;
let alpha_left = 100;
let alpha_right = 0;
let transparent_left = false;
let transparent_right = false;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);

  color_left = color(0, 0, 0, alpha_left);
  color_right = color(323, 100, 77, alpha_right);
}

function draw() {
  background(255);
  strokeWeight(mouseX / 15);

  tile_count = mouseY / 15;

  randomSeed(random_seed);

  for (let grid_y = 0; grid_y < tile_count; grid_y++) {
    for (let grid_x = 0; grid_x < tile_count; grid_x++) {

      let pos_x = width / tile_count * grid_x;
      let pos_y = height / tile_count * grid_y;

      alpha_left = transparent_left ? grid_y * 10 : 100;
      color_left = color(hue(color_left), saturation(color_left), brightness(color_left), alpha_left);
      alpha_right = transparent_right ? 100 - grid_y * 10 : 100;
      color_right = color(hue(color_right), saturation(color_right), brightness(color_right), alpha_right);

      let toggle = int(random(0, 2));

      if (toggle == 0) {
        stroke(color_left);
        line(pos_x, pos_y, pos_x + (width / tile_count) / 2, pos_y + height / tile_count);
        line(pos_x + (width / tile_count) / 2, pos_y, pos_x + width / tile_count, pos_y + height / tile_count);
      }

      if (toggle == 1) {
        stroke(color_right);
        line(pos_x, pos_y + height / tile_count, pos_x + (width / tile_count) / 2, pos_y);
        line(pos_x + (width / tile_count) / 2, pos_y + height / tile_count, pos_x + width / tile_count, pos_y);
      }
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') {
    if (colorsEqual(color_left, color(273, 73, 51, alpha_left))) {
      color_left = color(323, 100, 77, alpha_left);
    } else {
      color_left = color(273, 73, 51, alpha_left);
    }
  }
  if (key == '2') {
    if (colorsEqual(color_right, color(0, 0, 0, alpha_right))) {
      color_right = color(192, 100, 64, alpha_right);
    } else {
      color_right = color(0, 0, 0, alpha_right);
    }
  }
  if (key == '3') {
    transparent_left =  !transparent_left;
  }
  if (key == '4') {
    transparent_right = !transparent_right;
  }
  if (key == '0') {
    transparent_left = false;
    transparent_right = false;
    color_left = color(323, 100, 77, alpha_left);
    color_right = color(0, 0, 0, alpha_right);
  }
}

function colorsEqual(col1, col2) {
  return col1.toString() == col2.toString();
}
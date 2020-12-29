'use strict';

let tile_count = 20;

let circle_alpha = 130;
let circle_color;

let random_seed = 0;

function setup() {
  createCanvas(800, 800);

  noFill();
  circle_color = color(0, 0, 0, circle_alpha);
}

function draw() {
  background(255);

  translate(width / tile_count / 2, height / tile_count / 2);

  randomSeed(random_seed);

  stroke(circle_color);
  strokeWeight(mouseY / 60);

  for (let grid_y = 0; grid_y < tile_count; grid_y++) {
    for (let grid_x = 0; grid_x < tile_count; grid_x++) {

      let pos_x = width / tile_count * grid_x;
      let pos_y = height / tile_count * grid_y;

      let shift_x = random(-mouseX, mouseX) / 20;
      let shift_y = random(-mouseX, mouseX) / 20;

      ellipse(pos_x + shift_x, pos_y + shift_y, mouseY / 15, mouseY / 15);
    }
  }
}

function mouseReleased() {
  random_seed = random(100000);
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

}
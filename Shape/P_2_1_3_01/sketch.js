'use strict';

let tile_count_x = 10;
let tile_count_y = 10;
let tile_width = 0;
let tile_height = 0;

let circle_count = 0;
let end_size = 0;
let end_offset = 0;

let random_seed = 1;

function setup() {
  createCanvas(800, 800);

  tile_width = width / tile_count_x;
  tile_height = height / tile_count_y;

  noFill();
  stroke(0, 128);
}

function draw() {
  background(255);
  randomSeed(random_seed);

  translate(tile_width/2, tile_height/2);

  circle_count = mouseX / 30 + 1;
  end_size = map(mouseX, 0, max(width, mouseX), tile_width / 2, 0);
  end_offset = map(mouseY, 0, max(height, mouseY), 0, (tile_width - end_size) / 2);

  for (let grid_y = 0; grid_y < tile_count_y; grid_y++) {
    for (let grid_x = 0; grid_x < tile_count_x; grid_x++) {
      push();
      translate(tile_width * grid_x, tile_height * grid_y);
      scale(1, tile_height / tile_width);

      let toggle = int(random(0, 4));
      if (toggle == 0) rotate(-HALF_PI);
      if (toggle == 1) rotate(0);
      if (toggle == 2) rotate(HALF_PI);
      if (toggle == 3) rotate(PI);

      // draw module
      for (let i = 0; i < circle_count; i++) {
        let diameter = map(i, 0, circle_count, tile_width, end_size);
        let offset = map(i, 0, circle_count, 0, end_offset);
        ellipse(offset, 0, diameter, diameter);
      }
      pop();
    }
  }
}

function mouseReleased() {
  random_seed = random(100000);
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
'use strict';

var tile_count_x = 10;
var tile_count_y = 10;

var color_step = 6;

var random_seed = 0;

function setup() {
  createCanvas(800, 800);
  noStroke();
}

function draw() {
  background(255);

  randomSeed(random_seed);

  let tile_width = width / tile_count_x;
  let tile_height = height / tile_count_y;

  let step_size = min(mouseX, width) / 10;
  let end_size = min(mouseY, height) / 10;

  for (let grid_y = 0; grid_y < tile_count_y; grid_y++) {
    for (let grid_x = 0; grid_x < tile_count_x; grid_x++) {
      let pos_x = grid_x * tile_width + tile_width / 2;
      let pos_y = grid_y * tile_height + tile_height / 2;
      
      let heading = int(random(4));
      for (let step = 0; step < step_size; step++) {
        let diameter = map(step, 0, step_size, tile_width, end_size);

        fill(255 - step * color_step);
        switch (heading) {
          case 0: ellipse(pos_x, pos_y + step, diameter, diameter); break;
          case 1: ellipse(pos_x, pos_y - step, diameter, diameter); break;
          case 2: ellipse(pos_x + step, pos_y, diameter, diameter); break;
          case 3: ellipse(pos_x - step, pos_y, diameter, diameter); break;
        }
      }
    }
  }
}

function mousePressed() {
  random_seed = random(10000);
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
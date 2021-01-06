'use strict';

let tile_count = 30;

let size = 30;

let random_seed = 1;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);

  noStroke();
  fill(192, 100, 64, 60);
}

function draw() {
  background(0, 0, 100);

  randomSeed(random_seed);

  for (let grid_y = 0; grid_y < tile_count; grid_y++) {
    for (let grid_x = 0; grid_x < tile_count; grid_x++) {
      let x = grid_x * width / tile_count;
      let y = grid_y * height / tile_count;

      var shift_x1 = mouseX / 20 * random(-1, 1);
      var shift_y1 = mouseY / 20 * random(-1, 1);
      var shift_x2 = mouseX / 20 * random(-1, 1);
      var shift_y2 = mouseY / 20 * random(-1, 1);
      var shift_x3 = mouseX / 20 * random(-1, 1);
      var shift_y3 = mouseY / 20 * random(-1, 1);
      var shift_x4 = mouseX / 20 * random(-1, 1);
      var shift_y4 = mouseY / 20 * random(-1, 1);

      push();
      translate(x, y);
      beginShape();
      vertex(shift_x1, shift_y1);
      vertex(size + shift_x2, shift_y2);
      vertex(size + shift_x3, size + shift_y3);
      vertex(shift_x4, size + shift_y4);
      endShape();
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
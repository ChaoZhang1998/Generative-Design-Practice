'use strict';

let tile_count = 20;

let below_color, above_color;
let below_alpha, above_alpha;
let below_size, above_size;

let random_seed = 0;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);

  noStroke();
  below_color = color(0, 0, 0, below_alpha);
  above_color = color(0, 0, 100, above_alpha);

  below_alpha = 100;
  above_alpha = 100;

  below_size = 40;
  above_size = 20;
}

function draw() {
  background(0, 0, 100);
  translate(width / tile_count / 2, height / tile_count / 2);

  randomSeed(random_seed);

  for (let grid_y = 0; grid_y < tile_count; grid_y++) {
    for (let grid_x = 0; grid_x < tile_count; grid_x++) {

      let pos_x = width / tile_count * grid_x;
      let pos_y = height / tile_count * grid_y;

      let shift_x = random(-mouseX, mouseX) / 20;
      let shift_y = random(-mouseX, mouseX) / 20;

      fill(below_color);
      ellipse(pos_x + shift_x, pos_y + shift_y, below_size, below_size);

      fill(above_color);
      ellipse(pos_x, pos_y, above_size, above_size);
    }
  }
}

function mouseReleased() {
  random_seed = random(100000);
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '0') {
    below_size = 40;
    above_size = 20;
    below_alpha = 100;
    above_alpha = 100;
    below_color = color(0, 0, 0, below_alpha);
    above_color = color(0, 0, 100, above_alpha);
  }

  if (key == '1') {
    if (colorsEqual(below_color, color(0, 0, 0, below_alpha))) {
      below_color = color(273, 73, 51, below_alpha);
    } else {
      below_color = color(0, 0, 0, below_alpha);
    }
  }
  if (key == '2') {
    if (colorsEqual(above_color, color(360, 100, 100, above_alpha))) {
      above_color = color(323, 100, 77, above_alpha);
    } else {
      above_color = color(360, 100, 100, above_alpha);
    }
  }

  if (key == '3') {
    if (below_alpha == 100) {
      below_alpha = 50;
      above_alpha = 50;
    } else {
      below_alpha = 100;
      above_alpha = 100;
    }

    below_color = color(
      hue(below_color),
      saturation(below_color),
      brightness(below_color),
      below_alpha
    );
    above_color = color(
      hue(above_color),
      saturation(above_color),
      brightness(above_color),
      above_alpha
    );
  }

  if (keyCode == UP_ARROW) below_size += 5;
  if (keyCode == DOWN_ARROW) below_size = max(below_size - 5, 10);
  if (keyCode == LEFT_ARROW) above_size = max(above_size - 5, 5);
  if (keyCode == RIGHT_ARROW) above_size += 5;
}

function colorsEqual(col1, col2) {
  return col1.toString() == col2.toString();
}
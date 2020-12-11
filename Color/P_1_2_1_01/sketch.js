'use strict';

let tile_count_x = 2;
let tile_count_y = 10;

let colors_left = [];
let colors_right = [];
let colors = [];

let interpolate_shortest = true;

function setup() {
  // put setup code here
  createCanvas(800, 800);
  colorMode(HSB);

  noCursor();
  noStroke();

  shakeColors();
}

function draw() {
  // put drawing code here
  tile_count_x = int(map(mouseX, 0, width, 2, 100));
  tile_count_y = int(map(mouseY, 0, height, 2, 10));

  let tile_width = width / tile_count_x;
  let tile_height = height / tile_count_y;
  let inter_col;
  colors = [];

  for (let grid_y = 0; grid_y < tile_count_y; grid_y++) {
    let col1 = colors_left[grid_y];
    let col2 = colors_right[grid_y];

    for (let grid_x = 0; grid_x < tile_count_x; grid_x++) {
      let amount = map(grid_x, 0, tile_count_x - 1, 0, 1);

      if (interpolate_shortest) {
        // switch to rgb
        colorMode(RGB);
        inter_col = lerpColor(col1, col2, amount);
      } else {
        // switch back
        colorMode(HSB);
        inter_col = lerpColor(col1, col2, amount);
      }

      fill(inter_col);

      let pos_x = tile_width * grid_x;
      let pos_y = tile_height * grid_y;
      rect(pos_x, pos_y, tile_width, tile_height);

      // save color for potential ase export
      colors.push(inter_col);
    }
  }
}

function shakeColors() {
  for (var i = 0; i < tile_count_y; i++) {
    colors_left[i] = color(random(0, 60), random(0, 100), 100);
    colors_right[i] = color(random(160, 190), 100, random(0, 100));
  }
}

function mouseReleased() {
  shakeColors();
}

function keyPressed() {
  if (key == 'c' || key == 'C') writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == '1') interpolate_shortest = true;
  if (key == '2') interpolate_shortest = false;
}
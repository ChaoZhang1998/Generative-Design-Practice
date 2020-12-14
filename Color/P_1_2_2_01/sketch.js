'use strict';

let img;
let colors = [];
let sort_mode = null;

function preload() {
  loadImage("pic.jpg", setImage);
}

function setup() {
  // put setup code here
  createCanvas(img.width, img.height);
  noStroke();
  noCursor();
}

function draw() {
  // put drawing code here
  let tile_count = floor(width / max(mouseX, 5));
  let rect_size = width / tile_count;

  img.loadPixels();
  colors = [];

  for (let grid_y = 0; grid_y < tile_count; grid_y++) {
    for (let grid_x = 0; grid_x < tile_count; grid_x++) {
      let px = int(grid_x * rect_size);
      let py = int(grid_y * rect_size);
      let i = (py * img.width + px) * 4;
      let c = color(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2], img.pixels[i + 3]);
      colors.push(c);
    }
  }

  gd.sortColors(colors, sort_mode);

  let i = 0;
  for (let grid_y = 0; grid_y < tile_count; grid_y++) {
    for (let grid_x = 0; grid_x < tile_count; grid_x++) {
      fill(colors[i++]);
      rect(grid_x * rect_size, grid_y * rect_size, rect_size, rect_size);
    }
  }
}

function setImage(loaded_image_file) {
  img = loaded_image_file;
}

function keyPressed() {
  if (key == 'c' || key == 'C') writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == '1') sort_mode = null;
  if (key == '2') sort_mode = gd.HUE;
  if (key == '3') sort_mode = gd.SATURATION;
  if (key == '4') sort_mode = gd.BRIGHTNESS;
  if (key == '5') sort_mode = gd.GRAYSCALE;
}
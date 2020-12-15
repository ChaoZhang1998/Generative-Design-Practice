'use strict';

let max_tile_count_x = 50;
let max_tile_count_y = 10;

let hue = [];
let saturation = [];
let brightness = [];

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);

  noStroke();
  noCursor();

  // init with random values
  for (var i = 0; i < max_tile_count_x; i++) {
    hue[i] = random(360);
    saturation[i] = random(100);
    brightness[i] = random(100);
  }
}

function draw() {
  // put drawing code here
  background(0, 0, 100);

  // limit mouse coordinates to canvas
  let max_x = constrain(mouseX, 0, width);
  let max_y = constrain(mouseY, 0, height);

  // tile counter
  let count = 0;

  // map mouse to grid resolution
  let current_tile_count_x = int(map(max_x, 0, width, 1, max_tile_count_x));
  let current_tile_count_y = int(map(max_y, 0, height, 1, max_tile_count_y));
  let tile_width = width / current_tile_count_x;
  let tile_height = height / current_tile_count_y;

  let index = 0;
  for (let grid_y = 0; grid_y < current_tile_count_y; grid_y++) {
    for (let grid_x = 0; grid_x < current_tile_count_x; grid_x++) {
      let i = index % max_tile_count_x;
      fill(hue[i], saturation[i], brightness[i]);
      rect(grid_x * tile_width, grid_y * tile_height, tile_width, tile_height);
      
      index++;
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == 'c' || key == 'C') {
    // -- save an ase file (adobe swatch export) --
    let colors = [];
    for (var i = 0; i < hueValues.length; i++) {
      colors.push(color(hueValues[i], saturationValues[i], brightnessValues[i]));
    }
    writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  }

  if (key == '1') {
    for (let i = 0; i < max_tile_count_x; i++) {
      hue[i] = random(360);
      saturation[i] = random(100);
      brightness[i] = random(100);
    }
  }

  if (key == '2') {
    for (let i = 0; i < max_tile_count_x; i++) {
      hue[i] = random(360);
      saturation[i] = random(100);
      brightness[i] = 100;
    }
  }

  if (key == '3') {
    for (let i = 0; i < max_tile_count_x; i++) {
      hue[i] = random(360);
      saturation[i] = 100;
      brightness[i] = random(100);
    }
  }

  if (key == '4') {
    for (let i = 0; i < max_tile_count_x; i++) {
      hue[i] = 0;
      saturation[i] = 0;
      brightness[i] = random(100);
    }
  }

  if (key == '5') {
    for (let i = 0; i < max_tile_count_x; i++) {
      hue[i] = 195;
      saturation[i] = 100;
      brightness[i] = random(100);
    }
  }

  if (key == '6') {
    for (let i = 0; i < max_tile_count_x; i++) {
      hue[i] = 195;
      saturation[i] = random(100);
      brightness[i] = 100;
    }
  }

  if (key == '7') {
    for (let i = 0; i < max_tile_count_x; i++) {
      hue[i] = random(180);
      saturation[i] = random(80, 100);
      brightness[i] = random(50, 90);
    }
  }

  if (key == '8') {
    for (let i = 0; i < max_tile_count_x; i++) {
      hue[i] = random(180, 360);
      saturation[i] = random(80, 100);
      brightness[i] = random(50, 90);
    }
  }

  if (key == '9') {
    for (let i = 0; i < max_tile_count_x; i++) {
      if (i % 2 == 0) {
        hue[i] = random(360);
        saturation[i] = 100;
        brightness[i] = random(100);
      } else {
        hue[i] = 195;
        saturation[i] = random(100);
        brightness[i] = 100;
      }
    }
  }

  if (key == '0') {
    for (let i = 0; i < max_tile_count_x; i++) {
      if (i % 2 == 0) {
        hue[i] = 140;
        saturation[i] = random(30, 100);
        brightness[i] = random(40, 100);
      } else {
        hue[i] = 210;
        saturation[i] = random(40, 100);
        brightness[i] = random(50, 100);
      }
    }
  }
}
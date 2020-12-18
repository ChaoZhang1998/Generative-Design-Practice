'use strict';

let color_count = 20;
let hue_vlaues = [];
let saturation_values = [];
let brightness_values = [];
let act_random_seed = 0;
let alpha_value = 75;

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  noCursor();
}

function draw() {
  // put drawing code here
  noLoop();
  background(0);
  randomSeed(act_random_seed);

  // ------ colors ------
  // create palette
  for (let i = 0; i < color_count; i++) {
    if (i % 2 == 0) {
      hue_vlaues[i] = random(130, 220);
      saturation_values[i] = 100;
      brightness_values[i] = random(15, 100);
    } else {
      hue_vlaues[i] = 195;
      saturation_values[i] = random(20, 100);
      brightness_values[i] = 100;
    }
  }

  // ------ area tiling ------
  // count tiles
  let counter = 0;
  // row count and row height
  let row_count = int(random(5, 30));
  let row_height = height / row_count;

  // seperate each line in parts
  for (let i = row_count - 1; i >= 0; i--) {
    // how many fragments
    let part_count = i + 1;
    let parts = [];

    for (let ii = 0; ii < part_count; ii++) {
      // sub fragments or not?
      if (random() < 0.075) {
        // take care of big values
        let fragments = int(random(2, 20));
        part_count = part_count + fragments;
        for (let iii = 0; iii < fragments; iii++) {
          parts.push(random(2));
        }
      } else {
        parts.push(random(2, 20));
      }
    }

    // add all subparts
    let sum_parts_total = 0;
    for (let ii = 0; ii < part_count; ii++) {
      sum_parts_total += parts[ii];
    }

    // draw rects
    let sum_parts_now = 0;
    for (let ii = 0; ii < parts.length; ii++) {
      sum_parts_now += parts[ii];

      let x = map(sum_parts_now, 0, sum_parts_total, 0, width);
      let y = row_height * i;
      let w = -map(parts[ii], 0, sum_parts_total, 0, width);
      let h = row_height * 1.5;

      let index = counter % color_count;
      let col1 = color(0);
      let col2 = color(hue_vlaues[index], saturation_values[index], brightness_values[index], alpha_value);
      gradient(x, y, w, h, col1, col2);

      counter++;
    }
  }
}

function gradient(x, y, w, h, c1, c2) {
  let ctx = drawingContext; // global canvas context p5.js var
  let grd = ctx.createLinearGradient(x, y, x, y + h);
  grd.addColorStop(0, c1.toString());
  grd.addColorStop(1, c2.toString());
  ctx.fillStyle = grd;
  ctx.fillRect(x, y, w, h);
}

function mouseReleased() {
  act_random_seed = random(100000);
  loop();
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == 'c' || key == 'C') {
    // -- save an ase file (adobe swatch export) --
    let colors = [];
    for (var i = 0; i < hue_vlaues.length; i++) {
      colors.push(color(hue_vlaues[i], saturation_values[i], brightness_values[i]));
    }
    writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  }
}
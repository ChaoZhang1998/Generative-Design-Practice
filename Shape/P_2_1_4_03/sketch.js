'use strict';

var w = 740;
var h = 740;
var slider_width;
var slider_height = 17;
var slider_count;
var padding = 10;

var slider_min = 0;
var slider_max = 100;

function setup() {
  createCanvas(800, 800);

  // get the number of sliders based on w & h
  slider_width = w / 2;
  slider_count = ceil(slider_width / slider_height);

  noLoop();
}

function draw() {
  background(47, 58, 118);

  // topleft - horizontal
  for (let i = 0; i <= slider_count; i++) {
    let sval = map(i, slider_count, 0, slider_min, slider_max);
    createSlider(slider_min, slider_max, sval)
      .position(padding, i * slider_height + padding)
      .style('width', slider_width + 'px');
  }

  // bottomright - horizontal
  for (let i = 0; i <= slider_count; i++) {
    let sval = map(i, slider_count, 0, slider_min, slider_max);
    createSlider(slider_min, slider_max, sval)
      .position(slider_width + 3 * padding, i * slider_height + 3 * padding + slider_width)
      .style('width', slider_width + 'px');
  }

  // topright - vertical
  for (let i = 0; i <= slider_count; i++) {
    let sval = map(i, 0, slider_count, slider_min, slider_max);
    createSlider(slider_min, slider_max, sval)
      .position(i * slider_height + 3 * padding + 0.5 * slider_width, padding + 0.5 * slider_width)
      .style('width', slider_width + 'px')
      .style('transform', 'rotate(' + 90 + 'deg)');
  }

  // bottomleft - vertical
  for (let i = 0; i <= slider_count; i++) {
    let sval = map(i, 0, slider_count, slider_min, slider_max);
    createSlider(slider_min, slider_max, sval)
      .position(i * slider_height + padding - 0.5 * slider_width, 3 * padding + 1.5 * slider_width)
      .style('width', slider_width + 'px')
      .style('transform', 'rotate(' + 90 + 'deg)');
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
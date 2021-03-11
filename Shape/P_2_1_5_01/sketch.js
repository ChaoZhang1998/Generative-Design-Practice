'use strict';

var draw_mode = 1;

function setup() {
  createCanvas(800, 800);
  noFill();
}

function draw() {
  background(255);

  translate(width / 2, height / 2);

  // first shape (fixed)
  strokeWeight(3);
  overlay();

  // second shape (dynamically translate/rotated and scaled)
  let x = map(mouseX, 0, width, -50, 50);
  let a = map(mouseX, 0, width, -0.5, 0.5);
  let s = map(mouseY, 0, height, 0.7, 1);

  if (draw_mode == 1) rotate(a);
  if (draw_mode == 2) translate(x, 0);
  scale(s);

  strokeWeight(2);
  overlay();
}

function overlay() {
  let w = width - 100;
  let h = height - 100;

  if (draw_mode == 1) {
    for (let i = -w / 2; i < w / 2; i += 5) {
      line(i, -h / 2, i, h /2);
    }
  } else if (draw_mode == 2) {
    for (let i = 0; i < w; i += 10) {
      ellipse(0, 0, i);
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  // change draw mode
  if (key == '1') draw_mode = 1;
  if (key == '2') draw_mode = 2;
}
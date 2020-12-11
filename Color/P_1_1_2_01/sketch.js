'use strict';

let segment_count = 360;
let radius;

function setup() {
  // put setup code here
  createCanvas(800, 800);

  noCursor();
  noStroke();

  colorMode(HSB, 360, width, height);

  radius = width / 2;
}

function draw() {
  // put drawing code here
  background(360, 0, height);
  let angle_step = 360 / segment_count;

  beginShape(TRIANGLE_FAN);
  vertex(width / 2, height / 2);

  for (let angle = 0; angle <= 360; angle += angle_step) {
    let vx = width / 2 + cos(radians(angle)) * radius;
    let vy = height / 2 + sin(radians(angle)) * radius;
    vertex(vx, vy);
    fill(angle, mouseX, mouseY);
  }

  endShape();
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  switch (key) {
    case '1':
      segment_count = 360;
      break;
    case '2':
      segment_count = 45;
      break;
    case '3':
      segment_count = 24;
      break;
    case '4':
      segment_count = 12;
      break;
    case '5':
      segment_count = 6;
      break;
  }
}
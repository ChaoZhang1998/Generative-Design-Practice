'use strict';

function setup() {
  createCanvas(800, 800);
  strokeCap(SQUARE);
}

function draw() {
  background(255);
  translate(width/2, height/2);

  let radius = mouseX - width / 2;
  let number = int(map(mouseY, 0, height, 2, 80));
  let angle = 2*PI / number;

  strokeWeight(mouseY / 20);

  for (let i = 0; i < number; i++) {
    let x = radius * cos(i * angle);
    let y = radius * sin(i * angle);

    line(0, 0, x, y);
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
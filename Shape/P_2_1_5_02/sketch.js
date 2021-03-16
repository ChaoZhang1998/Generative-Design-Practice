'use strict';

let shapes = [];
let min_radius = 5;
let max_radius = 250;
let density = 5;

function setup() {
  createCanvas(800, 800);
  noFill();

  shapes.push(new Shape(width / 2, height / 2, width));
}

function draw() {
  background(255);

  shapes.forEach(function (shape) {
    shape.draw();
  });
}

class Shape {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  draw() {
    for (let i = 0; i < this.r; i += density) {
      ellipse(this.x, this.y, i)
    }
  }
}

function mouseReleased() {
  shapes.push(new Shape(mouseX, mouseY, random(min_radius, max_radius)));
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
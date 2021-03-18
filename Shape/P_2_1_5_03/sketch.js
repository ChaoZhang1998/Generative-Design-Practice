'use strict';

var shapes = [];
var density = 2.5;

var shape_height = 64;

var shape_color;
var new_shape;

function setup() {
  createCanvas(800, 800);
  noFill();

  shape_color = color(0);
}

function draw() {
  background(255);

  shapes.forEach(function (shape) {
    shape.draw();
  });

  if (new_shape) {
    new_shape.x2 = mouseX;
    new_shape.y2 = mouseY;
    new_shape.h = shape_height;
    new_shape.c = shape_color;
    new_shape.draw();
  }
}

class Shape {
  constructor(x1, y1, x2, y2, h, c) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.h = h;
    this.c = c;
  }

  draw() {
    let w = dist(this.x1, this.y1, this.x2, this.y2);
    let a = atan2(this.y2 - this.y1, this.x2 - this.x1);
    stroke(this.c);
    push();
    translate(this.x1, this.y1);
    rotate(a);
    translate(0, -this.h / 2);
    for (let i = 0; i < this.h; i += density) {
      line(0, i, w, i);
    }
    pop();
  }
}

function mousePressed() {
  new_shape = new Shape(pmouseX, pmouseY, mouseX, mouseY, shape_height, shape_color);
}

function mouseReleased() {
  shapes.push(new_shape);
  new_shape = undefined;
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') shape_color = color(255, 0, 0);
  if (key == '2') shape_color = color(0, 255, 0);
  if (key == '3') shape_color = color(0, 0, 255);
  if (key == '4') shape_color = color(0);

  if (keyCode == UP_ARROW) shape_height += density;
  if (keyCode == DOWN_ARROW) shape_height -= density;
}
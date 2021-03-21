'use strict';

var shapes = [];
var density = 2.5;
var shape_height = 64;
var shape_color;

var smoothness = 0;

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
    new_shape.h = shape_height;
    new_shape.c = shape_color;
    new_shape.add_pos(mouseX, mouseY);
    new_shape.draw();
  }
}

class Shape {
  constructor(h, c) {
    this.shape_path = [];
    this.h = h;
    this.c = c;
  }

  add_pos(x, y) {
    let new_pos = createVector(x, y);
    let last_pos = this.get_last_pos();
    if (
      this.shape_path.length == 0 ||
      last_pos && p5.Vector.dist(new_pos, last_pos) > smoothness
    ) {
      this.shape_path.push(new_pos);
    }
  }

  get_last_pos() {
    return this.shape_path[this.shape_path.length - 1];
  }

  draw() {
    stroke(this.c);
    for (let i = -this.h / 2; i < this.h / 2; i += density) {
      beginShape();
      this.shape_path.forEach(function (pos, index, shape_path) {
        let previous_pos = shape_path[index - 1];
        if (previous_pos) {
          let a = atan2(previous_pos.y - pos.y, previous_pos.x - pos.x);
          let offset_pos = p5.Vector.fromAngle(a);
          offset_pos.add(0, i);
          offset_pos.rotate(a);
          offset_pos.add(pos);
          curveVertex(offset_pos.x, offset_pos.y);
        }
      });
      endShape();
    }
  }
}

function mousePressed() {
  new_shape = new Shape(shape_height, shape_color);
  new_shape.add_pos(mouseX, mouseY);
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

  if (key == ' ') {
    shapes = [];
    redraw();
  }

  if (keyCode == RIGHT_ARROW) smoothness += density;
  if (keyCode == LEFT_ARROW) smoothness -= density;

  if (keyCode == UP_ARROW) shape_height += density;
  if (keyCode == DOWN_ARROW) shape_height -= density;
}
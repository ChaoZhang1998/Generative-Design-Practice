'use strict';

let stroke_color;

function setup() {
  createCanvas(800, 800);
  background(255);
  strokeCap(SQUARE);
  strokeWeight(2);
  noFill();

  stroke_color = color(0, 10)
}

function draw() {
  if (mouseIsPressed && mouseButton == LEFT) {
    push()
    translate(width / 2, height / 2);

    let radius = mouseX - width / 2;
    let number = int(map(mouseY + 100, 0, height, 2, 10));
    let angle = 2 * PI / number;

    stroke(stroke_color);

    beginShape();
    for (let i = 0; i <= number; i++) {
      let x = radius * cos(i * angle);
      let y = radius * sin(i * angle);
      vertex(x, y);
    }
    endShape();

    pop();
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode == DELETE || keyCode == BACKSPACE) background(255);

  if (key == '1') stroke_color = color(0, 10);
  if (key == '2') stroke_color = color(192, 100, 64, 10);
  if (key == '3') stroke_color = color(52, 100, 71, 10);
}
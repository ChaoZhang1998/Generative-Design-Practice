'use strict';

function setup() {
  createCanvas(800, 800);
  background(255);
  strokeCap(SQUARE);
  strokeWeight(1);
  noFill();
}

function draw() {
  if (mouseIsPressed && mouseButton == LEFT) {
    push()
    translate(width / 2, height / 2);

    let radius = mouseX - width / 2;
    let number = int(map(mouseY + 100, 0, height, 2, 10));
    let angle = 2 * PI / number;

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
}
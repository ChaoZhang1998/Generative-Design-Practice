function setup() {
  // put setup code here
  createCanvas(720, 720);

  noCursor();

  colorMode(HSB, 360, 100, 100);
  rectMode(CENTER);

  noStroke();
}

function draw() {
  // put drawing code here
  background(mouseY / 2, 100, 100);

  fill(360 - mouseY / 2, 100, 100); // color hue changes with the mouse moving vertically
  rect(width / 2, height / 2, mouseX, mouseY); // rect size changes with the mouse moving
}
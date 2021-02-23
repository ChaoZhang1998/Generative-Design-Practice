'use strict';

var box_holder;
var cols = 40;
var rows = 40;
var boxes;
var box_holder;
var slider;
var img, img1, img2, img3;

// preload the images to be used for the checkboxes
function preload() {
  img1 = loadImage('data/shapes.png');
  img2 = loadImage('data/draw.png');
  img3 = loadImage('data/toner.png');
}

function setup() {
  // the html dom elements are not rendered on canvas
  noCanvas();

  pixelDensity(1);
  box_holder = createDiv('');
  box_holder.id('mirror');

  boxes = [];

  // set the current img
  img = img1;
  img.resize(cols, rows);
  img.loadPixels();

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let box = createCheckbox();
      box.style('display', 'inline');
      box.parent('mirror');
      boxes.push(box);
    }
    let linebreak = createSpan('<br/>');
    linebreak.parent('mirror');
  }

  // add a slider to adjust the pixel threshold
  slider = createSlider(0, 255, 16);
}

function draw() {
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let c = color(img.get(x, y));
      let bright = (red(c) + green(c) + blue(x)) / 3;

      // get the threshold from the slider
      let threshold = slider.value();

      let check_index = x + y * cols;

      if (bright > threshold) {
        boxes[check_index].checked(false);
      } else {
        boxes[check_index].checked(true);
      }
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') img = img1;
  if (key == '2') img = img2;
  if (key == '3') img = img3;

  img.resize(cols, rows);
  img.loadPixels();
}
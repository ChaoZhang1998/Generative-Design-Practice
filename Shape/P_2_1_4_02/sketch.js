'use strict';

var video;
var slider;
var cols = 40;
var rows = 40;
var boxes;
var box_holder;

function preload() {
  video = createVideo('data/ball.mov');
}

function setup() {
  // the html dom elements are not rendered on canvas
  noCanvas();

  box_holder = createDiv('');
  box_holder.id('mirror');

  boxes = [];

  video.size(cols, rows);
  // slider threshold at 200
  slider = createSlider(0, 255, 200);

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
  // play the video in a loop
  video.loop();
}

function draw() {
  video.loadPixels();
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      // get the video pixel location
      let index = (x + (y * video.height)) * 4;
      let r = video.pixels[index];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];

      let bright = (r + b + g) / 3;

      let threshold = slider.value;
        
      let check_index = x + y * cols;

      if (bright > threshold - 1) {
        boxes[check_index].checked(false);
      } else {
        boxes[check_index].checked(true)
      }
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
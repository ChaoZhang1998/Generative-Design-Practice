'use strict';

var sliders;

function setup() {
  sliders = [];
  createCanvas(windowWidth, windowHeight);

  // init canvas with slider rose to the middle
  sliders.push(new SliderRose(width / 2, height / 2));
}

function draw() {
  background(101, 179, 109);

  // create slider animations
  sliders.forEach(function (d) {
    d.update();
  });
}

function SliderRose(_x, _y) {
  this.x1 = _x;
  this.y1 = _y;

  // collect the sliders in an array
  let sliders = [];
  let sin_angle = 0;

  // create a counter to index the sliders
  let counter = 0;

  // set the slider width
  let rose_radius = random(20, 100);

  // define how many degrees to skip from 360
  let skip = 20;

  // create sliders around a circle
  for (let i = 0; i < 360; i += skip) {
    let slider_angle = radians(i);
    let x2 = cos(slider_angle) * rose_radius;
    let y2 = sin(slider_angle) * rose_radius;

    // create the slider, position, and totate
    sliders[counter] = createSlider(0, 255, 50);
    sliders[counter].position(this.x1 + x2, this.y1 + y2);
    sliders[counter].style('width', rose_radius + 'px');
    sliders[counter].style('transform', 'rotate(' + i + 'deg)');

    counter++
  }

  // for each loop through the draw function
  // update the sliders according to a sine wave
  this.update = function () {
    let offset = 0;
    for (let i = 0; i < sliders.length; i++) {
      // map the value along the sine wave to the slider value
      let x = map(sin(sin_angle + offset), -1, 1, 0, 255);
      sliders[i].value(x);
      offset += 0.050;
    }

    sin_angle += 0.1;
  };
}

// add a new slider rose when mouse pressed
function mousePressed() {
  sliders.push(new SliderRose(mouseX, mouseY));
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
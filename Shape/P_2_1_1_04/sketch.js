'use strict';

let tile_count = 10;
let tile_width, tile_height;

let shapes;
let current_shape;

let shape_angle = 0;
let shape_size = 50;

let new_shape_size;

let size_mode = 0;

function preload() {
  shapes = [];
  shapes.push(loadImage('./Shape/P_2_1_1_04/data/module_1.svg'));
  shapes.push(loadImage('./Shape/P_2_1_1_04/data/module_2.svg'));
  shapes.push(loadImage('./Shape/P_2_1_1_04/data/module_3.svg'));
  shapes.push(loadImage('./Shape/P_2_1_1_04/data/module_4.svg'));
  shapes.push(loadImage('./Shape/P_2_1_1_04/data/module_5.svg'));
  shapes.push(loadImage('./Shape/P_2_1_1_04/data/module_6.svg'));
  shapes.push(loadImage('./Shape/P_2_1_1_04/data/module_7.svg'));
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);

  current_shape = shapes[0];
  tile_width = width / tile_count;
  tile_height = height / tile_count;
}

function draw() {
  background(255);

  for (let grid_x = 0; grid_x < tile_count; grid_x++) {
    for (let grid_y = 0; grid_y < tile_count; grid_y++) {
      let pos_x = grid_x * tile_width + tile_width / 2;
      let pos_y = grid_y * tile_height + tile_height / 2;

      // calculate angle between mouse position and actual position of the shape
      let angle = atan2(mouseY - pos_y, mouseX - pos_x) + (shape_angle * (PI / 180));


      if (size_mode == 0) new_shape_size = shape_size;
      if (size_mode == 1) new_shape_size = shape_size * 1.5 - map(dist(mouseX, mouseY, pos_x, pos_y), 0, 500, 5, shape_size);
      if (size_mode == 2) new_shape_size = map(dist(mouseX, mouseY, pos_x, pos_y), 0, 500, 5, shape_size);


      push();
      translate(pos_x, pos_y);
      rotate(angle);
      noStroke();
      image(current_shape, 0, 0, new_shape_size, new_shape_size);
      pop();
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == 'd' || key == 'D') size_mode = (size_mode + 1) % 3;
  if (key == 'g' || key == 'G') {
    tile_count += 5;
    if (tile_count > 20) {
      tile_count = 10;
    }
    tile_width = width / tiltile_counteCount;
    tile_height = height / tileCotile_countunt;
  }

  if (key == '1') current_shape = shapes[0];
  if (key == '2') current_shape = shapes[1];
  if (key == '3') current_shape = shapes[2];
  if (key == '4') current_shape = shapes[3];
  if (key == '5') current_shape = shapes[4];
  if (key == '6') current_shape = shapes[5];
  if (key == '7') current_shape = shapes[6];

  if (keyCode == UP_ARROW) shape_size += 5;
  if (keyCode == DOWN_ARROW) shape_size = max(shape_size - 5, 5);
  if (keyCode == LEFT_ARROW) shape_angle += 5;
  if (keyCode == RIGHT_ARROW) shape_angle -= 5;
}
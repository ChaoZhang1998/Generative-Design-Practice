'use strict';

var draw_mode = 1;

var count = 0;
var tile_count_x = 6;
var tile_count_y = 6;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noFill();
}

function draw() {
  background(255);
  
  count = mouseX / 10 + 10;

  let para = mouseY / height;
  let tile_width = width / tile_count_x;
  let tile_height = height / tile_count_y;

  for (let grid_y = 0; grid_y < tile_count_y; grid_y++) {
    for (let grid_x = 0; grid_x < tile_count_x; grid_x++) {
      let pos_x = tile_width * grid_x + tile_width / 2;
      let pos_y = tile_height * grid_y + tile_height / 2;

      push();
      translate(pos_x, pos_y);

      switch (draw_mode) {
        case 1:
          stroke(0);
          for (let i = 0; i < count; i++) {
            rect(0, 0, tile_width, tile_height);
            scale(1 - 3 / count);
            rotate(para * 0.1);
          }
          break;
        case 2:
          noStroke();
          for (let i = 0; i < count; i++) {
            let gradient = lerpColor(color(0, 0), color(166, 141, 5), i / count);
            fill(gradient, i / count * 200);
            rotate(QUARTER_PI);
            rect(0, 0, tile_width, tile_height);
            scale(1 - 3 / count);
            rotate(para * 1.5);
          }
          break;
        case 3:  
          noStroke();
          for (let i = 0; i < count; i++) {
            let gradient = lerpColor(color(0, 130, 164), color(255), i / count);
            fill(gradient, 170);

            push();
            translate(4 * i, 0);
            ellipse(0, 0, tile_width / 4, tile_height / 4);
            pop();

            push();
            translate(-4 * i, 0);
            ellipse(0, 0, tile_width / 4, tile_height / 4);
            pop();

            scale(1 - 1.5 / count);
            rotate(para * 1.5);
          }
          break;
      }

      pop();
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') draw_mode = 1;
  if (key == '2') draw_mode = 2;
  if (key == '3') draw_mode = 3;

  if (keyCode == DOWN_ARROW) tile_count_y = max(tile_count_y - 1, 1);
  if (keyCode == UP_ARROW) tile_count_y += 1;
  if (keyCode == LEFT_ARROW) tile_count_x = max(tile_count_x - 1, 1);
  if (keyCode == RIGHT_ARROW) tile_count_x += 1;
}
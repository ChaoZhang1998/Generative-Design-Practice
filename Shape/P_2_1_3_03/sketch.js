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

  count = mouseX / 20 + 5;
  let para = min(height, mouseY) / height - 0.5;

  let tile_width = width / tile_count_x;
  let tile_height = height / tile_count_y;

  for (let grid_y = 0; grid_y <= tile_count_y; grid_y++) {
    for (let grid_x = 0; grid_x <= tile_count_x; grid_x++) {
      let pos_x = tile_width * grid_x + tile_width / 2;
      let pos_y = tile_height * grid_y + tile_height / 2;

      push();
      translate(pos_x, pos_y);

      switch (draw_mode) {
        case 1:
          translate(-tile_width / 2, -tile_height / 2);
          for (var i = 0; i < count; i++) {
            line(0, (para + 0.5) * tile_height, tile_width, i * tile_height / count);
            line(0, i * tile_height / count, tile_width, tile_height - (para + 0.5) * tile_height);
          }
          break;
        case 2:
          for (var i = 0; i <= count; i++) {
            line(para * tile_width, para * tile_height, tile_width / 2, (i / count - 0.5) * tile_height);
            line(para * tile_width, para * tile_height, -tile_width / 2, (i / count - 0.5) * tile_height);
            line(para * tile_width, para * tile_height, (i / count - 0.5) * tile_width, tile_height / 2);
            line(para * tile_width, para * tile_height, (i / count - 0.5) * tile_width, -tile_height / 2);
          }
          break;
        case 3:
          for (var i = 0; i <= count; i++) {
            line(0, para * tile_height, tile_width / 2, (i / count - 0.5) * tile_height);
            line(0, para * tile_height, -tile_width / 2, (i / count - 0.5) * tile_height);
            line(0, para * tile_height, (i / count - 0.5) * tile_width, tile_height / 2);
            line(0, para * tile_height, (i / count - 0.5) * tile_width, -tile_height / 2);
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
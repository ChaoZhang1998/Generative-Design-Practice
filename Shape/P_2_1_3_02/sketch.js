'use strict';

var background_color = 0;
var count = 10;

var line_weight = 0;
var line_color = 0;

var draw_mode = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(background_color);

  let tile_count_x = mouseX / 30 + 1;
  let tile_count_y = mouseY / 30 + 1;
  let tile_width = width / tile_count_x;
  let tile_height = height / tile_count_y;

  for (let grid_y = 0; grid_y <= tile_count_y; grid_y++) {
    for (let grid_x = 0; grid_x <= tile_count_x; grid_x++) {
      let pos_x = tile_width * grid_x;
      let pos_y = tile_height * grid_y;

      let x1 = tile_width / 2;
      let y1 = tile_height / 2;
      let x2 = 0;
      let y2 = 0;

      push();
      translate(pos_x, pos_y);

      for (let side = 0; side < 4; side++) {
        for (let i = 0; i < count; i++) {
          // move end point around the four sides of the tile
          switch (side) {
            case 0:
              x2 += tile_width / count;
              y2 = 0;
              break;
            case 1:
              x2 = tile_width;
              y2 += tile_height / count;
              break;
            case 2:
              x2 -= tile_width / count;
              y2 = tile_height;
              break;
            case 3:
              x2 = 0;
              y2 -= tile_height / count;
              break;
          }

          // adjust weight and color of the line
          if (i < count / 2) {
            line_weight += 1;
            line_color += 60;
          } else {
            line_weight -= 1;
            line_color -= 60;
          }

          switch (draw_mode) {
            case 1:
              background_color = 255;
              stroke(0);
              break;
            case 2:
              background_color = 255;
              stroke(0);
              strokeWeight(line_weight);
              break;
            case 3:
              background_color = 0;
              stroke(line_color);
              strokeWeight(mouseX / 100);
              break;
          }

          // draw the line
          line(x1, y1, x2, y2);
        }
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
}
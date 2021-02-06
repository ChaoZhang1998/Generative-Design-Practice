PFont font;
color colors[] = new color[] {color(65, 105, 185), color(245, 95, 80), color(15, 233, 118)};

String textTyped = "NATURAL";
int drawMode = 2;
int fontSize = 210;
int padding = 10;
int nOff = 0;
int pointDensity = 8;

PGraphics textImg;

void preload() {
  font = createFont("FiraSansCompressed-Bold.otf", fontSize);
}

void setup() {
  size(1100, 400);
  
  frameRate(25);
  pixelDensity(1);
  rectMode(CENTER);
   
  // make window resizable
  surface.setResizable(true); 
  smooth();
  
  setupText();
}

void setupText() {
  PFont font = createFont("FiraSansCompressed-Bold.otf", fontSize);
  
  // create an offscreen graphics object to draw the text into
  textImg = createGraphics(width, height);
  //textImg.pixelDensity(1);
  textImg.beginDraw();
  textImg.background(255);
  textImg.fill(0);
  textImg.textFont(font);
  textImg.textSize(fontSize);
  textImg.text(textTyped, 100, fontSize + 50);
  textImg.endDraw();
}

void draw() {
  background(255);
  
  nOff++;
  
  textImg.beginDraw();
  
  textImg.loadPixels();
  println(textImg.pixels.length);
  for (int x = 0; x < textImg.width; x += pointDensity) {
    for (int y = 0; y < textImg.height; y += pointDensity) {
      // Calculate the index for the pixels array from x and y
      int index = x + y * textImg.width;
      // Get the red value from image
      float r = red(textImg.pixels[index]);

      if (r < 128) {

        if (drawMode == 1){
          strokeWeight(1);

          float noiseFac = map(mouseX, 0, width, 0, 1);
          float lengthFac = map(mouseY, 0, height, 0.01, 1);

          float num = noise((x + nOff) * noiseFac, y * noiseFac);
          if (num < 0.6) {
            stroke(colors[0]);
          } else if (num < 0.7) {
            stroke(colors[1]);
          } else {
            stroke(colors[2]);
          }

          push();
          translate(x, y);
          rotate(radians(frameCount));
          line(0, 0, fontSize * lengthFac, 0);
          pop();
        }

        if (drawMode == 2){
          stroke(0, 0, 0);
          strokeWeight(1);
          noStroke();
          push();
          translate(x, y);

          float num = noise((x + nOff) / 10, y / 10);

          if (num < 0.6) {
            fill(colors[0]);
          } else if (num < 0.7) {
            fill(colors[1]);
          } else {
            fill(colors[2]);
          }

          float w = noise((x - nOff) / 10, (y + nOff * 0.1) / 10) * 20;
          float h = noise((x - nOff) / 10, (y + nOff * 0.1) / 10) * 10;
          ellipse(0, 0, w, h); // rect() is cool too
          pop();
        }

        if (drawMode == 3){
          stroke(0, 0, 0);
          strokeWeight(1);
          noStroke();

          float num = random(1);

          if (num < 0.6) {
            fill(colors[0]);
          } else if (num < 0.7) {
            fill(colors[1]);
          } else {
            fill(colors[2]);
          }

          push();
          beginShape();
          for (int i = 0; i < 3; i++){
            float ox = (noise((i * 1000 + x - nOff) / 30, (i * 3000 + y + nOff) / 30) - 0.5) * pointDensity * 6;
            float oy = (noise((i * 2000 + x - nOff) / 30, (i * 4000 + y + nOff) / 30) - 0.5) * pointDensity * 6;
            vertex(x + ox, y + oy);
          }
          endShape(CLOSE);
          pop();
        }

        if (drawMode == 4){
          stroke(colors[0]);
          strokeWeight(3);

          point(x - 10, y - 10);
          point(x, y);
          point(x + 10, y + 10);

          for (int i = 0; i < 5; i++){
            if (i == 1) {
              stroke(colors[1]);
            } else if (i == 3) {
              stroke(colors[2]);
            }

            if (i % 2 == 0){
              float ox = noise((10000 + i * 100 + x - nOff) / 10) * 10;
              float oy = noise((20000 + i * 100 + x - nOff) / 10) * 10;
              point(x + ox, y + oy);
            } else {
              float ox = noise((30000 + i * 100 + x - nOff) / 10) * 10;
              float oy = noise((40000 + i * 100 + x - nOff) / 10) * 10;
              point(x - ox, y - oy);
            }
          }
        }

      }
    }
  }
  
  textImg.endDraw();
}

// key controls
void keyPressed() {
  if (keyCode == LEFT) {
    drawMode--;
    if (drawMode < 1) drawMode = 4;
  }
  if (keyCode == RIGHT) {
    drawMode++;
    if (drawMode > 4) drawMode = 1;
  }
  if (keyCode == DOWN) {
    pointDensity--;
    if (pointDensity < 4) pointDensity = 4;
  }
  if (keyCode == UP) {
    pointDensity++;
  }
}

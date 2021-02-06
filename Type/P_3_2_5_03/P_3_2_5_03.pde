import geomerative.*;
import processing.pdf.*;
import java.util.Calendar;

RFont font;
int fontSize = 120;
// declare your animatedText variable
animatedType myAnimatedText;

void setup() {
  size(800, 600);
  
  //noCursor();
  imageMode(CENTER);
  rectMode(CENTER);
   
  // make window resizable
  surface.setResizable(true); 
  smooth();

  // allways initialize the library in setup
  RG.init(this);
  
  // ------ set style and segment resolution  ------
  RCommand.setSegmentLength(2);
  RCommand.setSegmentator(RCommand.UNIFORMLENGTH);
  
  // initialize the animatedType Object
  myAnimatedText = new animatedType();

  // load a truetype font
  font = new RFont("data/FreeSans.ttf", fontSize, RFont.LEFT);
}

void draw() {
  noStroke();
  fill(255, 255, 255);
  rect(width/2, height/2, width, height);
  //background(255, 255, 255, 0.01);

  push();
  
  // margin border
  translate(20,150);
  fill(0);

  myAnimatedText.getLineCount();
  myAnimatedText.getPaths();
  myAnimatedText.getIndividualPaths();
  myAnimatedText.getCoordinates();

  // draw methods
  if (myAnimatedText.drawMode == 1){
    myAnimatedText.animatedPoints("ellipse");
  }
  if (myAnimatedText.drawMode == 2){
    myAnimatedText.animatedPoints("rect");
  }
  if (myAnimatedText.drawMode == 3){
    myAnimatedText.lines2mouse();
  }
  if (myAnimatedText.drawMode == 4){
    myAnimatedText.randomRadialLines();
  }
  if (myAnimatedText.drawMode == 5){
    myAnimatedText.radialLines();
  }
  if (myAnimatedText.drawMode == 6){
    myAnimatedText.orbitingPoints("points");
  }
  if (myAnimatedText.drawMode == 7){
    myAnimatedText.outwardLines();
  }
  
  pop();
}

class animatedType {
  //ArrayList<HashMap> textTyped = new ArrayList<HashMap>();
  pathData paths;
  
  ArrayList<individualPathData> individualPaths = new ArrayList<individualPathData>();
  ArrayList ranges = new ArrayList();
  ArrayList<HashMap> coordinates = new ArrayList<HashMap>();
  
  String textTyped = "TYPE!";
  
  int counter = 0;
  int lineCount = 0;
  int pointDensity = 2;
  int startX = 0;
  color colors[] = new color[] {color(65, 105, 185), color(245, 95, 80), color(15, 233, 118), 
                                color(233, 15, 130), color(118, 15, 233), color(15, 233, 118)};
  int angle = 0;
  
  int drawMode = 7;
  int style = 1;
  
  animatedType() {

  }
  
  /*
  Data Handling Methods
  */
  
  // set the lineCount to the number of "lines" or text object in the textTyped Array
  void getLineCount() {
    lineCount = 1;
  }
  
  // get the path objects for each line typed
  void getPaths() {
    // go though each of the text objects
    // get the points on font outline
    RGroup grp;
    grp = font.toGroup(textTyped);
    grp = grp.toPolygonGroup();
    RPoint[] pnts = grp.getPoints();
    
    // structure the relevant path data
    pathData myPathData = new pathData(pnts, 1, pnts.length, floor(pnts.length / textTyped.length()));
    
    // get the start point of each letter
    for (int i = 0; i < myPathData.len - 1; i += myPathData.breaks) {
      myPathData.addRange(floor(i));
    }

    paths = myPathData;
  } 
  
  RRectangle getBBox(RPoint[] pnts) {
    float xmin =  Float.MAX_VALUE ;
    float ymin =  Float.MAX_VALUE ;
    float xmax = -Float.MAX_VALUE ;
    float ymax = -Float.MAX_VALUE ;

    if (pnts == null) {
      return new RRectangle();
    }

    for(int i = 0; i < pnts.length; i++) {
      float x = pnts[i].x;
      float y = pnts[i].y;
      if(x < xmin) xmin = x;
      if(x > xmax) xmax = x;
      if(y < ymin) ymin = y;
      if(y > ymax) ymax = y;
    }

    return new RRectangle(xmin, ymin, (xmax-xmin), (ymax-ymin));
  }
  
  void getIndividualPaths() {
    individualPaths.clear();

    // go though each of the text objects
    if (textTyped.length() > 0) {
      char[] textSplited = textTyped.toCharArray();
      for (int i = 0; i < textSplited.length; i++) {
        // go though each of the text objects
        // get the points on font outline
        RPolygon grp;
        grp = font.toPolygon(textSplited[i]);
        RPoint[] pnts = grp.getPoints();
        
        // structure the relevant path data
        individualPathData myindividualPathData = new individualPathData(pnts, 1, pnts.length, getBBox(pnts), 0, 0);
        
        // console.log(pathData.bbox.x1)
        myindividualPathData.distX = ceil(dist(myindividualPathData.bbox.bottomRight.x, 0, myindividualPathData.bbox.topLeft.x, 0));

        individualPaths.add(myindividualPathData);
      }
    }
    
    // set the startX to zero
    startX = 0;
    for (int i = 0; i < individualPaths.size() - 1; i++) {
      // if the linenumbers are the same
      if (individualPaths.get(i).lineNumber == individualPaths.get(i + 1).lineNumber) {
        // then add to the startX and assign it to the individualpath startX
        individualPaths.get(i).startX = startX;
        startX += individualPaths.get(i).distX + 15;
      } else {
        individualPaths.get(i).startX = startX;
        startX = 0;
      }
      // when reaching the end
      if (i == individualPaths.size() - 2) {
        individualPaths.get(i + 1).startX = startX;
      }
    }
  }
  
  // get all the coordinates
  void getCoordinates() {
    // clear the coordinates each loop
    coordinates.clear();

    // for each of the letters
    for (int i = 0; i < paths.data.length; i++) {
      int yOffset = paths.lineNumber * fontSize;
      HashMap<String, Float> coordinate = new HashMap<String, Float>();
      coordinate.put("x", paths.data[i].x);
      coordinate.put("y", paths.data[i].y + yOffset);
      coordinates.add(coordinate);
    }
  }
  
  /*
  keyboard interaction Methods
  */

  // remove letters
  void removeLetters() {
    // remove letters from each object
    if (textTyped.length() > 0) {
      textTyped = textTyped.substring(0, max(0, textTyped.length() - 1));
    } else {
      println("nothing left");
    }
  }
  
  /*
  Rendering Methods
  */

  // show all the points with random color
  void randomStrokes() {
    for (int i = 0; i < coordinates.size(); i++) {
      stroke(random(255), random(255), random(255));
      float posX = (float)coordinates.get(i).get("x");
      float posY = (float)coordinates.get(i).get("y");
      ellipse(posX, posY, 5.0, 5.0);
    }
  }

  // follow the mouse with extruded lines
  void lines2mouse() {

    stroke(colors[0]);
    for (int i = 0; i < coordinates.size(); i++) {
      strokeWeight(1);
      float posX = (float)coordinates.get(i).get("x");
      float posY = (float)coordinates.get(i).get("y");
      line(posX + map(mouseX, 0, width, -100, 100), posY + map(mouseY, 0, height, -100, 100), posX, posY);
    }
  }

  // animate the points
  void animatedPoints(String _shape) {
    fill(colors[paths.lineNumber]);
    stroke(colors[paths.lineNumber]);
    
    for (int i = 0; i < paths.ranges.size(); i++) {
      RPoint cmd;
      int index = counter + paths.ranges.get(i);
      if (index < paths.data.length) {
        cmd = paths.data[counter + paths.ranges.get(i)];
      } else {
        cmd = null;
      }

      if (cmd != null) {
        if (counter < paths.breaks) {
          int yOffset = paths.lineNumber * fontSize;
          if (_shape == "ellipse") {
            ellipse(cmd.x, cmd.y + yOffset, fontSize * 0.10, fontSize * 0.10);
          } else if (_shape == "rect") {
            rect(cmd.x, cmd.y + yOffset, fontSize * 0.10, fontSize * 0.10);
          }
          
          counter++;
        } else {
          counter = 0;
        }
      }
    }
  }

  // radial lines
  void randomRadialLines() {

    stroke(colors[0]);
    for (int i = 0; i < coordinates.size(); i++) {
      strokeWeight(1);
      float posX = (float)coordinates.get(i).get("x");
      float posY = (float)coordinates.get(i).get("y");

      for (int j = 0; j < 360; j += 60) {
        float angle = radians(i);
        float radiusDistanceX = map(mouseX, 0, width, 0, random(20));
        float radiusDistanceY = map(mouseY, 0, width, 0, random(20));

        float ptX = cos(angle) * radiusDistanceX + posX;
        float ptY = sin(angle) * radiusDistanceY + posY;
        line(ptX, ptY, posX, posY);
      }
    }
  }
  
 // radial lines
  void radialLines() {

    stroke(colors[0]);
    for (int i = 0; i < coordinates.size(); i++) {
      strokeWeight(1);
      float posX = (float)coordinates.get(i).get("x");
      float posY = (float)coordinates.get(i).get("y");

      for (int j = 0; j < 360; j += 60) {
        float angle = radians(j);
        float radiusDistanceX = map(mouseX, 0, width, 0, random(20));
        float radiusDistanceY = map(mouseY, 0, width, 0, random(20));

        float ptX = cos(angle) * radiusDistanceX + posX;
        float ptY = sin(angle) * radiusDistanceY + posY;
        line(ptX, ptY, posX, posY);
      }
    }
  }
  
  // orbiting points
  void orbitingPoints(String _type) {

    stroke(colors[0]);
    float rectSize = fontSize * 0.05;
    float shiftX1 = mouseX / 100 * random(-1, 1);
    float shiftY1 = mouseY / 100 * random(-1, 1);
    float shiftX2 = mouseX / 100 * random(-1, 1);
    float shiftY2 = mouseY / 100 * random(-1, 1);
    //float shiftX3 = mouseX / 100 * random(-1, 1);
    //float shiftY3 = mouseY / 100 * random(-1, 1);
    //float shiftX4 = mouseX / 100 * random(-1, 1);
    //float shiftY4 = mouseY / 100 * random(-1, 1);
    
    for (int i = 0; i < coordinates.size(); i++) {
      strokeWeight(1);
      float posX = (float)coordinates.get(i).get("x");
      float posY = (float)coordinates.get(i).get("y");
    
      float angle;
      if (i % 2 == 0) {
        angle = radians(frameCount % 360);
      } else {
        angle = radians(-frameCount % 360);
      }
    
      if (_type == "points") {
        push();
        translate(posX, posY);
        rotate(angle);
        point(0 + shiftX1, 0 + shiftY1);
        point(0 + rectSize + shiftX2, 0 + shiftY2);
        pop();
      }
    }
  }
  
  // make a triangle blob from the points
  void triangleBlob() {
    fill(colors[1]);
    stroke(colors[1]);

    beginShape(TRIANGLE_STRIP);
    
    for (int i = 0; i < coordinates.size(); i++) {
      strokeWeight(1);
      float posX = (float)coordinates.get(i).get("x");
      float posY = (float)coordinates.get(i).get("y");
      vertex(posX, posY);
    }

    endShape();
  }
  
  // outward lines following mouse
  void outwardLines() {
    for (int i = 0; i < individualPaths.size(); i++) {
      individualPathData path = individualPaths.get(i);
      stroke(colors[path.lineNumber]);
      strokeWeight(0.5);
      fill(colors[path.lineNumber]);
      float yOffset = path.lineNumber * fontSize;
      float xOffset = path.startX;
      
      push();
      translate(xOffset, yOffset);
      float cX = (path.bbox.bottomRight.x + path.bbox.topLeft.x) / 2 + map(mouseX, 0, width, -50, 50);
      float cY = (path.bbox.bottomRight.y + path.bbox.topLeft.y) / 2 + map(mouseY, 0, height, -50, 50);
      // add all those vertices to the shape
      for (int j = 0; j < path.data.length; j++) {
        line(cX, cY, path.data[j].x, path.data[j].y);
      }
      pop();
    }
  }
}

class pathData {
  RPoint[] data;
  int lineNumber;
  int len;
  int breaks;
  ArrayList<Integer> ranges = new ArrayList<Integer>();
  
  pathData (RPoint[] _data, int _lineNumber, int _len, int _breaks) {
    data = _data;
    lineNumber = _lineNumber;
    len = _len;
    breaks = _breaks;
  }
  
  void addRange(int i) {
    ranges.add(i);
  }
}

class individualPathData {
  RPoint[] data;
  int lineNumber;
  int len;
  RRectangle bbox;
  int distX;
  int startX;
  
  individualPathData (RPoint[] _data, int _lineNumber, int _len, RRectangle _bbox, int _distX, int _startX) {
    data = _data;
    lineNumber = _lineNumber;
    len = _len;
    bbox = _bbox;
    distX = _distX;
    startX = _startX;
  }
}

// key controls
void keyPressed() {
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    myAnimatedText.removeLetters();
  }
  if (keyCode == LEFT) {
    myAnimatedText.drawMode--;
    if (myAnimatedText.drawMode < 1) myAnimatedText.drawMode = 7;
  }
  if (keyCode == RIGHT) {
    myAnimatedText.drawMode++;
    if (myAnimatedText.drawMode > 7) myAnimatedText.drawMode = 1;
  }
}

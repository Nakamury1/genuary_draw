// ETOILES REGULIERES
// GENUARY PROMPT 29 = Grid-based graphic design.

let DESSIN = 7; // [7,8,9,10,11,12]

let NP = 480;
let PI_ = Math.PI;
let K = 5, H = 3;
let CX = NP / 2, CY = NP / 2;
let R = NP * 0.45;
let AD = PI_ / 2;

if (DESSIN == 8) {
  K = 7;
} else if (DESSIN == 9) {
  K = 20; H = 9;
} else if (DESSIN == 10) {
  K = 20; H = 7;
} else if (DESSIN == 11) {
  K = 51; H = 20;
} else if (DESSIN == 12) {
  K = 51; H = 25;
}

function setup() {
  let cnv = createCanvas(NP, NP);
  cnv.parent('sketch-root');
  background(255);
  drawGrid(20);

  stroke(0);
  strokeWeight(2);
  noFill();

  beginShape();
  for (let I = 0; I < K; I++) {
    let x = int(CX + R * cos(2 * I * H * PI_ / K + AD));
    let y = int(CY + R * sin(2 * I * H * PI_ / K + AD));
    vertex(x, y);

    // points visibles
    fill(255, 0, 0);
    noStroke();
    circle(x, y, 6);
    noFill();
    stroke(0);
  }
  endShape(CLOSE);
}

function drawGrid(step) {
  stroke(220);
  strokeWeight(1);
  for (let x = 0; x <= width; x += step) {
    line(x, 0, x, height);
  }
  for (let y = 0; y <= height; y += step) {
    line(0, y, width, y);
  }

  // axes
  stroke(180);
  line(CX, 0, CX, height);
  line(0, CY, width, CY);
}

// ETOILES REGULIERES
// GENUARY PROMPT 1 = Vertical or Horizontal lines only

// ----------------------------------------------------
let DESSIN = 7;
// ----------------------------------------------------
let NP=480, PI = Math.PI;
let K=5, H=3, CX=NP/2, CY=NP/2, R=NP*.45, AD=PI/2;

let points = [];

// ----------------------------------------------------
function setup() {
  createCanvas(NP, NP);
  background(255);

  drawGrid();
  computePoints();
  drawFilledStar();
}

// ----------------------------------------------------
function drawGrid() {
  stroke(0);
  let spacing = 8;

  for (let x = spacing; x < width; x += spacing) line(x, 0, x, height);
  for (let y = spacing; y < height; y += spacing) line(0, y, width, y);
}

// ----------------------------------------------------
function computePoints() {
  for (let i = 0; i < K; i++) {
    let x = int(CX + R * cos(2 * i * H * PI / K + AD));
    let y = int(CY + R * sin(2 * i * H * PI / K + AD));
    points.push({x, y});
  }
}

// ----------------------------------------------------
// 3) Tracé plein de l'étoile
function drawFilledStar() {
  fill(255);
  stroke(0);
  strokeWeight(1);

  beginShape();
  for (let p of points) vertex(p.x, p.y);
  endShape(CLOSE);
}

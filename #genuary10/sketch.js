// ETOILES REGULIERES
// GENUARY PROMPT 10 = Polar coordinates.

let DESSIN = 7; // [7,8,9,10,11,12]
let NP = 480, PI = Math.PI;
let K = 5, H = 3, CX = NP/2, CY = NP/2, R = NP * 0.45, AD = PI/2;

let points = [];
let index = 0;

function setup() {
  createCanvas(NP, NP);
  background(255);
  stroke(0);
  strokeWeight(2);
  noFill();

  // Calculer tous les points de l'étoile
  for (let I = 0; I < K; I++) {
    let X = CX + R * cos(2 * I * H * PI / K + AD);
    let Y = CY + R * sin(2 * I * H * PI / K + AD);
    points.push({x: X, y: Y});
  }
}

function draw() {
  if (index < points.length) {
    if (index == 0) {
      beginShape();
      vertex(points[index].x, points[index].y);
    } else {
      vertex(points[index].x, points[index].y);
    }
    index++;
  } else if (index == points.length) {
    endShape(CLOSE);
    noLoop(); // arrêter l'animation
  }
}

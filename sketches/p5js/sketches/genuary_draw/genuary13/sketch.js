// ETOILES REGULIERES
// GENUARY PROMPT 13 = Triangles and nothing else.

let DESSIN = 7; // [7,8,9,10,11,12]
let NP = 480, PI = Math.PI;
let K = 5, H = 3, CX = NP/2, CY = NP/2, R = NP * 0.45, AD = PI/2;

if (DESSIN == 8) K = 7;
else if (DESSIN == 9) K = 20, H = 9;
else if (DESSIN == 10) K = 20, H = 7;
else if (DESSIN == 11) K = 51, H = 20;
else if (DESSIN == 12) K = 51, H = 25;

let points = [];

function setup() {
  let cnv = createCanvas(NP, NP);
  cnv.parent('sketch-root');
  background(255);
  stroke(0);
  strokeWeight(1);
  fill(200, 150, 0, 150); // triangles semi-transparents

  // Calculer tous les points de l'étoile
  for (let I = 0; I < K; I++) {
    let X = CX + R * cos(2 * I * H * PI / K + AD);
    let Y = CY + R * sin(2 * I * H * PI / K + AD);
    points.push({x: X, y: Y});
  }

  // Dessiner des triangles
  for (let i = 0; i < K; i++) {
    let next = (i + 1) % K; // boucle circulaire
    triangle(CX, CY, points[i].x, points[i].y, points[next].x, points[next].y);
  }
}

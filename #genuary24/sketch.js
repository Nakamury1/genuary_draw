// ETOILES REGULIERES
// GENUARY PROMPT 24 = Geometric art - pick either a circle, rectangle, or triangle and use only that geometric shape.

let DESSIN = 7;

let NP = 480, PI = Math.PI;
let K = 5, H = 3, CX = NP/2, CY = NP/2, R = NP * 0.45, AD = PI/2;

if (DESSIN == 8)  
  K = 7;
else if (DESSIN == 9)  
  K = 20, H = 9;
else if (DESSIN == 10)  
  K = 20, H = 7;
else if (DESSIN == 11)  
  K = 51, H = 20;
else if (DESSIN == 12)  
  K = 51, H = 25;

let points = [];

function setup() {
  createCanvas(NP, NP);
  background(255);
  noStroke();
  fill(0);

  // Calculer les positions des points de l'étoile
  for (let I = 0; I < K; I++) {
    let X = CX + R * cos(2 * I * H * PI / K + AD);
    let Y = CY + R * sin(2 * I * H * PI / K + AD);
    points.push({x: X, y: Y});
  }

  for (let i = 0; i < K; i++) {
    let next = (i + 1) % K;
    drawDottedLine(points[i].x, points[i].y, points[next].x, points[next].y, 6, 4);
  }
  
  for (let p of points) {
    ellipse(p.x, p.y, 12, 12);
  }
}

// Fonction pour tracer une ligne pointillée de cercles
function drawDottedLine(x1, y1, x2, y2, d, spacing) {
  let distTotal = dist(x1, y1, x2, y2);
  let steps = int(distTotal / (d + spacing));
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let x = lerp(x1, x2, t);
    let y = lerp(y1, y2, t);
    ellipse(x, y, d, d);
  }
}

// ETOILES REGULIERES
// GENUARY PROMPT 12 = Boxes only.

let DESSIN = 7;
let NP = 480, PI = Math.PI;
let K = 5, H = 3, AD = PI/2;
let R = 120;

function setup() {
  createCanvas(NP, NP, WEBGL);
  stroke(0);
  noFill();
}

function draw() {
  background(255);
  orbitControl(); // Permet de tourner la vue avec la souris

  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);

  let faces = [
    {x: 0, y: 0, z: 50, rx: 0, ry: 0}, // face avant
    {x: 0, y: 0, z: -50, rx: 0, ry: PI}, // face arrière
    {x: -50, y: 0, z: 0, rx: 0, ry: -PI/2}, // gauche
    {x: 50, y: 0, z: 0, rx: 0, ry: PI/2},  // droite
    {x: 0, y: -50, z: 0, rx: PI/2, ry: 0}, // haut
    {x: 0, y: 50, z: 0, rx: -PI/2, ry: 0}  // bas
  ];

  for (let f of faces) {
    push();
    translate(f.x, f.y, f.z);
    rotateX(f.rx);
    rotateY(f.ry);
    drawStar3D(0, 0, R, K, H, AD);
    pop();
  }
}

// Fonction qui dessine une étoile 2D dans le plan XY
function drawStar3D(CX, CY, R, K, H, AD) {
  let points = [];
  for (let I = 0; I < K; I++) {
    let X = CX + R * cos(2 * I * H * PI / K + AD);
    let Y = CY + R * sin(2 * I * H * PI / K + AD);
    points.push(createVector(X, Y));
  }
  for (let i = 0; i < points.length; i++) {
    let p1 = points[i];
    let p2 = points[(i+1) % points.length];
    line(p1.x, p1.y, 0, p2.x, p2.y, 0);
  }
}

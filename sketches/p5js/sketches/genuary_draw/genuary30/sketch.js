// ETOILES REGULIERES
// GENUARY PROMPT 30 = Its not a bug, its a feature.
// 

let DESSIN = 7; // [7,8,9,10,11,12]

let NP = 480, PI = Math.PI;
let K = 5, H = 3, CX = NP / 2, CY = NP / 2, R = NP * 0.45, AD = PI / 2;
let couleurs = [];

if (DESSIN == 8) K = 7;
else if (DESSIN == 9) K = 20, H = 9;
else if (DESSIN == 10) K = 20, H = 7;
else if (DESSIN == 11) K = 51, H = 20;
else if (DESSIN == 12) K = 51, H = 25;

function setup() {
  let cnv = createCanvas(NP, NP);
  cnv.parent('sketch-root');
  frameRate(30);
  initialiserCouleurs();
}

function draw() {
  background(255);

  for (let i = 0; i < K; i++) {
    let x1 = CX;
    let y1 = CY;
    let x2 = CX + R * cos(2 * i * H * PI / K + AD);
    let y2 = CY + R * sin(2 * i * H * PI / K + AD);
    let x3 = CX + R * cos(2 * ((i + 1) % K) * H * PI / K + AD);
    let y3 = CY + R * sin(2 * ((i + 1) % K) * H * PI / K + AD);

    fill(couleurs[i]);
    stroke(0);
    strokeWeight(1);
    triangle(x1, y1, x2, y2, x3, y3);
  }
}

// change les couleurs toutes les 2 secondes
function initialiserCouleurs() {
  for (let i = 0; i < K; i++) {
    couleurs[i] = color(random(255), random(255), random(255));
  }
  setTimeout(initialiserCouleurs, 2000);
}

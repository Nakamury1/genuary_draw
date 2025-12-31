// ETOILES REGULIERES
// GENUARY PROMPT 8 = Draw one million of something.


let DESSIN = 7; // type d'étoile
let NP = 800; // canvas plus grand pour mieux voir
let PI = Math.PI;
let K = 5, H = 3, R = 10; // R petit pour 1 million d'étoiles
let stars = []; // positions des étoiles
let lightsOn = true; // état des lumières

if (DESSIN == 8) K = 7;
else if (DESSIN == 9) K = 20, H = 9;
else if (DESSIN == 10) K = 20, H = 7;
else if (DESSIN == 11) K = 51, H = 20;
else if (DESSIN == 12) K = 51, H = 25;

function setup() {
  createCanvas(NP, NP);
  angleMode(RADIANS);
  noLoop(); // on ne redessine pas tout le temps

  // générer un million de positions aléatoires
  for (let i = 0; i < 1000000; i++) {
    let x = random(width);
    let y = random(height);
    stars.push({x, y});
  }
}

function draw() {
  background(0);
  stroke(0);
  strokeWeight(1);

  for (let s of stars) {
    drawStar(s.x, s.y, R, K, H, PI/2);
  }
}

// fonction pour dessiner une étoile régulière
function drawStar(cx, cy, R, K, H, AD) {
  beginShape();
  for (let i = 0; i < K; i++) {
    let x = cx + R * cos(2 * i * H * PI / K + AD);
    let y = cy + R * sin(2 * i * H * PI / K + AD);
    vertex(x, y);
  }
  endShape(CLOSE);
}

// ETOILES REGULIERES
// GENUARY PROMPT 6 = Lights on/off. Make something that changes when you switch on or off the “digital” lights.

let DESSIN = 7; // [7,8,9,10,11,12]
let NP = 480, PI = Math.PI;
let K = 5, H = 3, CX = NP / 2, CY = NP / 2, R = NP * 0.45, AD = PI / 2;
let lightsOn = true; // état des lumières

if (DESSIN == 8) K = 7;
else if (DESSIN == 9) K = 20, H = 9;
else if (DESSIN == 10) K = 20, H = 7;
else if (DESSIN == 11) K = 51, H = 20;
else if (DESSIN == 12) K = 51, H = 25;

function setup() {
  createCanvas(NP, NP);
  angleMode(RADIANS);
}

function draw() {
  background(0); // fond noir pour simuler la nuit
  drawStar(CX, CY, R, K, H, AD);
}

function drawStar(cx, cy, R, K, H, AD) {
  stroke(lightsOn ? 'yellow' : 'white'); // couleur selon état
  strokeWeight(2);
  noFill();
  
  beginShape();
  for (let i = 0; i < K; i++) {
    let x = cx + R * cos(2 * i * H * PI / K + AD);
    let y = cy + R * sin(2 * i * H * PI / K + AD);
    vertex(x, y);
  }
  endShape(CLOSE);
}

// changer l'état des lumières avec un clic
function mousePressed() {
  lightsOn = !lightsOn;
}

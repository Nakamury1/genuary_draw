// ETOILES REGULIERES
// GENUARY PROMPT 2 = Twelve principles of animation

let NP = 480;
let CX, CY;
let PI = Math.PI;

let K = 5;      // nombre de branches
let H = 3;      // saut de branche
let R;          // rayon de base
let t = 0;

// ----------------------------------------------------
function setup() {
  createCanvas(NP, NP);
  CX = width / 2;
  CY = height / 2;
  R = NP * 0.42;
  noFill();
}

// ----------------------------------------------------
function draw() {
  background(245);

  translate(CX, CY);

  // 12) APPEAL
  rotate(sin(t * 0.3) * 0.25);

  // 6) EASE IN / OUT
  let ease = 0.5 - 0.5 * cos(t * 0.6);

  // 1) SQUASH & STRETCH
  let squash = 1 + 0.25 * sin(t * 2);
  let stretch = 1 - 0.25 * sin(t * 2);

  // 10) EXAGÉRATION
  let Ranim = R * (1 + 0.4 * sin(t));

  // 3) STAGING
  stroke(30);
  strokeWeight(3);

  beginShape();

  for (let I = 0; I < K; I++) {

    // 2) ANTICIPATION
    let anticipation = -0.3 * exp(-pow((t % TWO_PI) - 0.5, 2));

    // angle principal
    let baseAngle = 2 * I * H * PI / K;
    let angle = baseAngle + t * 0.8 * ease + anticipation;

    // 5) FOLLOW THROUGH (décalage temporel)
    let delay = I * 0.12;

    // 7) ARCS
    let arc = 0.3 * sin(t - delay);

    // 8) ACTION SECONDAIRE
    angle += arc + 0.05 * sin(t * 6 + I);

    // coordonnées déformées
    let x = Ranim * squash * cos(angle);
    let y = Ranim * stretch * sin(angle);

    vertex(x, y);
  }

  endShape(CLOSE);

  // 9) TIMING
  t += 0.01;
}

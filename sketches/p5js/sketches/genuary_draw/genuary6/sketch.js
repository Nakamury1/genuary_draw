// ETOILES REGULIERES
// GENUARY PROMPT 6 = Lights on/off. Make something that changes when you switch on or off the “digital” lights.

let lit = false;
let brightness = 0;
const PI = Math.PI;

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent('sketch-root');
  cnv.elt.addEventListener('click', () => { lit = !lit; });
}

function starPoints(cx, cy, R, K, H, AD) {
  let pts = [];
  for (let i = 0; i < K; i++) {
    pts.push({
      x: cx + R * Math.cos(2 * i * H * PI / K + AD),
      y: cy + R * Math.sin(2 * i * H * PI / K + AD)
    });
  }
  return pts;
}

function draw() {
  brightness += (lit ? 1 : -1) * 0.03;
  brightness = constrain(brightness, 0, 1);

  background(50);

  const CX = width / 2;
  const CY = height / 2 - 20;
  const b = brightness;

  // halo ambiant
  if (b > 0) {
    noStroke();
    for (let r = 160; r > 0; r -= 3) {
      let a = map(r, 0, 160, b * 80, 0);
      fill(255, 180, 30, a);
      ellipse(CX, CY, r * 2, r * 2);
    }
  }

  // contour ampoule : étoiles K=5, H=2
  const bulbR  = 110;
  const nStars = 28;
  const starSize = 13;

  for (let i = 0; i < nStars; i++) {
    let angle = (2 * PI * i) / nStars - PI / 2;
    let sx = CX + bulbR * cos(angle);
    let sy = CY + bulbR * sin(angle);

    let pts = starPoints(sx, sy, starSize, 5, 2, angle + PI / 2);

    let rCol  = lerp(80,  255, b);
    let gCol  = lerp(80,  220, b);
    let bCol  = lerp(80,  60,  b);
    let alpha = lerp(120, 255, b);

    stroke(rCol, gCol, bCol, alpha);
    strokeWeight(1.2);
    noFill();
    beginShape();
    pts.forEach(pt => vertex(pt.x, pt.y));
    endShape(CLOSE);

    if (b > 0.1) {
      fill(255, 230, 100, b * 60);
      noStroke();
      beginShape();
      pts.forEach(pt => vertex(pt.x, pt.y));
      endShape(CLOSE);
    }
  }

  // filament intérieur — étoile K=7, H=3
  stroke(lerp(40, 255, b), lerp(40, 200, b), 0, lerp(100, 255, b));
  strokeWeight(1.5);
  noFill();
  let fPts = starPoints(CX, CY, 50, 7, 3, PI / 2);
  beginShape();
  fPts.forEach(pt => vertex(pt.x, pt.y));
  endShape(CLOSE);

  // filament intérieur — étoile K=5, H=2
  stroke(lerp(40, 255, b), lerp(40, 240, b), 0, lerp(60, 200, b));
  strokeWeight(0.8);
  let fPts2 = starPoints(CX, CY, 28, 5, 2, PI / 2);
  beginShape();
  fPts2.forEach(pt => vertex(pt.x, pt.y));
  endShape(CLOSE);

  // col (culot)
  let colY = CY + bulbR + 5;
  noStroke();
  fill(lerp(50, 100, b), lerp(45, 80, b), lerp(30, 40, b));
  rect(CX - 30, colY, 60, 50, 4);
  stroke(80);
  strokeWeight(0.8);
  noFill();
  rect(CX - 30, colY, 60, 50, 4);
  for (let i = 1; i < 5; i++) {
    stroke(90);
    line(CX - 30, colY + i * 10, CX + 30, colY + i * 10);
  }

  // reflet verre
  noStroke();
  fill(255, 255, 255, 18 + b * 20);
  ellipse(CX - 40, CY - 45, 30, 55);

  // label
  noStroke();
  if (lit) {
    fill(lerp(80, 200, b), lerp(80, 160, b), lerp(80, 40, b));
  } else {
    fill(255);
  }
  textAlign(CENTER);
  textSize(15);
  text(lit ? 'cliquer pour éteindre' : 'cliquer pour allumer', CX, colY + 70);
}
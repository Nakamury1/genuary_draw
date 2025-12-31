// ETOILES REGULIERES
// GENUARY PROMPT 22 = Gradients only.

let NP = 480;
let CX = NP/2, CY = NP/2;
let stars = [];

function setup() {
  createCanvas(NP, NP);
  noLoop();
  let ctx = drawingContext;

  // --- Dégradé radial du fond ---
  let bgGradient = ctx.createRadialGradient(CX, CY, 0, CX, CY, NP/2);
  bgGradient.addColorStop(0, '#001f3f'); // centre
  bgGradient.addColorStop(1, '#003366'); // bord
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, NP, NP);

  // --- Générer les étoiles ---
  stars.push({cx: CX, cy: CY, r: NP*0.45, points: 7, inner: 3}); // étoile centrale

  // étoiles autour
  for (let i = 0; i < 10; i++) {
    let angle = random(TWO_PI);
    let radius = random(NP*0.1, NP*0.35);
    let r = random(NP*0.05, NP*0.12);
    let px = CX + radius * cos(angle);
    let py = CY + radius * sin(angle);
    let pts = int(random(5, 9));
    let inner = int(random(2, pts-2));
    stars.push({cx: px, cy: py, r: r, points: pts, inner: inner});
  }

  // --- Dessiner toutes les étoiles ---
  for (let s of stars) {
    drawStar(s.cx, s.cy, s.r, s.points, s.inner);
  }
}

function drawStar(cx, cy, R, K, H) {
  let ctx = drawingContext;
  let points = [];
  for (let i = 0; i < K; i++) {
    let x = cx + R * cos(2 * i * H * PI / K - PI/2);
    let y = cy + R * sin(2 * i * H * PI / K - PI/2);
    points.push(createVector(x, y));
  }

  // Dégradé radial pour chaque étoile
  let grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
  grad.addColorStop(0, color(random(200, 255), random(200,255), 0).toString()); // centre lumineux
  grad.addColorStop(1, color(random(200,100), 0, random(0,50)).toString()); // bord plus foncé
  ctx.fillStyle = grad;

  beginShape();
  for (let v of points) {
    vertex(v.x, v.y);
  }
  endShape(CLOSE);
}

// ETOILES REGULIERES
// GENUARY PROMPT 10 = Polar coordinates

let NP = 480;
let PI = Math.PI;

function setup() {
  createCanvas(NP, NP);
  background(0);
  noLoop();

  let CX = NP / 2;
  let CY = NP / 2;

  let nRays  = 16;
  let nRings = 8;
  let maxR   = NP * 0.44;

  // --- fils radiaux : étoiles K=5,H=2 le long de chaque rayon ---
  for (let i = 0; i < nRays; i++) {
    let theta = (2 * PI * i) / nRays;
    let nStars = 12;
    for (let s = 1; s <= nStars; s++) {
      let r = (maxR / nStars) * s;
      let sx = CX + r * cos(theta);
      let sy = CY + r * sin(theta);
      let sz = map(s, 1, nStars, 2, 6);
      let alpha = map(s, 1, nStars, 200, 60);
      drawStar(sx, sy, sz, 5, 2, theta + PI / 2, [255, 255, 255], alpha, 0.4);
    }
  }

  // --- anneaux : étoiles K=7,H=3 le long de chaque cercle polaire ---
  for (let ring = 1; ring <= nRings; ring++) {
    let r = (maxR / nRings) * ring;
    let alpha = map(ring, 1, nRings, 200, 50);
    let nStars = int(2 * PI * r / 14); // densité selon circonférence

    for (let s = 0; s < nStars; s++) {
      let theta = (2 * PI * s) / nStars;
      let rr = r + r * 0.06 * cos(nRays * theta);
      let sx = CX + rr * cos(theta);
      let sy = CY + rr * sin(theta);
      let sz = map(ring, 1, nRings, 5, 3);
      drawStar(sx, sy, sz, 7, 3, theta + PI / 2, [200, 220, 255], alpha, 0.5);
    }
  }

  // --- fils de jonction : étoiles K=4,H=1 (carrés) ---
  for (let i = 0; i < nRays; i++) {
    let theta = (2 * PI * i) / nRays;
    for (let ring = 1; ring < nRings; ring++) {
      let r1 = (maxR / nRings) * ring;
      let r2 = (maxR / nRings) * (ring + 1);
      let thetaMid = (2 * PI * (i + 0.5)) / nRays;
      let rMid = (r1 + r2) / 2;
      let sx = CX + rMid * cos(thetaMid);
      let sy = CY + rMid * sin(thetaMid);
      drawStar(sx, sy, 3, 4, 1, thetaMid, [160, 180, 255], 80, 0.4);
    }
  }

  // --- rosée : étoiles K=6,H=2 aux intersections ---
  for (let ring = 1; ring <= nRings; ring++) {
    let r = (maxR / nRings) * ring;
    for (let i = 0; i < nRays; i++) {
      let theta = (2 * PI * i) / nRays;
      let rr = r + r * 0.06 * cos(nRays * theta);
      let sx = CX + rr * cos(theta);
      let sy = CY + rr * sin(theta);
      let alpha = map(ring, 1, nRings, 230, 80);

      // halo
      drawStar(sx, sy, 7, 6, 2, theta, [180, 210, 255], 30, 0);
      // goutte
      drawStar(sx, sy, 4, 6, 2, theta, [220, 240, 255], alpha, 0.6);
    }
  }

  // --- centre ---
  drawStar(CX, CY, 8, 5, 2, PI / 2, [255, 255, 255], 255, 1.5);
}

// --- fonction étoile régulière ---
function drawStar(cx, cy, R, K, H, AD, col, alpha, sw) {
  if (sw > 0) {
    stroke(col[0], col[1], col[2], alpha);
    strokeWeight(sw);
    noFill();
  } else {
    noStroke();
    fill(col[0], col[1], col[2], alpha);
  }
  beginShape();
  for (let I = 0; I < K; I++) {
    let X = cx + R * cos(2 * I * H * PI / K + AD);
    let Y = cy + R * sin(2 * I * H * PI / K + AD);
    vertex(X, Y);
  }
  endShape(CLOSE);
}
// ETOILES REGULIERES
// GENUARY PROMPT 31 = Pixel sorting
let DESSIN = 7;

// ----------------------------------------------------
let NP = 480, PI = Math.PI;
let K = 5, H = 3;
let CX = NP / 2, CY = NP / 2;
let R = NP * 0.45;
let AD = PI / 2;

let MIN_PX = 3;
let MAX_PX = 14;
// ----------------------------------------------------
function setup() {
  let cnv = createCanvas(NP, NP);
  cnv.parent('sketch-root');
  background(0);
  noStroke();
  fill(255);
  noSmooth();

  let pts = [];
  let pixels = [];

  // Sommets
  for (let i = 0; i < K; i++) {
    let x = int(CX + R * cos(2 * i * H * PI / K + AD));
    let y = int(CY + R * sin(2 * i * H * PI / K + AD));
    pts.push({ x, y });
  }

  // Collecte des pixels
  for (let i = 0; i < pts.length; i++) {
    let a = pts[i];
    let b = pts[(i + 1) % pts.length];
    pixels.push(...lignePixels(a.x, a.y, b.x, b.y));
  }

  // Attribution des tailles (gradient)
  for (let i = 0; i < pixels.length; i++) {
    pixels[i].size = map(i, 0, pixels.length - 1, MIN_PX, MAX_PX);
  }

  // TRI PAR TAILLE
  pixels.sort((a, b) => a.size - b.size);

  // Dessin
  for (let p of pixels) {
    rect(
      int(p.x / p.size) * p.size,
      int(p.y / p.size) * p.size,
      p.size,
      p.size
    );
  }
}

// ----------------------------------------------------
// Bresenham → retourne une liste de pixels
function lignePixels(x0, y0, x1, y1) {
  let res = [];
  let dx = abs(x1 - x0);
  let dy = abs(y1 - y0);
  let sx = x0 < x1 ? 1 : -1;
  let sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    res.push({ x: x0, y: y0 });

    if (x0 === x1 && y0 === y1) break;

    let e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x0 += sx; }
    if (e2 <  dx) { err += dx; y0 += sy; }
  }
  return res;
}

// ETOILES REGULIERES
// GENUARY PROMPT 26 = Symmetry

function setup() {
  let cnv = createCanvas(600, 600);
  cnv.parent('sketch-root');
  angleMode(RADIANS);
  noStroke();
}

function draw() {
  background(10);

  let t = frameCount * 0.02;
  let centerX = width / 2;

  let prevL, prevR;

  for (let y = 50; y < height - 50; y += 20) {

    let n = noise(y * 0.01, t);

    let offset = sin(y * 0.05 + t) * 80;

    let x1 = centerX - offset;
    let x2 = centerX + offset;

    let size = map(n, 0, 1, 4, 10);

    // 🎨 couleur ADN (par niveau)
    let col = color(
      180 + n * 70,
      120 + n * 100,
      255,
      200
    );

    // 🔗 connexions (liaisons longitudinales gauche)
    if (prevL) {
      fill(red(col), green(col), blue(col), 120);
      triangle(prevL.x, prevL.y, x1, y, x1, y + 2);
    }

    // 🔗 connexions (liaisons longitudinales droite)
    if (prevR) {
      fill(red(col), green(col), blue(col), 120);
      triangle(prevR.x, prevR.y, x2, y, x2, y + 2);
    }

    // 🔗 barre transversale ADN (entre les deux brins)
    fill(red(col), green(col), blue(col), 140);
    triangle(x1, y, x2, y, centerX, y + 6);

    // ⭐ étoiles (brin gauche)
    drawStar(x1, y, size, col, n, t);

    // ⭐ étoiles (brin droit)
    drawStar(x2, y, size, col, n, t);

    prevL = { x: x1, y: y };
    prevR = { x: x2, y: y };
  }
}

// ⭐ étoile uniquement en triangles
function drawStar(x, y, size, col, n, t) {
  push();
  translate(x, y);

  rotate(n * TWO_PI + t);

  fill(red(col), green(col), blue(col), 230);

  for (let i = 0; i < 5; i++) {
    push();
    rotate((TWO_PI * i) / 5);

    triangle(
      0, -size,
      -size * 0.4, size,
      size * 0.4, size
    );

    pop();
  }

  pop();
}

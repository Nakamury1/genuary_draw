// ETOILES REGULIERES
// GENUARY PROMPT 25 = Organic Geometry. Forms that look or act organic but are constructed entirely from geometric shapes.

let stars = [];
const NUM_STARS = 450;

function setup() {
  let cnv = createCanvas(480, 480);
  cnv.parent('sketch-root');

  for (let i = 0; i < NUM_STARS; i++) {

    stars.push({
      x: random(width),
      y: random(height),

      vx: random(-0.3, 0.3),
      vy: random(-0.3, 0.3),

      size: random(3, 12),

      phase: random(TWO_PI),

      cluster: floor(random(6))
    });

  }

  noStroke();
}

function draw() {

  background(5, 5, 10, 30);

  updateStars();
  drawConnections();
  drawStars();

}

function updateStars() {

  for (let s of stars) {

    let cx = noise(s.cluster * 100, frameCount * 0.001) * width;
    let cy = noise(s.cluster * 100 + 1000, frameCount * 0.001) * height;

    let dx = cx - s.x;
    let dy = cy - s.y;

    let d = sqrt(dx * dx + dy * dy) + 1;

    s.vx += dx / d * 0.003;
    s.vy += dy / d * 0.003;

    s.vx += map(
      noise(s.x * 0.002, s.y * 0.002, frameCount * 0.01),
      0, 1, -0.02, 0.02
    );

    s.vy += map(
      noise(s.y * 0.002, s.x * 0.002, frameCount * 0.01),
      0, 1, -0.02, 0.02
    );

    s.vx *= 0.98;
    s.vy *= 0.98;

    s.x += s.vx;
    s.y += s.vy;

    wrap(s);
  }
}

function drawConnections() {

  strokeWeight(1);

  for (let i = 0; i < stars.length; i++) {
    let a = stars[i];

    for (let j = i + 1; j < stars.length; j++) {
      let b = stars[j];

      let d = dist(a.x, a.y, b.x, b.y);

      if (d < 70) {

        let alpha = map(d, 0, 70, 80, 0);

        stroke(255, alpha);

        line(a.x, a.y, b.x, b.y);
      }
    }
  }
}

function drawStars() {

  for (let s of stars) {

    push();

    translate(s.x, s.y);

    let pulse = sin(frameCount * 0.03 + s.phase);

    let size = s.size * (1 + pulse * 0.25);

    fill(200, 200, 255, 180);

    rotate(frameCount * 0.002 + s.phase);

    star(0, 0, size * 0.4, size, 5);

    pop();
  }
}

function star(x, y, r1, r2, n) {

  beginShape();

  for (let i = 0; i < n * 2; i++) {

    let angle = PI * i / n;
    let r = i % 2 === 0 ? r2 : r1;

    vertex(cos(angle) * r, sin(angle) * r);
  }

  endShape(CLOSE);
}

function wrap(s) {

  if (s.x < 0) s.x += width;
  if (s.x > width) s.x -= width;

  if (s.y < 0) s.y += height;
  if (s.y > height) s.y -= height;
}
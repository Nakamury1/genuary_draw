// ETOILES REGULIERES
// GENUARY PROMPT 27 = Lifeform. A shape or structure that behaves as if it’s alive or growing.
let stars = [];

function setup() {
  let cnv = createCanvas(600, 600);
  cnv.parent('sketch-root');
  noStroke();

  // création initiale
  for (let i = 0; i < 120; i++) {
    stars.push(new Star(random(width), random(height)));
  }
}

function draw() {
  background(10, 20);

  let t = frameCount * 0.01;

  for (let s of stars) {
    s.update(t);
    s.display();
  }

  // croissance lente du “système vivant”
  if (frameCount % 10 === 0 && stars.length < 250) {
    stars.push(new Star(random(width), random(height)));
  }
}

class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.baseSize = random(2, 6);
    this.phase = random(TWO_PI);
    this.seed = random(1000);
  }

  update(t) {
    // mouvement organique (comme une cellule)
    let n = noise(this.x * 0.005, this.y * 0.005, t);

    this.x += cos(n * TWO_PI) * 0.6;
    this.y += sin(n * TWO_PI) * 0.6;

    // wrap edges (organisme global)
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  display() {
    let t = frameCount * 0.03;

    let breathe = sin(t + this.phase) * 0.5 + 1;
    let size = this.baseSize * breathe;

    let glow = noise(this.seed, t);
    let alpha = map(glow, 0, 1, 80, 255);

    push();
    translate(this.x, this.y);
    rotate(glow * TWO_PI);

    fill(180 + glow * 75, 150 + glow * 100, 255, alpha);

    // ⭐ étoile uniquement en triangles
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
}
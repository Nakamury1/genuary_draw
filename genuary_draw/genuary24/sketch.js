// ETOILES REGULIERES
// GENUARY PROMPT 24 = Geometric art - pick either a circle, rectangle, or triangle and use only that geometric shape.
let grid = 18;
let spacing = 30;

function setup() {
  createCanvas(600, 600);
  angleMode(RADIANS);
  noStroke();
}

function draw() {
  background(10);

  let t = frameCount * 0.01;

  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {

      let n = noise(x * 0.01, y * 0.01, t);

      let angle = n * TWO_PI * 2;

      let d = dist(x, y, width / 2, height / 2);
      let size = map(d, 0, width / 2, 25, 5);

      push();
      translate(x, y);
      rotate(angle);

      let alpha = map(n, 0, 1, 80, 200);
      fill(200 + n * 55, 100 + n * 100, 255, alpha);

      // ⭐ ÉTOILE = 5 TRIANGLES
      for (let i = 0; i < 5; i++) {
        push();
        rotate((TWO_PI * i) / 5);

        triangle(
          0, -size,          // pointe
          -size * 0.35, size,
          size * 0.35, size
        );

        pop();
      }

      pop();
    }
  }
} 
// ETOILES REGULIERES
// GENUARY PROMPT 3 = Fibonacci forever. Create a work that uses the Fibonacci sequence in some way.

let NP = 480;
let CX = NP / 2;
let CY = NP / 2;
let AD = Math.PI / 2;
let K  = 5;

// ----------------------------------------------------
function fibonacci(n) {
  let a = 1, b = 1;
  for (let i = 2; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

// ----------------------------------------------------
function traceForme(rayon, fibN, rotation, col, epaisseur) {
  let Fn  = fibonacci(fibN);
  let Fn1 = fibonacci(fibN - 1);
  let angle = 2 * Math.PI * (Fn1 / Fn);

  stroke(col);
  strokeWeight(epaisseur);
  noFill();

  beginShape();
  for (let i = 0; i < K; i++) {
    let a = i * angle + AD + rotation;
    let x = CX + rayon * cos(a);
    let y = CY + rayon * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);
}

// ----------------------------------------------------
function setup() {
  let cnv = createCanvas(NP, NP);
  cnv.parent('sketch-root');
  background(10);

  traceForme(
    NP * 0.45,
    10,
    0,
    color(154, 3, 30),
    2
  );

  traceForme(
    NP * 0.32,
    11,
    PI / 6,
    color(255, 119, 61),
    1.5
  );

  traceForme(
    NP * 0.52,
    9,
    -PI / 8,
    color(241, 145, 67),
    1
  );

  traceForme(
    NP * 0.72,
    5,
    -PI / 2,
    color(255, 178, 56),
    1
  );
}

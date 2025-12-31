// ETOILES REGULIERES
// GENUARY PROMPT 20 = Generative Architecture

let DESSIN = 7; // [7,8,9,10,11,12]

let NP = 480, PI = Math.PI;
let K = 5, H = 3, CX = NP / 2, CY = NP / 2, R = NP * 0.45, AD = PI / 2;

if (DESSIN == 8) K = 7;
else if (DESSIN == 9) K = 20, H = 9;
else if (DESSIN == 10) K = 20, H = 7;
else if (DESSIN == 11) K = 51, H = 20;
else if (DESSIN == 12) K = 51, H = 25;

function setup() {
  createCanvas(NP, NP);
  background(30);
  stroke(255);
  noFill();

  let points = [];

  // Génération des points de l'étoile
  for (let i = 0; i < K; i++) {
    let x = CX + R * cos(2 * i * H * PI / K + AD);
    let y = CY + R * sin(2 * i * H * PI / K + AD);
    points.push(createVector(x, y));
  }

  // Architecture générative : répétition et connexion
  for (let j = 0; j < points.length; j++) {
    let p1 = points[j];
    let p2 = points[(j + 1) % points.length];

    // Ligne principale
    strokeWeight(2);
    line(p1.x, p1.y, p2.x, p2.y);

    // Création de branches génératives
    for (let t = 0; t < 5; t++) {
      let mx = lerp(p1.x, p2.x, t / 5);
      let my = lerp(p1.y, p2.y, t / 5);

      let angle = random(TWO_PI);
      let len = random(10, 30);
      let bx = mx + cos(angle) * len;
      let by = my + sin(angle) * len;

      strokeWeight(1);
      line(mx, my, bx, by);
    }
  }

  // Ajout de cercles concentriques pour plus de structure
  for (let r = R * 0.2; r < R; r += R * 0.1) {
    ellipse(CX, CY, r * 2);
  }
}

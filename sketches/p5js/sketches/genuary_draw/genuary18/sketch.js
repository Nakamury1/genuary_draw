// ETOILES REGULIERES
// GENUARY PROMPT 18 = Unexpected path. Draw a route that changes direction based on one very simple rule.

let DESSIN = 7; 
let NP = 480, PI = Math.PI;
let K = 5, H = 3, AD = PI / 2;

if (DESSIN == 8) K = 7;
else if (DESSIN == 9) K = 20, H = 9;
else if (DESSIN == 10) K = 20, H = 7;
else if (DESSIN == 11) K = 51, H = 20;
else if (DESSIN == 12) K = 51, H = 25;

function setup() {
  let cnv = createCanvas(1000, 600);
  cnv.parent('sketch-root');
  background(0);
  stroke(255);
  noFill();
  
  let x = 50, y = 300;
  let dx = 80, dy = 50;
  let sens = 1;
  let taille = 20;

  for (let step = 0; step < 12; step++) {
    drawStar(x, y, sens, taille);
    addSmallStars(x, y, 5, 8); // ajouter 5 petites étoiles autour

    sens *= -1;
    x += dx;
    y += (step % 2 == 0) ? dy : -dy;
  }
}

// fonction pour tracer une étoile
function drawStar(CX, CY, sens, R) {
  beginShape();
  for (let I = 0; I < K; I++) {
    let X = int(CX + R * cos(2 * I * H * PI / K * sens + AD));
    let Y = int(CY + R * sin(2 * I * H * PI / K * sens + AD));
    vertex(X, Y);
  }
  endShape(CLOSE);
}

// fonction pour ajouter de petites étoiles aléatoires autour d'un point
function addSmallStars(CX, CY, count, maxR) {
  for (let i = 0; i < count; i++) {
    let offsetX = random(-maxR, maxR);
    let offsetY = random(-maxR, maxR);
    let size = random(3, 6);
    drawStar(CX + offsetX, CY + offsetY, 1, size);
  }
}

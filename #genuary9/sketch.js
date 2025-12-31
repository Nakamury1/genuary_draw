// ETOILES REGULIERES
// GENUARY PROMPT 9 = The textile design patterns of public transport seating.

let NP = 600, PI = Math.PI;
let DESSIN = 7;
let K = 5, H = 3, AD = PI/2, R = 30;

function setup() {
  createCanvas(NP, NP);
  background(255);
  stroke(0);
  fill(0);

  // fonction pour dessiner une étoile à (x0, y0)
  function drawStar(x0, y0, r) {
    beginShape();
    for (let i = 0; i < K; i++) {
      let x = x0 + r * cos(2*i*H*PI/K + AD);
      let y = y0 + r * sin(2*i*H*PI/K + AD);
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  // créer une vague avec 8 étoiles
  let nStars = 7;
  let maxY = -Infinity;
  let maxX = 0;
  for (let i = 0; i < nStars; i++) {
    let x = map(i, 0, nStars-1, 50, width-50);
    let y = height/2 + 10 * sin(TWO_PI * i / (nStars-1));
    drawStar(x, y, R*0.6);

    // garder la position de l'étoile la plus haute
    if (y < maxY || i==0) {
      maxY = y;
      maxX = x;
    }
  }

  // ajouter une étoile au sommet de la vague
  drawStar(maxX - 90, maxY - 70, R); // on la décale légèrement vers le haut

   // ARC DE CERCLE SOUS LA VAGUE
  let arcRadius = 100;
  let arcCenterX = width/2;
  let arcCenterY = height/2 + 150;
  let nArcStars = 12;

 for (let i = 0; i < nArcStars; i++) {
    let angle = map(i, 0, nArcStars-1, 0, PI); // inversé
    let x = arcCenterX + arcRadius * cos(angle);
    let y = arcCenterY - arcRadius * sin(angle); // inversé verticalement
    drawStar(x, y, R*0.6); // étoiles plus petites
  }
}

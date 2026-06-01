// ETOILES REGULIERES
// GENUARY PROMPT 19 = 16x16

let DESSIN = 7;
let NP = 480, PI = Math.PI;
let K = 5, H = 3;
let N = 16; // 16 étoiles par ligne et colonne
let SIZE = NP / N; // Taille d'une cellule

function setup() {
  let cnv = createCanvas(NP, NP);
  cnv.parent('sketch-root');
  background(255);
  noStroke();

  // Définition des paramètres selon le motif
  if (DESSIN == 8) K = 7;
  else if (DESSIN == 9) K = 20, H = 9;
  else if (DESSIN == 10) K = 20, H = 7;
  else if (DESSIN == 11) K = 51, H = 20;
  else if (DESSIN == 12) K = 51, H = 25;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      let CX = SIZE/2 + i * SIZE;
      let CY = SIZE/2 + j * SIZE;

      // Couleur aléatoire pour chaque étoile
      fill(random(255), random(255), random(255));

      drawPattern(CX, CY, SIZE * 0.4);
    }
  }
}

// Fonction pour dessiner une étoile avec ton motif
function drawPattern(CX, CY, R) {
  let AD = PI / 2;
  beginShape();
  for (let I = 0; I < K; I++) {
    let X = CX + R * cos(2 * I * H * PI / K + AD);
    let Y = CY + R * sin(2 * I * H * PI / K + AD);
    vertex(X, Y);
  }
  endShape(CLOSE);
}

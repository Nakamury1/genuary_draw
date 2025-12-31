// ETOILES REGULIERES
// GENUARY PROMPT 16 = Generative palette.

let DESSIN = 7;
let NP = 480, PI = Math.PI;
let CX = NP/2, CY = NP/2;
let AD = PI/2;

let K = 5, H = 3;
if (DESSIN==8) K=7;
else if (DESSIN==9) K=20,H=9;
else if (DESSIN==10) K=20,H=7;
else if (DESSIN==11) K=51,H=20;
else if (DESSIN==12) K=51,H=25;

let nbEtoiles = 10; // nombre d'étoiles générées

function setup() {
  createCanvas(NP, NP);
  background(30); // fond sombre
  noStroke();
  
  for (let e = 0; e < nbEtoiles; e++) {
    let R = random(NP*0.05, NP*0.2);
    let posX = random(R, NP-R);
    let posY = random(R, NP-R);
    
    // Couleur aléatoire
    fill(random(50,255), random(50,255), random(50,255));
    
    // Dessiner l'étoile
    beginShape();
    for (let I = 0; I < K; I++) {
      let x = posX + R * cos(2*I*H*PI/K + AD);
      let y = posY + R * sin(2*I*H*PI/K + AD);
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}

// ETOILES REGULIERES
// GENUARY PROMPT 15 = Create an invisible object where only the shadows can be seen.

let DESSIN = 7; // [7,8,9,10,11,12]

let NP = 480, PI = Math.PI;
let K = 5, H = 3, CX = NP / 2, CY = NP / 2, R = NP * 0.45, AD = PI / 2;

if (DESSIN == 8)  
  K = 7;
else if (DESSIN == 9)  
  K = 20, H = 9;
else if (DESSIN == 10)  
  K = 20, H = 7;
else if (DESSIN == 11)  
  K = 51, H = 20;
else if (DESSIN == 12)  
  K = 51, H = 25;

function setup() {
  createCanvas(NP, NP);
  background(0); // Fond noir
  noFill();
  strokeWeight(2);

  // Plusieurs contours pour simuler l'ombre/flou
  for (let i = 10; i >= 1; i--) {
    stroke(255, map(i, 10, 1, 20, 180)); // Plus clair au centre, plus transparent à l'extérieur
    beginShape();
    for (let I = 0; I < K; I++) {
      let X = CX + (R + i) * cos(2 * I * H * PI / K + AD);
      let Y = CY + (R + i) * sin(2 * I * H * PI / K + AD);
      vertex(X, Y);
    }
    endShape(CLOSE);
  }
}

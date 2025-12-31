// ETOILES REGULIERES
// GENUARY PROMPT 26 = Lifeform. A shape or structure that behaves as if it’s alive or growing.
// 
// ----------------------------------------------------
// PARAMÈTRES
let DESSIN = 7; // [7,8,9,10,11,12]
let NP = 480, PI = Math.PI;
let K = 5, H = 3, CX = NP/2, CY = NP/2, R = NP*0.45, AD = PI/2;

// Ajustement selon le type de dessin
if (DESSIN == 8) K = 7;
else if (DESSIN == 9) K = 20, H = 9;
else if (DESSIN == 10) K = 20, H = 7;
else if (DESSIN == 11) K = 51, H = 20;
else if (DESSIN == 12) K = 51, H = 25;

// ----------------------------------------------------
function setup() {
  INIT();
  
  for (let I = 0; I < K; I++) {
    // On ajoute un léger "décalage aléatoire" pour simuler la croissance organique
    let angle = 2 * I * H * PI / K + AD;
    let grow = 1 + 0.2 * sin(I); // effet de pulsation
    let X = int(CX + R * cos(angle) * grow + random(-5,5));
    let Y = int(CY + R * sin(angle) * grow + random(-5,5));

    if (I == 0) LPRINT(`M${X},${Y}`);
    else LPRINT(`D${X},${Y}`);
  }
  
  TRACE();
}
  
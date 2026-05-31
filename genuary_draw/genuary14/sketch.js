// ETOILES REGULIERES
// GENUARY PROMPT 14 = Everything fits perfectly

let DESSIN = 7; // [7,8,9,10,11,12]

let NP = 480, PI = Math.PI;
let K = 5, H = 3, CX = NP/2, CY = NP/2, R = NP*.45, AD = PI/2;

function setup() 
{
  INIT();
  
  let nbEtoiles = 7;          // nombre d'étoiles imbriquées
  let facteurReduction = 0.8; // réduit le rayon à chaque étoile
  
  let rayon = R;              // rayon initial
  
  for (let e = 0; e < nbEtoiles; e++) {
    for (let I = 0; I < K; I++) {
      let X = int(CX + rayon * cos(2*I*H*PI/K + AD));
      let Y = int(CY + rayon * sin(2*I*H*PI/K + AD));
      if (I == 0) LPRINT(`M${X},${Y}`);
      else LPRINT(`D${X},${Y}`);
    }
    rayon *= facteurReduction; // réduire le rayon pour la prochaine étoile
  }
  
  TRACE();
}

// ETOILES REGULIERES
// GENUARY PROMPT 4 = Black on black

let DESSIN = 5;
let NP = 480, PI = Math.PI;
let K = 5, H = 3, R = NP * 0.45;

let CX = NP / 2, CY = NP / 2;
let AD = PI / 2;

// Couleurs pour chaque étoile
let couleurs = ["#000000", "#040200", "#0E0C0A", "#040406"];

function setup() {
  let cnv = createCanvas(NP, NP);
  cnv.parent('sketch-root');
  background_(BG_COLOR);
  stroke_(STROKE_COLOR);
  noFill_();

  fill(0);
  noStroke();
  rect(0, 0, NP, NP);

  for (let e = 0; e < 4; e++) {
    let angleOffset = e * (PI / 12);
    stroke("#ffffff");
    strokeWeight(0.3); 
    beginShape(); 

    for (let I = 0; I < K; I++) {
      let X = int(CX + R * cos(2 * I * H * PI / K + AD + angleOffset));
      let Y = int(CY + R * sin(2 * I * H * PI / K + AD + angleOffset));
      vertex(X, Y);
    }

    endShape(CLOSE);
  }

  TRACE();
}

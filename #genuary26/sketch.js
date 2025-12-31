// ETOILES REGULIERES
// GENUARY PROMPT 26 = Symmetry

let DESSIN = 7;

// ----------------------------------------------------
let NP = 480, PI = Math.PI;
let K = 5, H = 3, CX = NP / 2, CY = NP / 2, R = NP * .45, AD = PI / 2;

// ----------------------------------------------------
function setup() {
  INIT();

  // -------- ÉTOILE
  for (let I = 0; I < K; I++) {
    let X = int(CX + R * cos(2 * I * H * PI / K + AD));
    let Y = int(CY + R * sin(2 * I * H * PI / K + AD));

    if (I == 0) LPRINT(`M${X},${Y}`);
    else LPRINT(`D${X},${Y}`);
  }

  // -------- LIGNE VERTICALE (AXE DE SYMÉTRIE)
  let Y1 = int(CY - R);
  let Y2 = int(CY + R);

  LPRINT(`M${CX},${Y1}`);
  LPRINT(`D${CX},${Y2}`);

  TRACE();
}

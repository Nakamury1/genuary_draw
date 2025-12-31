// ETOILES REGULIERES
// GENUARY PROMPT 25 = Organic Geometry. Forms that look or act organic but are constructed entirely from geometric shapes.

let NP = 480, PI = Math.PI;
let CX = NP / 2, CY = NP / 2;
let AD = PI / 2;

function setup() {
  INIT();

  let NB = 10;          // nombre d'étoiles (strates organiques)
  let Rmax = NP * 0.45;

  for (let n = 0; n < NB; n++) {

    // paramètres géométriques contrôlés
    let K = 7 + int(4 * sin(n * 0.3));
    let H = 3 + int(2 * cos(n * 0.2));

    let R = map(n, 0, NB - 1, Rmax, Rmax * 0.1);
    let rot = n * 0.15;

    for (let I = 0; I <= K; I++) {
      let ang = 2 * I * H * PI / K + AD + rot;

      let X = int(CX + R * cos(ang));
      let Y = int(CY + R * sin(ang));

      if (I == 0) LPRINT(`M${X},${Y}`);
      else LPRINT(`D${X},${Y}`);
    }
  }

  TRACE();
}

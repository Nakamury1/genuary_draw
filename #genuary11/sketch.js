// ETOILES REGULIERES
// GENUARY PROMPT 11 = Quine. A Quine is a form of code poetry, it’s a computer program that outputs exactly its own source code.

let DESSIN = 7; // [7,8,9,10,11,12]
let NP = 480, PI = Math.PI;
let K = 5, H = 3, CX = NP/2, CY = NP/2, R = NP*0.45, AD = PI/2;

if (DESSIN==8) K=7;
else if (DESSIN==9) K=20,H=9;
else if (DESSIN==10) K=20,H=7;
else if (DESSIN==11) K=51,H=20;
else if (DESSIN==12) K=51,H=25;

// On met tout le code dans une variable sous forme de chaîne simple
let code = "";

function setup() {
  createCanvas(NP, NP);
  stroke(0);
  noFill();
  beginShape();
  for (let I=0; I<K; I++) {
    let X = int(CX + R * cos(2 * I * H * PI / K + AD));
    let Y = int(CY + R * sin(2 * I * H * PI / K + AD));
    vertex(X, Y);
  }
  endShape(CLOSE);
  
  // On reconstruit le quine en utilisant des guillemets simples et échappement
  code = "// Quine étoile en p5.js\\n\\n" +
  "let DESSIN = 7; // [7,8,9,10,11,12]\\n" +
  "let NP = 480, PI = Math.PI;\\n" +
  "let K = 5, H = 3, CX = NP/2, CY = NP/2, R = NP*0.45, AD = PI/2;\\n\\n" +
  "if (DESSIN==8) K=7;\\n" +
  "else if (DESSIN==9) K=20,H=9;\\n" +
  "else if (DESSIN==10) K=20,H=7;\\n" +
  "else if (DESSIN==11) K=51,H=20;\\n" +
  "else if (DESSIN==12) K=51,H=25;\\n\\n" +
  "console.log(code);";

  console.log(code);
}

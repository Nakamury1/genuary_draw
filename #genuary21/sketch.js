// ETOILES REGULIERES
// GENUARY PROMPT 21 = Bauhaus Poster. Create a poster design inspired by the German art school Bauhaus.
let DESSIN = 7;

let NP=480, PI = Math.PI;
let K=5,H=3,CX=NP/2,CY=NP/2,R=NP*.45,AD=PI/2;

if (DESSIN==8) K=7;
else if (DESSIN==9) K=20,H=9;
else if (DESSIN==10) K=20,H=7;
else if (DESSIN==11) K=51,H=20;
else if (DESSIN==12) K=51,H=25;

function setup() {
  createCanvas(NP, NP);
  background(255); // fond blanc
  noFill();
  strokeWeight(4);

  let colors = ['#E03C31','#FFD700','#0047AB','#000000'];

  for (let i = 0; i < K; i++) {
    stroke(colors[i % colors.length]);
    let x = int(CX + R * cos(2 * i * H * PI / K + AD));
    let y = int(CY + R * sin(2 * i * H * PI / K + AD));
    if (i == 0) beginShape();
    vertex(x, y);
    if (i == K-1) endShape(CLOSE);
  }

  // Ajouter un carré Bauhaus en arrière-plan
  fill('#FFD700');
  noStroke();
  rect(60, 60, 100, 100);

  // Ajouter du texte minimal
  fill('#000000');
  textSize(32);
  textAlign(CENTER, CENTER);
  text("ÉTOILES", CX, NP-50);
}

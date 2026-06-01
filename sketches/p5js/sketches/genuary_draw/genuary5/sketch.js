// ETOILES REGULIERES
// GENUARY PROMPT 5 = Write “Genuary”. Avoid using a font.

let DESSIN = 7;
let NP = 750, PI = Math.PI;
let K = 5, H = 3, R = 15;
let AD = PI / 2;

if (DESSIN == 8) K = 7;
else if (DESSIN == 9) K = 20, H = 9;
else if (DESSIN == 10) K = 20, H = 7;
else if (DESSIN == 11) K = 51, H = 20;
else if (DESSIN == 12) K = 51, H = 25;

function drawStar(CX, CY) {
  beginShape();
  for (let I = 0; I < K; I++) {
    let X = int(CX + R * cos(2 * I * H * PI / K + AD));
    let Y = int(CY + R * sin(2 * I * H * PI / K + AD));
    vertex(X, Y);
  }
  endShape(CLOSE);
}

function setup() {
  let cnv = createCanvas(NP, NP);
  cnv.parent('sketch-root');
  background_(BG_COLOR);
  stroke_(STROKE_COLOR);
  noFill_();

  // Fond noir
  fill(0);
  noStroke();
  rect(0, 0, NP, NP);

  let startX = 50;
  let startY = 50;
  let spacingX = 105;
  let spacingY = 90; // décalage vertical pour diagonale
  let height = 100;
  let steps = 4;

  let letters = ["G", "E", "N", "U", "A", "R", "Y"];
  let colors = ["#f39c12","#e74c3c","#3498db","#2ecc71","#e67e22","#9b59b6","#1abc9c"];

  for (let idx = 0; idx < letters.length; idx++) {
    let lx = startX + spacingX*idx;
    let ly = startY + spacingY*idx;
    fill(colors[idx]);
    stroke("#ffffff");

    switch(letters[idx]) {
      case "G":
        let radiusG = 40;
        let centerXG = lx + radiusG;
        let centerYG = ly + radiusG;
        for (let angle = Math.PI/2; angle <= 2.5 * Math.PI; angle += Math.PI/12) {
          let X = centerXG + radiusG * Math.cos(angle);
          let Y = centerYG + radiusG * Math.sin(angle);
          drawStar(X, Y);
        }
        for (let x = lx + 20; x <= lx + radiusG; x += 20) drawStar(x, ly + height/2);
        break;

      case "E":
        for (let y = ly; y <= ly + height; y += 30) drawStar(lx, y);
        for (let x = lx; x <= lx + 60; x += 20) {
          drawStar(x, ly);
          drawStar(x, ly + height/2);
          drawStar(x, ly + height);
        }
        break;

      case "N":
        for (let y = ly; y <= ly + height; y += 30) drawStar(lx, y);
        for (let y = ly; y <= ly + height; y += 30) drawStar(lx + 60, y);
        for (let i = 0; i <= steps; i++) {
          let X = lx + (60 / steps) * i;
          let Y = ly + (height / steps) * i;
          drawStar(X, Y);
        }
        break;

      case "U":
        for (let y = ly; y <= ly + height - 20; y += 30) drawStar(lx, y);
        for (let y = ly; y <= ly + height - 20; y += 30) drawStar(lx + 60, y);
        let centerXU = lx + 30;
        let centerYU = ly + height - 20;
        let radiusU = 30;
        for (let angle = 0; angle <= Math.PI; angle += Math.PI/12) {
        let X = centerXU + radiusU * Math.cos(angle);
        let Y = centerYU + radiusU * Math.sin(angle);
        drawStar(X, Y);
        }
        break;

      case "A":
        let widthA = 45;
        for (let i = 0; i <= steps; i++) {
          let Xleft = lx - widthA / 2 + (widthA / steps) * i;
          let Yleft = ly + height - (height / steps) * i;
          drawStar(Xleft, Yleft);
          let Xright = lx - widthA / 2 + (widthA / steps) * i;
          let Yright = ly + (height / steps) * i;
          drawStar(Xright + widthA, Yright);
        }
        let offsetX = 40;
        for (let x = lx - widthA / 4 + offsetX; x <= lx + widthA / 4 + offsetX; x += 20) {
          drawStar(x, ly + height / 2);
        }
        break;

      case "R":
        let colWidth = 20;
        for (let y = ly; y <= ly + height; y += 20) drawStar(lx, y);
        let radiusR = 40;
        let centerXR = lx + colWidth;
        let centerYR = ly + 20;
        for (let angle = Math.PI; angle <= 2 * Math.PI; angle += Math.PI / 4) {
          let X = centerXR + radiusR * Math.cos(angle);
          let Y = centerYR + radiusR * Math.sin(angle);
          drawStar(X, Y);
        }
        for (let i = 0; i <= steps; i++) {
          let X = centerXR + (radiusR + 40) * (i / steps);
          let Y = centerYR + (height - radiusR) * (i / steps);
          drawStar(X, Y);
        }
        break;

      case "Y":
        // bras gauche
        for (let i = 0; i <= steps; i++) {
          let X = lx - 40 + (40 / steps) * i;
          let Yb = ly + (height / 2 / steps) * i;
          drawStar(X, Yb);
        }
        // bras droit
        for (let i = 0; i <= steps; i++) {
          let X = lx + (40 / steps) * i;
          let Yb = ly + (height / 2) - (height / 2 / steps) * i;
          drawStar(X, Yb);
        }
        for (let y = ly + height / 2; y <= ly + height; y += 30) drawStar(lx, y);
        break;
    }
  }

  TRACE();
}

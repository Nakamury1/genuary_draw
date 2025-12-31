// ETOILES REGULIERES
// GENUARY PROMPT 7 = Boolean algebra. Get inspired by Boolean algebra, in any way.

let DESSIN = 7; // [7,8,9,10,11,12]
let NP = 480;   // taille du canevas
let PI = Math.PI;
let K = 5, H = 3, CX = NP/2, CY = NP/2, R = NP*0.45, AD = PI/2;

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

let points = [];
let grid = [];

function setup() {
  createCanvas(NP, NP);
  background(0);
  stroke(255);
  strokeWeight(1);

  // Générer les points de l'étoile
  for (let i = 0; i < K; i++) {
    let x = CX + R * cos(2 * i * H * PI / K + AD);
    let y = CY + R * sin(2 * i * H * PI / K + AD);
    points.push({x, y});
  }

  // Créer la grille booléenne
  grid = Array.from({length: NP}, () => Array(NP).fill(0));
  let epsilon = 1.0; // tolérance pour inclure le pixel

  function drawLine(x0, y0, x1, y1) {
    for (let x = 0; x < NP; x++) {
      for (let y = 0; y < NP; y++) {
        let dx = x1 - x0;
        let dy = y1 - y0;
        let m = dx !== 0 ? dy / dx : 1e9;
        let distance = Math.abs((y - y0) - m * (x - x0)) / Math.sqrt(m*m + 1);
        if (distance < epsilon) {
          grid[y][x] = 1; // pixel activé
        }
      }
    }
  }

  // Tracer chaque segment de l'étoile
  for (let i = 0; i < K; i++) {
    let p0 = points[i];
    let p1 = points[(i + 1) % K];
    drawLine(p0.x, p0.y, p1.x, p1.y);
  }

  // Afficher la grille
  for (let y = 0; y < NP; y++) {
    for (let x = 0; x < NP; x++) {
      if (grid[y][x] === 1) {
        stroke(255);
        point(x, y);
      }
    }
  }
}

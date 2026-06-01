// ETOILES REGULIERES
// GENUARY PROMPT 17 = What happens if pi=4?


const PI4 = 4;         // notre π alternatif
const PI  = Math.PI;   // le vrai, pour tracer les étoiles elles-mêmes

// Strokes de la lettre π avec pi=4 (coordonnées normalisées)
const STROKES = [
  [[0.05,0.18],[0.95,0.18]],                              // barre du haut
  [[0.25,0.18],[0.25,0.72],[0.13,0.72],[0.08,0.88]],     // jambe gauche + coude droit
  [[0.62,0.18],[0.62,0.88]],                              // jambe droite
];

const STAR_CFGS = [{K:5,H:2},{K:7,H:3},{K:8,H:3},{K:6,H:2}];
let points = [], angle = 0;

function setup() {
  let cnv = createCanvas(480, 480);
  cnv.parent('sketch-root');
  noFill();

  // Interpoler des points équidistants sur chaque stroke
  const OX=60, OY=40, SW=360, SH=380, STEP=22;
  STROKES.forEach(stroke => {
    for (let i = 0; i < stroke.length-1; i++) {
      let [x0,y0] = stroke[i], [x1,y1] = stroke[i+1];
      let dx=x1-x0, dy=y1-y0, len=sqrt(dx*dx+dy*dy);
      let n = max(1, floor(len*SW/STEP));
      for (let j=0; j<n; j++) {
        let f = j/n;
        points.push({
          x: OX+(x0+dx*f)*SW,
          y: OY+(y0+dy*f)*SH,
          cfg: STAR_CFGS[points.length % STAR_CFGS.length]
        });
      }
    }
  });
}

function starShape(cx, cy, K, H, R, ang) {
  beginShape();
  for (let I = 0; I <= K; I++) {
    let a = 2*I*H*PI/K + ang - PI/2;
    vertex(cx + R*cos(a), cy + R*sin(a));
  }
  endShape(CLOSE);
}

function draw() {
  angle += 0.007;
  background(250, 249, 247);
  stroke(20, 10, 40, 200);
  strokeWeight(1);

  points.forEach((pt, i) => {
    let R = 9 + 2*sin(angle*0.7 + i*0.5);
    starShape(pt.x, pt.y, pt.cfg.K, pt.cfg.H, R, angle + i*0.31);
  });
}
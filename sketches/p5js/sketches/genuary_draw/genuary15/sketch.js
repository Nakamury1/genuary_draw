// ETOILES REGULIERES
// GENUARY 15 — Invisible object, only shadows visible

let DESSIN = 10; // [7,8,9,10,11,12]
let K, H_param;
let R = 170, angle = 0;

function setup() {
  let cnv = createCanvas(480, 480);
  cnv.parent('sketch-root');
  noFill(); noStroke();

  if      (DESSIN==7)  { K=5;  H_param=3;  }
  else if (DESSIN==8)  { K=7;  H_param=3;  }
  else if (DESSIN==9)  { K=20; H_param=9;  }
  else if (DESSIN==10) { K=20; H_param=7;  }
  else if (DESSIN==11) { K=51; H_param=20; }
  else if (DESSIN==12) { K=51; H_param=25; }
}

function starVertices(ang) {
  let pts = [];
  for (let I = 0; I < K; I++) {
    let a = 2 * I * H_param * PI / K + ang - PI/2;
    pts.push([R * cos(a), R * sin(a)]);
  }
  return pts;
}

function project(pts, lx, ly, lz, objZ) {
  return pts.map(([px, py]) => {
    let t = -lz / (objZ - lz);
    return [lx + (px - lx) * t, ly + (py - ly) * t];
  });
}

function drawShadow(shadow, r, g, b) {
  drawingContext.save();
  drawingContext.globalCompositeOperation = 'multiply';
  drawingContext.fillStyle = `rgb(${r},${g},${b})`;
  drawingContext.beginPath();
  shadow.forEach(([sx, sy], i) => {
    let x = width/2 + sx, y = height/2 + sy;
    i === 0 ? drawingContext.moveTo(x,y) : drawingContext.lineTo(x,y);
  });
  drawingContext.closePath();
  drawingContext.fill();
  drawingContext.restore();
}

function draw() {
  angle += 0.009;
  background(255);

  let spread = 160, lz = -320, objZ = 100;
  let lt = angle * 0.2;

  let lights = [
    { ox: spread*cos(lt),          oy: spread*0.45*sin(lt),          r:0,   g:255, b:255 },
    { ox: spread*cos(lt+TWO_PI/3), oy: spread*0.45*sin(lt+TWO_PI/3), r:255, g:0,   b:255 },
    { ox: spread*cos(lt+4*PI/3),   oy: spread*0.45*sin(lt+4*PI/3),   r:255, g:255, b:0   },
  ];

  let verts = starVertices(angle);
  lights.forEach(L => {
    drawShadow(project(verts, L.ox, L.oy, lz, objZ), L.r, L.g, L.b);
  });
}
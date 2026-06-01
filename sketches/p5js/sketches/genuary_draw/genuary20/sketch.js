// ETOILES REGULIERES
// GENUARY PROMPT 20 = Generative Architecture

// GENUARY PROMPT 20 — Generative Architecture
// Ville en coupe, 3 plans de profondeur, tout tracé en étoiles

const CFGS = [
  {K:5,H:2},{K:7,H:3},{K:5,H:3},{K:8,H:3},
  {K:6,H:2},{K:9,H:4},{K:4,H:1},{K:12,H:5},
];

let layers = [];
let angle  = 0;

// ----------------------------------------------------
function setup() {
  let cnv = createCanvas(680, 480);
  cnv.parent('sketch-root');
  noFill();
  genCity(6);
}

function mousePressed() {
  genCity(int(random(4, 9)));
}

// ----------------------------------------------------
function genCity(n) {
  layers = [];
  // plan arrière  — plus petit, GY plus haut
  layers.push({ buildings: genLayer(n+2, height-130, 0.72, int(random(-20,20))), GY: height-130, alpha: 0.32, ss: 0.65 });
  // plan milieu
  layers.push({ buildings: genLayer(n+1, height-80,  0.88, int(random(-10,10))), GY: height-80,  alpha: 0.50, ss: 0.82 });
  // plan avant
  layers.push({ buildings: genLayer(n,   height-55,  1.0,  0),                   GY: height-55,  alpha: 1.0,  ss: 1.0  });
}

function genLayer(n, GY, scale, offset) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    let slotW = (width - 40) / n;
    let bw    = int(random(slotW*0.45, slotW*0.82)) * scale;
    let bx    = 20 + i*slotW + (slotW - bw/scale)/2 + offset;
    let nF    = int(random(2, 9));
    let floors= [], curY = GY;
    for (let f = 0; f < nF; f++) {
      let fh = int(random(28, 46)) * scale;
      curY  -= fh;
      floors.push({ y: curY, h: fh });
    }
    arr.push({
      bx, bw, floors, topY: curY,
      roofStyle: random(['flat','shed','pitched','tank']),
      cfgIdx: int(random(CFGS.length)),
      phase:  random(TWO_PI),
    });
  }
  return arr;
}

// ----------------------------------------------------
function draw() {
  angle += 0.009;

  background(6, 8, 16);

  // lune
  fill(232, 224, 192); noStroke();
  circle(width-75, 42, 30);
  fill(6, 8, 16);
  circle(width-67, 37, 24);
  noFill();

  // sol + bâtiments plan par plan (fond → avant)
  layers.forEach(layer => {
    let gcol = color(100, 140, 80, layer.alpha * 90);
    starLine(0, layer.GY, width, layer.GY, 5*layer.ss, gcol, 0.8, 2, 0.3);
    layer.buildings.forEach(b => drawBuilding(b, layer.GY, layer.alpha, layer.ss));
  });
}

// ----------------------------------------------------
function drawBuilding(b, GY, alpha, ss) {
  let R  = 5.5 * ss;
  let dim    = color(160, 185, 255, alpha * 140);
  let bright = color(220, 230, 255, alpha * 190);
  let tx = b.bx, tw = b.bw, ty = b.topY;

  // murs verticaux
  starLine(b.bx,      b.topY, b.bx,      GY, R, dim, 0.7, b.cfgIdx,   b.phase);
  starLine(b.bx+b.bw, b.topY, b.bx+b.bw, GY, R, dim, 0.7, b.cfgIdx+2, b.phase+2);

  // dalles horizontales
  b.floors.forEach(fl => {
    starLine(b.bx, fl.y, b.bx+b.bw, fl.y, R, bright, 0.9, b.cfgIdx, b.phase + fl.y*0.01);
  });

  // toit
  if (b.roofStyle === 'flat') {
    starLine(tx-3, ty-6, tx+tw+3, ty-6,  R, bright, 1.0, b.cfgIdx,   b.phase);
    starLine(tx-3, ty-6, tx-3,    ty,     R, dim,    0.8, b.cfgIdx,   b.phase+1);
    starLine(tx+tw+3, ty-6, tx+tw+3, ty,  R, dim,    0.8, b.cfgIdx+1, b.phase+1);
  } else if (b.roofStyle === 'shed') {
    starLine(tx,    ty,    tx,    ty-20,  R, dim,    0.9, b.cfgIdx,   b.phase);
    starLine(tx,    ty-20, tx+tw, ty-8,   R, bright, 1.0, b.cfgIdx,   b.phase);
    starLine(tx+tw, ty-8,  tx+tw, ty,     R, dim,    0.9, b.cfgIdx+1, b.phase);
  } else if (b.roofStyle === 'pitched') {
    starLine(tx,      ty, tx+tw/2, ty-28, R, bright, 1.0, b.cfgIdx, b.phase);
    starLine(tx+tw/2, ty-28, tx+tw, ty,   R, bright, 1.0, b.cfgIdx, b.phase);
  } else {
    // tank
    starLine(tx,     ty,    tx+tw,   ty,    R, bright, 1.0, b.cfgIdx, b.phase);
    let ttx = tx + tw/2 - 9;
    starLine(ttx,    ty,    ttx,     ty-22, R, dim,    0.8, b.cfgIdx, b.phase);
    starLine(ttx+18, ty,    ttx+18,  ty-22, R, dim,    0.8, b.cfgIdx, b.phase);
    starLine(ttx,    ty-22, ttx+18,  ty-22, R, bright, 1.0, b.cfgIdx, b.phase);
    starLine(ttx-4,  ty-22, ttx+9,   ty-32, R, bright, 1.0, b.cfgIdx, b.phase);
    starLine(ttx+22, ty-22, ttx+9,   ty-32, R, bright, 1.0, b.cfgIdx, b.phase);
  }

  // fenêtres = étoiles libres, sans rectangle
  b.floors.forEach(fl => {
    let nWin = max(1, round(b.bw / 44));
    let margin = b.bw * 0.12;
    let slot   = (b.bw - margin*2) / nWin;
    let maxR   = min(slot*0.34, fl.h*0.30, R*3.2);
    for (let wi = 0; wi < nWin; wi++) {
      let cx  = b.bx + margin + wi*slot + slot/2;
      let cy  = fl.y + fl.h*0.52;
      let ph  = b.phase + wi*1.1 + fl.y*0.02;
      let wr  = maxR * (0.72 + 0.28*sin(angle*0.5 + ph));
      let lit = (wi + floor(fl.y*0.03 + angle*0.2)) % 4 === 0;
      let wcfg= CFGS[(b.cfgIdx + wi*3) % CFGS.length];
      let wcol= lit ? color(240, 210, 60, alpha*230)
                    : color(100, 140, 220, alpha*140);
      drawStar(cx, cy, wcfg, wr, angle*(0.5+(wi%3)*0.3)+ph, wcol, lit?1.3:0.8);
    }
  });
}

// ----------------------------------------------------
// Ligne d'étoiles de (x0,y0) à (x1,y1)
function starLine(x0, y0, x1, y1, R, col, lw, ci, ph) {
  let dx = x1-x0, dy = y1-y0;
  let len = dist(x0, y0, x1, y1);
  let n   = max(1, round(len / (R*1.9)));
  for (let i = 0; i <= n; i++) {
    let t   = i / n;
    let cfg = CFGS[(ci+i) % CFGS.length];
    let a   = angle*(0.4 + i%3*0.25) + ph + i*0.38;
    drawStar(x0+dx*t, y0+dy*t, cfg, R, a, col, lw);
  }
}

// Étoile régulière centrée en (cx,cy)
function drawStar(cx, cy, cfg, R, ang, col, lw) {
  stroke(col);
  strokeWeight(lw || 0.8);
  beginShape();
  for (let I = 0; I <= cfg.K; I++) {
    let a = 2*I*cfg.H*PI/cfg.K + ang - PI/2;
    vertex(cx + R*cos(a), cy + R*sin(a));
  }
  endShape(CLOSE);
}
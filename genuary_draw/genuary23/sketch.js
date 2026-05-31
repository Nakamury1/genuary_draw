// ETOILES REGULIERES
// GENUARY PROMPT 23 = Transparency

let NP = 480;
let PI = Math.PI;

let drops = [];

function setup() {
  createCanvas(NP, NP);
  background(240, 235, 220); // fond papier ivoire

  // quelques gouttes initiales
  for (let i = 0; i < 5; i++) {
    addDrop(random(NP), random(NP));
  }
}

function draw() {
  drops.forEach((d, i) => {

    // chaque goutte = plusieurs étoiles concentriques qui grandissent
    d.layers.forEach(l => {
      l.R     += l.speed;
      l.alpha  = map(l.R, l.R0, l.maxR, l.alphaMax, 0);
      l.alpha  = constrain(l.alpha, 0, 255);

      if (l.alpha <= 0) return;

      // légère déformation organique
      stroke(d.col[0], d.col[1], d.col[2], l.alpha * 0.6);
      strokeWeight(0.5);
      fill(d.col[0], d.col[1], d.col[2], l.alpha);

      beginShape();
      for (let I = 0; I < l.K; I++) {
        let angle = 2 * I * l.H * PI / l.K + l.AD;
        // déformation : rayon légèrement bruité
        let noise_r = l.R * (1 + 0.08 * sin(I * 7.3 + d.seed));
        let X = d.x + noise_r * cos(angle);
        let Y = d.y + noise_r * sin(angle);
        vertex(X, Y);
      }
      endShape(CLOSE);
    });

    // supprimer goutte morte
    if (d.layers.every(l => l.alpha <= 0)) {
      drops.splice(i, 1);
    }
  });
}

function addDrop(x, y) {
  // couleur encre : bleu/violet/rouge/brun aléatoire
  let palettes = [
    [20,  40,  120],  // bleu encre
    [100, 20,  80],   // violet
    [140, 30,  20],   // rouge brique
    [20,  80,  60],   // vert eau
    [80,  50,  20],   // brun sépia
  ];
  let col = palettes[int(random(palettes.length))];

  let layers = [];
  let configs = [
    { K: 5,  H: 2, speed: 0.4, alphaMax: 60  },
    { K: 7,  H: 3, speed: 0.6, alphaMax: 45  },
    { K: 11, H: 4, speed: 0.8, alphaMax: 30  },
    { K: 13, H: 5, speed: 1.1, alphaMax: 20  },
  ];

  configs.forEach(({ K, H, speed, alphaMax }) => {
    let R0 = random(2, 6);
    layers.push({
      K, H,
      R:        R0,
      R0:       R0,
      maxR:     random(NP * 0.15, NP * 0.35),
      speed,
      alphaMax,
      alpha:    alphaMax,
      AD:       random(TWO_PI),
    });
  });

  drops.push({
    x, y,
    col,
    seed:   random(100),
    layers,
  });
}

function mousePressed() {
  addDrop(mouseX, mouseY);
}
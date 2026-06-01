// ETOILES REGULIERES
// GENUARY PROMPT 11 = Quine. A Quine is a form of code poetry, it’s a computer program that outputs exactly its own source code.

let src;

let NP = 480;
let PI = Math.PI;

function setup() {
  let cnv = createCanvas(NP, NP);
  cnv.parent('sketch-root');
  background(0);
  noLoop();

  src = [
    "// GENUARY PROMPT 11 = Quine",
    "",
    "let src;",
    "let NP = 480;",
    "let PI = Math.PI;",
    "",
    "function setup() {",
    "  createCanvas(NP, NP);",
    "  background(0);",
    "  noLoop();",
    "  src = getSrc();",
    "  drawQuine();",
    "}",
    "",
    "function drawQuine() {",
    "  let CX = NP / 2;",
    "  let CY = NP / 2;",
    "  let configs = [",
    "    { K:5,  H:2, R:NP*0.44, sz:5.5 },",
    "    { K:7,  H:3, R:NP*0.36, sz:4.5 },",
    "    { K:11, H:4, R:NP*0.27, sz:3.5 },",
    "    { K:13, H:5, R:NP*0.18, sz:2.8 },",
    "  ];",
    "  let chars = src.join('').split('');",
    "  let idx = 0;",
    "  configs.forEach(({ K, H, R, sz }) => {",
    "    for (let I = 0; I < K; I++) {",
    "      let x0 = CX + R * cos(2*I*H*PI/K + PI/2);",
    "      let y0 = CY + R * sin(2*I*H*PI/K + PI/2);",
    "      let x1 = CX + (R*0.12) * cos(2*(I+1)*H*PI/K + PI/2);",
    "      let y1 = CY + (R*0.12) * sin(2*(I+1)*H*PI/K + PI/2);",
    "      let steps = 28;",
    "      for (let s = 0; s <= steps; s++) {",
    "        if (idx >= chars.length) idx = 0;",
    "        let t = s / steps;",
    "        let x = lerp(x0, x1, t);",
    "        let y = lerp(y0, y1, t);",
    "        let alpha = map(s, 0, steps, 255, 80);",
    "        let col = map(s, 0, steps, 180, 360);",
    "        fill(col % 255, 200, 255 - col % 255, alpha);",
    "        noStroke();",
    "        textSize(sz);",
    "        textFont('monospace');",
    "        textAlign(CENTER, CENTER);",
    "        text(chars[idx], x, y);",
    "        idx++;",
    "      }",
    "    }",
    "  });",
    "}",
    "",
    "function getSrc() { return src; }",
    "",
    "function draw() {}",
  ];

  drawQuine();
}

function drawQuine() {
  let CX = NP / 2;
  let CY = NP / 2;

  let configs = [
    { K: 5,  H: 2,  R: NP * 0.44, sz: 5.5 },
    { K: 7,  H: 3,  R: NP * 0.36, sz: 4.5 },
    { K: 11, H: 4,  R: NP * 0.27, sz: 3.5 },
    { K: 13, H: 5,  R: NP * 0.18, sz: 2.8 },
  ];

  let chars = src.join('').split('');
  let idx = 0;

  configs.forEach(({ K, H, R, sz }) => {
    for (let I = 0; I < K; I++) {
      let x0 = CX + R       * cos(2 * I     * H * PI / K + PI / 2);
      let y0 = CY + R       * sin(2 * I     * H * PI / K + PI / 2);
      let x1 = CX + R * 0.12 * cos(2 * (I+1) * H * PI / K + PI / 2);
      let y1 = CY + R * 0.12 * sin(2 * (I+1) * H * PI / K + PI / 2);

      let steps = 28;
      for (let s = 0; s <= steps; s++) {
        if (idx >= chars.length) idx = 0;

        let t     = s / steps;
        let x     = lerp(x0, x1, t);
        let y     = lerp(y0, y1, t);
        let alpha = map(s, 0, steps, 255, 80);
        let col   = map(s, 0, steps, 180, 360);

        fill(col % 255, 200, 255 - col % 255, alpha);
        noStroke();
        textSize(12);
        textFont('monospace');
        textAlign(CENTER, CENTER);
        text(chars[idx], x, y);
        idx++;
      }
    }
  });
}

function draw() {}

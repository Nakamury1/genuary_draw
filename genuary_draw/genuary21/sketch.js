// ETOILES REGULIERES
// GENUARY PROMPT 21 = Bauhaus Poster. Create a poster design inspired by the German art school Bauhaus.

const C_ROUGE = '#D62828';
const C_BLEU  = '#003049';
const C_JAUNE = '#FDF0D5'; // Jaune Bauhaus / Crème
const C_ORANGE= '#F77F00';
const C_NOIR  = '#111111';
const C_FONDS = '#EAE2B7'; // Papier vieilli

function setup() {
  // Format d'affiche classique (Proportion 3:4)
  createCanvas(600, 800);
  noLoop(); // Pas d'animation pour garder l'aspect affiche imprimée
}

function draw() {
  background(C_FONDS);
  
  // 1. DESSIN DE LA GRILLE TECHNIQUE (Arrière-plan)
  stroke(C_NOIR);
  strokeWeight(1);
  noFill();
  
  let xGrille = 250;
  let yGrille = 180;
  let tailleGrille = 250;
  let pas = 25;
  
  for (let i = 0; i <= tailleGrille; i += pas) {
    line(xGrille + i, yGrille, xGrille + i, yGrille + tailleGrille);
    line(xGrille, yGrille + i, xGrille + tailleGrille, yGrille + i);
  }

  // Large ligne diagonale dynamique qui traverse l'affiche
  strokeWeight(4);
  line(50, 600, 550, 150);

  // 2. FORMES GÉOMÉTRIQUES PRIMAIRES
  // Grand cercle rouge (en haut à gauche) avec une découpe "Pacman" / mécanique
  fill(C_ROUGE);
  stroke(C_NOIR);
  strokeWeight(3);
  arc(200, 250, 160, 160, QUARTER_PI, TWO_PI - QUARTER_PI, PIE);
  
  // Triangle jaune central
  fill(C_ORANGE);
  triangle(150, 480, 250, 320, 350, 480);
  
  // Rectangle bleu structurel
  fill(C_BLEU);
  rect(350, 400, 120, 120);

  // Demi-cercle jaune type engrenage
  fill(C_ORANGE);
  arc(400, 250, 120, 120, PI, TWO_PI);

  // 3. LES ÉTOILES (Intégrées de façon géométrique)
  // Grosse étoile jaune à gauche
  push();
  translate(140, 380);
  dessineEtoile(0, 0, 15, 35, 5, C_ORANGE);
  pop();

  // Constellation d'étoiles constructivistes dans la grille (en haut à droite)
  dessineEtoile(430, 210, 8, 20, 4, C_ORANGE);
  dessineEtoile(470, 230, 6, 15, 5, C_BLEU);
  dessineEtoile(500, 200, 10, 25, 4, C_ORANGE);
  
  // Étoiles de taille moyenne près du bloc bleu
  dessineEtoile(480, 450, 7, 18, 5, C_ROUGE);
  dessineEtoile(460, 490, 12, 28, 4, C_BLEU);

  // 4. LES TRAMES DE POINTS (Halftones)
  fill(C_NOIR);
  noStroke();
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      ellipse(220 + x * 15, 470 + y * 15, 6, 6);
    }
  }

  // 5. BLOCS DE COULEURS INFÉRIEURS (Compositions de lignes)
  stroke(C_NOIR);
  strokeWeight(3);
  // Bloc diagonal bas gauche
  push();
  translate(100, 650);
  rotate(QUARTER_PI);
  fill(C_ROUGE);
  rect(0, 0, 80, 40);
  fill(C_BLEU);
  rect(0, 40, 80, 20);
  pop();

  // 6. TYPOGRAPHIE & TEXTES (Style Bauhaus sans-serif)
  // Note: On utilise 'sans-serif' par défaut, p5 appliquera Arial/Helvetica qui matchent bien.
  textFont('sans-serif');
  textAlign(LEFT, TOP);
  noStroke();
  
  // Titre principal : BAUHAUS
  fill(C_ROUGE);
  textSize(65);
  textStyle(BOLD);
  text("BAUHAUS", 55, 40);
  
  // Sous-titre : GENUARY 21
  fill(C_BLEU);
  textSize(32);
  text("GENUARY 21", 335, 65);
  
  // Petit encadré technique de l'exercice
  stroke(C_NOIR);
  strokeWeight(2);
  noFill();
  rect(55, 125, 250, 25);
  fill(C_NOIR);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  text("p5.js :: ETOILES_BAUHAUS", 65, 131);

  // Textes verticaux (Manifeste historique)
  push();
  translate(45, 540);
  rotate(-HALF_PI);
  textSize(14);
  fill(C_NOIR);
  text("1919 • WEIMAR / DESSAU • 1933", 0, 0);
  pop();

  // Grand bandeau textuel horizontal bas
  fill(C_NOIR);
  rect(55, 570, 490, 35);
  fill(C_FONDS);
  textSize(18);
  textAlign(CENTER, CENTER);
  text("ART • ARCHITECTURE • CRAFT", width/2, 587);

  // Texte incliné le long de la dynamique
  push();
  translate(300, 640);
  rotate(-0.55); // Aligné avec la pente globale
  fill(C_NOIR);
  textSize(16);
  textStyle(BOLD);
  text("FORM FOLLOWS FUNCTION", 0, 0);
  pop();

  // Ligne de pied de page
  stroke(C_NOIR);
  strokeWeight(2);
  line(55, 740, 545, 740);
  
  noStroke();
  fill(C_NOIR);
  textSize(11);
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  text("MANIFESTO • EDUCATION • WORKSHOP", width/2, 748);
  
  textSize(12);
  textStyle(BOLD);
  text("UN PROJET DE CODE ÉTINCELANT POUR P5.JS", width/2, 770);
  
  // Cadre extérieur global pour nettoyer l'affiche
  stroke(C_NOIR);
  strokeWeight(10);
  noFill();
  rect(5, 5, width-10, height-10);
}

// Fonction personnalisée pour dessiner des étoiles géométriques parfaites
function dessineEtoile(x, y, rayon1, rayon2, npoints, couleur) {
  push();
  translate(x, y);
  fill(couleur);
  stroke(C_NOIR);
  strokeWeight(2);
  
  let angle = TWO_PI / npoints;
  let demiAngle = angle / 2.0;
  
  beginShape();
  for (let a = -HALF_PI; a < TWO_PI - HALF_PI; a += angle) {
    let sx = cos(a) * rayon2;
    let sy = sin(a) * rayon2;
    vertex(sx, sy);
    sx = cos(a + demiAngle) * rayon1;
    sy = sin(a + demiAngle) * rayon1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  pop();
}
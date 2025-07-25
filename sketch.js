// ============================================================================
//  ALUMNA: CANDELA DI GENOVA
//  f‑n‑orma – sketch.js
//  ---------------------------------------------------------------------------
//  ▸ Este archivo contiene la configuración principal de p5.js para el proyecto
//    "f‑n‑orma". 
//       1. Variables globales & configuración
//       2. Funciones preload, setup, draw, events
//       3. Funciones utilitarias (título glitch, creación de botones, etc.)
// ============================================================================

// -----------------------------------------------------------------------------
// VARIABLES GLOBALES
// -----------------------------------------------------------------------------

// Navegador responsable de coordinar las pantallas
let nav = new Navegador();

// Fuentes tipográficas
let orbitron; // Se utiliza para el título con efecto glitch
let jura;     // Fuente para el resto de textos

//Imagenes
let flechasImg;
let mouseImg;
let fondoImg;

// Configuración del efecto glitch del título
const palabras = ["Forma", "Norma"];
let indice = 0;                // Índice de palabra actual
const tiempoCambio = 2000;     // Intervalo de cambio (ms)
let ultimoCambio = 0;          // Marca de tiempo del último cambio
const glitchDuracion = 200;    // Duración del glitch (ms)
let enGlitch = false;          // ¿Se está mostrando el glitch ahora?

// -----------------------------------------------------------------------------
// CARGA DE RECURSOS (preload)
// -----------------------------------------------------------------------------
function preload() {
  // Precargar las fuentes antes de que comience el sketch
  orbitron = loadFont("assets/fonts/Orbitron-Black.ttf");
  jura = loadFont("assets/fonts/Jura-Bold.ttf");
  flechasImg = loadImage("assets/img/flechas.png");
  mouseImg = loadImage("assets/img/mouse.png");
  fondoImg = loadImage("assets/img/grietas.png");
}

// -----------------------------------------------------------------------------
// INICIALIZACIÓN (setup)
// -----------------------------------------------------------------------------
function setup() {
  createCanvas(800, 700);      // Canvas fijo centrado mediante CSS
  textFont(jura);              // Fuente por defecto del sketch
  cargarPantallas();           // Alta de todas las pantallas en el navegador
}

// -----------------------------------------------------------------------------
// LOOP PRINCIPAL (draw)
// -----------------------------------------------------------------------------
function draw() {
  // Delegar el render a la pantalla activa
  nav.pantallaActual.draw();
}

// -----------------------------------------------------------------------------
// EVENTOS DE ENTRADA
// -----------------------------------------------------------------------------
function mousePressed() {
  nav.pantallaActual.mousePressed(); // Propagar clic a la pantalla actual
}

function keyPressed() {
  nav.pantallaActual.keyPressed();   // Propagar teclado a la pantalla actual
}

function keyReleased() {
  // Propagar evento de tecla soltada a la pantalla actual (si tiene el método)
  if (nav.pantallaActual.keyReleased) {
    nav.pantallaActual.keyReleased();
  }
}

// ============================================================================
// FUNCIONES UTILITARIAS
// ============================================================================

// -- 1.  Cargar y registrar las pantallas en el Navegador ---------------------
function cargarPantallas() {
  const pantallas = [
    new PantallaInicial(),  // índice 0
    new PantallaNav(),      // índice 1
    new Pantalla01(),       // índice 2
    new Pantalla02(),       // índice 3
    new Pantalla03(),       // índice 4
    new PantallaFinal()     // índice 5
  ];
  pantallas.forEach(p => nav.agregarPantalla(p));
}

// -- 2.  Dibujar el título con efecto glitch ---------------------------------
function dibujarTitulo() {
  const ahora = millis();

  // Cambiar la palabra tras el intervalo definido
  if (ahora - ultimoCambio > tiempoCambio) {
    enGlitch = true;
    ultimoCambio = ahora;
    indice = (indice + 1) % palabras.length;
  }

  push();                     // Guardar estado de dibujo
  textFont(orbitron);
  textSize(80);
  textAlign(CENTER, CENTER);

  // Mostrar con o sin glitch
  if (enGlitch) {
    glitchTexto(palabras[indice]);
    if (ahora - ultimoCambio > glitchDuracion) enGlitch = false;
  } else {
    mostrarTexto(palabras[indice]);
  }
  pop();                      // Restaurar estado de dibujo
}

// Dibuja el texto sin efecto
function mostrarTexto(txt) {
  fill("#F27E63");
  noStroke();
  text(txt, width / 2, 100);
}

// Dibuja varias copias desfasadas para simular glitch
function glitchTexto(txt) {
  noStroke();
  for (let i = 0; i < 5; i++) {
    const dx = random(-3, 3);
    const dy = random(-3, 3);
    fill(242, 126, 99, 150); // #F27E63 con transparencia
    text(txt, width / 2 + dx, 100 + dy);
  }
}

// -- 3.  Fábrica de botones estilizados --------------------------------------
function crearBoton(texto, x, y, ancho, alto, indicePantalla) {
  return new Boton(
    texto,
    x, y,
    ancho, alto,
    50,           // Radio de borde
    "#B0B5C1",    // Color de fondo normal
    "#1E1E28",    // Color de texto normal
    "#F27E63",    // Color de fondo hover
    "#1E1E28",    // Color de texto hover
    () => nav.selectPantalla(indicePantalla) // Callback → cambiar pantalla
  );
}
// -----------------------------------------------------------------------------
//  ALUMNA: CANDELA DI GENOVA
// -----------------------------------------------------------------------------
// ARCHIVO PRINCIPAL DEL SKETCH - Configura la navegación entre pantallas,
// carga recursos, y define efectos visuales como el título glitch animado.
// -----------------------------------------------------------------------------

// Navegador de pantallas: gestiona el flujo visual del programa
let nav = new Navegador();

// Fuentes tipográficas del proyecto
let orbitron; // Fuente para el título animado
let jura;     // Fuente para textos y botones

// Imágenes utilizadas en distintas pantallas
let flechasImg;
let mouseImg;
let fondoImg;
let spaceImg;

// Sonidos de la aplicación
let sonidoHover;
let sonidoClick;
let sonidoSubirOpacidad;
let sonidoColision;

// Configuración del efecto "glitch" del título
const palabras = ["Forma", "Norma"]; // Palabras que alternan con efecto glitch
let indice = 0;                       // Palabra actualmente mostrada
const tiempoCambio = 2000;            // Tiempo entre cambios de palabra (ms)
let ultimoCambio = 0;                 // Timestamp del último cambio
const glitchDuracion = 200;           // Duración del efecto glitch (ms)
let enGlitch = false;                 // Indica si el glitch está activo

// PRELOAD: carga previa de recursos multimedia antes de iniciar el programa
function preload() {
  // Carga de fuentes tipográficas
  orbitron = loadFont("assets/fonts/Orbitron-Black.ttf");
  jura = loadFont("assets/fonts/Jura-Bold.ttf");

  // Carga de imágenes
  flechasImg = loadImage("assets/img/flechas.png");
  mouseImg = loadImage("assets/img/mouse.png");
  fondoImg = loadImage("assets/img/grietas.png");
  spaceImg = loadImage("assets/img/space.png");

  // Carga de sonidos
  sonidoHover = loadSound("assets/sounds/hover.mp3");
  sonidoClick = loadSound("assets/sounds/click.mp3");
  sonidoSubirOpacidad = loadSound("assets/sounds/subir-opacidad.mp3");
  sonidoColision = loadSound("assets/sounds/colision.mp3");
}

// SETUP: configuración inicial del lienzo y sistema de navegación
function setup() {
  createCanvas(800, 700);  // Lienzo fijo
  textFont(jura);          // Fuente predeterminada
  cargarPantallas();       // Registra todas las pantallas en el navegador
}

// DRAW: loop principal que delega renderizado a la pantalla activa
function draw() {
  nav.pantallaActual.draw();
}

// EVENTOS DE INTERACCIÓN: delegación de mouse y teclado a la pantalla activa
function mousePressed() {
  nav.pantallaActual.mousePressed();
}

function keyPressed() {
  nav.pantallaActual.keyPressed();
}

function keyReleased() {
  if (nav.pantallaActual.keyReleased) {
    nav.pantallaActual.keyReleased();
  }
}

// Función para registrar todas las pantallas en el navegador
function cargarPantallas() {
  const pantallas = [
    new PantallaInicial(),  // Índice 0: pantalla de inicio
    new PantallaNav(),      // Índice 1: menú de navegación
    new Pantalla01(),       // Índice 2: primera escena
    new Pantalla02(),       // Índice 3: segunda escena
    new Pantalla03(),       // Índice 4: tercera escena
    new PantallaFinal()     // Índice 5: pantalla final
  ];

  pantallas.forEach(p => nav.agregarPantalla(p));
}

// Dibuja el título con efecto glitch
function dibujarTitulo() {
  const ahora = millis();

  // Cambio de palabra según tiempo transcurrido
  if (ahora - ultimoCambio > tiempoCambio) {
    enGlitch = true;
    ultimoCambio = ahora;
    indice = (indice + 1) % palabras.length;
  }

  push();
  textFont(orbitron);
  textSize(80);
  textAlign(CENTER, CENTER);

  if (enGlitch) {
    glitchTexto(palabras[indice]); // Efecto glitch
    if (ahora - ultimoCambio > glitchDuracion) enGlitch = false;
  } else {
    mostrarTexto(palabras[indice]); // Texto normal
  }

  pop();
}

// Muestra texto estático sin efecto
function mostrarTexto(txt) {
  fill("#F27E63"); 
  noStroke();
  text(txt, width / 2, 100);
}

// Genera efecto glitch con copias desfasadas y transparencia
function glitchTexto(txt) {
  noStroke();
  for (let i = 0; i < 5; i++) {
    const dx = random(-3, 3);
    const dy = random(-3, 3);
    fill(242, 126, 99, 150);
    text(txt, width / 2 + dx, 100 + dy);
  }
}

// Función para crear botones personalizados 
function crearBoton(texto, x, y, ancho, alto, indicePantalla) {
  return new Boton(
    texto,       // Texto visible
    x, y,        // Posición
    ancho, alto, // Tamaño
    50,          // Radio de esquinas
    "#B0B5C1",   // Color fondo normal
    "#1E1E28",   // Color texto normal
    "#F27E63",   // Color fondo hover
    "#1E1E28",   // Color texto hover
    () => nav.selectPantalla(indicePantalla) // Acción al clic
  );
}

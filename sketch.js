// ============================================================================
//  ALUMNA: CANDELA
//  f‑n‑orma – sketch.js
// -----------------------------------------------------------------------------
// ARCHIVO PRINCIPAL DEL SKETCH - Configura la navegación entre pantallas,
// carga recursos, y define efectos visuales como el título glitch animado.
// -----------------------------------------------------------------------------
// ============================================================================

// INavegador de pantallas, gestiona el flujo visual del programa.
let nav = new Navegador();

// Variables para las fuentes tipográficas del proyecto.
let orbitron; // Fuente para el título
let jura;     // Fuente para el resto de los textos del sitio

// Variables para imágenes utilizadas en distintas pantallas (íconos e imagen de fondo).
let flechasImg;
let mouseImg;
let fondoImg;

// Configuración general del efecto de "glitch" para el título animado.
const palabras = ["Forma", "Norma"];  // Palabras que se alternan con el efecto glitch.
let indice = 0;                        // Índice de la palabra actualmente mostrada.
const tiempoCambio = 2000;            // Tiempo en milisegundos entre cada cambio de palabra.
let ultimoCambio = 0;                 // Timestamp del último cambio realizado.
const glitchDuracion = 200;           // Duración del efecto glitch una vez activado (en ms).
let enGlitch = false;                 // Flag que indica si el efecto glitch está activo en este momento.

// -----------------------------------------------------------------------------
// PRELOAD: carga previa de recursos multimedia antes de iniciar el programa.
// -----------------------------------------------------------------------------
function preload() {
  // Precarga de fuentes tipográficas.
  orbitron = loadFont("assets/fonts/Orbitron-Black.ttf");
  jura = loadFont("assets/fonts/Jura-Bold.ttf");

  // Precarga de imágenes.
  flechasImg = loadImage("assets/img/flechas.png");
  mouseImg = loadImage("assets/img/mouse.png");
  fondoImg = loadImage("assets/img/grietas.png");
}

// -----------------------------------------------------------------------------
// SETUP: configuración inicial del lienzo y el sistema de navegación.
// -----------------------------------------------------------------------------
function setup() {
  createCanvas(800, 700);  // Crea un lienzo de tamaño fijo (centrado por CSS).
  textFont(jura);          // Establece la fuente base como predeterminada.
  cargarPantallas();       // Registra todas las pantallas que se utilizarán.
}

// -----------------------------------------------------------------------------
// DRAW: loop principal que delega el render a la pantalla activa.
// -----------------------------------------------------------------------------
function draw() {
  nav.pantallaActual.draw();  // Llama al método draw() de la pantalla actual.
}

// -----------------------------------------------------------------------------
// EVENTOS DE INTERACCIÓN: mouse y teclado son delegados a la pantalla activa.
// -----------------------------------------------------------------------------

function mousePressed() {
  nav.pantallaActual.mousePressed(); // Pasa el clic del mouse a la pantalla activa.
}

function keyPressed() {
  nav.pantallaActual.keyPressed();   // Pasa la tecla presionada a la pantalla activa.
}

function keyReleased() {
  // Solo propaga el evento si la pantalla implementa el método keyReleased.
  if (nav.pantallaActual.keyReleased) {
    nav.pantallaActual.keyReleased();
  }
}

// -----------------------------------------------------------------------------
// 1. FUNCIÓN PARA REGISTRAR PANTALLAS EN EL NAVEGADOR
// -----------------------------------------------------------------------------
function cargarPantallas() {
  const pantallas = [
    new PantallaInicial(),  // Índice 0: pantalla de inicio.
    new PantallaNav(),      // Índice 1: menú de navegación.
    new Pantalla01(),       // Índice 2: pantalla 1.
    new Pantalla02(),       // Índice 3: pantalla 2.
    new Pantalla03(),       // Índice 4: pantalla 3.
    new PantallaFinal()     // Índice 5: pantalla final o cierre.
  ];

  // Agrega cada pantalla al navegador.
  pantallas.forEach(p => nav.agregarPantalla(p));
}

// -----------------------------------------------------------------------------
// 2. EFECTO GLITCH DEL TÍTULO
// -----------------------------------------------------------------------------
function dibujarTitulo() {
  const ahora = millis();  // Tiempo actual desde el inicio del sketch.

  // Verifica si pasó el tiempo necesario para cambiar la palabra.
  if (ahora - ultimoCambio > tiempoCambio) {
    enGlitch = true;                     // Activa el glitch 
    ultimoCambio = ahora;               // Actualiza la marca de tiempo
    indice = (indice + 1) % palabras.length; // Avanza al siguiente texto
  }

  push(); // Guarda el estado gráfico actual para no afectar otros elementos

  //como se ve el titulo
  textFont(orbitron);
  textSize(80);
  textAlign(CENTER, CENTER);

  // Decide si mostrar el glitch o el texto normal.
  if (enGlitch) {
    glitchTexto(palabras[indice]); // Aplica el efecto visual.
    if (ahora - ultimoCambio > glitchDuracion) enGlitch = false; // Fin del glitch.
  } else {
    mostrarTexto(palabras[indice]); // Muestra el texto de forma normal.
  }

  pop(); // Restaura el estado gráfico anterior.
}

// Función para mostrar texto estático sin efecto.
function mostrarTexto(txt) {
  fill("#F27E63"); // Color coral principal.
  noStroke();
  text(txt, width / 2, 100); // Dibuja el texto centrado en la parte superior.
}

// Función para generar el efecto glitch con múltiples copias desfasadas.
function glitchTexto(txt) {
  noStroke();
  for (let i = 0; i < 5; i++) {
    const dx = random(-3, 3); // Desplazamiento aleatorio horizontal.
    const dy = random(-3, 3); // Desplazamiento aleatorio vertical.
    fill(242, 126, 99, 150);  // Mismo color con transparencia (#F27E63).
    text(txt, width / 2 + dx, 100 + dy); // Dibuja el texto desfasado.
  }
}

// -----------------------------------------------------------------------------
// 3. BOTONES PERSONALIZADOS - facilita la creación de botones.
// -----------------------------------------------------------------------------
function crearBoton(texto, x, y, ancho, alto, indicePantalla) {
  return new Boton(
    texto,       // Texto que se mostrará en el botón.
    x, y,        // Posición del botón.
    ancho, alto, // Tamaño del botón.
    50,          // Radio de las esquinas
    "#B0B5C1",   // Color de fondo normal
    "#1E1E28",   // Color de texto normal
    "#F27E63",   // Color de fondo en hover
    "#1E1E28",   // Color de texto en hover
    () => nav.selectPantalla(indicePantalla) // Acción al hacer clic → cambiar de pantalla.
  );
}

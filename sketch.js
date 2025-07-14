// VARIABLES GLOBALES

let nav = new Navegador();

let orbitron; // Variables globales para las fuentes
let jura;

let palabras = ["Forma", "Norma"]; // Variables para la funcion de dibujar el titulo con glitch
let indice = 0;
let tiempoCambio = 2000; // cada 2 segundos cambia
let ultimoCambio = 0;
let glitchDuracion = 200; // duración del glitch
let enGlitch = false;

// Botones globales
let btnComenzar, btnEscenas;

function preload() {
  // Cargar la fuente antes de que inicie el programa
  orbitron = loadFont('assets/fonts/Orbitron-Black.ttf');
  jura = loadFont('assets/fonts/Jura-Bold.ttf')
}

function setup() {
  createCanvas(800, 700);
  textFont(jura); // carga global de la fuente
  
  

  let p = new PantallaInicial();
  nav.agregarPantalla(p);
  p = new PantallaNav();
  nav.agregarPantalla(p);
  p = new Pantalla01();
  nav.agregarPantalla(p);
  p = new Pantalla02();
  nav.agregarPantalla(p);
  p = new Pantalla03();
  nav.agregarPantalla(p);
  p = new PantallaFinal();
  nav.agregarPantalla(p);

}

function draw() {
  nav.pantallaActual.draw();
}

function mousePressed(){
  nav.pantallaActual.mousePressed();
  
  // Verificar clics en botones globales
  if (btnComenzar) btnComenzar.mousePressed();
  if (btnEscenas) btnEscenas.mousePressed();
}

function keyPressed(){
  nav.pantallaActual.keyPressed()
}


// Funcion GLOBAL para usar en 3 pantallas
function dibujarTitulo() {
  let ahora = millis();
  
  // Guardar el estado actual del texto
  push();
  
  // Configurar texto
  textFont(orbitron);
  textSize(80);
  textAlign(CENTER, CENTER);
  
  // Si es momento de cambiar palabra
  if (ahora - ultimoCambio > tiempoCambio) {
    enGlitch = true;
    ultimoCambio = ahora;
    indice = (indice + 1) % palabras.length;
  }
  
  if (enGlitch) {
    glitchTexto(palabras[indice]);
    if (ahora - ultimoCambio > glitchDuracion) {
      enGlitch = false;
    }
  } else {
    mostrarTexto(palabras[indice]);
  }
  
  // Restaurar el estado del texto
  pop();
}

function mostrarTexto(txt) {
  fill('#F27E63');
  noStroke();
  text(txt, width / 2, 100);
}

function glitchTexto(txt) {
  noStroke(); // Asegurar que no haya borde
  for (let i = 0; i < 5; i++) {
    let dx = random(-3, 3);
    let dy = random(-3, 3);
    fill(242, 126, 99, 150); // F27E63 con transparencia
    text(txt, width / 2 + dx, 100 + dy);
  }
}

// Función global para crear botones con el mismo formato
function crearBoton(texto, x, y, ancho, alto, indicePantalla) {
  return new Boton(
    texto,
    x, y,
    ancho, alto,
    50,           // redondeo de bordes
    "#B0B5C1",    // color de fondo
    "#1E1E28",    // color de texto
    "#F27E63",    // color de fondo hover
    "#1E1E28",    // color de texto hover (mismo color)
    () => nav.selectPantalla(indicePantalla)  // acción: ir a pantalla específica
  );
}
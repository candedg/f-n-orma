// ============================================================================
//  f‑n‑orma – pantalla02.js
//  ---------------------------------------------------------------------------
//  ▸ Segunda escena del recorrido. Al igual que la anterior, muestra solamente
//    un título central con el texto “ESCENA 02”.
//  ▸ Al hacer clic se avanza a la siguiente pantalla a través del Navegador.
// ============================================================================

class Pantalla02 extends Pantalla {
   constructor() {
    super();
    // Crear el sistema de cuadrados (ahora maneja 5 cuadrados internamente)
    this.cuadrados = new Cuadrados(width / 2, height / 2);
  }
  
  // -------------------------------------------------------------------------
  //  DRAW – Renderizado de la escena
  // -------------------------------------------------------------------------
  draw() {
    background("#1E1E28"); // Mismo color base que el resto de escenas
    // Texto “ESCENA 02” centrado en pantalla
        textFont(jura);
        textSize(30);
        textAlign(CENTER, CENTER);
        fill("#B0B5C1");
        noStroke();
        text("Por fuera te ves igual al resto", width / 2, 30);
        textSize(20);
        text("Ahora si puedes moverte", width / 2, 100);
        text("Parece que algo sigue siendo diferente...", width / 2, 160);
    //Incluir imagenes
    image(flechasImg, 100, 60, 70, 70);
    image(mouseImg, 635, 60, 60, 65);
    // Dibujar todos los cuadrados con sus colisiones
    this.cuadrados.setFondoConImagen(fondoImg); // imagen como fondo
this.cuadrados.draw();
  }

  // -------------------------------------------------------------------------
  //  Interacción – Avanzar de pantalla al hacer clic
  // -------------------------------------------------------------------------
  mousePressed() {
    print("mouse clicked desde pantalla01"); // Debug
    nav.siguientePantalla();                // Avanza en el Navegador
  }

  // -------------------------------------------------------------------------
  //  Manejo de teclado – (no utilizado por ahora)
  // -------------------------------------------------------------------------
  keyPressed() {
    print("no pasa nada");
  }
}
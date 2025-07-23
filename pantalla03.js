// ============================================================================
//  f‑n‑orma – pantalla03.js
//  ---------------------------------------------------------------------------
//  ▸ Tercera escena del recorrido. Al igual que las anteriores, muestra solamente
//    un título central con el texto “ESCENA 02”.
//  ▸ Al hacer clic se avanza a la siguiente pantalla a través del Navegador.
// ============================================================================

class Pantalla03 extends Pantalla {
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
    text("Te ves muy diferente a los demás", width / 2, 40);
    textSize(20);
    text("Pero ahora puedes moverte con la misma facilidad", width / 2, 90);
    //Incluir imagenes
    image(flechasImg, 365, 110, 70, 70);
    // Dibujar todos los cuadrados con sus colisiones

    this.cuadrados.setFondoLiso(); // fondo liso gris
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
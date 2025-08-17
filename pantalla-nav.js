// -----------------------------------------------------------------------------
// PANTALLA NAV — Navegador de escenas del recorrido
// -----------------------------------------------------------------------------
// Esta clase representa una pantalla de navegación que actúa como índice
// principal. Permite al usuario moverse directamente hacia cualquier sección 
// del recorrido narrativo a través de botones interactivos.
//   - "PRESENTACIÓN" → PantallaInicial (índice 0)
//   - "INTEMPERIE"   → Pantalla01      (índice 2)
//   - "IMPOSICIÓN"   → Pantalla02      (índice 3)
//   - "EQUILIBRIO"   → Pantalla03      (índice 4)
//   - "DESENLACE"    → PantallaFinal   (índice 5)
// -----------------------------------------------------------------------------

class PantallaNav extends Pantalla {
    constructor() {
        super(); // Llama al constructor de la clase base `Pantalla`

        // CREACIÓN DE BOTONES — Cada botón está asociado a un índice de pantalla
        this.btnInicio = crearBoton("PRESENTACIÓN", 240, 210, 320, 60, 0);
        this.btnIntemperie = crearBoton("INTEMPERIE", 240, 300, 320, 60, 2);
        this.btnImposicion = crearBoton("IMPOSICION", 240, 390, 320, 60, 3);
        this.btnEquilibrio = crearBoton("EQUILIBRIO", 240, 480, 320, 60, 4);
        this.btnFinal = crearBoton("DESENLACE", 240, 570, 320, 60, 5);
    }

    // DRAW – Renderizado de la pantalla de navegación
    draw() {
        background("#1E1E28");   
        dibujarTitulo();    
        textFont(jura);         

        // Dibujar los botones en el orden 
        this.btnInicio.draw();
        this.btnIntemperie.draw();
        this.btnImposicion.draw();
        this.btnEquilibrio.draw();
        this.btnFinal.draw();
    }

    // MOUSEPRESSED – Gestión de interacciones con el mouse
    // Propaga el evento de clic hacia cada botón de manera independiente
    mousePressed() {
        this.btnInicio.mousePressed();
        this.btnIntemperie.mousePressed();
        this.btnImposicion.mousePressed();
        this.btnEquilibrio.mousePressed();
        this.btnFinal.mousePressed();
    }

    // KEYPRESSED – Gestión de eventos de teclado (no se usa)
    keyPressed() {
    }
}

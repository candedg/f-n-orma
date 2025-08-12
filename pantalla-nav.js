// -----------------------------------------------------------------------------
// PANTALLA NAV — Navegador de escenas del recorrido
// -----------------------------------------------------------------------------
// Esta clase hereda de Pantalla y actúa como un menú principal o índice,
// permitiendo al usuario saltar directamente a cualquier sección del proyecto.
// Contiene cinco botones que redirigen a distintas pantallas por su índice:
//  - "PRESENTACIÓN" → PantallaInicial (índice 0)
//  - "INTEMPERIE"   → Pantalla01      (índice 2)
//  - "IMPOSICIÓN"   → Pantalla02      (índice 3)
//  - "EQUILIBRIO"   → Pantalla03      (índice 4)
//  - "DESENLACE"    → PantallaFinal   (índice 5)
// -----------------------------------------------------------------------------

class PantallaNav extends Pantalla {
    constructor() {
        super(); // Llama al constructor de la clase base Pantalla

        // Crear botones para navegar a cada sección del recorrido
        this.btnInicio = crearBoton("PRESENTACIÓN", 240, 210, 320, 60, 0);
        this.btnIntemperie = crearBoton("INTEMPERIE", 240, 300, 320, 60, 2);
        this.btnImposicion = crearBoton("IMPOSICION", 240, 390, 320, 60, 3);
        this.btnEquilibrio = crearBoton("EQUILIBRIO", 240, 480, 320, 60, 4);
        this.btnFinal = crearBoton("DESCENLACE", 240, 570, 320, 60, 5);
    }

    // -------------------------------------------------------------------------
    // DRAW – Renderizado de la pantalla de navegación
    // Se llama en cada frame mientras esta pantalla esté activa
    // -------------------------------------------------------------------------
    draw() {
        background("#1E1E28");   // Color de fondo oscuro uniforme

        dibujarTitulo();         // Muestra el título con efecto glitch

        textFont(jura);          // Establece la fuente Jura para los botones

        // Dibujar todos los botones uno por uno
        this.btnInicio.draw();
        this.btnIntemperie.draw();
        this.btnImposicion.draw();
        this.btnEquilibrio.draw();
        this.btnFinal.draw();
    }

    // -------------------------------------------------------------------------
    // MOUSEPRESSED – Propaga el clic a cada botón
    // Si el mouse está sobre un botón, se activa su acción asociada
    // -------------------------------------------------------------------------
    mousePressed() {
        this.btnInicio.mousePressed();
        this.btnIntemperie.mousePressed();
        this.btnImposicion.mousePressed();
        this.btnEquilibrio.mousePressed();
        this.btnFinal.mousePressed();
    }

    // -------------------------------------------------------------------------
    // KEYPRESSED – Método de teclado (no utilizado en esta pantalla)
    // -------------------------------------------------------------------------
    keyPressed() {
        print("no pasa nada");
    }
}

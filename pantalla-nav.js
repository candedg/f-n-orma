// ============================================================================
//  f‑n‑orma – pantalla-nav.js
//  ---------------------------------------------------------------------------
//  ▸ Pantalla de navegación que permite al usuario elegir directamente una escena
//    del recorrido. Cada botón accede a un índice específico del Navegador.
// ============================================================================

class PantallaNav extends Pantalla {
    constructor() {
        super();

        // Crear botones con sus posiciones e índices de pantalla
        this.btnInicio = crearBoton("PRESENTACIÓN", 240, 210, 320, 60, 0);
        this.btnIntemperie = crearBoton("INTEMPERIE", 240, 300, 320, 60, 2);
        this.btnImposicion = crearBoton("IMPOSICION", 240, 390, 320, 60, 3);
        this.btnEquilibrio = crearBoton("EQUILIBRIO", 240, 480, 320, 60, 4);
        this.btnFinal = crearBoton("DESCENLACE", 240, 570, 320, 60, 5);
    }

    // -------------------------------------------------------------------------
    //  DRAW – Renderizado de la escena
    // -------------------------------------------------------------------------
    draw() {
        background("#1E1E28"); // Fondo oscuro
        dibujarTitulo();      // Título con glitch en la parte superior

        textFont(jura);       // Fuente común para los botones

        // Dibujar todos los botones
        this.btnInicio.draw();
        this.btnIntemperie.draw();
        this.btnImposicion.draw();
        this.btnEquilibrio.draw();
        this.btnFinal.draw();
    }

    // -------------------------------------------------------------------------
    //  Interacción – Clic en cualquiera de los botones
    // -------------------------------------------------------------------------
    mousePressed() {
        this.btnInicio.mousePressed();
        this.btnIntemperie.mousePressed();
        this.btnImposicion.mousePressed();
        this.btnEquilibrio.mousePressed();
        this.btnFinal.mousePressed();
    }

    // -------------------------------------------------------------------------
    //  Manejo de teclado – (no utilizado)
    // -------------------------------------------------------------------------
    keyPressed() {
        print("no pasa nada");
    }
}

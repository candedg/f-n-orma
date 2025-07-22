// ============================================================================
//  f‑n‑orma – pantalla-final.js
//  ---------------------------------------------------------------------------
//  ▸ Pantalla de cierre del recorrido. Muestra un texto reflexivo final y un
//    botón para volver al inicio.
// ============================================================================

class PantallaFinal extends Pantalla {
    constructor() {
        super();

        // Crear botón para volver al comienzo del recorrido (índice 0)
        this.btnVolver = crearBoton("VOLVER", 240, 540, 320, 60, 0);
    }

    // -------------------------------------------------------------------------
    //  DRAW – Renderizado visual de la escena
    // -------------------------------------------------------------------------
    draw() {
        background("#1E1E28"); // Color de fondo uniforme
        dibujarTitulo();       // Mostrar título con efecto glitch

        this.dibujarTexto();   // Mostrar texto reflexivo final

        textFont(jura);        // Establecer fuente para botón
        this.btnVolver.draw(); // Dibujar botón de volver
    }

    // -------------------------------------------------------------------------
    //  Interacción – clic del mouse
    // -------------------------------------------------------------------------
    mousePressed() {
        this.btnVolver.mousePressed(); // Delegar el clic al botón
    }

    // -------------------------------------------------------------------------
    //  Manejo de teclado – (no utilizado)
    // -------------------------------------------------------------------------
    keyPressed() {
        print("no pasa nada");
    }

    // -------------------------------------------------------------------------
    //  Texto reflexivo final mostrado en pantalla
    // -------------------------------------------------------------------------
    dibujarTexto() {
        push();
        textFont(jura);
        textSize(25);
        textAlign(CENTER, CENTER);
        fill("#B0B5C1");
        noStroke();

        text("Llegaste al final.", width / 2, 300);
        text("Cada forma deja una huella...", width / 2, 350);
        text("Podés volver al inicio cuando lo necesites.", width / 2, 400);
        pop();
    }
}

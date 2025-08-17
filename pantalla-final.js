// -----------------------------------------------------------------------------
// PANTALLA FINAL — Indica el cierre del recorrido interactivo y ofrece reinicio
// -----------------------------------------------------------------------------
// Esta clase representa la escena final del recorrido. Hereda de `Pantalla` y
// muestra un mensaje reflexivo junto con un botón que permite reiniciar desde 
// la primera pantalla. Es el punto de "cierre" conceptual de la experiencia.
// -----------------------------------------------------------------------------

class PantallaFinal extends Pantalla {
    constructor() {
        super();

        // Crear botón interactivo que redirige al índice 0 (pantalla inicial)
        this.btnVolver = crearBoton("VOLVER", 240, 540, 320, 60, 0);
    }

    // DRAW – Renderizado visual de la escena
    draw() {
        background("#1E1E28");
        dibujarTitulo();

        this.dibujarTexto();

        textFont(jura);
        this.btnVolver.draw();
    }

    // INTERACCIÓN – Clic del mouse
    // Se delega el evento al botón "VOLVER". Este botón contiene la lógica
    // necesaria para cambiar la pantalla al índice inicial (reinicio).
    mousePressed() {
        this.btnVolver.mousePressed();
    }

    // MANEJO DE TECLADO – (no utilizado en esta pantalla)
    keyPressed() {
    }

    // Funcion para dibujar el texto
    dibujarTexto() {
        push();                  // Guardar estilos actuales
        textFont(jura);          // Aplicar tipografía
        textSize(25);            // Tamaño legible y equilibrado
        textAlign(CENTER, CENTER);
        fill("#B0B5C1");         // Color gris claro para contraste suave
        noStroke();

        // Mensajes distribuidos verticalmente en tres líneas
        text("Llegaste al final.", width / 2, 300);
        text("Cada forma deja una huella...", width / 2, 350);
        text("Podés volver al inicio cuando lo necesites.", width / 2, 400);

        pop();                   // Restaurar estilos anteriores
    }
}

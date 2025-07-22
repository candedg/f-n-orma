// ============================================================================
//  f‑n‑orma – pantalla-inicial.js
//  ---------------------------------------------------------------------------
//  ▸ Pantalla de introducción del proyecto.
//  ▸ Muestra el título con efecto glitch, una breve introducción poética y
//    dos botones para iniciar el recorrido o navegar por escenas.
// ============================================================================

class PantallaInicial extends Pantalla {
    constructor() {
        super();

        // Crear botones interactivos de esta pantalla:
        // COMENZAR → va a pantalla01 (índice 2)
        // ESCENAS  → va al navegador de escenas (índice 1)
        this.btnComenzar = crearBoton("COMENZAR", 80, 520, 280, 70, 2);
        this.btnEscenas = crearBoton("ESCENAS", 440, 520, 280, 70, 1);
    }

    draw() {
        background("#1E1E28");  // Fondo oscuro

        dibujarTitulo();        // Mostrar título animado con glitch
        this.dibujarTexto();    // Mostrar textos introductorios

        textFont(jura);         // Asegurar que los botones usen la fuente correcta

        // Dibujar botones
        this.btnComenzar.draw();
        this.btnEscenas.draw();
    }

    mousePressed() {
        // Delegar el clic a ambos botones
        this.btnComenzar.mousePressed();
        this.btnEscenas.mousePressed();
    }

    keyPressed() {
        // No se utiliza en esta pantalla, pero se deja por estructura
        print("no pasa nada");
    }

    dibujarTexto() {
        // Muestra el texto poético de introducción en varias líneas
        push();
        textFont(jura);
        textSize(25);
        textAlign(CENTER, CENTER);
        fill("#B0B5C1");
        noStroke();

        text("Un recorrido por la incomodidad de", width / 2, 220);
        text("intentar habitar una forma impuesta.", width / 2, 250);

        text("En el proceso, algo se quiebra…", width / 2, 320);
        text("Y algo nuevo comienza a moverse.", width / 2, 350);

        text("Dejate llevar. ", width / 2, 420);
        text("Cada escena guiará tus interacciones.", width / 2, 450);

        textSize(18);
        text("Autora: Candela S. Di Genova", width / 2, 660);
        text("UNA - Artes Multimediales", width / 2, 680);
        pop();
    }
}

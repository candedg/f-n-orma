// -----------------------------------------------------------------------------
// PANTALLA INICIAL — Presentación y navegación principal del proyecto
// -----------------------------------------------------------------------------
// Esta clase hereda de Pantalla y funciona como portada o bienvenida.
// Contiene:
//  - Un título animado con efecto glitch
//  - Un texto introductorio con tono poético
//  - Dos botones principales para avanzar:
//      • "COMENZAR" → dirige a la primera escena (índice 2)
//      • "ESCENAS"  → permite navegar entre distintas pantallas (índice 1)
//  - Datos de estudiante
// -----------------------------------------------------------------------------

class PantallaInicial extends Pantalla {
    constructor() {
        super(); // Llama al constructor de la clase base Pantalla

        // Crear botones interactivos específicos de esta pantalla
        this.btnComenzar = crearBoton("COMENZAR", 80, 520, 280, 70, 2); // Ir a Pantalla 01
        this.btnEscenas  = crearBoton("ESCENAS",  440, 520, 280, 70, 1); // Abrir navegador de escenas
    }

    // DRAW — Renderizado visual de la pantalla inicial
    draw() {
        background("#1E1E28");    // Fondo uniforme y oscuro
        dibujarTitulo();          // Título animado con efecto glitch
        this.dibujarTexto();      // Texto introductorio reflexivo

        textFont(jura);           // Estilo de fuente aplicado a los botones
        this.btnComenzar.draw();  // Botón "COMENZAR"
        this.btnEscenas.draw();   // Botón "ESCENAS"
    }

    // MOUSEPRESSED — Delegación del clic a los botones
    mousePressed() {
        this.btnComenzar.mousePressed();
        this.btnEscenas.mousePressed();
    }

    // KEYPRESSED — Interacción opcional con teclado (no utilizada aquí)
    keyPressed() {
    }

    // DIBUJARTEXTO — Texto introductorio y créditos
    dibujarTexto() {
        push();
        textFont(jura);           
        textSize(25);             
        textAlign(CENTER, CENTER); 
        fill("#B0B5C1");         
        noStroke();

        // Texto principal en frases breves
        text("Un recorrido por la incomodidad de", width / 2, 220);
        text("intentar habitar una forma impuesta.", width / 2, 250);

        text("En el proceso, algo se quiebra…", width / 2, 320);
        text("Y algo nuevo comienza a moverse.", width / 2, 350);

        text("Dejate llevar.", width / 2, 420);
        text("Cada escena guiará tus interacciones.", width / 2, 450);

        // Firma y créditos
        textSize(18);
        text("Autora: Candela S. Di Genova", width / 2, 660);
        text("UNA - Artes Multimediales", width / 2, 680);

        pop();
    }
}

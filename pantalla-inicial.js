// -----------------------------------------------------------------------------
// PANTALLA INICIAL — Presentación y navegación principal del proyecto
// -----------------------------------------------------------------------------
// Esta clase hereda de Pantalla y representa la portada o bienvenida.
// Contiene un título animado, un texto poético introductorio y dos botones:
//  - "COMENZAR" para ir a la primera escena (índice 2)
//  - "ESCENAS" para navegar entre las distintas pantallas (índice 1)
// -----------------------------------------------------------------------------

class PantallaInicial extends Pantalla {
    constructor() {
        super(); // Llama al constructor de la clase base Pantalla

        // Crear botones interactivos específicos de esta pantalla:
        // Cada uno invoca a `crearBoton()` con su texto, posición y destino.
        this.btnComenzar = crearBoton("COMENZAR", 80, 520, 280, 70, 2); // → Pantalla 01
        this.btnEscenas  = crearBoton("ESCENAS",  440, 520, 280, 70, 1); // → Navegador de escenas
    }

    // -------------------------------------------------------------------------
    // DRAW: método principal de renderizado de la pantalla inicial.
    // Se ejecuta en cada frame mientras esta pantalla esté activa.
    // -------------------------------------------------------------------------
    draw() {
        background("#1E1E28");    // Color de fondo oscuro uniforme

        dibujarTitulo();          // Dibuja el título animado con efecto glitch

        this.dibujarTexto();      // Muestra el texto introductorio

        textFont(jura);           // Asegura que la fuente Jura esté aplicada a los botones

        // Dibujar los botones en pantalla
        this.btnComenzar.draw();
        this.btnEscenas.draw();
    }

    // -------------------------------------------------------------------------
    // MOUSEPRESSED: delega el clic del mouse a los botones.
    // -------------------------------------------------------------------------
    mousePressed() {
        this.btnComenzar.mousePressed(); // Activa si el mouse está sobre "COMENZAR"
        this.btnEscenas.mousePressed();  // Activa si el mouse está sobre "ESCENAS"
    }

    // -------------------------------------------------------------------------
    // KEYPRESSED: método opcional para interacción con teclado.
    // En esta pantalla no se usa.
    // -------------------------------------------------------------------------
    keyPressed() {
        print("no pasa nada"); // Mensaje por defecto para dejar constancia
    }

    // -------------------------------------------------------------------------
    // DIBUJARTEXTO: muestra un texto de introducción dividido en frases.
    // Busca generar un tono reflexivo y abrir el sentido del recorrido.
    // -------------------------------------------------------------------------
    dibujarTexto() {
        push(); // Guarda el estado gráfico actual

        //como se ve el texto
        textFont(jura);           
        textSize(25);             
        textAlign(CENTER, CENTER); 
        fill("#B0B5C1");         
        noStroke();

        // Frases organizadas por bloques visuales
        text("Un recorrido por la incomodidad de", width / 2, 220);
        text("intentar habitar una forma impuesta.", width / 2, 250);

        text("En el proceso, algo se quiebra…", width / 2, 320);
        text("Y algo nuevo comienza a moverse.", width / 2, 350);

        text("Dejate llevar. ", width / 2, 420);
        text("Cada escena guiará tus interacciones.", width / 2, 450);

        // Firma y créditos (tamaño más pequeño)
        textSize(18);
        text("Autora: Candela S. Di Genova", width / 2, 660);
        text("UNA - Artes Multimediales", width / 2, 680);

        pop(); // Restaura el estado gráfico anterior
    }
}

class PantallaInicial extends Pantalla {
    constructor() {
        super();
        // Crear botones específicos para pantalla inicial
        this.btnComenzar = crearBoton("COMENZAR", 80, 520, 280, 70, 2); // ir a pantalla01 (índice 2)
        this.btnEscenas  = crearBoton("ESCENAS", 440, 520, 280, 70, 1);  // ir a pantalla-nav (índice 1)
    }

    draw() {
        background('#1E1E28');
        dibujarTitulo();
        this.dibujarTexto();
        
        // Asegurar que la fuente esté configurada correctamente para los botones
        textFont(jura);

        // Dibujar botones
        this.btnComenzar.draw();
        this.btnEscenas.draw();
    }

    mousePressed() {
        this.btnComenzar.mousePressed();
        this.btnEscenas.mousePressed();
    }

    keyPressed() {
        print('no pasa nada')
    }

    dibujarTexto() {
        // Asegurar que el texto tenga las propiedades correctas
        push();
        textFont(jura);
        textSize(25);
        textAlign(CENTER, CENTER);
        fill('#B0B5C1');
        noStroke(); // Asegurar que no haya borde en el texto
        text("Un recorrido por la incomodidad de", width / 2, 170 + 50);
        text("intentar habitar una forma impuesta.", width / 2, 170 + 80);
        text("En el proceso, algo se quiebra…", width / 2, 270 + 50);
        text("Y algo nuevo comienza a moverse.", width / 2, 270 + 80);
        text("Dejate llevar. ", width / 2, 370 + 50);
        text("Cada escena guiará tus interacciones.", width / 2, 370 + 80);
        textSize(18);
        text("Autora: Candela S. Di Genova", width / 2, 600 + 60);
        text("UNA - Artes Multimediales", width / 2, 600 + 80);
        pop();
    }
}
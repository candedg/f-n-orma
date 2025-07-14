class PantallaFinal extends Pantalla {
    constructor() {
        super();
        // Crear botones específicos para pantalla inicial
        this.btnVolver = crearBoton("VOLVER", 240, 540, 320, 60, 0); // ir a pantalla01 (índice 0)
    }

    draw() {
        background('#1E1E28');
        dibujarTitulo();
        this.dibujarTexto();
        
        // Asegurar que la fuente esté configurada correctamente para los botones
        textFont(jura);

        // Dibujar botones
        this.btnVolver.draw();
    }

    mousePressed() {
        this.btnVolver.mousePressed();
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
        text("Llegaste al final.", width / 2, 300);
        text("Cada forma deja una huella...", width / 2, 350);
        text("Podés volver al inicio cuando lo necesites.", width / 2, 400);
        pop();
    }
}
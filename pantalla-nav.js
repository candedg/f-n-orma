class PantallaNav extends Pantalla {
    constructor() {
        super();
        // Crear botones específicos para pantalla inicial
        this.btnInicio = crearBoton("PRESENTACIÓN", 240, 210, 320, 60, 0); // ir a pantalla-inicial (índice 0)
        this.btnIntemperie = crearBoton("INTEMPERIE", 240, 300, 320, 60, 2);   // ir a pantalla-nav (índice 1)
        this.btnImposicion = crearBoton("IMPOSICION", 240, 390, 320, 60, 3);   // ir a pantalla-nav (índice 1)
        this.btnEquilibrio = crearBoton("EQUILIBRIO", 240, 480, 320, 60, 4);   // ir a pantalla-nav (índice 1)
        this.btnFinal = crearBoton("DESCENLACE", 240, 570, 320, 60, 5);   // ir a pantalla-nav (índice 1)
    }

    draw() {
        background('#1E1E28');
        dibujarTitulo();
        
        // Asegurar que la fuente esté configurada correctamente para los botones
        textFont(jura);

        // Dibujar botones
        this.btnInicio.draw();
        this.btnIntemperie.draw();
        this.btnImposicion.draw();
        this.btnEquilibrio.draw();
        this.btnFinal.draw();
    }

    mousePressed() {
        this.btnInicio.mousePressed();
        this.btnIntemperie.mousePressed();
        this.btnImposicion.mousePressed();
        this.btnEquilibrio.mousePressed();
        this.btnFinal.mousePressed();
    }

    keyPressed() {
        print('no pasa nada')
    }

   
}
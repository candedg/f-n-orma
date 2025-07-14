class Pantalla02 extends Pantalla {
    draw(){
        background('#1E1E28');
        textFont(jura);
        textSize(25);
        textAlign(CENTER, CENTER);
        fill('#B0B5C1');
        noStroke(); // Asegurar que no haya borde en el texto
        text("ESCENA 02", width / 2, height / 2);
    }

    mousePressed() {
        print('mouse clicked desde pantalla02')
        nav.siguientePantalla();
    }

    keyPressed() {
        print('no pasa nada')
    }
}
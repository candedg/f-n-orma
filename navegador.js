class Navegador {
    constructor() {
        this.pantallas = [];
        this.indicePantalla = null;
        this.pantalllaActual = null;
    }
    agregarPantalla(p) {
        this.pantallas.push(p);
        if (!this.pantallaActual) {
            this.indicePantalla = 0;
            this.pantallaActual = p
        }
    }

    //pasar de pantalla
    siguientePantalla() {
        let i = (this.indicePantalla + 1) % this.pantallas.length;
        this.indicePantalla = i;
        this.pantallaActual = this.pantallas[i];
    }

    //volver a la pantalla anterior
    previaPantalla() {
        // let i = this.indicePantalla -1;
        // if(i<0){i = this.pantallas.length - 1};
        let i = (this.indicePantalla - 1 + this.pantallas.length) % this.pantallas.length;
        this.indicePantalla = i;
        this.pantallaActual = this.pantallas[i];
    }

    //seleccionar pantalla
    selectPantalla(num) {
    if (num >= 0 && num < this.pantallas.length) {
        this.indicePantalla = num;
        this.pantallaActual = this.pantallas[num];
    } else{
        print('Tecla no válida')
    }
}
}

class Pantalla {
    constructor(){
        
    }
}

class Boton {
    constructor(texto, x, y, ancho, alto, borde, colorFondo, colorTexto, colorFondoHover, colorTextoHover, accion) {
        this.texto = texto;
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
        this.borde = borde;
        this.colorFondo = colorFondo;
        this.colorTexto = colorTexto;
        this.colorFondoHover = colorFondoHover;
        this.colorTextoHover = colorTextoHover;
        this.accion = accion;
        this.hover = false;
        this.escalaHover = 1.03; // Factor de escalado en hover
    }

    draw() {
        // Detectar hover
        this.hover = (mouseX >= this.x && mouseX <= this.x + this.ancho &&
                     mouseY >= this.y && mouseY <= this.y + this.alto);
        
        // Calcular dimensiones y posición según hover
        let anchoFinal = this.ancho;
        let altoFinal = this.alto;
        let xFinal = this.x;
        let yFinal = this.y;
        
        if (this.hover) {
            anchoFinal = this.ancho * this.escalaHover;
            altoFinal = this.alto * this.escalaHover;
            xFinal = this.x - (anchoFinal - this.ancho) / 2;
            yFinal = this.y - (altoFinal - this.alto) / 2;
            
            // Dibujar box shadow (sombra)
            fill(242, 126, 99, 64); // F27E63 con 25% de opacidad (255 * 0.25 = 64)
            noStroke();
            // Simular blur dibujando múltiples rectángulos desplazados
            for (let i = 0; i < 5; i++) {
                let offset = i * 2;
                rect(xFinal - offset, yFinal - offset, anchoFinal + offset * 2, altoFinal + offset * 2, this.borde);
            }
        }
        
        // Dibujar botón con bordes redondeados
        if (this.hover) {
            fill(this.colorFondoHover);
            stroke(this.colorFondoHover);
        } else {
            fill(this.colorFondo);
            stroke(this.colorFondo);
        }
        
        strokeWeight(2);
        rect(xFinal, yFinal, anchoFinal, altoFinal, this.borde);
        
        // Dibujar texto
        if (this.hover) {
            fill(this.colorTextoHover);
        } else {
            fill(this.colorTexto);
        }
        
        textAlign(CENTER, CENTER);
        textSize(35);
        text(this.texto, xFinal + anchoFinal/2, yFinal + altoFinal/2 - 5);
    }

    mousePressed() {
        if (this.hover) {
            this.accion(); // Ejecutar la acción
        }
    }
}
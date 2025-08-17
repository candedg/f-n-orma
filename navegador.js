// -----------------------------------------------------------------------------
// NAVEGADOR — GESTOR DE PANTALLAS
// -----------------------------------------------------------------------------
// La clase Navegador coordina el flujo entre distintas pantallas del programa.
// Permite agregar, avanzar, retroceder y seleccionar pantallas por índice.
// -----------------------------------------------------------------------------
class Navegador {
    constructor() {
        this.pantallas = [];        // Array que contiene instancias de Pantalla
        this.indicePantalla = null; // Índice de la pantalla actualmente activa
        this.pantallaActual = null; // Referencia a la pantalla activa
    }

    // Agrega una nueva pantalla al navegador.
    // Si es la primera pantalla agregada, se activa automáticamente.
    agregarPantalla(p) {
        this.pantallas.push(p);
        if (!this.pantallaActual) {
            this.indicePantalla = 0;
            this.pantallaActual = p;
        }
    }

    // Avanza a la siguiente pantalla en el array.
    // El ciclo es circular: al llegar al final, vuelve al inicio.
    siguientePantalla() {
        const i = (this.indicePantalla + 1) % this.pantallas.length;
        this.indicePantalla = i;
        this.pantallaActual = this.pantallas[i];
    }

    // Selecciona una pantalla específica por índice.
    // Valida que el índice esté dentro de los límites del array.
    selectPantalla(num) {
        if (num >= 0 && num < this.pantallas.length) {
            this.indicePantalla = num;
            this.pantallaActual = this.pantallas[num];
        } else {
            print("Índice de pantalla no válido: " + num);
        }
    }
}

// Clase base Pantalla
// Se hereda para implementar pantallas personalizadas
class Pantalla {
    constructor() {
    }
}

// Clase Botón — componente interactivo reutilizable
// Representa un botón con estilo personalizado y efectos visuales
class Boton {
    constructor(
        texto, x, y, ancho, alto, borde,
        colorFondo, colorTexto,
        colorFondoHover, colorTextoHover,
        accion
    ) {
        // Propiedades de estilo y posicionamiento
        this.texto = texto;
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
        this.borde = borde;

        // Colores en estado normal y al hacer hover
        this.colorFondo = colorFondo;
        this.colorTexto = colorTexto;
        this.colorFondoHover = colorFondoHover;
        this.colorTextoHover = colorTextoHover;

        // Comportamiento interactivo
        this.accion = accion;
        this.hover = false;
        this.hoverAnterior = false; // Para detectar inicio del hover
        this.escalaHover = 1.03;    // Escala de zoom en hover
    }

    draw() {
        // 1. Detectar si el cursor está sobre el botón
        this.hoverAnterior = this.hover;
        this.hover = mouseX >= this.x && mouseX <= this.x + this.ancho &&
            mouseY >= this.y && mouseY <= this.y + this.alto;

        // Reproducir sonido al entrar en hover
        if (this.hover && !this.hoverAnterior && sonidoHover) {
            sonidoHover.play();
        }

        // 2. Ajustar tamaño si hay hover (efecto zoom)
        let anchoFinal = this.ancho;
        let altoFinal = this.alto;
        let xFinal = this.x;
        let yFinal = this.y;

        if (this.hover) {
            anchoFinal *= this.escalaHover;
            altoFinal *= this.escalaHover;
            xFinal = this.x - (anchoFinal - this.ancho) / 2;
            yFinal = this.y - (altoFinal - this.alto) / 2;

            // Sombra difusa simulada (blur soft)
            fill(242, 126, 99, 64);
            noStroke();
            for (let i = 0; i < 5; i++) {
                const offset = i * 2;
                rect(
                    xFinal - offset, yFinal - offset,
                    anchoFinal + offset * 2, altoFinal + offset * 2,
                    this.borde
                );
            }
        }

        // 3. Dibujar el rectángulo principal del botón
        fill(this.hover ? this.colorFondoHover : this.colorFondo);
        stroke(this.hover ? this.colorFondoHover : this.colorFondo);
        strokeWeight(2);
        rect(xFinal, yFinal, anchoFinal, altoFinal, this.borde);

        // 4. Dibujar el texto centrado dentro del botón
        fill(this.hover ? this.colorTextoHover : this.colorTexto);
        textAlign(CENTER, CENTER);
        textSize(35);
        text(this.texto, xFinal + anchoFinal / 2, yFinal + altoFinal / 2 - 5);
    }

    mousePressed() {
        if (this.hover) {
            // Reproducir sonido de seleccion de boton
            if (sonidoClick) {
                sonidoClick.play();
            }
            this.accion();
        }
    }
}

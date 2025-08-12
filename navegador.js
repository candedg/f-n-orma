// -----------------------------------------------------------------------------
// 1. NAVEGADOR — GESTOR DE PANTALLAS
// -----------------------------------------------------------------------------
// La clase Navegador coordina el flujo entre distintas pantallas del programa.
// Permite agregar, avanzar, retroceder y seleccionar pantallas por índice.
// -----------------------------------------------------------------------------

class Navegador {
    constructor() {
        this.pantallas = [];        // Array que contiene instancias de Pantalla.
        this.indicePantalla = null; // Índice de la pantalla actualmente activa.
        this.pantallaActual = null; // Referencia a la pantalla activa.
    }

    // ---------------------------------------------------------
    // Agrega una nueva pantalla al navegador.
    // Si es la primera pantalla agregada, se activa automáticamente.
    // ---------------------------------------------------------
    agregarPantalla(p) {
        this.pantallas.push(p);
        if (!this.pantallaActual) {
            this.indicePantalla = 0;
            this.pantallaActual = p;
        }
    }

    // ---------------------------------------------------------
    // Avanza a la siguiente pantalla en el array.
    // El ciclo es circular: al llegar al final, vuelve al inicio.
    // ---------------------------------------------------------
    siguientePantalla() {
        const i = (this.indicePantalla + 1) % this.pantallas.length;
        this.indicePantalla = i;
        this.pantallaActual = this.pantallas[i];
    }

    // ---------------------------------------------------------
    // Retrocede a la pantalla anterior.
    // El ciclo también es circular: al llegar al principio, vuelve al final.
    // ---------------------------------------------------------
    previaPantalla() {
        const i = (this.indicePantalla - 1 + this.pantallas.length) % this.pantallas.length;
        this.indicePantalla = i;
        this.pantallaActual = this.pantallas[i];
    }

    // ---------------------------------------------------------
    // Selecciona una pantalla específica por índice.
    // Valida que el índice esté dentro de los límites del array.
    // ---------------------------------------------------------
    selectPantalla(num) {
        if (num >= 0 && num < this.pantallas.length) {
            this.indicePantalla = num;
            this.pantallaActual = this.pantallas[num];
        } else {
            print("Índice de pantalla no válido: " + num);
        }
    }
}

// -----------------------------------------------------------------------------
// 2. PANTALLA — CLASE BASE
// -----------------------------------------------------------------------------
// Clase que sirve como base para definir pantallas específicas.
// Se hereda para implementar métodos personalizados.
// -----------------------------------------------------------------------------

class Pantalla {
    constructor() {
        // Clase vacía destinada a ser extendida por subclases.
    }
}

// -----------------------------------------------------------------------------
// 3. BOTÓN — COMPONENTE INTERACTIVO REUTILIZABLE
// -----------------------------------------------------------------------------
// Representa un botón con estilo personalizado y efectos visuales.
// Permite ejecutar una acción (callback) al hacer clic.
// -----------------------------------------------------------------------------

class Boton {
    constructor(
        texto, x, y, ancho, alto, borde,
        colorFondo, colorTexto,
        colorFondoHover, colorTextoHover,
        accion
    ) {
        // Propiedades de estilo y posicionamiento
        this.texto = texto;       // Texto que muestra el botón
        this.x = x;               // Posición horizontal
        this.y = y;               // Posición vertical
        this.ancho = ancho;       // Ancho del botón
        this.alto = alto;         // Alto del botón
        this.borde = borde;       // Radio de las esquinas

        // Colores en estado normal y al hacer hover
        this.colorFondo = colorFondo;
        this.colorTexto = colorTexto;
        this.colorFondoHover = colorFondoHover;
        this.colorTextoHover = colorTextoHover;

        // Comportamiento interactivo
        this.accion = accion;     // Función que se ejecuta al hacer clic
        this.hover = false;       // Indica si el mouse está encima
        this.escalaHover = 1.03;  // Factor de agrandamiento al hacer hover
    }

    // ---------------------------------------------------------
    // Método draw: dibuja el botón y gestiona el efecto hover
    // ---------------------------------------------------------
    draw() {
        // 1. Detectar si el cursor está sobre el botón
        this.hover = mouseX >= this.x && mouseX <= this.x + this.ancho &&
            mouseY >= this.y && mouseY <= this.y + this.alto;

        // 2. Preparar valores ajustados si hay hover (efecto de zoom)
        let anchoFinal = this.ancho;
        let altoFinal = this.alto;
        let xFinal = this.x;
        let yFinal = this.y;

        if (this.hover) {
            // Aumentar tamaño del botón ligeramente
            anchoFinal *= this.escalaHover;
            altoFinal *= this.escalaHover;
            xFinal = this.x - (anchoFinal - this.ancho) / 2;
            yFinal = this.y - (altoFinal - this.alto) / 2;

            // Dibujar sombra difusa simulada (blur soft)
            fill(242, 126, 99, 64); // Color coral con 25% de opacidad
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

    // ---------------------------------------------------------
    // Método mousePressed: ejecuta la acción si el mouse está encima
    // ---------------------------------------------------------
    mousePressed() {
        if (this.hover) {
            this.accion(); // Llama a la función callback asociada
        }
    }
}

class Pantalla03 extends Pantalla {
  constructor() {
    super();

    // Crear el sistema de cuadrados centrado en pantalla
    this.cuadrados = new Cuadrados(width / 2, height / 2);

    // Dimensiones de la máscara y el círculo interior
    this.diametroMascara = 65;  // Borde exterior
    this.diametroInterior = 35; // Círculo sólido

    // Variables para el movimiento
    this.velocidad = 3; // cuanto se mueve por frame el círculo
    this.direccionX = 0; // Dirección actual en X (-1, 0, 1)
    this.direccionY = 0; // Dirección actual en Y (-1, 0, 1)

    // Estado de las teclas presionadas
    this.teclas = {
      arriba: false,
      abajo: false,
      izquierda: false,
      derecha: false
    };
  }

  draw() {
    background("#1E1E28"); // Color base de la escena

    // Textos explicativos
    textFont(jura);
    textSize(30);
    textAlign(CENTER, CENTER);
    fill("#B0B5C1");
    noStroke();
    text("Te ves muy diferente a los demás", width / 2, 40);
    textSize(20);
    text("Pero ahora puedes moverte con la misma facilidad", width / 2, 90);
    // imagen explicativa
    image(flechasImg, 365, 110, 70, 70);

    // método que se encarga de mover el círculo si se están presionando las teclas
    this.actualizarMovimiento();

    // guarda la posición y tamaño de la máscara circular para que cada cuadrado pueda saber si está tocando esa área
    this.cuadrados.setMascara(this.mascaraX, this.mascaraY, this.diametroMascara, this.diametroMascara);

    // Dibujar los cuadrados
    this.cuadrados.setFondoLiso();
    this.cuadrados.draw();

    // Dibujar la máscara circular (borde + círculo sólido interior)
    this.dibujarMascara();
  }

  actualizarMovimiento() {
    // Solo se ejecuta una vez para dar una posición inicial a la máscara circular
    if (this.mascaraX === undefined || this.mascaraY === undefined) {
      // Calcular explícitamente las dimensiones del contenedor
      // usando la misma lógica que en cuadrados.js
      const contenedorX = (width - 780) / 2;  // 780 es this.contenedor.ancho
      const contenedorY = height - 500 - 10;  // 500 es this.contenedor.alto

      // Ponemos la máscara centrada horizontalmente y cerca del borde inferior del contenedor.
      this.mascaraX = contenedorX + 780 / 2;
      this.mascaraY = contenedorY + 500 - 50;
    }

    // Reinicia los valores en cada frame
    this.direccionX = 0;
    this.direccionY = 0;
    // Detecta si se está presionando alguna tecla, y actualiza la dirección de movimiento en X e Y
    if (this.teclas.izquierda) this.direccionX = -1;
    if (this.teclas.derecha) this.direccionX = 1;
    if (this.teclas.arriba) this.direccionY = -1;
    if (this.teclas.abajo) this.direccionY = 1;

    // Solo mover si hay dirección o sea alguna flecha siendo presionada
    if (this.direccionX !== 0 || this.direccionY !== 0) {
      // guarda datos contenedor
      const contenedor = this.cuadrados.contenedor;
      // guarda la mitad del diámetro de la máscara, para verificar bordes luego
      const radio = this.diametroMascara / 2;

      // Calcular nueva posición tentativa
      // calcula hacia dónde se movería la máscara si no hubiera obstáculos.
      let nuevaX = this.mascaraX + (this.direccionX * this.velocidad);
      let nuevaY = this.mascaraY + (this.direccionY * this.velocidad);

      // Limitar dentro de contenedor para evitar salirse de los bordes
      nuevaX = constrain(nuevaX, contenedor.x + radio, contenedor.x + contenedor.ancho - radio);
      nuevaY = constrain(nuevaY, contenedor.y + radio, contenedor.y + contenedor.alto - radio);

      // Verificar colisiones con cuadrados usando p5.collide2d
      //inicializo variable que es false siempre que no haya colision
      let colisiona = false;
      //recorre todos los cuadrados y revisa si hay colision con alguno
      for (let cuadrado of this.cuadrados.cuadrados) {
        // funcion de la libreria p5.collide2D que simplifica revisar si hay colision entre un circulo y un rectangulo/cuadrado
        if (collideRectCircle(
          cuadrado.x - cuadrado.tamañoExterior / 2,
          cuadrado.y - cuadrado.tamañoExterior / 2,
          cuadrado.tamañoExterior,
          cuadrado.tamañoExterior,
          nuevaX, nuevaY,
          this.diametroMascara
        )) {
          colisiona = true; //devuelve true si el circulo se toca o superpone con alguno de los cuadrados
          break;
        }
      }

      // Si colisiona, invertir direcciones para simular rebote
      if (colisiona) {
        this.direccionX *= -1;
        this.direccionY *= -1;

        // Actualizar nueva posición con dirección invertida, hay que volver a calcular hacia dónde iría con esa dirección invertida.
        nuevaX = this.mascaraX + (this.direccionX * this.velocidad);
        nuevaY = this.mascaraY + (this.direccionY * this.velocidad);

        // Limitar otra vez dentro del contenedor 
        nuevaX = constrain(nuevaX, contenedor.x + radio, contenedor.x + contenedor.ancho - radio);
        nuevaY = constrain(nuevaY, contenedor.y + radio, contenedor.y + contenedor.alto - radio);
      }
      // actualiza la posicion de la máscara
      this.mascaraX = nuevaX;
      this.mascaraY = nuevaY;
    }
  }

  dibujarMascara() {
    push();
    ellipseMode(CENTER);

    // Borde exterior (máscara): sin relleno, con stroke azul oscuro
    noFill();
    stroke(30, 30, 40); // #1E1E28
    strokeWeight(2);
    ellipse(this.mascaraX, this.mascaraY, this.diametroMascara);

    // Círculo interior: relleno sólido naranja
    noStroke();
    fill("#F27E63");
    ellipse(this.mascaraX, this.mascaraY, this.diametroInterior);

    pop();
  }

  keyPressed() {
    // Detectar cuando se presiona una tecla
    if (keyCode === UP_ARROW) {
      this.teclas.arriba = true;
    }
    if (keyCode === DOWN_ARROW) {
      this.teclas.abajo = true;
    }
    if (keyCode === LEFT_ARROW) {
      this.teclas.izquierda = true;
    }
    if (keyCode === RIGHT_ARROW) {
      this.teclas.derecha = true;
    }
  }

  keyReleased() {
    // Detectar cuando se suelta una tecla
    if (keyCode === UP_ARROW) {
      this.teclas.arriba = false;
    }
    if (keyCode === DOWN_ARROW) {
      this.teclas.abajo = false;
    }
    if (keyCode === LEFT_ARROW) {
      this.teclas.izquierda = false;
    }
    if (keyCode === RIGHT_ARROW) {
      this.teclas.derecha = false;
    }
  }

  mousePressed() {
    print("mouse clicked desde pantalla02"); // Debug
    nav.siguientePantalla();                // Avanza en el Navegador
  }
}

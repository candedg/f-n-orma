// -----------------------------------------------------------------------------
// PANTALLA03 – Tercera y última escena interactiva del proyecto
// -----------------------------------------------------------------------------
class Pantalla03 extends Pantalla {
  constructor() {
    super();

    // Sistema de cuadrados centrado en pantalla
    this.cuadrados = new Cuadrados(width / 2, height / 2);

    // Dimensiones de la máscara y del círculo interior
    this.diametroMascara = 65;   // Borde exterior de la máscara
    this.diametroInterior = 35;  // Círculo sólido interior

    // Variables de movimiento
    this.velocidad = 3;          // Pixels por frame
    this.direccionX = 0;         // Dirección X (-1, 0, 1)
    this.direccionY = 0;         // Dirección Y (-1, 0, 1)

    // Estado de teclas presionadas
    this.teclas = {
      arriba: false,
      abajo: false,
      izquierda: false,
      derecha: false
    };
  }

  // DRAW – Renderizado principal de la escena
  draw() {
    background("#1E1E28"); 

    // Textos explicativos
    textFont(jura);
    textSize(30);
    textAlign(CENTER, CENTER);
    fill("#B0B5C1");
    noStroke();
    text("Te ves muy diferente a los demas", width / 2, 40);
    textSize(20);
    text("Pero ahora puedes moverte con la misma facilidad", width / 2, 90);

    // Imagen ilustrativa de las flechas del teclado
    image(flechasImg, 365, 110, 70, 70);

    // Actualiza la posición de la máscara circular según teclas presionadas
    this.actualizarMovimiento();

    // Comunica la posición y tamaño de la máscara a los cuadrados para detectar colisiones
    this.cuadrados.setMascara(this.mascaraX, this.mascaraY, this.diametroMascara, this.diametroMascara);

    // Dibuja los cuadrados sobre el fondo liso
    this.cuadrados.setFondoLiso();
    this.cuadrados.draw();

    // Dibuja la máscara circular (borde exterior + círculo interior)
    this.dibujarMascara();
  }

  // Actualiza la posición de la máscara según teclas presionadas y colisiones
  actualizarMovimiento() {
    // Posición inicial si aún no fue definida
    if (this.mascaraX === undefined || this.mascaraY === undefined) {
      const contenedorX = (width - 780) / 2;  
      const contenedorY = height - 500 - 10;  
      this.mascaraX = contenedorX + 780 / 2;
      this.mascaraY = contenedorY + 500 - 50;
    }

    // Reinicia direcciones
    this.direccionX = 0;
    this.direccionY = 0;

    // Actualiza direcciones según teclas presionadas
    if (this.teclas.izquierda) this.direccionX = -1;
    if (this.teclas.derecha) this.direccionX = 1;
    if (this.teclas.arriba) this.direccionY = -1;
    if (this.teclas.abajo) this.direccionY = 1;

    // Solo mover si hay alguna dirección activa
    if (this.direccionX !== 0 || this.direccionY !== 0) {
      const contenedor = this.cuadrados.contenedor;
      const radio = this.diametroMascara / 2;

      // Posición tentativa de la máscara
      let nuevaX = this.mascaraX + (this.direccionX * this.velocidad);
      let nuevaY = this.mascaraY + (this.direccionY * this.velocidad);

      // Limita dentro del contenedor
      nuevaX = constrain(nuevaX, contenedor.x + radio, contenedor.x + contenedor.ancho - radio);
      nuevaY = constrain(nuevaY, contenedor.y + radio, contenedor.y + contenedor.alto - radio);

      // Verifica colisiones con los cuadrados
      let colisiona = false;
      for (let cuadrado of this.cuadrados.cuadrados) {
        if (collideRectCircle(
          cuadrado.x - cuadrado.tamanoExterior / 2,
          cuadrado.y - cuadrado.tamanoExterior / 2,
          cuadrado.tamanoExterior,
          cuadrado.tamanoExterior,
          nuevaX, nuevaY,
          this.diametroMascara
        )) {
          colisiona = true;
          break;
        }
      }

      // Si hay colisión, invertir dirección para simular rebote
      if (colisiona) {
        this.direccionX *= -1;
        this.direccionY *= -1;

        nuevaX = this.mascaraX + (this.direccionX * this.velocidad);
        nuevaY = this.mascaraY + (this.direccionY * this.velocidad);

        nuevaX = constrain(nuevaX, contenedor.x + radio, contenedor.x + contenedor.ancho - radio);
        nuevaY = constrain(nuevaY, contenedor.y + radio, contenedor.y + contenedor.alto - radio);
      }

      // Actualiza la posición final de la máscara
      this.mascaraX = nuevaX;
      this.mascaraY = nuevaY;
    }
  }

  // Dibuja la máscara circular con borde y círculo interior
  dibujarMascara() {
    push();
    ellipseMode(CENTER);

    // Borde exterior de la máscara
    noFill();
    stroke(30, 30, 40);
    strokeWeight(2);
    ellipse(this.mascaraX, this.mascaraY, this.diametroMascara);

    // Círculo interior sólido
    noStroke();
    fill("#F27E63");
    ellipse(this.mascaraX, this.mascaraY, this.diametroInterior);

    pop();
  }

  // Detecta teclas presionadas y actualiza estado
  keyPressed() {
    if (keyCode === UP_ARROW) this.teclas.arriba = true;
    if (keyCode === DOWN_ARROW) this.teclas.abajo = true;
    if (keyCode === LEFT_ARROW) this.teclas.izquierda = true;
    if (keyCode === RIGHT_ARROW) this.teclas.derecha = true;
  }

  // Detecta teclas liberadas y actualiza estado
  keyReleased() {
    if (keyCode === UP_ARROW) this.teclas.arriba = false;
    if (keyCode === DOWN_ARROW) this.teclas.abajo = false;
    if (keyCode === LEFT_ARROW) this.teclas.izquierda = false;
    if (keyCode === RIGHT_ARROW) this.teclas.derecha = false;
  }

  // MousePressed: reinicia la posición y avanza a la siguiente pantalla
  mousePressed() {
    this.mascaraX = undefined;
    this.mascaraY = undefined;
    this.cuadrados.reiniciar();
    nav.siguientePantalla();
  }
}

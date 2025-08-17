// -----------------------------------------------------------------------------
// PANTALLA01 — Primera escena interactiva del recorrido
// -----------------------------------------------------------------------------
// Esta clase representa la primera experiencia del usuario tras la portada.
// - Hereda de la clase base `Pantalla` para integrarse al flujo de navegación.
// - Contiene un sistema de cuadrados (`Cuadrados`) como estructura visual.
// - El usuario debe interactuar con una "máscara" circular que incrementa su
//   opacidad al pasar el mouse por encima.
// - Una vez que la máscara alcanza la opacidad máxima, el usuario puede usar
//   las flechas del teclado para reiniciar el sistema y avanzar de pantalla.
// -----------------------------------------------------------------------------

class Pantalla01 extends Pantalla {
  constructor() {
    super(); // Inicializa la clase base 'Pantalla'

    // Sistema de cuadrados
    this.cuadrados = new Cuadrados(width / 2, height / 2);

    // Configuración de la máscara
    this.mascaraX = 0;
    this.mascaraY = 0;
    this.mascaraTamano = 60;

    // Opacidad dinámica de la máscara (0 → invisible, 255 → completamente visible)
    this.opacidadMascara = 0;
    this.maxOpacidad = 255;
    this.incrementoOpacidad = 25.5; // Aumenta un 10% en cada interacción de hover

    // Variables para registrar el estado del cursor (hover)
    this.enHover = false;       // Indica si el mouse está sobre la máscara
    this.estuvoenHover = false; // Estado del frame anterior (para detectar entradas)
  }

  // DRAW — Renderizado de la escena
  draw() {
    background("#1E1E28");

    // Textos de instrucción y narrativa
    textFont(jura);
    textSize(30);
    textAlign(CENTER, CENTER);
    fill("#B0B5C1");
    noStroke();
    text("¿Eres uno más en el mundo?", width / 2, 30);

    textSize(20);
    text("Parece que primero necesitas verte igual a los demás", width / 2, 100);
    text("Usa las flechas para moverte", width / 2, 160);

    // Iconografía de ayuda: flechas y mouse
    image(flechasImg, 100, 120, 70, 70);
    image(mouseImg, 635, 120, 60, 65);

    // Calcular posición de la máscara en función del contenedor de cuadrados
    const cont = this.cuadrados.contenedor;
    this.mascaraX = cont.x + cont.ancho / 2;
    this.mascaraY = cont.y + cont.alto - 50;

    // Detectar interacción con el mouse (hover) y ajustar opacidad
    this.verificarHover();

    // Pasar la información de la máscara al sistema de cuadrados
    this.cuadrados.setMascara(this.mascaraX, this.mascaraY, this.mascaraTamano, this.mascaraTamano);

    // Dibujar el sistema de cuadrados con fondo liso
    this.cuadrados.setFondoLiso();
    this.cuadrados.draw();

    // Dibujar la máscara sobre la escena
    this.dibujarMascara();
  }

  // verificarHover — Lógica de interacción con el mouse
  verificarHover() {
    let mitad = this.mascaraTamano / 2;

    // Determinar si el mouse está dentro de los límites de la máscara
    this.enHover =
      mouseX >= this.mascaraX - mitad &&
      mouseX <= this.mascaraX + mitad &&
      mouseY >= this.mascaraY - mitad &&
      mouseY <= this.mascaraY + mitad;

    // Si el cursor entra por primera vez en la zona de hover incrementa opacidad
    if (this.enHover && !this.estuvoenHover) {
      if (this.opacidadMascara < this.maxOpacidad) {
        let opacidadAnterior = this.opacidadMascara;

        this.opacidadMascara += this.incrementoOpacidad;
        this.opacidadMascara = Math.min(this.opacidadMascara, this.maxOpacidad);

        // Reproduce sonido solo si la opacidad aumentó
        if (this.opacidadMascara > opacidadAnterior && sonidoSubirOpacidad) {
          sonidoSubirOpacidad.play();
        }
      }
    }

    // Actualizar estado para el siguiente frame
    this.estuvoenHover = this.enHover;
  }

  // dibujarMascara — Representación visual de la máscara
  dibujarMascara() {
    push();
    rectMode(CENTER);

    // Cuadrado: sin relleno, con borde de opacidad progresiva
    noFill();
    stroke(30, 30, 40, this.opacidadMascara);
    strokeWeight(2);
    rect(this.mascaraX, this.mascaraY, this.mascaraTamano, this.mascaraTamano);

    // Círculo central: siempre visible
    noStroke();
    fill("#F27E63");
    ellipse(this.mascaraX, this.mascaraY, 35, 35);

    pop();
  }

  // mousePressed — Evento de clic (no se usa)
  mousePressed() { }

  // keyPressed — Interacción con teclado
  // El avance a la siguiente pantalla se habilita solo cuando la máscara alcanzó su opacidad máxima
  keyPressed() {
    if (
      keyCode === UP_ARROW || keyCode === DOWN_ARROW ||
      keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW
    ) {
      if (this.opacidadMascara >= this.maxOpacidad) {
        this.cuadrados.reiniciar();    // Reinicia el sistema de cuadrados
        this.opacidadMascara = 0;      // Resetea la máscara
        nav.siguientePantalla();       // Avanza a la siguiente escena
      }
    }
  }
}

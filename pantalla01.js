// Clase que define la primera escena interactiva del proyecto.
class Pantalla01 extends Pantalla {
  constructor() {
    super(); // Llama al constructor de la clase base 'Pantalla'

    // Se crea un sistema de cuadrados centrado en pantalla
    this.cuadrados = new Cuadrados(width / 2, height / 2);

    // Coordenadas y tamaño inicial de la máscara para el círculo
    this.mascaraX = 0;
    this.mascaraY = 0;
    this.mascaraTamano = 60;

    // Opacidad de la máscara: inicia en 0, puede aumentar hasta 255
    this.opacidadMascara = 0;
    this.maxOpacidad = 255;
    this.incrementoOpacidad = 25.5; // Incremento del 10% del valor máximo

    // Variables para el control del estado de hover
    this.enHover = false;         // Indica si el mouse está actualmente sobre la máscara
    this.estuvoenHover = false;   // Indica si estuvo sobre la máscara en el frame anterior
  }

  // Método principal de dibujo de la escena
  draw() {
    background("#1E1E28"); // Fondo oscuro de la escena

    // Configuración tipográfica para los textos en pantalla
    textFont(jura);
    textSize(30);
    textAlign(CENTER, CENTER);
    fill("#B0B5C1");
    noStroke();

    // Mensaje principal
    text("¿Eres uno más en el mundo?", width / 2, 30);

    // Instrucciones adicionales
    textSize(20);
    text("Parece que primero necesitas verte igual a los demás", width / 2, 100);
    text("Usa las flechas para moverte", width / 2, 160);

    // Imágenes ilustrativas de las flechas del teclado y el mouse
    image(flechasImg, 100, 120, 70, 70);
    image(mouseImg, 635, 120, 60, 65);

    // Se calcula la posición de la máscara en la parte inferior del contenedor
    const cont = this.cuadrados.contenedor;
    this.mascaraX = cont.x + cont.ancho / 2;
    this.mascaraY = cont.y + cont.alto - 50;

    // Detecta si el mouse está sobre la máscara y ajusta la opacidad
    this.verificarHover();

    // Se comunica la posición y tamaño de la máscara a los cuadrados para detectar colisiones
    this.cuadrados.setMascara(this.mascaraX, this.mascaraY, this.mascaraTamano, this.mascaraTamano);

    // Dibuja los cuadrados dentro del contenedor, sin imagen de fondo
    this.cuadrados.setFondoLiso();
    this.cuadrados.draw();

    // Dibuja la máscara (cuadrado con círculo interior), con opacidad variable
    this.dibujarMascara();
  }

  // Verifica si el mouse está actualmente sobre la máscara y ajusta la opacidad
  verificarHover() {
    let mitad = this.mascaraTamano / 2;

    // Verificación de si el cursor está dentro de los límites del cuadrado
    this.enHover = mouseX >= this.mascaraX - mitad && 
                   mouseX <= this.mascaraX + mitad &&
                   mouseY >= this.mascaraY - mitad && 
                   mouseY <= this.mascaraY + mitad;

    // Si acaba de ingresar al área de hover, se aumenta la opacidad
    if (this.enHover && !this.estuvoenHover) {
      if (this.opacidadMascara < this.maxOpacidad) {
        this.opacidadMascara += this.incrementoOpacidad;
        this.opacidadMascara = Math.min(this.opacidadMascara, this.maxOpacidad); // Límite máximo
      }
    }

    // Se guarda el estado de hover para el siguiente frame
    this.estuvoenHover = this.enHover;
  }

  // Dibuja la máscara en pantalla según el valor actual de opacidad
  dibujarMascara() {
    push();
    rectMode(CENTER);

    // Cuadrado con borde semitransparente (sin relleno)
    noFill();
    stroke(30, 30, 40, this.opacidadMascara); // Color con canal alfa variable
    strokeWeight(2);
    rect(this.mascaraX, this.mascaraY, this.mascaraTamano, this.mascaraTamano);

    // Círculo interior fijo (visible en todo momento)
    noStroke();
    fill("#F27E63");
    ellipse(this.mascaraX, this.mascaraY, 35, 35);

    pop();
  }

  // Método vacío: clic del mouse no hace nada por ahora
  mousePressed() {}

  // Responde al teclado: solo avanza si se presiona una flecha y la opacidad de la máscara del círculo está al máximo
  keyPressed() {
    if (keyCode === UP_ARROW || keyCode === DOWN_ARROW || 
        keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
      
      if (this.opacidadMascara >= this.maxOpacidad) {
        nav.siguientePantalla(); // Se pasa a la siguiente pantalla del proyecto
      } 
    }
  }
}

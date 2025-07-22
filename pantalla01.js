// Clase que define la primera escena interactiva del proyecto.
class Pantalla01 extends Pantalla {
  constructor() {
    super(); // Llama al constructor de la clase base 'Pantalla'
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

    this.cuadrados.setFondoLiso();
  }


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

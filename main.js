function generarCartas(){
    let palos = ['C','D','H','S'];
    let numeros = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    let cartas = [];
    for(const palo of palos){
        for(const numero of numeros){
            cartas.push(numero+palo);
        }
    }
    return cartas;
}
let cartas = generarCartas();
let contenido = document.getElementById('contenido');
let nuevoJuego = document.getElementById('nuevo-juego');
let pedirCarta = document.getElementById('pedir-carta');
let detener = document.getElementById('detener');
let divJugador1 = document.getElementById('jugador1');
let divJugador1Carta = document.getElementById('jugador1Carta');
let divBanca = document.getElementById('banca')
let divBancaCarta = document.getElementById('bancaCarta');
let resultado = document.getElementById('resultado');
let cartasBarajadas = _.shuffle(cartas);
let cartaPedida;
nuevoJuego.addEventListener('click', (event) => {
    event.preventDefault();
    resultado.style.display = 'none';
    contenido.style.display = 'block';
    puntosJugador = [0,0];
    puntosBanca = [0,0];
    cartas = generarCartas();
    cartasBarajadas = _.shuffle(cartas);
    jugador1();
    banca();
})
pedirCarta.addEventListener('click', (event) => {
    event.preventDefault();
    cogerCartaJugador();
    setTimeout(() => {
        if(puntosDeJuego==21){
            resultado.innerHTML = `<h1>¡GANASTE!</h1>`;
                resultado.style.display = 'block';
                contenido.style.display = 'none';
        } else if(puntosDeJuego>21){
            resultado.innerHTML = `<h1>¡PERDISTE!</h1>`;
            resultado.style.display = 'block';
            contenido.style.display = 'none';
        }
    }, 1000);
})
detener.addEventListener('click', (event) => {
    event.preventDefault();
    cartaRoja.style.display = 'none'
    cogerCartaBanca();
    while(puntosDeJuegoBanca<17 && puntosDeJuego<=21){
        cogerCartaBanca();
    }
    setTimeout(() => {
        if(puntosDeJuegoBanca>21){
            resultado.innerHTML = `<h1>¡GANASTE!</h1>`;
            resultado.style.display = 'block';
            contenido.style.display = 'none';
        }else if (puntosDeJuego>puntosDeJuegoBanca){
            resultado.innerHTML = `<h1>¡GANASTE!</h1>`;
            resultado.style.display = 'block';
            contenido.style.display = 'none';
        } else if(puntosDeJuegoBanca>puntosDeJuego){
            resultado.innerHTML = `<h1>¡PERDISTE!</h1>`;
            resultado.style.display = 'block';
            contenido.style.display = 'none';
        } else if (puntosDeJuego==puntosDeJuegoBanca){
            resultado.innerHTML = `<h1>¡EMPATE!</h1>`;
            resultado.style.display = 'block';
            contenido.style.display = 'none';
        }
    }, 1000)
})
function jugador1(){
    divJugador1Carta.textContent = '';
    cogerCartaJugador();
    cogerCartaJugador();
}
let cartaRoja;
function banca(){
    divBancaCarta.textContent = '';
    cogerCartaBanca();
    cartaRoja = document.createElement('img');
    cartaRoja.src= `cartas/red_back.png`;
    cartaRoja.classList.add('cartas');
    divBancaCarta.appendChild(cartaRoja);
}
function pintarCartaJugador(cartaPedida){
    const image = document.createElement('img');
    image.src= `cartas/${cartaPedida}.png`;
    image.classList.add('cartas');
    divJugador1Carta.appendChild(image);
}
function pintarCartaBanca(cartaPedida){
    const image = document.createElement('img');
    image.src= `cartas/${cartaPedida}.png`;
    image.classList.add('cartas');
    divBancaCarta.appendChild(image);
}
let puntosJugador = [0,0];
function calcularPuntosJugador(puntos){
    if(puntos=='1' || puntos == 'K' || puntos == 'Q' || puntos=='J'){
        puntosJugador[0] += 10;
        puntosJugador[1] += 10;
        return puntosJugador;
    }else if(puntos == 'A'){
        puntosJugador[0] += 1;
        puntosJugador[1] += 11;
        return puntosJugador;
    } else {
        puntosJugador[0] += parseInt(puntos);
        puntosJugador[1] += parseInt(puntos);
        return puntosJugador;
    }
}
let puntosBanca = [0,0];
function calcularPuntosBanca(puntos){
    if(puntos=='1' || puntos == 'K' || puntos == 'Q' || puntos=='J'){
        puntosBanca[0] += 10;
        puntosBanca[1] += 10;
        return puntosBanca;
    }else if(puntos == 'A'){
        puntosBanca[0] += 1;
        puntosBanca[1] += 11;
        return puntosBanca;
    } else {
        puntosBanca[0] += parseInt(puntos);
        puntosBanca[1] += parseInt(puntos);
        return puntosBanca;
    }
}
let puntosDeJuego;
function cogerCartaJugador(){
    cartaPedida = cartasBarajadas.shift();
    pintarCartaJugador(cartaPedida);
    puntos = cartaPedida.charAt(0);
    puntosDeJuego = calcularPuntosJugador(puntos)[1];
    if (puntos == 'A'){
        if (puntosDeJuego<=21){
            divJugador1.innerHTML = `
            <h2 class="contadorTexto"> Jugador 1: ${puntosDeJuego}</h2>
            `;
        }else {
            puntosDeJuego = calcularPuntosJugador(puntos)[0]-1;
            divJugador1.innerHTML = `
            <h2 class="contadorTexto"> Jugador 1: ${puntosDeJuego}</h2>
            `;
        }
    } else {
        divJugador1.innerHTML = `
            <h2 class="contadorTexto"> Jugador 1: ${puntosDeJuego}</h2>
            `;
    }
}
let puntosDeJuegoBanca;
function cogerCartaBanca(){
    cartaPedida = cartasBarajadas.shift();
    pintarCartaBanca(cartaPedida);
    puntos = cartaPedida.charAt(0);
    puntosDeJuegoBanca = calcularPuntosBanca(puntos)[1];
    if(puntos == 'A'){
        if (puntosDeJuegoBanca <= 21) {
            divBanca.innerHTML = `
            <h2 class="contadorTexto"> Banca: ${puntosDeJuegoBanca}</h2>
            `;
        }else {
            puntosDeJuegoBanca = calcularPuntosJugador(puntos)[0]-1;
            divBanca.innerHTML = `
            <h2 class="contadorTexto"> Banca: ${puntosDeJuegoBanca}</h2>
            `;
        }
    } else {
        divBanca.innerHTML = `
            <h2 class="contadorTexto"> Banca: ${puntosDeJuegoBanca}</h2>
            `;
    }
}

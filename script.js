window.onload = function () {

    //var canvas =$("#canvas");
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    var aciertos_totales = 0;
    var aciertos = 0;
    var letras = '';
    var fallos = 0;
    var palabra_juego = '';
    var resultado = '';
    
    document.querySelector("#button").addEventListener("click", cargarPalabra);

    $(".tecla").click(function () {
        pulsacion(this.innerHTML);
    })

    $("#reiniciar").click(function () {
        reiniciar();
    })

    
    function cargarPalabra() {

        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'palabras.json', true);

        xhr.onload = function () {
            if (this.status == 200) {
                const palabras = JSON.parse(this.responseText);
                var num_palabras = Object.keys(palabras).length;

                var output = '';

                let aleatorio = Math.round(Math.random() * num_palabras);
                palabra_juego = palabras[aleatorio];
                letras = palabra_juego.letras;   
                let pistas = palabra_juego.pistas;
                aciertos = palabra_juego.letras.length - pistas.length;

                palabra_juego.letras.forEach(function (letra) {
                    output += `
                        <div class="letra">
                            &nbsp;
                        </div>
                    `;
                })

                document.querySelector('.palabras').innerHTML = output;

                pintar_pistas(pistas);

            }

        }

        xhr.send();
    }
    
    function jugar(pulsacion) {

        if (aciertos_totales != aciertos) {
            var posicion = [];
            var letra_actual = 'nada';
            for (i = 0; i <= letras.length; i++) {
                if (letras[i] === pulsacion) {
                    posicion.push(i + 1);
                    letra_actual = letras[i];
                }
            }
    
            if (letra_actual != 'nada') {
                if (posicion.length > 1) {
                    for (i = 0; i < posicion.length; i++) {
                        let posicion_letra = ".letra:nth-child(" + posicion[i] + ")";
                        $(posicion_letra)[0].innerHTML = letra_actual;
                        $(posicion_letra).addClass("adivinado");
                    }
                    aciertos_totales += posicion.length;
                    posicion = [];
                    letra_actual = '';
                    
                } else {
                    let posicion_letra = ".letra:nth-child(" + posicion[0] + ")";
                    $(posicion_letra)[0].innerHTML = letra_actual;
                    $(posicion_letra).addClass("adivinado");
                    aciertos_totales += 1;
                    
                }
                $("." + pulsacion).addClass("correcto").unbind("click");
                
    
            } else {
                fallos += 1;
                $(".fallo")[0].innerHTML = fallos;
                let query = $("." + pulsacion);
                query.addClass("error").unbind("click");
                
                pintar(fallos);
            }
        }

        if (aciertos_totales === aciertos) {
            resultado = "¡Muy bien, has ganado!";
            $(".resultado")[0].innerHTML = resultado;
        }



    }

    function pintar_pistas(pistas) {
        if (pistas.length > 1) {
            for (i = 0; i <= pistas.length; i++) {
                let posicion_pista = ".letra:nth-child(" + pistas[i].posicion + ")";
                $(posicion_pista)[0].innerHTML = pistas[i].letra;
            }
        } else {
            let posicion_pista = ".letra:nth-child(" + pistas[0].posicion + ")";
            $(posicion_pista)[0].innerHTML = pistas[0].letra;
        }

    }

    function pintar(fallos) {
        switch (fallos) {
            case 1:
                pintarBase();
                break;
            case 2:
                pintarPalo();
                break;
            case 3:
                pintarPaloArriba();
                break;
            case 4:
                pintarSoporte();
                break;
            case 5:
                pintarCuerda();
                break;
            case 6:
                pintarCabeza();
                break;
            case 7:
                pintarCuerpo();
                break;
            case 8:
                pintarBrazos();
                break;
            case 9:
                pintarPiernas();
                break;
            case 10:
                rip();
                $(".tecla").unbind("click");
                resultado = "¡Has perdido! La palabra era " + palabra_juego.palabra;
                $(".resultado")[0].innerHTML = resultado;
                break;
            default:
                break;
        }
    }

    function reiniciar() {
        fallos = 0;
        aciertos_totales = 0;
        aciertos = 0;
    
        $(".fallo")[0].innerHTML = '';

        $(".error").removeClass("error");

        $(".correcto").removeClass("correcto");

        $(".tecla").unbind("click");

        $(".tecla").click(function () {
            pulsacion(this.innerHTML);
        })

        $(".palabras").innerHTML = '';

        $(".resultado")[0].innerHTML = '';
        limpiar();
        cargarPalabra();
    }

    function pulsacion(valor) {
        var pulsacion = valor;
        jugar(pulsacion);
    }

    function limpiar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var w = canvas.width;
        canvas.width = 1;
        canvas.width = w;
    }

    function pintarBase() {

        ctx.moveTo(50, 300);
        ctx.lineTo(200, 300);
        ctx.stroke();
    }

    function pintarPalo() {
        ctx.moveTo(100, 300);
        ctx.lineTo(100, 100);
        ctx.stroke();
    }

    function pintarPaloArriba() {
        ctx.moveTo(100, 100);
        ctx.lineTo(250, 100);
        ctx.stroke();
    }

    function pintarSoporte() {
        ctx.moveTo(100, 140);
        ctx.lineTo(140, 100);
        ctx.stroke();
    }


    function pintarCuerda() {
        ctx.moveTo(250, 100);
        ctx.lineTo(250, 150);
        ctx.stroke();
    }

    function pintarCabeza() {
        ctx.beginPath();
        ctx.arc(250, 162, 14, 0, 2 * Math.PI);
        ctx.stroke();
    }

    function pintarCuerpo() {
        ctx.moveTo(250, 176);
        ctx.lineTo(250, 230);
        ctx.stroke();
    }

    function pintarBrazos() {
        ctx.moveTo(250, 185);
        ctx.lineTo(230, 210);
        ctx.stroke();

        ctx.moveTo(250, 185);
        ctx.lineTo(270, 210);
        ctx.stroke();
    }

    function pintarPiernas() {
        ctx.moveTo(250, 230);
        ctx.lineTo(230, 260);
        ctx.stroke();

        ctx.moveTo(250, 230);
        ctx.lineTo(270, 260);
        ctx.stroke();
    }

    function rip() {
        ctx.moveTo(241, 156);
        ctx.lineTo(249, 164);
        ctx.stroke();

        ctx.moveTo(249, 156);
        ctx.lineTo(241, 164);
        ctx.stroke();

        ctx.moveTo(253, 156);
        ctx.lineTo(261, 164);
        ctx.stroke();

        ctx.moveTo(261, 156);
        ctx.lineTo(253, 164);
        ctx.stroke();
    }




}
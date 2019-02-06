window.onload = function () {

    //var canvas =$("#canvas");
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");


    document.querySelector("#button").addEventListener("click", cargarPalabra);
    $(".tecla").click(function () {
        pulsacion(this.innerHTML);
    })



    $("#reiniciar").click(function () {
        reiniciar();
    })

    // function cargarPalabra() {

    //     const xhr = new XMLHttpRequest();
    //     xhr.open('GET', 'palabras.json', true);

    //     xhr.onload = function () {
    //         if (this.status == 200) {
    //             const palabras = JSON.parse(this.responseText);

    //             var output = '';
    //             //for (var i in users) {
    //             palabras.forEach(function (palabra) {

    //                 output += `
    //                         <p>${palabra.palabra}</p>
    //                         `;
    //             });

    //             document.querySelector('.palabra').innerHTML = output;
    //         }
    //     }

    //     xhr.send();
    // }

    var letras = '';

    function cargarPalabra() {

        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'palabras.json', true);

        xhr.onload = function () {
            if (this.status == 200) {
                const palabras = JSON.parse(this.responseText);
                var num_palabras = Object.keys(palabras).length;
                console.log(num_palabras);

                var output = '';

                let aleatorio = Math.round(Math.random() * num_palabras);
                var palabra_juego = palabras[aleatorio];
                letras = palabra_juego.letras;
                console.log(palabra_juego.letras.length);

                palabra_juego.letras.forEach(function (letra) {
                    output += `
                        <div class="letra">
                            &nbsp;
                        </div>
                    `;
                })

                document.querySelector('.palabras').innerHTML = output;

            }

        }

        xhr.send();
    }
    
    var fallos = 0;
    function jugar(pulsacion) {

        var posicion = [];
        var letra_actual = '';
        console.log(letras);
        for (i = 0; i <= letras.length; i++) {
            if (letras[i] === pulsacion) {
                posicion.push(i + 1);
                letra_actual = letras[i];
                console.log("WIN " + posicion);
            }
        }

        if (letra_actual != '') {
            if (posicion.length > 1) {
                for (i = 0; i < posicion.length; i++) {
                    let posicion_letra = ".letra:nth-child(" + posicion[i] + ")";
                    $(posicion_letra)[0].innerHTML = letra_actual;
                    $(posicion_letra).addClass("adivinado");
                }
                posicion = [];
                letra_actual = '';
            } else {
                let posicion_letra = ".letra:nth-child(" + posicion[0] + ")";
                $(posicion_letra)[0].innerHTML = letra_actual;
                $(posicion_letra).addClass("adivinado");
                
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
                break;
            default:
                break;
        }
    }

    function reiniciar() {
        $(".fallo")[0].innerHTML = '';
        limpiar();

        $(".error").removeClass("error").click(function () {
            pulsacion(this.innerHTML);
        });

        $(".correcto").removeClass("correcto").click(function () {
            pulsacion(this.innerHTML);
        });

        $(".palabras").innerHTML = '';

        cargarPalabra();
    }

    function pulsacion(valor) {
        var pulsacion = valor;
        jugar(pulsacion);
        console.log(pulsacion);
    }


    // pintarBase();
    // pintarPalo();
    // pintarPaloArriba();
    // pintarSoporte();
    // pintarCuerda();
    // pintarCabeza();
    // pintarCuerpo();
    // pintarBrazos();
    // pintarPiernas();
    // rip();
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

    function limpiar() {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
    }


}
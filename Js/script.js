// ============= PANTALLA 1: CARTA =============

const pantallaCarta = document.getElementById('pantalla-carta');
const pantallaDedicatoria = document.getElementById('pantalla-dedicatoria');
const mensajeCarta = document.getElementById('mensaje-carta');
const corazon = document.getElementById('corazon');

// Mensaje que aparecerá letra por letra
const textoMensaje = "Tengo algo para ti.\n\nPresiona sobre el\ncorazón para descubrirlo";

// Efecto de escritura
let i = 0;
function escribirMensaje() {
    if (i < textoMensaje.length) {
        const char = textoMensaje[i];
        // Convertir saltos de línea a <br>
        if (char === '\n') {
            mensajeCarta.innerHTML += '<br>';
        } else {
            mensajeCarta.innerHTML += char;
        }
        i++;
        // Pausa más larga en saltos de línea
        const delay = textoMensaje[i - 1] === '\n' ? 400 : 60;
        setTimeout(escribirMensaje, delay);
    } else {
        // Mensaje completo, habilitar corazón
        corazon.style.pointerEvents = 'auto';
    }
}
// Iniciar escritura después de un momento
setTimeout(escribirMensaje, 800);

// Click en el corazón
corazon.addEventListener('click', function() {
    // Animación de salida
    pantallaCarta.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    pantallaCarta.style.opacity = '0';
    pantallaCarta.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        pantallaCarta.style.display = 'none';
        pantallaDedicatoria.style.display = 'flex';
        
        // Iniciar animaciones de la pantalla 2
        setTimeout(() => {
            mostrarDedicatoria();
            iniciarPetalos();
            mostrarContador();
            reproducirMusica();
        }, 100);
    }, 800);
});

// ============= PANTALLA 2: DEDICATORIA =============

function mostrarDedicatoria() {
    const dedicationText = document.getElementById('dedication-text');
    const signature = document.getElementById('signature');
    
    // Texto de dedicatoria (personalizado y romántico)
    const texto = `Mi amor, Dania:

Desde aquel 15 de agosto de 2019, mi vida cambió para siempre. Cada día a tu lado ha sido un regalo que atesoro en lo más profundo de mi corazón.

Eres la razón de mis sonrisas, la calma en mis tormentas y la luz que ilumina cada uno de mis días. Tu amor me ha enseñado que la felicidad más grande está en los pequeños momentos compartidos contigo.

Gracias por ser mi compañera, mi confidente, mi todo. Gracias por amarme tal como soy y por construir conmigo este hermoso camino.

Te amo hoy, mañana y siempre.`;
    
    // Efecto typing para la dedicatoria
    let index = 0;
    function escribirDedicatoria() {
        if (index < texto.length) {
            dedicationText.textContent += texto[index];
            index++;
            setTimeout(escribirDedicatoria, 40);
        } else {
            // Mostrar firma cuando termine
            setTimeout(() => {
                signature.textContent = "Con todo mi amor, Juan";
                signature.classList.add('visible');
            }, 500);
        }
    }
    
    escribirDedicatoria();
}

function mostrarContador() {
    const contador = document.getElementById('contador-dias');
    const fechaInicio = new Date('2019-08-15');
    
    function actualizarContador() {
        const ahora = new Date();
        const diferencia = ahora - fechaInicio;
        
        // Calcular años, meses y días
        let años = ahora.getFullYear() - fechaInicio.getFullYear();
        let meses = ahora.getMonth() - fechaInicio.getMonth();
        let días = ahora.getDate() - fechaInicio.getDate();
        
        // Ajustar si los días son negativos
        if (días < 0) {
            meses--;
            const mesAnterior = new Date(ahora.getFullYear(), ahora.getMonth(), 0);
            días += mesAnterior.getDate();
        }
        
        // Ajustar si los meses son negativos
        if (meses < 0) {
            años--;
            meses += 12;
        }
        
        contador.innerHTML = `Llevamos juntos: <strong>${años}</strong> ${años === 1 ? 'año' : 'años'}, <strong>${meses}</strong> ${meses === 1 ? 'mes' : 'meses'} y <strong>${días}</strong> ${días === 1 ? 'día' : 'días'}`;
        contador.classList.add('visible');
    }
    
    actualizarContador();
    // Actualizar cada día
    setInterval(actualizarContador, 86400000);
}

function iniciarPetalos() {
    const container = document.getElementById('floating-objects');
    let contador = 0;
    
    function crearPetalo() {
        const petalo = document.createElement('div');
        petalo.className = 'floating-petal';
        
        // Posición inicial aleatoria
        petalo.style.left = `${Math.random() * 100}%`;
        petalo.style.top = `${100 + Math.random() * 10}%`;
        petalo.style.opacity = 0.6 + Math.random() * 0.3;
        
        container.appendChild(petalo);
        
        // Animación de flotación
        const duracion = 7000 + Math.random() * 5000;
        const desplazamiento = (Math.random() - 0.5) * 100;
        
        setTimeout(() => {
            petalo.style.transition = `transform ${duracion}ms linear, opacity 1.5s`;
            petalo.style.transform = `translate(${desplazamiento}px, -120vh) scale(${0.7 + Math.random() * 0.8}) rotate(${Math.random() * 720}deg)`;
            petalo.style.opacity = 0;
        }, 50);
        
        // Eliminar después de la animación
        setTimeout(() => {
            if (petalo.parentNode) {
                petalo.parentNode.removeChild(petalo);
            }
        }, duracion + 2000);
        
        // Crear más pétalos
        if (contador++ < 40) {
            setTimeout(crearPetalo, 300 + Math.random() * 600);
        } else {
            setTimeout(crearPetalo, 1500 + Math.random() * 2000);
        }
    }
    
    crearPetalo();
}

function reproducirMusica() {
    const audio = document.getElementById('bg-music');
    if (!audio) return;
    
    audio.volume = 0.5;
    audio.loop = true;
    
    // Intentar reproducir
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('Música reproduciendo');
        }).catch(error => {
            console.log('Autoplay bloqueado. Click requerido.');
            
            // Crear botón de música
            const botonMusica = document.createElement('button');
            botonMusica.innerHTML = '🔊 Música';
            botonMusica.style.position = 'fixed';
            botonMusica.style.bottom = '20px';
            botonMusica.style.right = '20px';
            botonMusica.style.padding = '12px 24px';
            botonMusica.style.fontSize = '1.1rem';
            botonMusica.style.borderRadius = '25px';
            botonMusica.style.border = 'none';
            botonMusica.style.background = 'rgba(255, 255, 255, 0.9)';
            botonMusica.style.color = '#b51218';
            botonMusica.style.cursor = 'pointer';
            botonMusica.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
            botonMusica.style.zIndex = '100';
            botonMusica.style.fontWeight = 'bold';
            
            document.body.appendChild(botonMusica);
            
            botonMusica.addEventListener('click', () => {
                if (audio.paused) {
                    audio.play();
                    botonMusica.innerHTML = '🔊 Música';
                } else {
                    audio.pause();
                    botonMusica.innerHTML = '🔇 Música';
                }
            });
        });
    }
}

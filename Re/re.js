(() => {
  'use strict';

  const CLAVE_ULTIMO = 'ultimoCap';

  const tituloEl   = document.getElementById('titulo');
  const subtituloEl = document.getElementById('subtitulo');
  const pantalla   = document.getElementById('pantalla');
  const vacio      = document.getElementById('vacio');
  const aviso      = document.getElementById('aviso');
  const sel        = document.getElementById('sel');
  const btnAnt     = document.getElementById('ant');
  const btnSig     = document.getElementById('sig');

  let serie = 'Avenida Brasil';
  let capitulos = {};
  let nums = [];

  const esMp4 = url => /\.mp4(\?|$)/i.test(url);

  function normalizar(url) {
    return url.startsWith('//') ? 'https:' + url : url;
  }

  function mostrarAviso(texto, esError = false) {
    aviso.textContent = texto;
    aviso.classList.toggle('error', esError);
  }

  function guardar(n) {
    try { localStorage.setItem(CLAVE_ULTIMO, String(n)); } catch (e) { /* sin almacenamiento */ }
  }

  function leerUltimo() {
    try { return Number(localStorage.getItem(CLAVE_ULTIMO)); } catch (e) { return 0; }
  }

  // Corta la descarga del video anterior para no gastar datos ni memoria.
  function limpiar() {
    const v = pantalla.querySelector('video');
    if (v) {
      v.pause();
      v.removeAttribute('src');
      v.load();
    }
    pantalla.innerHTML = '';
    mostrarAviso('');
  }

  const indiceActual = () => nums.indexOf(Number(sel.value));

  function actualizarBotones() {
    const i = indiceActual();
    btnAnt.disabled = i <= 0;
    btnSig.disabled = i === -1 || i >= nums.length - 1;
  }

  function ir(n) {
    n = Number(n);
    if (!capitulos[n]) return;

    const url = normalizar(capitulos[n]);
    limpiar();

    if (esMp4(url)) {
      const v = document.createElement('video');
      v.controls = true;
      v.playsInline = true;
      v.preload = 'none';              // no descarga hasta pulsar play
      v.referrerPolicy = 'no-referrer';
      v.src = url;
      v.addEventListener('ended', () => {
        const i = indiceActual();
        if (i < nums.length - 1) ir(nums[i + 1]);
      });
      v.addEventListener('error', () => {
        mostrarAviso('No se pudo cargar este capítulo. Prueba de nuevo o elige otro.', true);
      });
      pantalla.appendChild(v);
    } else {
      const f = document.createElement('iframe');
      f.src = url;
      f.allowFullscreen = true;
      f.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
      f.referrerPolicy = 'no-referrer';
      pantalla.appendChild(f);
      mostrarAviso('Reproductor externo: usa "Siguiente" para pasar de capítulo.');
    }

    tituloEl.textContent = serie + ' – Capítulo ' + n;
    document.title = serie + ' · Cap. ' + n;
    sel.value = String(n);
    guardar(n);
    actualizarBotones();
  }

  function iniciar(data) {
    serie = data.titulo || serie;
    capitulos = data.capitulos || {};
    nums = Object.keys(capitulos).map(Number).sort((a, b) => a - b);

    if (!nums.length) {
      throw new Error('La lista de capítulos está vacía.');
    }

    nums.forEach(n => sel.add(new Option('Capítulo ' + n, n)));
    subtituloEl.textContent = 'Capítulos ' + nums[0] + ' al ' + nums[nums.length - 1];

    btnAnt.addEventListener('click', () => ir(nums[indiceActual() - 1]));
    btnSig.addEventListener('click', () => ir(nums[indiceActual() + 1]));
    sel.addEventListener('change', () => ir(sel.value));

    // Flechas del teclado para cambiar de capítulo (si no se está en el selector).
    document.addEventListener('keydown', e => {
      if (e.target === sel) return;
      if (e.key === 'ArrowLeft' && e.altKey) btnAnt.click();
      if (e.key === 'ArrowRight' && e.altKey) btnSig.click();
    });

    const ultimo = leerUltimo();
    ir(capitulos[ultimo] ? ultimo : nums[0]);
  }

  function fallo(err) {
    tituloEl.textContent = serie;
    vacio.textContent = 'No se pudo cargar capitulos.json.';
    mostrarAviso(
      'Revisa que capitulos.json esté en la misma carpeta. ' +
      'Si abres el archivo directo desde el disco (file://), el navegador lo bloquea: súbelo a tu sitio o usa un servidor local.',
      true
    );
    console.error(err);
  }

  fetch('capitulos.json')
    .then(r => {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(iniciar)
    .catch(fallo);
})();

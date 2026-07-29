// auth.js
// Solo se guarda el HASH SHA-256 de la contraseña, nunca la contraseña en texto plano.
// Aunque alguien lea este archivo, no puede recuperar la contraseña directamente
// (tendría que romper el hash / fuerza bruta).

const PASSWORD_HASH = "dafbe2639241f6811bb8a7ae3368a85a0485121beab81d896d3bfa03ad2627fc";

async function sha256(text) {
  const enc = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function checkPassword(input) {
  const hash = await sha256(input);
  return hash === PASSWORD_HASH;
}

const SESSION_KEY = "horarios_auth_ok";

function isSessionAuthed() {
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

function markSessionAuthed() {
  sessionStorage.setItem(SESSION_KEY, "1");
}

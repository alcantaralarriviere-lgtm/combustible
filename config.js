/* AXION Combustible · Configuración de la app.
 * API_URL: dirección del servidor (Apps Script de la hoja COMBUSTIBLE_BD, termina en /exec).
 * En esta PC (localhost) se usa el servidor de prueba: node dev/servidor_local.js
 */
window.APP_CONFIG = {
  API_URL: (location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.protocol === 'file:') ? '/api'
    : 'https://script.google.com/macros/s/AKfycbyClvqOzrN54Okjgcx2F_zEYoB-ThgSJOEI8YWSuJE7YSyVHi6b7E5WRV6e3cagX671/exec'
};

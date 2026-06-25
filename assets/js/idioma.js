let textos = {};
let idiomaActual = "es";

// Detectar idioma
function detectarIdioma() {
  const guardado = localStorage.getItem("lang");

  if (guardado) return guardado;

  const nav = navigator.language || navigator.userLanguage;

  if (nav.toLowerCase().startsWith("en")) return "en";

  return "es";
}

document.addEventListener("DOMContentLoaded", () => {

  fetch("lang.json")
    .then(res => res.json())
    .then(data => {

      textos = data;

      const idioma = detectarIdioma();

      idiomaActual = idioma;

      aplicarIdioma(idioma);
      actualizarBoton(idioma);

    })
    .catch(err => console.error("Error cargando JSON:", err));

});

// Aplicar idioma
function aplicarIdioma(idioma) {

  // Textos normales
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");

    if (textos[idioma] && textos[idioma][key]) {
      el.innerText = textos[idioma][key];
    }
  });

  // Placeholders de inputs
  document.querySelectorAll("[data-placeholder]").forEach(el => {
    const key = el.getAttribute("data-placeholder");

    if (textos[idioma] && textos[idioma][key]) {
      el.placeholder = textos[idioma][key];
    }
  });

}

// Actualizar botón idioma
function actualizarBoton(idioma) {

  const flag = document.getElementById("lang-flag");
  const label = document.getElementById("lang-label");

  if (!flag || !label) return;

  if (idioma === "es") {
    flag.src = "assets/img/mexico.jpg";
    label.textContent = "ES";
  } else {
    flag.src = "assets/img/usa.jpg";
    label.textContent = "EN";
  }

}

// Cambiar idioma manualmente
function cambiarIdioma(idioma) {

  idiomaActual = idioma;

  localStorage.setItem("lang", idioma);

  aplicarIdioma(idioma);

  actualizarBoton(idioma);

  const dropdown = document.getElementById("lang-dropdown");

  if (dropdown) {
    dropdown.classList.remove("open");
  }

}

// Abrir / cerrar dropdown
function toggleDropdown() {

  const dropdown = document.getElementById("lang-dropdown");

  if (dropdown) {
    dropdown.classList.toggle("open");
  }

}

// Cerrar dropdown al hacer clic fuera
document.addEventListener("click", function (e) {

  const selector = document.querySelector(".lang-selector");

  if (selector && !e.target.closest(".lang-selector")) {

    const dropdown = document.getElementById("lang-dropdown");

    if (dropdown) {
      dropdown.classList.remove("open");
    }

  }

});

// Evento botón idioma
document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("lang-btn");

  if (btn) {

    btn.addEventListener("click", function (e) {

      e.stopPropagation();

      const dropdown = document.getElementById("lang-dropdown");

      if (dropdown) {
        dropdown.classList.toggle("open");
      }

    });

  }

});
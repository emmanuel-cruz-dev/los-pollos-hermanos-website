const menuBar = document.getElementById("menu-bar");
const menuPrincipal = document.querySelector(".main-nav__menu");
const menuEstilos = document.querySelector(".main-nav__menu-list");
const subMenues = document.querySelectorAll(".main-nav__sub-menu");
const menuSecciones = document.querySelectorAll(".menu-handler");

menuSecciones.forEach((seccion) => {
  seccion.addEventListener("click", closeMenu);
});

function closeMenu() {
  menuPrincipal.classList.remove("visible");
  menuEstilos.classList.remove("active");
}

// Función para manejar el comportamiento de los submenús
function handleSubmenuClick(event) {
  event.stopPropagation(); // Evita que el clic en los submenús dispare handleClickOutside
  const item = event.currentTarget;
  let subMenu = item.querySelector(".sub-menu--active");
  let arrows = item.querySelector(".material-symbols-outlined");

  if (!subMenu) console.log("No se encontró submenú"); // Si no hay submenú, no se hace nada

  if (subMenu.style.display === "flex") {
    subMenu.style.display = "none";
    item.style.height = "auto";
    arrows.style.transform = "rotate(-90deg)";
  } else {
    subMenu.style.display = "flex";
    let heightEl = subMenu.scrollHeight;
    item.style.height = `${heightEl + 32}px`;
    arrows.style.transform = "rotate(0deg)";
  }
}

// Función para manejar los clics fuera del menú
function handleClickOutside(event) {
  if (
    !menuEstilos.contains(event.target) && // Verifica que el clic no fue dentro del menú principal
    !menuBar.contains(event.target) // Verifica que el clic no fue en el botón del menú (menuBar)
  ) {
    // Cierra el menú si el clic es fuera del menú
    menuPrincipal.classList.remove("visible");
    menuEstilos.classList.remove("active");

    subMenues.forEach((subMenu) => {
      subMenu.classList.remove("sub-menu--active"); // Elimina clase active de los submenús
    });

    // Remover el listener para evitar que siga detectando clicks cuando el menú está cerrado
    document.removeEventListener("click", handleClickOutside);
  }
}

// Cuando se hace clic en el botón del menú (menuBar)
menuBar.addEventListener("click", (event) => {
  event.stopPropagation(); // Evita que el clic en el botón cierre el menú

  // Alternar la visibilidad del menú principal
  menuPrincipal.classList.toggle("visible");
  menuEstilos.classList.toggle("active");

  if (menuPrincipal.classList.contains("visible")) {
    // Al abrir el menú, activa los submenús
    subMenues.forEach((subMenu) => {
      subMenu.classList.add("sub-menu--active");
    });

    // Añadir event listener para detectar clics fuera del menú
    document.addEventListener("click", handleClickOutside);

    // Reasignar los event listeners para los submenús cada vez que se abre el menú
    let activeElements = document.querySelectorAll(
      ".active .main-nav__menu-list-item"
    );

    activeElements.forEach((item) => {
      // Elimina cualquier listener anterior para evitar duplicados
      item.removeEventListener("click", handleSubmenuClick);

      // Añade el event listener para desplegar o colapsar submenús
      item.addEventListener("click", handleSubmenuClick);
    });
  } else {
    // Al cerrar el menú, eliminar la clase de los submenús
    subMenues.forEach((subMenu) => {
      subMenu.classList.remove("sub-menu--active");
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const fatherElements = document.querySelectorAll(".animation-item");

  const options = {
    threshold: 0.4, // Cuando el 40% del elemento esté visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const dataAnimation = entry.target.querySelector("div");
      const dataName = dataAnimation.getAttribute("data-animation");

      const addAnimation = (animationName) => {
        if (entry.isIntersecting) {
          dataAnimation.classList.add(`${animationName}`);
        }
      };

      switch (dataName) {
        case "fade":
          dataAnimation.classList.toggle(`${dataName}`, !entry.isIntersecting);
          break;
        case "show":
          addAnimation("show");
          break;
        case "slide":
          addAnimation("slide");
          break;
        case "unite":
          addAnimation("unite");
          break;
        case "up":
          addAnimation("up");
          break;
        default:
          break;
      }
    });
  }, options);

  fatherElements.forEach((box) => {
    observer.observe(box);
  });
});

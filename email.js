
document.addEventListener("DOMContentLoaded", () => {


  emailjs.init("R8ftAYZK9hUdEZ2ul");


  const sidebar = document.getElementById("sidebar");
  const formSide = document.getElementById("form-side");
  const logoBg = document.getElementById("logo-bg");
  const logoAccent = document.getElementById("logo-accent");
  const svgIcon = document.getElementById("svg-icon");
  const sidebarTitle = document.getElementById("sidebar-title");
  const sidebarText = document.getElementById("sidebar-text");
  const bgShape1 = document.getElementById("bg-shape-1");
  const bgShape2 = document.getElementById("bg-shape-2");
  const form = document.getElementById("multi-step-form");

  const icons = {
    1: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-7h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>`,
    2: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path>`,
    3: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>`
  };

  let selectedEntity = null;


  window.handleSelect = (val) => {
    selectedEntity = val;

    document.querySelectorAll(".company-option")
      .forEach(o => o.classList.remove("selected"));

    const active = document.querySelector(`input[value="${val}"]`)
      .closest(".company-option");

    active.classList.add("selected");

    setTimeout(() => goTo(2), 500);
  };

  window.goTo = (step) => {
    document.querySelectorAll(".step-content")
      .forEach(s => s.classList.remove("active"));

    document.getElementById(`step-${step}`).classList.add("active");

    document.querySelectorAll('[id^="dot-"]').forEach((dot, i) => {
      dot.className =
        i + 1 === step
          ? "h-2 w-10 rounded-full bg-white transition-all duration-300"
          : "h-2 w-4 rounded-full bg-white/20 transition-all duration-300";
    });

    svgIcon.innerHTML = icons[step];

    if (step === 2) {
      sidebar.classList.replace("bg-brand-blue", "bg-brand-orange");
      formSide.classList.replace("bg-white", "bg-brand-blue");
      logoBg.classList.replace("text-brand-blue", "text-brand-orange");
      logoAccent.classList.replace("text-brand-orange", "text-white");

      sidebarTitle.innerText = "¡Tu sueño toma forma!";
      sidebarText.innerText =
        "Escoger el estado correcto puede ahorrarte miles de dólares en impuestos anualmente.";

      bgShape1.style.transform = "translate(100vw, 50vh)";
      bgShape2.style.transform = "translate(-100vw, -50vh)";
    } else {
      sidebar.classList.add("bg-brand-blue");
      sidebar.classList.remove("bg-brand-orange");
      formSide.classList.add("bg-white");
      formSide.classList.remove("bg-brand-blue");
      logoBg.classList.add("text-brand-blue");
      logoBg.classList.remove("text-brand-orange");
      logoAccent.classList.add("text-brand-orange");
      logoAccent.classList.remove("text-white");
    }
  };

  window.validateStep2 = () => {
    const name = document.getElementById("bizName");
    const state = document.getElementById("bizState");
    const errorName = document.getElementById("error-bizName");
    const errorState = document.getElementById("error-bizState");

    errorName.classList.add("hidden");
    errorState.classList.add("hidden");

    if (name.value.trim() === "") {
      errorName.innerText = "El nombre comercial es obligatorio.";
      errorName.classList.remove("hidden");
      return;
    }

    if (state.value === "") {
      errorState.innerText = "Selecciona un estado de formación.";
      errorState.classList.remove("hidden");
      return;
    }

    goTo(3);
  };


  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const templateParams = {
      entity: selectedEntity,
      business_name: document.getElementById("bizName").value,
      state: document.getElementById("bizState").value,
      full_name: document.getElementById("fullName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value
    };

    showToast("📨 Enviando información...", "success");

    emailjs
      .send("service_81zono9", "template_7lbg4tx", templateParams)
      .then(() =>
        emailjs.send("service_81zono9", "template_6lfw85n", templateParams)
      )
      .then(() => {
        showToast("✅ Registro enviado correctamente.", "success");
        form.reset();
        goTo(1);
      })
      .catch(() => {
        showToast("❌ Error al enviar la información.", "error");
      });
  });

  function showToast(message, type) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 4000);
  }

});

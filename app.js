const organizations = [
  { type: "publica", name: "Ayuntamiento de La Placeta", id: "PUB-AYTO", status: "Activo", text: "Gestión municipal de rol, permisos de actividad y expedientes comunitarios.", meta: ["Gobierno", "Expedientes", "Comunidad"] },
  { type: "publica", name: "Tesoro Central", id: "TGLP-001", status: "Operativo", text: "Entidad de masa monetaria simulada, emisión interna, tasas y control macroeconómico.", meta: ["Tesoro", "Normativa", "Pz"] },
  { type: "publica", name: "Agencia Tributaria", id: "ATP-001", status: "Auditando", text: "Supervisión fiscal del rol, IVA simulado, IRM y expedientes de trazabilidad.", meta: ["Tributos", "IVA", "Auditoría"] },
  { type: "empresa", name: "La Cafetería", id: "EMP-0014", status: "SDK pagos", text: "Comercio interno conectado al módulo de pagos del Banco de La Placeta.", meta: ["Empresa", "TPV", "IVA"] },
  { type: "empresa", name: "Placeta Studio", id: "EMP-0021", status: "Alta validada", text: "Proyecto creativo de miembros para contenidos, diseño y servicios del ecosistema.", meta: ["Servicios", "Contratos", "SMI"] },
  { type: "asociacion", name: "Red Comunitaria Placeta", id: "ASC-0007", status: "Proyecto aprobado", text: "Entidad colaboradora sin ánimo de lucro para actividades, ayudas y eventos.", meta: ["Voluntariado", "Eventos", "Junta"] }
];

const defaultNews = [
  { title: "Apertura del portal institucional", tag: "Comunicado", text: "El Grupo de La Placeta estrena portal central para altas, normativa, noticias y mapa del ecosistema.", date: "17/05/2026" },
  { title: "Guía de altas y consentimiento", tag: "Ayuda", text: "Toda nueva incorporación debe aceptar el aviso de simulación y el consentimiento RGPD antes de recibir DIP.", date: "17/05/2026" },
  { title: "Empresas internas y SDK de pagos", tag: "Ecosistema", text: "Las empresas de rol pueden solicitar conexión al módulo de pagos del Banco con IVA simulado por defecto.", date: "17/05/2026" }
];

let wizardStep = 1;
let captchaTotal = 0;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function loadNews() {
  const stored = JSON.parse(localStorage.getItem("gdlp-news") || "null");
  return Array.isArray(stored) && stored.length ? stored : defaultNews;
}

function saveNews(items) {
  localStorage.setItem("gdlp-news", JSON.stringify(items));
}

function renderOrganizations(filter = "all") {
  const items = filter === "all" ? organizations : organizations.filter((item) => item.type === filter);
  $("#orgGrid").innerHTML = items.map((item) => `
    <article class="org-card">
      <span>${labelForType(item.type)}</span>
      <h3>${item.name}</h3>
      <p>${item.text}</p>
      <div class="org-meta">
        <small>${item.id}</small>
        <small>${item.status}</small>
        ${item.meta.map((tag) => `<small>${tag}</small>`).join("")}
      </div>
    </article>
  `).join("");
}

function labelForType(type) {
  return { publica: "Pública", empresa: "Empresa", asociacion: "Asociación" }[type] || "Organización";
}

function renderNews() {
  const news = loadNews();
  $("#newsGrid").innerHTML = news.map((item, index) => `
    <article class="news-card">
      <span>${item.tag}</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
      <small>${item.date}</small>
      <button type="button" data-news="${index}">Leer comunicado</button>
    </article>
  `).join("");
}

function openModal(id) {
  const dialog = document.getElementById(id);
  if (!dialog) return;
  if (id === "onboardingModal") resetWizard();
  dialog.showModal();
}

function setupTheme() {
  const saved = localStorage.getItem("gdlp-theme") || "dark";
  $(".shell").dataset.theme = saved;
  $("#themeToggle").addEventListener("click", () => {
    const next = $(".shell").dataset.theme === "dark" ? "light" : "dark";
    $(".shell").dataset.theme = next;
    localStorage.setItem("gdlp-theme", next);
  });
}

function calculateAge(value) {
  if (!value) return null;
  const birth = new Date(value);
  if (Number.isNaN(birth.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const month = now.getMonth() - birth.getMonth();
  if (month < 0 || (month === 0 && now.getDate() < birth.getDate())) age--;
  return age;
}

function tierForAge(age) {
  if (age === null || age < 0) return null;
  if (age < 16) return { name: "Junior Básica", limit: "500 Pz saldo / 50 Pz diarios", welcome: "Bono inicial 500 Pz" };
  if (age < 18) return { name: "Junior Senior", limit: "1.000 Pz saldo / 100 Pz diarios", welcome: "Bono inicial 500 Pz" };
  return { name: "Ciudadanía Plena", limit: "Funciones completas ordinarias", welcome: "Alta sin bono junior" };
}

function updateAgeResult() {
  const age = calculateAge($("#birthDate").value);
  const tier = tierForAge(age);
  $("#ageResult").innerHTML = tier
    ? `<strong>${tier.name}</strong><br>Edad verificada: ${age} años · ${tier.limit} · ${tier.welcome}`
    : "Introduce tu fecha de nacimiento para calcular el rango.";
}

function resetWizard() {
  wizardStep = 1;
  makeCaptcha();
  updateWizard();
}

function makeCaptcha() {
  const a = Math.floor(4 + Math.random() * 8);
  const b = Math.floor(3 + Math.random() * 9);
  captchaTotal = a + b;
  $("#captchaQuestion").textContent = `Protección anti-bot: ${a} + ${b} =`;
  $("#captchaAnswer").value = "";
}

function updateWizard() {
  $$(".wizard-page").forEach((page) => page.classList.toggle("active", Number(page.dataset.step) === wizardStep));
  $$("[data-step-dot]").forEach((dot) => dot.classList.toggle("active", Number(dot.dataset.stepDot) === wizardStep));
  $("#prevStep").style.visibility = wizardStep === 1 ? "hidden" : "visible";
  $("#nextStep").textContent = wizardStep === 3 ? "Imprimir certificado" : "Continuar";
}

function validateStep() {
  if (wizardStep === 1) {
    const name = $("#roleName").value.trim();
    const age = calculateAge($("#birthDate").value);
    if (name.length < 2 || age === null) return toast("Completa nombre de rol y fecha de nacimiento.");
  }
  if (wizardStep === 2) {
    if (!$("#roleConsent").checked || !$("#privacyConsent").checked) return toast("Debes aceptar el aviso de rol y la política de datos.");
    if (Number($("#captchaAnswer").value) !== captchaTotal) return toast("Captcha incorrecto. Revisa la suma.");
  }
  return true;
}

function nextStep() {
  if (wizardStep === 3) {
    window.print();
    return;
  }
  if (!validateStep()) return;
  wizardStep++;
  if (wizardStep === 3) generateCertificate();
  updateWizard();
}

function prevStep() {
  wizardStep = Math.max(1, wizardStep - 1);
  updateWizard();
}

function generateDip() {
  const last = Math.floor(1000 + Math.random() * 9000);
  return `DIP-${last}`;
}

function generateCertificate() {
  const age = calculateAge($("#birthDate").value);
  const tier = tierForAge(age);
  const dip = generateDip();
  const createdAt = new Date().toLocaleString("es-ES");
  const payload = {
    dip,
    nombreRol: $("#roleName").value.trim(),
    correo: $("#contactEmail").value.trim(),
    edad: age,
    rango: tier.name,
    proyecto: $("#initialProject").value,
    consentimiento_rgpd: true,
    simulacion_aceptada: true,
    creadoEn: createdAt,
    origen: "Web GDLP"
  };
  localStorage.setItem(`gdlp-prealta-${dip}`, JSON.stringify(payload));
  $("#certificatePreview").innerHTML = `
    <span>Certificado de Identidad Digital y Registro</span>
    <h3>${payload.nombreRol}</h3>
    <p><strong>${dip}</strong> · ${tier.name} · ${age} años</p>
    <p>Proyecto inicial: ${payload.proyecto}</p>
    <p>Alta generada: ${createdAt}</p>
    <p>Registro de consentimiento: simulación lúdica aceptada y consentimiento RGPD activo.</p>
  `;
}

function memberDemo() {
  const dip = $("#memberDip").value.trim().toUpperCase() || "DIP-DEMO";
  const stored = localStorage.getItem(`gdlp-prealta-${dip}`);
  const data = stored ? JSON.parse(stored) : { dip, nombreRol: "Miembro demo", rango: "Ciudadanía Plena", proyecto: "Participante individual" };
  $("#memberOutput").innerHTML = `
    <strong>${data.nombreRol}</strong>
    <p>${data.dip} · ${data.rango}</p>
    <p>Contratos vigentes: 1 contrato simulado bajo SMI de 150 Pz.</p>
    <p>Solicitud disponible: crear organización y elevar a Junta.</p>
  `;
}

function publishPost() {
  if ($("#adminKey").value !== "gdlp-admin") return adminMessage("Clave incorrecta. Demo local: gdlp-admin");
  const title = $("#postTitle").value.trim();
  const text = $("#postText").value.trim();
  if (title.length < 3 || text.length < 8) return adminMessage("Completa título y texto.");
  const news = loadNews();
  news.unshift({
    title,
    text,
    tag: $("#postTag").value,
    date: new Date().toLocaleDateString("es-ES")
  });
  saveNews(news.slice(0, 12));
  $("#postTitle").value = "";
  $("#postText").value = "";
  renderNews();
  adminMessage("Noticia publicada en portada.");
}

function adminMessage(text) {
  $("#adminOutput").textContent = text;
}

function toast(text) {
  const node = document.createElement("div");
  node.className = "site-toast";
  node.textContent = text;
  Object.assign(node.style, {
    position: "fixed",
    left: "50%",
    bottom: "22px",
    transform: "translateX(-50%)",
    padding: "12px 16px",
    borderRadius: "999px",
    color: "white",
    background: "var(--accent)",
    fontWeight: "900",
    zIndex: "9999",
    boxShadow: "0 12px 34px rgba(0,0,0,.22)"
  });
  document.body.appendChild(node);
  setTimeout(() => node.remove(), 2800);
  return false;
}

function generateDocCover(kind) {
  const title = kind === "estatutos" ? "Estatutos de la Asociación" : "Normativa Institucional Unificada v5.0";
  const win = window.open("", "_blank", "width=760,height=900");
  if (!win) return toast("El navegador bloqueó la ventana de impresión.");
  win.document.write(`
    <html><head><title>${title}</title><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap" rel="stylesheet">
    <style>body{font-family:Outfit,sans-serif;margin:48px;color:#171322} .cover{border:4px solid #3F00D8;border-radius:24px;padding:42px;min-height:780px} img{width:90px} h1{font-size:52px;line-height:.95} p{font-size:18px;color:#5f5872}</style></head>
    <body><section class="cover"><img src="./assets/logo.png"><p>Grupo de La Placeta</p><h1>${title}</h1><p>Portada institucional generada desde la web oficial. Sustituir por PDF definitivo en producción.</p><p>Última actualización: 17 de mayo de 2026</p></section><script>setTimeout(()=>print(),300)<\/script></body></html>
  `);
  win.document.close();
}

document.addEventListener("DOMContentLoaded", () => {
  setupTheme();
  renderOrganizations();
  renderNews();
  updateAgeResult();
  makeCaptcha();

  $$("[data-open]").forEach((button) => button.addEventListener("click", () => openModal(button.dataset.open)));
  $$("[data-doc]").forEach((button) => button.addEventListener("click", () => generateDocCover(button.dataset.doc)));
  $$(".chip").forEach((button) => button.addEventListener("click", () => {
    $$(".chip").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderOrganizations(button.dataset.filter);
  }));

  $("#birthDate").addEventListener("input", updateAgeResult);
  $("#nextStep").addEventListener("click", nextStep);
  $("#prevStep").addEventListener("click", prevStep);
  $("#memberLogin").addEventListener("click", memberDemo);
  $("#publishPost").addEventListener("click", publishPost);
});

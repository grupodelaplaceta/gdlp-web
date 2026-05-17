const organizations = [
  { type: "publica", name: "Ayuntamiento de La Placeta", id: "PUB-AYTO", status: "Activo", text: "Gestión municipal de rol, permisos de actividad y expedientes comunitarios.", meta: ["Gobierno", "Expedientes", "Comunidad"] },
  { type: "publica", name: "Tesoro Central", id: "TGLP-001", status: "Operativo", text: "Entidad de masa monetaria simulada, emisión interna, tasas y control macroeconómico.", meta: ["Tesoro", "Normativa", "Pz"] },
  { type: "publica", name: "Agencia Tributaria", id: "ATP-001", status: "Auditando", text: "Supervisión fiscal del rol, IVA simulado, IRM y expedientes de trazabilidad.", meta: ["Tributos", "IVA", "Auditoría"] },
  { type: "empresa", name: "La Cafetería", id: "EMP-0014", status: "SDK pagos", text: "Comercio interno conectado al módulo de pagos del Banco de La Placeta.", meta: ["Empresa", "TPV", "IVA"] },
  { type: "empresa", name: "Placeta Studio", id: "EMP-0021", status: "Alta validada", text: "Proyecto creativo de miembros para contenidos, diseño y servicios del ecosistema.", meta: ["Servicios", "Contratos", "SMI"] },
  { type: "asociacion", name: "Red Comunitaria Placeta", id: "ASC-0007", status: "Proyecto aprobado", text: "Entidad colaboradora sin ánimo de lucro para actividades, ayudas y eventos.", meta: ["Voluntariado", "Eventos", "Junta"] }
];

const planProjects = [
  {
    id: "infraestructura-core",
    title: "Infraestructura Core",
    tag: "MongoDB & APIs",
    text: "Apagón progresivo de sistemas manuales y consolidación de PlacetaID, API Gateway y estado centralizado.",
    status: "Primer semestre"
  },
  {
    id: "gobernanza-economica",
    title: "Gobernanza económica",
    tag: "Fiscalidad automática",
    text: "IVA, tasas, IRM y alertas de acumulación calculadas por backend y revisables desde paneles autorizados.",
    status: "En diseño"
  },
  {
    id: "sdk-comercial",
    title: "SDK comercial",
    tag: "Pagos y webhooks",
    text: "Checkout seguro para empresas internas, enlaces de cobro de un solo uso y eventos en tiempo real.",
    status: "Piloto técnico"
  },
  {
    id: "mercado-regulado",
    title: "Mercado regulado",
    tag: "Inversiones +18",
    text: "Operaciones asíncronas, control de edad, límites por riesgo y retención fiscal automática sobre beneficio.",
    status: "Marco normativo"
  },
  {
    id: "seguridad-privacidad",
    title: "Seguridad y privacidad",
    tag: "RGPD / LOPDGDD",
    text: "Security logs, trazabilidad de cambios y baja con anonimización contable para proteger el ecosistema.",
    status: "Prioridad 2026"
  }
];

const defaultNews = [
  {
    id: "apertura-portal-institucional",
    title: "Apertura del portal institucional",
    tag: "Comunicado",
    text: "El Grupo de La Placeta estrena portal central para altas, normativa, noticias y mapa del ecosistema.",
    date: "17/05/2026",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "guia-altas-consentimiento",
    title: "Guía de altas y consentimiento",
    tag: "Ayuda",
    text: "Toda nueva incorporación debe aceptar el aviso de simulación y el consentimiento RGPD antes de recibir DIP.",
    date: "17/05/2026",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "empresas-internas-sdk-pagos",
    title: "Empresas internas y SDK de pagos",
    tag: "Ecosistema",
    text: "Las empresas de rol pueden solicitar conexión al módulo de pagos del Banco con IVA simulado por defecto.",
    date: "17/05/2026",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "portal-miembro-placetaid",
    title: "PlacetaID como acceso común",
    tag: "Comunicado",
    text: "El acceso al ecosistema se unifica mediante DIP, contraseña y autenticador para proteger la identidad interna.",
    date: "17/05/2026",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "archivo-institucional-documentos",
    title: "Archivo institucional y documentos",
    tag: "Normativa",
    text: "La sección de gobernanza reúne estatutos, normativa y documentación pública del Grupo de La Placeta.",
    date: "17/05/2026",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80"
  }
];

const PLACETAID_API_BASE = "https://id.laplaceta.org";
let wizardStep = 1;
let captchaTotal = 0;
let currentRegistration = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function loadNews() {
  const stored = JSON.parse(localStorage.getItem("gdlp-news") || "null");
  if (!Array.isArray(stored) || !stored.length) return defaultNews;
  const editorialNews = stored.filter((item) => item.tag !== "Plan 2026");
  return editorialNews.length ? editorialNews : defaultNews;
}

function saveNews(items) {
  localStorage.setItem("gdlp-news", JSON.stringify(items));
}

function slugify(value) {
  return String(value || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function renderOrganizations(filter = "all") {
  if (!$("#orgGrid")) return;
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

function renderPlanProjects() {
  const target = $("#planGrid") || $("#planPreview");
  if (!target) return;
  const items = target.id === "planPreview" ? planProjects.slice(0, 3) : planProjects;
  target.innerHTML = items.map((item) => `
    <article class="plan-card">
      <span>${item.tag}</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
      <small>${item.status}</small>
      <a class="card-link" href="./plan-detalle.html?id=${item.id}">Ver proyecto</a>
    </article>
  `).join("");
}

function labelForType(type) {
  return { publica: "Pública", empresa: "Empresa", asociacion: "Asociación" }[type] || "Organización";
}

function renderNews() {
  const preview = $("#newsPreview");
  const grid = $("#newsGrid");
  const news = loadNews();
  if (preview) {
    preview.innerHTML = news.slice(0, 2).map((item) => newsCard(item)).join("");
    return;
  }
  if (!grid) return;
  const [featured, ...rest] = news;
  if (featured && $("#featuredNews")) {
    $("#featuredNews").innerHTML = `
      <div class="featured-media">
        <img src="${featured.image || fallbackNewsImage()}" alt="${featured.title}" loading="lazy">
        ${featured.video ? `<span>Vídeo</span>` : ""}
      </div>
      <div>
        <span class="news-tag">${featured.tag}</span>
        <h3>${featured.title}</h3>
        <p>${featured.text}</p>
        <small>${featured.date}</small>
        <a class="card-link" href="./noticia.html?id=${featured.id || slugify(featured.title)}">Leer destacado</a>
      </div>
    `;
  }
  grid.innerHTML = rest.map((item, index) => newsCard(item, index + 1)).join("");
}

function newsCard(item, seed = 0) {
  const id = item.id || slugify(item.title);
  return `
    <article class="news-card">
      <img src="${item.image || fallbackNewsImage(seed)}" alt="${item.title}" loading="lazy">
      <span>${item.tag}</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
      <small>${item.date}</small>
      <a class="card-link" href="./noticia.html?id=${id}">${item.video ? "Ver vídeo" : "Leer comunicado"}</a>
    </article>
  `;
}

function fallbackNewsImage(seed = 0) {
  const images = [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80"
  ];
  return images[Math.abs(seed) % images.length];
}

function toEmbedUrl(url = "") {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v") || parsed.pathname.split("/").filter(Boolean).pop();
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
    if (parsed.hostname.includes("youtu.be")) return `https://www.youtube.com/embed/${parsed.pathname.replace("/", "")}`;
    return url;
  } catch {
    return url;
  }
}

function renderNewsDetailPage() {
  const target = $("#newsDetailPage");
  if (!target) return;
  const id = new URLSearchParams(location.search).get("id") || "";
  const item = loadNews().find((entry) => (entry.id || slugify(entry.title)) === id) || loadNews()[0];
  if (!item) return;
  const video = toEmbedUrl(item.video);
  document.title = `${item.title} | Grupo de La Placeta`;
  target.innerHTML = `
    <div class="news-detail-media">
      <img src="${item.image || fallbackNewsImage(0)}" alt="${item.title}">
    </div>
    <span class="news-tag">${item.tag}</span>
    <h2>${item.title}</h2>
    <p>${item.text}</p>
    <small>${item.date}</small>
    ${video ? `<div class="video-frame"><iframe src="${video}" title="${item.title}" allowfullscreen loading="lazy"></iframe></div>` : ""}
    <div class="share-row"><button class="secondary" type="button" data-share>Compartir enlace</button><a class="ghost" href="./noticias.html">Volver a noticias</a></div>
  `;
  $("[data-share]")?.addEventListener("click", shareCurrentPage);
}

function renderPlanDetailPage() {
  const target = $("#planDetailPage");
  if (!target) return;
  const id = new URLSearchParams(location.search).get("id") || "";
  const item = planProjects.find((entry) => entry.id === id) || planProjects[0];
  document.title = `${item.title} | Plan 2026`;
  target.innerHTML = `
    <span class="news-tag">${item.tag}</span>
    <h1>${item.title}</h1>
    <p>${item.text}</p>
    <div class="plan-detail-box">
      <strong>Estado</strong>
      <span>${item.status}</span>
    </div>
    <p>Este proyecto forma parte del Plan 2026 del Grupo de La Placeta y se publicará como hoja de ruta institucional separada de las noticias ordinarias.</p>
    <div class="share-row"><button class="secondary" type="button" data-share>Compartir enlace</button><a class="ghost" href="./plan-2026.html">Volver al Plan 2026</a></div>
  `;
  $("[data-share]")?.addEventListener("click", shareCurrentPage);
}

async function shareCurrentPage() {
  const url = location.href;
  if (navigator.share) {
    await navigator.share({ title: document.title, url }).catch(() => {});
  } else {
    await navigator.clipboard?.writeText(url);
    toast("Enlace copiado para compartir.");
  }
}

function openModal(id) {
  const dialog = document.getElementById(id);
  if (!dialog) return;
  if (id === "onboardingModal") resetWizard();
  dialog.showModal();
}

function setupTheme() {
  const saved = localStorage.getItem("gdlp-theme") || "light";
  document.documentElement.dataset.theme = saved;
  if ($(".shell")) $(".shell").dataset.theme = saved;
  $("#themeToggle")?.addEventListener("click", () => {
    const next = $(".shell").dataset.theme === "dark" ? "light" : "dark";
    $(".shell").dataset.theme = next;
    document.documentElement.dataset.theme = next;
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
  if (!$("#birthDate") || !$("#ageResult")) return;
  const age = calculateAge($("#birthDate").value);
  const tier = tierForAge(age);
  $("#ageResult").innerHTML = tier
    ? `<strong>${tier.name}</strong><br>Edad verificada: ${age} años · ${tier.limit} · ${tier.welcome}`
    : "Introduce tu fecha de nacimiento para calcular el rango.";
}

function resetWizard() {
  if (!$("#totpSetup")) return;
  wizardStep = 1;
  currentRegistration = null;
  makeCaptcha();
  $("#totpSetup").innerHTML = `
    <span>PlacetaID pendiente</span>
    <h3>Crearemos tu identidad al continuar</h3>
    <p>Después tendrás que escanear el QR con Google Authenticator, Microsoft Authenticator, 2FAS o una app compatible.</p>
  `;
  $("#totpVerifier").hidden = true;
  $("#certificatePreview").hidden = true;
  updateWizard();
}

function makeCaptcha() {
  if (!$("#captchaQuestion") || !$("#captchaAnswer")) return;
  const a = Math.floor(4 + Math.random() * 8);
  const b = Math.floor(3 + Math.random() * 9);
  captchaTotal = a + b;
  $("#captchaQuestion").textContent = `Protección anti-bot: ${a} + ${b} =`;
  $("#captchaAnswer").value = "";
}

function updateWizard() {
  if (!$("#prevStep") || !$("#nextStep")) return;
  $$(".wizard-page").forEach((page) => page.classList.toggle("active", Number(page.dataset.step) === wizardStep));
  $$("[data-step-dot]").forEach((dot) => dot.classList.toggle("active", Number(dot.dataset.stepDot) === wizardStep));
  $("#prevStep").style.visibility = wizardStep === 1 ? "hidden" : "visible";
  $("#nextStep").textContent = wizardStep === 3 ? "Imprimir certificado" : "Continuar";
}

function validateStep() {
  if (wizardStep === 1) {
    const firstName = $("#firstName").value.trim();
    const lastName = $("#lastName").value.trim();
    const age = calculateAge($("#birthDate").value);
    const password = $("#placetaPassword").value;
    const password2 = $("#placetaPassword2").value;
    if (firstName.length < 2 || lastName.length < 2 || age === null) return toast("Completa nombre, apellidos y fecha de nacimiento.");
    if (password.length < 8) return toast("La contraseña de PlacetaID debe tener al menos 8 caracteres.");
    if (password !== password2) return toast("Las contraseñas no coinciden.");
  }
  if (wizardStep === 2) {
    if (!$("#roleConsent").checked || !$("#privacyConsent").checked) return toast("Debes aceptar el aviso de rol y la política de datos.");
    if (Number($("#captchaAnswer").value) !== captchaTotal) return toast("Captcha incorrecto. Revisa la suma.");
  }
  return true;
}

async function nextStep() {
  if (wizardStep === 3) {
    if ($("#certificatePreview").hidden) return toast("Primero verifica el QR con tu autenticador.");
    window.print();
    return;
  }
  if (!validateStep()) return;
  wizardStep++;
  updateWizard();
  if (wizardStep === 3) await registerInPlacetaId();
}

function prevStep() {
  wizardStep = Math.max(1, wizardStep - 1);
  updateWizard();
}

function generateDip() {
  const last = Math.floor(1000 + Math.random() * 9000);
  return `DIP-${last}`;
}

async function registerInPlacetaId() {
  if (currentRegistration) return;
  const nextButton = $("#nextStep");
  nextButton.disabled = true;
  nextButton.textContent = "Creando PlacetaID...";
  const dip = generateDip();
  const body = {
    dip,
    nombre: $("#firstName").value.trim(),
    apellidos: $("#lastName").value.trim(),
    fechaNacimiento: $("#birthDate").value,
    rol: "miembro",
    password: $("#placetaPassword").value
  };

  try {
    const response = await fetch(`${PLACETAID_API_BASE}/api/registro`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "No se pudo crear el registro PlacetaID");
    currentRegistration = { ...data, ...body };
    $("#totpSetup").innerHTML = `
      <div class="totp-card">
        <img src="${data.qrCode}" alt="QR para configurar autenticador">
        <div>
          <span>PlacetaID creado</span>
          <h3>${data.dip}</h3>
          <p>Escanea este QR en tu app de autenticación y escribe el primer código de 6 dígitos para activar el acceso.</p>
          <div class="totp-secret">Secreto manual: ${data.totpSecret}</div>
        </div>
      </div>
    `;
    $("#totpVerifier").hidden = false;
    toast("PlacetaID creado. Escanea el QR para activar 2FA.");
  } catch (error) {
    $("#totpSetup").innerHTML = `
      <span>Error de alta</span>
      <h3>No se pudo crear PlacetaID</h3>
      <p>${error instanceof Error ? error.message : "Servicio no disponible"}</p>
    `;
    wizardStep = 2;
    updateWizard();
  } finally {
    nextButton.disabled = false;
    nextButton.textContent = "Imprimir certificado";
  }
}

async function verifyTotpSetup() {
  if (!currentRegistration?.dip) return toast("Primero crea el registro PlacetaID.");
  const code = $("#totpCode").value.replace(/\s/g, "");
  if (!/^\d{6}$/.test(code)) return toast("Introduce el código de 6 dígitos del autenticador.");
  const button = $("#verifyTotp");
  button.disabled = true;
  button.textContent = "Verificando...";
  try {
    const response = await fetch(`${PLACETAID_API_BASE}/api/registro/verificar-totp`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ dip: currentRegistration.dip, codigo: code })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Código incorrecto");
    generateCertificate();
    $("#certificatePreview").hidden = false;
    toast("Autenticador verificado. Alta completada.");
  } catch (error) {
    toast(error instanceof Error ? error.message : "No se pudo verificar el código.");
  } finally {
    button.disabled = false;
    button.textContent = "Verificar QR";
  }
}

function generateCertificate() {
  const age = calculateAge($("#birthDate").value);
  const tier = tierForAge(age);
  const dip = currentRegistration?.dip || generateDip();
  const createdAt = new Date().toLocaleString("es-ES");
  const payload = {
    dip,
    nombreRol: `${$("#firstName").value.trim()} ${$("#lastName").value.trim()}`.trim(),
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
    <p>PlacetaID activado con autenticador 2FA. Registro de consentimiento: simulación lúdica aceptada y consentimiento RGPD activo.</p>
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
    id: slugify(title),
    title,
    text,
    tag: $("#postTag").value,
    image: $("#postImage").value.trim() || fallbackNewsImage(news.length),
    video: $("#postVideo").value.trim(),
    date: new Date().toLocaleDateString("es-ES")
  });
  saveNews(news.slice(0, 12));
  $("#postTitle").value = "";
  $("#postText").value = "";
  $("#postImage").value = "";
  $("#postVideo").value = "";
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
  renderOrganizations("publica");
  renderPlanProjects();
  renderNews();
  renderNewsDetailPage();
  renderPlanDetailPage();
  updateAgeResult();
  makeCaptcha();

  $$("[data-open]").forEach((button) => button.addEventListener("click", () => openModal(button.dataset.open)));
  $$("[data-doc]").forEach((button) => button.addEventListener("click", () => generateDocCover(button.dataset.doc)));
  $$(".chip").forEach((button) => button.addEventListener("click", () => {
    $$(".chip").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderOrganizations(button.dataset.filter);
  }));

  $("#birthDate")?.addEventListener("input", updateAgeResult);
  $("#nextStep")?.addEventListener("click", nextStep);
  $("#prevStep")?.addEventListener("click", prevStep);
  $("#verifyTotp")?.addEventListener("click", verifyTotpSetup);
  $("#totpCode")?.addEventListener("input", (event) => {
    let value = event.target.value.replace(/\D/g, "").slice(0, 6);
    if (value.length > 3) value = `${value.slice(0, 3)} ${value.slice(3)}`;
    event.target.value = value;
  });
  $("#memberLogin")?.addEventListener("click", memberDemo);
  $("#publishPost")?.addEventListener("click", publishPost);
});

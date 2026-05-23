const organizations = [
  { type: "publica", name: "Ayuntamiento de La Placeta", id: "PUB-AYTO", status: "Activo", text: "Gestión municipal, permisos y expedientes.", meta: ["Gobierno", "Expedientes", "Comunidad"] },
  { type: "publica", name: "Tesoro Central", id: "TGLP-001", status: "Operativo", text: "Emisión interna, tasas y control simulado.", meta: ["Tesoro", "Normativa", "Pz"] },
  { type: "publica", name: "Agencia Tributaria", id: "ATP-001", status: "Auditando", text: "IVA simulado, IRM y trazabilidad.", meta: ["Tributos", "IVA", "Auditoría"] },
  { type: "empresa", name: "La Cafetería", id: "EMP-0014", status: "SDK pagos", text: "Comercio interno conectado al banco.", meta: ["Empresa", "TPV", "IVA"] },
  { type: "empresa", name: "Placeta Studio", id: "EMP-0021", status: "Alta validada", text: "Contenidos, diseño y servicios internos.", meta: ["Servicios", "Contratos", "SMI"] },
  { type: "asociacion", name: "Red Comunitaria Placeta", id: "ASC-0007", status: "Proyecto aprobado", text: "Actividades, ayudas y eventos.", meta: ["Voluntariado", "Eventos", "Junta"] }
];

const planProjects = [
  {
    id: "infraestructura-core",
    title: "Infraestructura Core",
    tag: "Datos y APIs",
    text: "PlacetaID, API Gateway y estado centralizado.",
    status: "Primer semestre",
    budget: [
      { area: "Identidad", concept: "PlacetaID y sesiones seguras", amount: 820, status: "Prioritario" },
      { area: "Integración", concept: "API Gateway y conectores internos", amount: 640, status: "Planificado" },
      { area: "Operación", concept: "Monitorización y copias de seguridad", amount: 290, status: "Continuo" }
    ]
  },
  {
    id: "gobernanza-economica",
    title: "Gobernanza económica",
    tag: "Fiscalidad automática",
    text: "IVA, tasas, IRM y alertas automáticas.",
    status: "En diseño",
    budget: [
      { area: "Regulación", concept: "Motor de IVA simulado e IRM", amount: 430, status: "Diseño" },
      { area: "Auditoría", concept: "Panel de alertas y revisión", amount: 360, status: "Planificado" },
      { area: "Documentación", concept: "Guías económicas para miembros", amount: 120, status: "Pendiente" }
    ]
  },
  {
    id: "sdk-comercial",
    title: "SDK comercial",
    tag: "Pagos y webhooks",
    text: "Checkout, enlaces de cobro y eventos.",
    status: "Piloto técnico",
    budget: [
      { area: "Comercio", concept: "Checkout y enlaces de cobro", amount: 520, status: "Piloto" },
      { area: "Empresas", concept: "Webhooks para tiendas internas", amount: 310, status: "Planificado" },
      { area: "Soporte", concept: "Plantillas y pruebas con empresas", amount: 140, status: "Pendiente" }
    ]
  },
  {
    id: "mercado-regulado",
    title: "Mercado regulado",
    tag: "Inversiones +18",
    text: "Operaciones con edad, límites y fiscalidad.",
    status: "Marco normativo",
    budget: [
      { area: "Normativa", concept: "Reglas de acceso +18 y límites", amount: 240, status: "Marco" },
      { area: "Riesgo", concept: "Controles de saldo y actividad", amount: 390, status: "Planificado" },
      { area: "Transparencia", concept: "Historial de operaciones simuladas", amount: 210, status: "Pendiente" }
    ]
  },
  {
    id: "seguridad-privacidad",
    title: "Seguridad y privacidad",
    tag: "RGPD / LOPDGDD",
    text: "Logs, trazabilidad y baja con anonimización.",
    status: "Prioridad 2026",
    budget: [
      { area: "Privacidad", concept: "Consentimientos y derechos de usuarios", amount: 330, status: "Prioritario" },
      { area: "Seguridad", concept: "Trazabilidad, registros y revisión", amount: 460, status: "Continuo" },
      { area: "Ciclo de vida", concept: "Baja, bloqueo y anonimización", amount: 260, status: "Planificado" }
    ]
  }
];

const defaultNews = [
  {
    id: "apertura-portal-institucional",
    title: "Apertura del portal institucional",
    tag: "Comunicado",
    text: "Nuevo portal para altas, normativa, noticias y ecosistema.",
    date: "17/05/2026",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "guia-altas-consentimiento",
    title: "Guía de altas y consentimiento",
    tag: "Ayuda",
    text: "Alta con aviso de rol, RGPD y DIP.",
    date: "17/05/2026",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "empresas-internas-sdk-pagos",
    title: "Empresas internas y SDK de pagos",
    tag: "Ecosistema",
    text: "Conexión al banco e IVA simulado.",
    date: "17/05/2026",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "portal-miembro-placetaid",
    title: "PlacetaID como acceso común",
    tag: "Comunicado",
    text: "DIP, contraseña y autenticador.",
    date: "17/05/2026",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "archivo-institucional-documentos",
    title: "Archivo institucional y documentos",
    tag: "Normativa",
    text: "Estatutos, normativa y documentos públicos.",
    date: "17/05/2026",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80"
  }
];

const PLACETAID_API_BASE = "https://id.laplaceta.org";
const PLACETAID_CLIENT_KEY = window.PLACETAID_CLIENT_KEY || localStorage.getItem("placetaid-client-key") || "";
const BANCO_GDLP_NEWS_API = "https://banco.laplaceta.org/api/gdlp-news";
let wizardStep = 1;
let captchaTotal = 0;
let currentRegistration = null;
let migrationAssignment = null;

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

async function syncBackendNews() {
  try {
    const response = await fetch(BANCO_GDLP_NEWS_API, { cache: "no-store" });
    const payload = await response.json();
    if (!response.ok || !Array.isArray(payload.news) || !payload.news.length) return;
    const local = loadNews();
    const byId = new Map();
    [...payload.news, ...local].forEach((item) => byId.set(item.id || item.slug || slugify(item.title), {
      ...item,
      id: item.id || item.slug || slugify(item.title),
      text: item.text || item.summary || "",
      video: item.video || item.videoUrl || ""
    }));
    saveNews([...byId.values()].slice(0, 24));
    renderNews();
    refreshBankExport();
  } catch {
    // La web sigue funcionando en localStorage si el backend no responde.
  }
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function plainTextFromHtml(html = "") {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent?.replace(/\s+/g, " ").trim() || "";
}

function sanitizeRichHtml(html = "") {
  const template = document.createElement("template");
  template.innerHTML = html;
  const allowed = new Set(["P", "BR", "STRONG", "B", "EM", "I", "UL", "OL", "LI", "A", "H2", "H3", "BLOCKQUOTE"]);
  template.content.querySelectorAll("*").forEach((node) => {
    if (!allowed.has(node.tagName)) {
      node.replaceWith(document.createTextNode(node.textContent || ""));
      return;
    }
    [...node.attributes].forEach((attr) => {
      const keepHref = node.tagName === "A" && attr.name === "href";
      if (!keepHref) node.removeAttribute(attr.name);
    });
    if (node.tagName === "A") {
      const href = node.getAttribute("href") || "";
      if (!/^https?:\/\//i.test(href) && !href.startsWith("./") && !href.startsWith("/")) node.removeAttribute("href");
      node.setAttribute("target", "_blank");
      node.setAttribute("rel", "noreferrer");
    }
  });
  return template.innerHTML.trim();
}

function lines(value = "") {
  return String(value).split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
}

function itemImages(item, seed = 0) {
  const images = Array.isArray(item.images) ? item.images.filter(Boolean) : [];
  return images.length ? images : [item.image || fallbackNewsImage(seed)];
}

function itemVideos(item) {
  const videos = Array.isArray(item.videos) ? item.videos.filter(Boolean) : [];
  if (item.video) videos.unshift(item.video);
  return [...new Set(videos)];
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
      <div class="plan-budget-mini">
        <strong>${moneyPz(planBudgetTotal(item))}</strong>
        <small>${item.budget?.length || 0} partidas</small>
      </div>
      <small>${item.status}</small>
      <a class="card-link" href="./plan-detalle.html?id=${item.id}">Ver proyecto</a>
    </article>
  `).join("");
}

function planBudgetTotal(item) {
  return (item.budget || []).reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
}

function planBudgetMarkup(item) {
  const budget = item.budget || [];
  if (!budget.length) return "";
  const total = planBudgetTotal(item);
  return `
    <section class="plan-budget-detail">
      <div class="plan-budget-head">
        <div>
          <p class="eyebrow">Presupuesto</p>
          <h2>${moneyPz(total)}</h2>
        </div>
        <span>${budget.length} partidas de gasto</span>
      </div>
      <div class="plan-budget-list">
        ${budget.map((entry) => {
          const percent = total ? Math.round((Number(entry.amount || 0) / total) * 100) : 0;
          return `
            <article>
              <div>
                <span>${escapeHtml(entry.area)}</span>
                <strong>${escapeHtml(entry.concept)}</strong>
                <small>${escapeHtml(entry.status)}</small>
              </div>
              <div class="budget-amount">
                <strong>${moneyPz(entry.amount)}</strong>
                <small>${percent}%</small>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
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
    const featuredImages = itemImages(featured);
    const featuredVideos = itemVideos(featured);
    $("#featuredNews").innerHTML = `
      <div class="featured-media">
        <img src="${featuredImages[0]}" alt="${escapeHtml(featured.title)}" loading="lazy">
        <div class="news-media-labels">
          ${featuredImages.length > 1 ? `<span>${featuredImages.length} imágenes</span>` : ""}
          ${featuredVideos.length ? `<span>${featuredVideos.length} vídeo${featuredVideos.length > 1 ? "s" : ""}</span>` : ""}
        </div>
      </div>
      <div class="featured-copy">
        <div class="news-meta-row">
          <span class="news-tag">${escapeHtml(featured.tag)}</span>
          <small>${escapeHtml(featured.date)}</small>
          ${featured.shareWithBank ? `<small class="bank-shared">Banco</small>` : ""}
        </div>
        <h3>${escapeHtml(featured.title)}</h3>
        <p>${escapeHtml(featured.text)}</p>
        <a class="card-link" href="./noticia.html?id=${featured.id || slugify(featured.title)}">Leer destacado</a>
      </div>
    `;
  }
  grid.innerHTML = rest.map((item, index) => newsCard(item, index + 1)).join("");
}

function newsCard(item, seed = 0) {
  const id = item.id || slugify(item.title);
  const images = itemImages(item, seed);
  const videos = itemVideos(item);
  return `
    <article class="news-card">
      <a class="news-card-media" href="./noticia.html?id=${id}" aria-label="Abrir ${escapeHtml(item.title)}">
        <img src="${images[0]}" alt="${escapeHtml(item.title)}" loading="lazy">
        <span class="news-media-labels">
          ${images.length > 1 ? `<small>${images.length} imágenes</small>` : ""}
          ${videos.length ? `<small>${videos.length} vídeo${videos.length > 1 ? "s" : ""}</small>` : ""}
        </span>
      </a>
      <div class="news-meta-row">
        <span>${escapeHtml(item.tag)}</span>
        <small>${escapeHtml(item.date)}</small>
        ${item.shareWithBank ? `<small class="bank-shared">Banco</small>` : ""}
      </div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>
      <a class="card-link" href="./noticia.html?id=${id}">${videos.length ? "Ver multimedia" : "Leer comunicado"}</a>
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
    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : url;
    }
    return url;
  } catch {
    return url;
  }
}

function videoMarkup(url, title, index = 0) {
  const embed = toEmbedUrl(url);
  if (!embed) return "";
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(embed)) {
    return `<video class="news-video" src="${embed}" controls preload="metadata"></video>`;
  }
  return `<div class="video-frame"><iframe src="${embed}" title="${escapeHtml(title)} vídeo ${index + 1}" allowfullscreen loading="lazy"></iframe></div>`;
}

function renderNewsDetailPage() {
  const target = $("#newsDetailPage");
  if (!target) return;
  const id = new URLSearchParams(location.search).get("id") || "";
  const item = loadNews().find((entry) => (entry.id || slugify(entry.title)) === id) || loadNews()[0];
  if (!item) return;
  const images = itemImages(item);
  const videos = itemVideos(item).filter(Boolean);
  const bodyHtml = item.html ? sanitizeRichHtml(item.html) : `<p>${escapeHtml(item.text)}</p>`;
  document.title = `${item.title} | Grupo de La Placeta`;
  target.innerHTML = `
    <header class="news-detail-hero">
      <div class="news-detail-media">
        <img src="${images[0]}" alt="${escapeHtml(item.title)}">
        <div class="news-media-labels">
          ${images.length > 1 ? `<span>${images.length} imágenes</span>` : ""}
          ${videos.length ? `<span>${videos.length} vídeo${videos.length > 1 ? "s" : ""}</span>` : ""}
        </div>
      </div>
      <div class="news-detail-heading">
        <div class="news-meta-row">
          <span class="news-tag">${escapeHtml(item.tag)}</span>
          <small>${escapeHtml(item.date)}</small>
          ${item.shareWithBank ? `<small class="bank-shared">Banco de La Placeta</small>` : ""}
        </div>
        <h1>${escapeHtml(item.title)}</h1>
        <p>${escapeHtml(item.text)}</p>
      </div>
    </header>
    <article class="rich-news-body">${bodyHtml}</article>
    ${images.length > 1 ? `<div class="news-gallery">${images.slice(1).map((image, index) => `<img src="${image}" alt="${escapeHtml(item.title)} imagen ${index + 2}" loading="lazy">`).join("")}</div>` : ""}
    ${videos.length ? `<div class="video-stack">${videos.map((video, index) => videoMarkup(video, item.title, index)).join("")}</div>` : ""}
    ${item.shareWithBank ? `<p class="bank-shared-note">Esta noticia está marcada para compartirse también en la web del Banco de La Placeta.</p>` : ""}
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
    <div class="plan-detail-box">
      <strong>Presupuesto total</strong>
      <span>${moneyPz(planBudgetTotal(item))}</span>
    </div>
    ${planBudgetMarkup(item)}
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
  if (!dialog && id === "memberModal") {
    window.location.href = "./index.html?portal=member";
    return;
  }
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

function setupMobileDrawer() {
  const topbar = $(".topbar");
  const nav = $(".desktop-nav");
  const actions = $(".top-actions");
  if (!topbar || !nav || !actions || $(".mobile-drawer")) return;

  const toggle = document.createElement("button");
  toggle.className = "icon-btn mobile-menu-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-label", "Abrir menú");
  toggle.setAttribute("aria-expanded", "false");
  toggle.innerHTML = "<span></span><span></span><span></span>";
  actions.appendChild(toggle);

  const overlay = document.createElement("button");
  overlay.className = "drawer-overlay";
  overlay.type = "button";
  overlay.setAttribute("aria-label", "Cerrar menú");

  const drawer = document.createElement("aside");
  drawer.className = "mobile-drawer";
  drawer.setAttribute("aria-label", "Menú principal");
  drawer.innerHTML = `
    <div class="drawer-head">
      <img src="./assets/logo.png" alt="">
      <button class="icon-btn drawer-close" type="button" aria-label="Cerrar menú">×</button>
    </div>
    <nav></nav>
    <button class="secondary drawer-member" type="button" data-open="memberModal">Portal miembro</button>
    <a class="primary drawer-cta" href="./alta.html">Solicitar alta</a>
  `;

  const drawerNav = drawer.querySelector("nav");
  nav.querySelectorAll("a").forEach((link) => drawerNav.appendChild(link.cloneNode(true)));

  document.body.append(overlay, drawer);

  function closeDrawer() {
    document.body.classList.remove("drawer-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function openDrawer() {
    document.body.classList.add("drawer-open");
    toggle.setAttribute("aria-expanded", "true");
  }

  toggle.addEventListener("click", () => document.body.classList.contains("drawer-open") ? closeDrawer() : openDrawer());
  overlay.addEventListener("click", closeDrawer);
  drawer.querySelector(".drawer-close")?.addEventListener("click", closeDrawer);
  drawer.querySelector("[data-open='memberModal']")?.addEventListener("click", () => {
    closeDrawer();
    openModal("memberModal");
  });
  drawer.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeDrawer));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDrawer();
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
  if (age < 16) return { name: "Junior Básica", limit: "500 Pz saldo / 50 Pz diarios", welcome: "Bono inicial 500 Pz", guardian: true };
  if (age < 18) return { name: "Junior Senior", limit: "1.000 Pz saldo / 100 Pz diarios", welcome: "Bono inicial 500 Pz", guardian: true };
  return { name: "Ciudadanía Plena", limit: "Funciones completas ordinarias", welcome: "Alta sin bono junior" };
}

function updateAgeResult() {
  if (!$("#birthDate") || !$("#ageResult")) return;
  const age = calculateAge($("#birthDate").value);
  const tier = tierForAge(age);
  $("#ageResult").innerHTML = tier
    ? `<strong>${tier.name}</strong><br>Edad verificada: ${age} años · ${tier.limit} · ${tier.welcome}${tier.guardian ? "<br>Alta infantil: requiere gestión con tutores legales. Plataforma opcional de controles parentales disponible para límites, seguimiento y autorizaciones." : ""}`
    : "Introduce tu fecha de nacimiento para calcular el rango.";
  updateGuardianVisibility(tier);
}

function updateGuardianVisibility(tier = tierForAge(calculateAge($("#birthDate")?.value))) {
  const box = $("#guardianBox");
  if (!box) return;
  const required = Boolean(tier?.guardian);
  box.hidden = !required;
  box.querySelectorAll("input, select, button").forEach((field) => {
    field.disabled = !required;
  });
  if (!required) {
    ["guardianLookup", "guardianName", "guardianEmail", "guardianDip"].forEach((id) => {
      const field = $(`#${id}`);
      if (field) field.value = "";
    });
    if ($("#guardianHasPlacetaId")) $("#guardianHasPlacetaId").checked = false;
    if ($("#guardianConsent")) $("#guardianConsent").checked = false;
    if ($("#guardianResult")) $("#guardianResult").textContent = "Pendiente de localizar o completar tutor.";
  }
}

function guardianPayload() {
  return {
    hasPlacetaId: Boolean($("#guardianHasPlacetaId")?.checked),
    lookup: ($("#guardianLookup")?.value || "").trim(),
    name: ($("#guardianName")?.value || "").trim(),
    email: ($("#guardianEmail")?.value || "").trim(),
    dip: ($("#guardianDip")?.value || "").trim().toUpperCase().replace(/[\s-]+/g, ""),
    relation: ($("#guardianRelation")?.value || "Tutor legal").trim(),
    consent: Boolean($("#guardianConsent")?.checked)
  };
}

function findGuardianByLookup(value) {
  const lookup = String(value || "").trim().toLowerCase();
  const lookupDip = lookup.toUpperCase().replace(/[\s-]+/g, "");
  if (!lookup) return null;
  for (let index = 0; index < localStorage.length; index++) {
    const key = localStorage.key(index);
    if (!key?.startsWith("gdlp-prealta-")) continue;
    const record = JSON.parse(localStorage.getItem(key) || "null");
    const dip = String(record?.dip || "").toUpperCase().replace(/[\s-]+/g, "");
    const email = String(record?.correo || record?.email || "").toLowerCase();
    if (dip === lookupDip || email === lookup) return record;
  }
  return null;
}

function searchGuardian() {
  const data = guardianPayload();
  if (!data.lookup) return toast("Introduce el DIP o correo del tutor.");
  const found = findGuardianByLookup(data.lookup);
  if (!found) {
    $("#guardianResult").textContent = "No se encontró un tutor local. Completa sus datos para validación manual.";
    return toast("Tutor no encontrado. Puedes completar sus datos manualmente.");
  }
  $("#guardianName").value = found.nombreRol || found.nombre || "";
  $("#guardianEmail").value = found.correo || found.email || "";
  $("#guardianDip").value = found.dip || "";
  $("#guardianHasPlacetaId").checked = true;
  $("#guardianResult").innerHTML = `<strong>Tutor localizado</strong><br>${escapeHtml(found.nombreRol || "Tutor PlacetaID")} · ${escapeHtml(found.dip || data.lookup)}`;
  toast("Tutor localizado.");
}

function authAppListMarkup() {
  return `
    <div class="auth-app-list">
      <strong>Apps compatibles</strong>
      <span>Google Authenticator</span>
      <span>Microsoft Authenticator</span>
      <span>2FAS</span>
      <span>Authy</span>
      <span>Aegis Authenticator</span>
      <span>Bitwarden Authenticator</span>
      <span>1Password</span>
    </div>
  `;
}

function resetWizard() {
  if (!$("#totpSetup")) return;
  wizardStep = 1;
  currentRegistration = null;
  migrationAssignment = null;
  if ($("#migrationResult")) $("#migrationResult").hidden = true;
  if ($("#migrationDip")) $("#migrationDip").value = "";
  makeCaptcha();
  $("#totpSetup").innerHTML = `
    <span>PlacetaID pendiente</span>
    <h3>Crearemos tu identidad al continuar</h3>
    <p>Después tendrás que escanear el QR con una app autenticadora compatible.</p>
    ${authAppListMarkup()}
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
    const email = $("#contactEmail").value.trim();
    const password = $("#placetaPassword").value;
    const password2 = $("#placetaPassword2").value;
    if (firstName.length < 2 || lastName.length < 2 || age === null) return toast("Completa nombre, apellidos y fecha de nacimiento.");
    if (!/\S+@\S+\.\S+/.test(email)) return toast("Introduce un correo válido para recuperar PlacetaID y el autenticador.");
    if (password.length < 8) return toast("La contraseña de PlacetaID debe tener al menos 8 caracteres.");
    if (password !== password2) return toast("Las contraseñas no coinciden.");
  }
  if (wizardStep === 2) {
    if (!$("#roleConsent").checked || !$("#privacyConsent").checked) return toast("Debes aceptar el aviso de rol y la política de datos.");
    const tier = tierForAge(calculateAge($("#birthDate").value));
    if (tier?.guardian) {
      const guardian = guardianPayload();
      const hasLookup = guardian.hasPlacetaId && (guardian.dip || guardian.lookup);
      const hasManualData = guardian.name.length >= 3 && /\S+@\S+\.\S+/.test(guardian.email);
      if (!hasLookup && !hasManualData) return toast("Indica el PlacetaID del tutor o completa nombre y correo del tutor legal.");
      if (!guardian.consent) return toast("Debes confirmar la autorización del tutor legal.");
    }
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

function dipInitialFromName(name) {
  return String(name || "")
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .match(/[A-Z]/)?.[0] || "X";
}

function generateDip(name = $("#firstName")?.value) {
  const number = Math.floor(Math.random() * 100000000).toString().padStart(8, "0");
  return `${number}${dipInitialFromName(name)}`;
}

async function registerInPlacetaId() {
  if (currentRegistration) return;
  const nextButton = $("#nextStep");
  nextButton.disabled = true;
  nextButton.textContent = "Creando PlacetaID...";
  const age = calculateAge($("#birthDate").value);
  const tier = tierForAge(age);
  const guardian = tier?.guardian ? guardianPayload() : null;
  const body = {
    nombre: $("#firstName").value.trim(),
    apellidos: $("#lastName").value.trim(),
    correo: $("#contactEmail").value.trim(),
    ...(migrationAssignment ? { dip: migrationAssignment.dip, placeid: migrationAssignment.placeid } : {}),
    fechaNacimiento: $("#birthDate").value,
    rol: "miembro",
    password: $("#placetaPassword").value,
    altaTutelada: Boolean(guardian),
    tutorLegal: guardian
  };

  try {
    const registrationEndpoint = PLACETAID_CLIENT_KEY
      ? `${PLACETAID_API_BASE}/api/registro/solicitante`
      : `${PLACETAID_API_BASE}/api/registro`;
    const headers = { "content-type": "application/json" };
    if (PLACETAID_CLIENT_KEY) headers["x-api-key"] = PLACETAID_CLIENT_KEY;
    const response = await fetch(registrationEndpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ ...body, origen: migrationAssignment ? "gdlp-web-migracion" : "gdlp-web" })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "No se pudo crear el registro PlacetaID");
    if (!/^\d{8}[A-Z]$/.test(String(data.dip || "").trim().toUpperCase())) {
      throw new Error("PlacetaID no devolvió un DIP con formato oficial");
    }
    currentRegistration = { ...body, ...data };
    $("#totpSetup").innerHTML = `
      <div class="totp-card">
        <img src="${data.qrCode}" alt="QR para configurar autenticador">
        <div>
          <span>PlacetaID creado</span>
          <h3>${data.placeid || data.dip}</h3>
          <p>Escanea este QR en Google Authenticator, Microsoft Authenticator, 2FAS, Authy, Aegis, Bitwarden Authenticator, 1Password o cualquier app compatible con códigos TOTP. Escribe el primer código de 6 dígitos para activar el acceso.</p>
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

async function recoverMigrationQr() {
  const field = $("#migrationDip");
  const result = $("#migrationResult");
  const button = $("#recoverMigrationQr");
  const dip = (field?.value || "").trim().toUpperCase().replace(/[\s-]+/g, "");
  if (!/^\d{8}[A-Z]$/.test(dip)) return toast("Introduce un DIP válido.");

  button.disabled = true;
  button.textContent = "Buscando...";
  if (result) {
    result.hidden = false;
    result.textContent = "Consultando DIP asignado...";
  }

  try {
    const response = await fetch(`${PLACETAID_API_BASE}/api/migraciones/pendientes/${encodeURIComponent(dip)}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "No hay migración pendiente para ese DIP");
    migrationAssignment = { dip: data.dip, placeid: data.placeid };
    if (result) {
      result.hidden = false;
      result.innerHTML = `<strong>DIP asignado</strong><br>${escapeHtml(data.dip)} · ${escapeHtml(data.placeid || data.dip)}. Completa el alta normal para generar el QR.`;
    }
    toast("DIP asignado encontrado. Completa el alta normal.");
  } catch (error) {
    if (result) {
      result.hidden = false;
      result.textContent = error instanceof Error ? error.message : "No se pudo recuperar el QR.";
    }
    toast(error instanceof Error ? error.message : "No se pudo recuperar el QR.");
  } finally {
    button.disabled = false;
    button.textContent = "Buscar DIP";
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
    placeid: currentRegistration?.placeid,
    nombreRol: `${$("#firstName").value.trim()} ${$("#lastName").value.trim()}`.trim(),
    correo: $("#contactEmail").value.trim(),
    edad: age,
    rango: tier.name,
    proyecto: $("#initialProject").value,
    consentimiento_rgpd: true,
    simulacion_aceptada: true,
    gestion_tutores_legales: Boolean(tier.guardian),
    controles_parentales_opcionales: Boolean(tier.guardian),
    tutor_legal: tier.guardian ? guardianPayload() : null,
    creadoEn: createdAt,
    origen: "Web GDLP"
  };
  localStorage.setItem(`gdlp-prealta-${dip}`, JSON.stringify(payload));
  $("#certificatePreview").innerHTML = `
    <span>Certificado de Identidad Digital y Registro</span>
    <h3>${payload.nombreRol}</h3>
    <p><strong>${dip}</strong> · ${tier.name} · ${age} años</p>
    <p>Proyecto inicial: ${payload.proyecto}</p>
    ${tier.guardian ? "<p>Alta infantil gestionada con tutores legales. Puede vincularse opcionalmente a la plataforma de controles parentales.</p>" : ""}
    ${payload.tutor_legal ? `<p>Tutor legal: ${escapeHtml(payload.tutor_legal.name || payload.tutor_legal.dip || payload.tutor_legal.email)} · ${escapeHtml(payload.tutor_legal.relation)}</p>` : ""}
    <p>Alta generada: ${createdAt}</p>
    <p>PlacetaID activado con autenticador 2FA. Registro de consentimiento: simulación lúdica aceptada y consentimiento RGPD activo.</p>
  `;
}

function memberDemo() {
  const dip = $("#memberDip").value.trim().toUpperCase().replace(/[\s-]+/g, "") || "00000000X";
  const stored = localStorage.getItem(`gdlp-prealta-${dip}`);
  const data = stored ? JSON.parse(stored) : { dip, nombreRol: "Miembro demo", rango: "Ciudadanía Plena", proyecto: "Participante individual" };
  $("#memberOutput").innerHTML = `
    <strong>${data.nombreRol}</strong>
    <p>${data.dip} · ${data.rango}</p>
    <p>Contratos vigentes: 1 contrato simulado bajo SMI de 150 Pz.</p>
    <p>Solicitud disponible: crear organización y elevar a Junta.</p>
  `;
}

function bankSharedItems(items = loadNews()) {
  return items.filter((item) => item.shareWithBank).map((item) => ({
    slug: item.id || slugify(item.title),
    title: item.title,
    tag: item.tag,
    summary: item.text,
    date: item.date,
    image: itemImages(item)[0],
    images: itemImages(item),
    body: plainTextFromHtml(item.html || item.text).split(/(?<=[.!?])\s+/).filter(Boolean),
    html: item.html || `<p>${escapeHtml(item.text)}</p>`,
    videoUrl: itemVideos(item).map(toEmbedUrl).filter(Boolean)[0],
    videos: itemVideos(item).map(toEmbedUrl).filter(Boolean),
    source: "gdlp-web-editor"
  }));
}

function refreshBankExport(items = loadNews()) {
  const box = $("#bankExport");
  const output = $("#bankExportText");
  if (!box || !output) return;
  const shared = bankSharedItems(items);
  if (!shared.length) {
    box.hidden = true;
    output.value = "";
    return;
  }
  box.hidden = false;
  output.value = JSON.stringify(shared, null, 2);
}

async function publishSharedToBank(items, key) {
  const shared = bankSharedItems(items);
  if (!shared.length) return { ok: true, skipped: true };
  const response = await fetch(BANCO_GDLP_NEWS_API, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-gdlp-admin-key": key
    },
    body: JSON.stringify({ news: shared })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "No se pudo publicar en Banco de La Placeta");
  return payload;
}

async function publishPost() {
  const key = $("#adminKey").value.trim();
  if (!key) return adminMessage("Introduce la clave editorial.");
  const title = $("#postTitle").value.trim();
  const html = sanitizeRichHtml($("#postEditor")?.innerHTML || "");
  const text = plainTextFromHtml(html).slice(0, 220);
  if (title.length < 3 || text.length < 8) return adminMessage("Completa título y contenido.");
  const news = loadNews();
  const cover = $("#postImage").value.trim();
  const gallery = lines($("#postImages").value);
  const videos = [$("#postVideo").value.trim(), ...lines($("#postVideos").value)].filter(Boolean);
  const shareWithBank = Boolean($("#shareWithBank")?.checked);
  news.unshift({
    id: slugify(title),
    title,
    text,
    html,
    tag: $("#postTag").value,
    image: cover || gallery[0] || fallbackNewsImage(news.length),
    images: [cover, ...gallery].filter(Boolean),
    video: videos[0] || "",
    videos,
    date: new Date().toLocaleDateString("es-ES"),
    shareWithBank
  });
  const nextNews = news.slice(0, 24);
  saveNews(nextNews);
  localStorage.setItem("gdlp-bank-shared-news", JSON.stringify(bankSharedItems(nextNews)));
  $("#postTitle").value = "";
  $("#postImage").value = "";
  $("#postImages").value = "";
  $("#postVideo").value = "";
  $("#postVideos").value = "";
  $("#postEditor").innerHTML = "";
  if ($("#shareWithBank")) $("#shareWithBank").checked = false;
  renderNews();
  refreshBankExport(nextNews);
  if (shareWithBank) {
    try {
      await publishSharedToBank(nextNews, key);
      adminMessage("Noticia publicada y sincronizada con Banco de La Placeta.");
    } catch (error) {
      adminMessage(`${error instanceof Error ? error.message : "No se pudo sincronizar con Banco"}. Queda en el paquete exportable.`);
    }
  } else {
    adminMessage("Noticia publicada en portada.");
  }
}

function adminMessage(text) {
  $("#adminOutput").textContent = text;
}

function setupRichEditor() {
  const editor = $("#postEditor");
  if (!editor) return;
  $$("[data-rich]").forEach((button) => button.addEventListener("click", () => {
    editor.focus();
    document.execCommand(button.dataset.rich, false);
  }));
  $$("[data-rich-block]").forEach((button) => button.addEventListener("click", () => {
    editor.focus();
    document.execCommand("formatBlock", false, button.dataset.richBlock);
  }));
  $("[data-rich-link]")?.addEventListener("click", () => {
    editor.focus();
    const href = prompt("URL del enlace");
    if (href) document.execCommand("createLink", false, href);
  });
  editor.addEventListener("paste", (event) => {
    event.preventDefault();
    const text = event.clipboardData?.getData("text/plain") || "";
    document.execCommand("insertText", false, text);
  });
}

async function copyBankExport() {
  const value = $("#bankExportText")?.value || "";
  if (!value) return adminMessage("No hay noticias marcadas para Banco.");
  if (navigator.clipboard) await navigator.clipboard.writeText(value);
  adminMessage("Paquete Banco copiado.");
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
  setupMobileDrawer();
  renderOrganizations("publica");
  renderPlanProjects();
  renderNews();
  renderNewsDetailPage();
  renderPlanDetailPage();
  updateAgeResult();
  makeCaptcha();
  setupRichEditor();
  refreshBankExport();
  syncBackendNews();

  $$("[data-open]").forEach((button) => button.addEventListener("click", () => openModal(button.dataset.open)));
  $$("[data-doc]").forEach((button) => button.addEventListener("click", () => generateDocCover(button.dataset.doc)));
  $$(".chip").forEach((button) => button.addEventListener("click", () => {
    $$(".chip").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderOrganizations(button.dataset.filter);
  }));

  $("#birthDate")?.addEventListener("input", updateAgeResult);
  $("#guardianSearchBtn")?.addEventListener("click", searchGuardian);
  $("#guardianHasPlacetaId")?.addEventListener("change", () => {
    if ($("#guardianResult")) {
      $("#guardianResult").textContent = $("#guardianHasPlacetaId").checked
        ? "Busca por DIP o correo para vincular el PlacetaID del tutor."
        : "Completa los datos del tutor para validación manual.";
    }
  });
  $("#nextStep")?.addEventListener("click", nextStep);
  $("#prevStep")?.addEventListener("click", prevStep);
  $("#verifyTotp")?.addEventListener("click", verifyTotpSetup);
  $("#recoverMigrationQr")?.addEventListener("click", recoverMigrationQr);
  $("#totpCode")?.addEventListener("input", (event) => {
    let value = event.target.value.replace(/\D/g, "").slice(0, 6);
    if (value.length > 3) value = `${value.slice(0, 3)} ${value.slice(3)}`;
    event.target.value = value;
  });
  $("#memberLogin")?.addEventListener("click", memberDemo);
  $("#publishPost")?.addEventListener("click", publishPost);
  $("#copyBankExport")?.addEventListener("click", copyBankExport);
  if (new URLSearchParams(location.search).get("portal") === "member") {
    openModal("memberModal");
  }
});

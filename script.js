// Tema claro e escuro com preferência salva.
const themeToggle = document.querySelector("#themeToggle");
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const light = theme === "light";
  themeToggle.setAttribute("aria-pressed", String(light));
  themeToggle.setAttribute("aria-label", light ? "Ativar modo escuro" : "Ativar modo claro");
  themeToggle.firstElementChild.textContent = light ? "☾" : "☀";
}
try { applyTheme(localStorage.getItem("portfolio-theme") === "light" ? "light" : "dark"); } catch { applyTheme("dark"); }
themeToggle.addEventListener("click", () => {
  const theme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  applyTheme(theme);
  try { localStorage.setItem("portfolio-theme", theme); } catch {}
});

/* =====================================================
   ✏️ CONFIGURAÇÃO · edite só esta parte
   Em "video"/"showreel" cole o link normal do YouTube, Vimeo
   ou Google Drive (ou o link de embed). Ele vira iframe sozinho.
   "thumbnail" é opcional: vazio = pega a capa do YouTube
   automaticamente; senão use um arquivo seu (ex: "img/casa.jpg").
   ===================================================== */
const CONFIG = {
  whatsapp: "https://wa.me/5581983656583",   // ← seu WhatsApp
  instagram: "https://www.instagram.com/_barbosadmelo/", // ← seu Instagram
  email: "",      // ← seu e-mail
  showreel: { video: "", thumbnail: "" },    // ← link do showreel
  // PLACEHOLDERS: listas vazias até adicionar trabalhos reais; não aparecem no site.
  // verticalProjects: { title, client, platform: "Shorts"/"Reels"/"TikTok",
  // video: URL real, thumbnail: arquivo real (obrigatório fora do YouTube),
  // description, services: ["Edição de vídeo"], year }
  verticalProjects: [
    { title: "Reel 01 · Rex", client: "@rex_z77", creator: "Rex", platform: "Instagram Reels",
      video: "https://www.instagram.com/reel/Db1qw8qRnNk/", thumbnail: "",
      description: "Trabalho de edição em formato vertical.",
      services: ["Edição de vídeo"] },
    { title: "Reel 02 · JP Victor", client: "@jpvictorzx", creator: "JP Victor", platform: "Instagram Reels",
      video: "https://www.instagram.com/reel/Dczj-TvMhn4/", thumbnail: "",
      description: "Trabalho de edição em formato vertical.",
      services: ["Edição de vídeo"] },
    { title: "Reel 03 · Casa Clutch", client: "@casa.clutch", creator: "Casa Clutch", platform: "Instagram Reels",
      video: "https://www.instagram.com/reel/DdPuYkUS9FW/", thumbnail: "",
      description: "Trabalho de edição em formato vertical.",
      services: ["Edição de vídeo"] },
    { title: "Reel 04 · Juan Milioni", client: "@juanmilioni", creator: "Juan Milioni", platform: "Instagram Reels",
      video: "https://www.instagram.com/reel/Dcy5_BAp-Ic/", thumbnail: "",
      description: "Trabalho de edição em formato vertical.",
      services: ["Edição de vídeo"] },
    { title: "Reel 05 · Juan Milioni", client: "@juanmilioni", creator: "Juan Milioni", platform: "Instagram Reels",
      video: "https://www.instagram.com/reel/Dc_na-RpHoE/", thumbnail: "",
      description: "Trabalho de edição em formato vertical.",
      services: ["Edição de vídeo"] },
  ],
  // thumbnails: { src: caminho do arquivo autoral, alt: descrição da capa, title }
  // Adicione os arquivos ao repositório e informe seus caminhos relativos em src.
  // As capas automáticas do YouTube não são apresentadas como criações autorais.
  thumbnails: [],
  projects: [
    { title: "Casa Clutch", client: "Casa Clutch", category: "YouTube", year: "2026", editType: "Edição de vídeo",
      video: "https://youtu.be/lXB8Dn48W6s", thumbnail: "", vertical: false,
      description: "Vídeo editado para Casa Clutch.",
      services: ["Edição de vídeo"] },
    { title: "Santana", client: "Santana", category: "YouTube", year: "2026", editType: "Edição de vídeo",
      video: "https://youtu.be/S9YK_6tsb9M", thumbnail: "", vertical: false,
      description: "Vídeo editado para Santana.",
      services: ["Edição de vídeo"] },
    { title: "Rex", client: "Rex", category: "YouTube", year: "2026", editType: "Edição de vídeo",
      video: "https://youtu.be/ANrPaqlfLFg", thumbnail: "", vertical: false,
      description: "Vídeo editado para Rex. Assista ao vídeo completo para conhecer o resultado.",
      services: ["Edição de vídeo"] },
  ],
};

/* ================= código ================= */
const $ = (s, el = document) => el.querySelector(s);
const ytId = (u) => (u.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/) || [])[1];

function toEmbed(u, autoplay = false) {
  if (!u) return "";
  let e = u;
  const y = ytId(u), v = u.match(/vimeo\.com\/(?:video\/)?(\d+)/), d = u.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  if (y) e = `https://www.youtube-nocookie.com/embed/${y}?rel=0`;
  else if (v) e = `https://player.vimeo.com/video/${v[1]}`;
  else if (d) e = `https://drive.google.com/file/d/${d[1]}/preview`;
  return autoplay ? e + (e.includes("?") ? "&" : "?") + "autoplay=1" : e;
}
const thumbOf = (o) => o.thumbnail || (ytId(o.video || "") ? `https://img.youtube.com/vi/${ytId(o.video)}/maxresdefault.jpg` : "");
const ph = (t) => "data:image/svg+xml," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'><rect width='1600' height='900' fill='#101010'/><rect x='40' y='40' width='1520' height='820' fill='none' stroke='#fff' stroke-opacity='.08'/><text x='80' y='820' fill='#949AA5' font-family='sans-serif' font-size='28'>${t}</text></svg>`);
const iframe = (src, title, vertical) => `<iframe src="${src}" title="${title}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;

// links de contato
document.querySelectorAll("[data-link]").forEach((a) => {
  const url = CONFIG[a.dataset.link];
  if (url) a.href = url;
  else (a.closest("li") || a).hidden = true;
});

// hero + showreel
const first = CONFIG.projects[0];
$("#heroImg").src = thumbOf(first) || ph("Cena de um projeto");
const sr = CONFIG.showreel;
$(".showreel").hidden = !sr.video;
$("#srImg").src = thumbOf(sr) || ph("Seleção de vídeos");
$("#srPlay").addEventListener("click", () => {
  if (!sr.video) return alert("Defina o link do showreel em script.js (CONFIG.showreel.video).");
  $("#srBox").innerHTML = iframe(toEmbed(sr.video, true), "Seleção de vídeos 2026");
});

// grid de projetos
const grid = $("#grid");
CONFIG.projects.forEach((p, i) => {
  const card = document.createElement("article");
  card.className = "card rv video-reveal";
  card.setAttribute("role", "group");
  card.setAttribute("aria-roledescription", "slide");
  card.setAttribute("aria-label", `${i + 1} de ${CONFIG.projects.length}: ${p.title}`);
  card.innerHTML = `<button class="card-btn" data-i="${i}" aria-label="Ver projeto ${p.title}">
    <div class="thumb ${p.vertical ? "v" : ""}"><img src="${thumbOf(p) || ph("Capa · " + p.title)}" alt="Capa do projeto ${p.title}" loading="lazy">
      <span class="card-play" aria-hidden="true">▶</span><div class="ov"><span>${p.category}</span><span>Assistir ao vídeo ↗</span></div></div>
    <div class="meta"><h3>${p.title}</h3><span>${p.year}</span></div>
    <p class="muted">${p.category} · ${p.editType}</p></button>`;
  grid.appendChild(card);
});

// Carrossel: rolagem nativa por toque, botões e teclado.
const prevWork = $("#prevWork"), nextWork = $("#nextWork"), workCount = $("#workCount");
const cards = [...grid.children];
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
function currentWork() {
  const left = grid.getBoundingClientRect().left;
  return cards.reduce((best, card, i) =>
    Math.abs(card.getBoundingClientRect().left - left) <
    Math.abs(cards[best].getBoundingClientRect().left - left) ? i : best, 0);
}
function updateCarousel() {
  const index = currentWork();
  workCount.textContent = cards.length ? `${String(index + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}` : "Nenhum vídeo";
  prevWork.disabled = grid.scrollLeft <= 2;
  nextWork.disabled = grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - 2;
}
function moveWork(direction) {
  const index = Math.max(0, Math.min(cards.length - 1, currentWork() + direction));
  if (!cards[index]) return;
  grid.scrollTo({ left: cards[index].offsetLeft - cards[0].offsetLeft, behavior: reducedMotion ? "instant" : "smooth" });
}
prevWork.addEventListener("click", () => moveWork(-1));
nextWork.addEventListener("click", () => moveWork(1));
grid.addEventListener("keydown", (event) => {
  if (event.target !== grid) return;
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    event.preventDefault(); moveWork(event.key === "ArrowRight" ? 1 : -1);
  }
});
let carouselFrame;
grid.addEventListener("scroll", () => {
  cancelAnimationFrame(carouselFrame);
  carouselFrame = requestAnimationFrame(updateCarousel);
}, { passive: true });
addEventListener("resize", updateCarousel);
updateCarousel();

// modal
const modal = $("#modal");
function openProject(i) { openVideoProject(CONFIG.projects[i]); }
function openVideoProject(p) {
  $("#m-title").textContent = p.title;
  $("#mVideo").className = "m-video" + (p.vertical ? " v" : "");
  $("#mVideo").innerHTML = p.video ? iframe(toEmbed(p.video), p.title) : `<div class="empty">Cole o link do vídeo em script.js</div>`;
  $("#mMeta").innerHTML = [["Cliente", p.client], ["Ano", p.year], ["Categoria", p.category]].map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
  $("#mDesc").textContent = p.description;
  $("#mServ").innerHTML = p.services.map((s) => `<li>${s}</li>`).join("");
  modal.showModal(); document.body.style.overflow = "hidden";
}
function closeModal() { modal.close(); }
modal.addEventListener("close", () => { $("#mVideo").innerHTML = ""; document.body.style.overflow = ""; });
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
$("#close").addEventListener("click", closeModal);
grid.addEventListener("click", (e) => { const b = e.target.closest(".card-btn"); if (b) openProject(+b.dataset.i); });

// Seleções reais: nenhuma seção vazia é exibida ao visitante.
const safeMediaUrl = value => {
  if (typeof value !== "string" || !value.trim()) return "";
  try {
    const url = new URL(value, location.href);
    return ["https:", "http:"].includes(url.protocol) || (url.protocol === "file:" && location.protocol === "file:") ? url.href : "";
  } catch { return ""; }
};
const isInstagramReel = value => {
  try { const url = new URL(value); return ["instagram.com", "www.instagram.com"].includes(url.hostname) && /^\/reel\/[\w-]+\/?$/.test(url.pathname); }
  catch { return false; }
};
const verticalProjects = CONFIG.verticalProjects.filter(p =>
  p.title && safeMediaUrl(p.video) && (safeMediaUrl(p.thumbnail) || ytId(p.video) || isInstagramReel(p.video)));
const verticalGrid = $("#verticalGrid");
$("#verticais").hidden = !verticalProjects.length;
// Incorporação oficial carregada somente após interação. Uma prévia ativa por vez.
let instagramScriptPromise;
let activeInstagramPreview = null;
function loadInstagramEmbeds() {
  if (window.instgrm?.Embeds) return Promise.resolve();
  if (!instagramScriptPromise) instagramScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js"; script.async = true;
    script.onload = resolve; script.onerror = reject; document.body.append(script);
  });
  return instagramScriptPromise;
}
function mountInstagramPreview(container, project) {
  if (container.dataset.mounted) return;
  container.dataset.mounted = "true";
  const blockquote = document.createElement("blockquote");
  blockquote.className = "instagram-media";
  blockquote.setAttribute("data-instgrm-permalink", project.video);
  blockquote.setAttribute("data-instgrm-version", "14");
  const fallback = document.createElement("a");
  fallback.href = project.video; fallback.target = "_blank"; fallback.rel = "noreferrer";
  fallback.textContent = "Ver este Reel no Instagram ↗";
  blockquote.append(fallback); container.append(blockquote);
  loadInstagramEmbeds().then(() => window.instgrm?.Embeds.process()).catch(() => {
    blockquote.replaceChildren(fallback);
  });
}
verticalProjects.forEach((p, index) => {
  const instagram = isInstagramReel(p.video);
  const article = document.createElement("article");
  article.className = "vertical-card";
  const media = document.createElement(instagram ? "a" : "button");
  media.className = "vertical-cover";
  media.setAttribute("aria-label", `Assistir: ${p.title}${instagram ? " no Instagram (nova aba)" : ""}`);
  if (instagram) { media.href = safeMediaUrl(p.video); media.target = "_blank"; media.rel = "noreferrer"; }
  else media.type = "button";
  const cover = safeMediaUrl(p.thumbnail) || (ytId(p.video) ? thumbOf(p) : "");
  if (cover) {
    const image = document.createElement("img");
    image.src = cover; image.alt = `Capa de ${p.title}`; image.loading = "lazy";
    image.width = 360; image.height = 640; media.append(image);
  } else {
    // Apresentação tipográfica; não representa uma miniatura do vídeo.
    media.classList.add("reel-cover");
    const label = document.createElement("span"); label.className = "reel-cover-label"; label.textContent = "INSTAGRAM REELS";
    const number = document.createElement("span"); number.className = "reel-cover-number"; number.textContent = String(index + 1).padStart(2, "0");
    const action = document.createElement("span"); action.className = "reel-cover-action"; action.textContent = "Assistir no Instagram ↗";
    media.append(label, number, action);
  }
  if (cover) {
    const play = document.createElement("span"); play.className = "card-play";
    play.textContent = "▶"; play.setAttribute("aria-hidden", "true"); media.append(play);
  }
  const title = document.createElement("h3"); title.textContent = p.title;
  const format = document.createElement("p"); format.className = "small";
  format.textContent = [p.client, p.platform || "Vídeo vertical"].filter(Boolean).join(" · ");
  const description = document.createElement("p"); description.className = "muted"; description.textContent = p.description || "";
  const link = document.createElement("a"); link.className = "vertical-link";
  link.href = safeMediaUrl(p.video); link.target = "_blank"; link.rel = "noreferrer";
  link.textContent = instagram ? "Ver Reel completo ↗" : "Assistir na plataforma ↗";
  if (!instagram) media.addEventListener("click", () => {
    const hostname = new URL(p.video, location.href).hostname;
    if (ytId(p.video) || ["vimeo.com", "www.vimeo.com", "player.vimeo.com", "drive.google.com"].includes(hostname)) {
      openVideoProject({ ...p, client: p.client || "", category: p.platform || "Vídeo vertical", vertical: true, services: p.services || ["Edição de vídeo"], year: p.year || "" });
    } else link.click();
  });
  if (instagram) {
    const creator = p.creator || p.client.replace(/^@/, "");
    const author = document.createElement("a");
    author.className = "reel-author";
    author.href = new URL(p.client.replace(/^@/, "") + "/", "https://www.instagram.com/").href;
    author.target = "_blank"; author.rel = "noreferrer";
    author.textContent = creator;
    author.setAttribute("aria-label", `Perfil de ${creator} no Instagram (nova aba)`);
    const preview = document.createElement("div");
    preview.className = "instagram-preview";
    preview.setAttribute("aria-label", `Prévia do Reel de ${creator}`);
    const launch = document.createElement("button");
    launch.type = "button"; launch.className = "reel-launch";
    launch.setAttribute("aria-label", `Carregar prévia do Reel de ${creator}`);
    if (safeMediaUrl(p.thumbnail)) {
      const image = document.createElement("img");
      image.src = safeMediaUrl(p.thumbnail); image.alt = `Miniatura do Reel de ${creator}`;
      image.loading = "lazy"; image.width = 360; image.height = 640; launch.append(image);
    }
    const action = document.createElement("span");
    action.className = "reel-launch-action"; action.textContent = "▶ Carregar prévia";
    launch.append(action);
    function resetPreview() {
      preview.replaceChildren(launch); delete preview.dataset.mounted;
    }
    launch.addEventListener("click", () => {
      activeInstagramPreview?.reset();
      preview.replaceChildren();
      mountInstagramPreview(preview, p);
      link.focus({preventScroll:true});
      activeInstagramPreview = { reset: resetPreview };
    });
    resetPreview();
    format.textContent = p.platform || "Vídeo vertical";
    article.append(author, preview, format, description, link);
    verticalGrid.append(article);
  } else {
    article.append(media, title, format, description, link);
    verticalGrid.append(article);
  }
});

// Carrossel compacto de Reels com rolagem nativa e teclado.
const reelCards = [...verticalGrid.children];
const prevReel = $("#prevReel"), nextReel = $("#nextReel"), reelCount = $("#reelCount");
function currentReel() {
  const left = verticalGrid.getBoundingClientRect().left;
  return reelCards.reduce((best, card, i) =>
    Math.abs(card.getBoundingClientRect().left - left) < Math.abs(reelCards[best].getBoundingClientRect().left - left) ? i : best, 0);
}
function updateReels() {
  reelCount.textContent = reelCards.length ? `${String(currentReel() + 1).padStart(2, "0")} / ${String(reelCards.length).padStart(2, "0")}` : "";
  prevReel.disabled = verticalGrid.scrollLeft <= 2;
  nextReel.disabled = verticalGrid.scrollLeft >= verticalGrid.scrollWidth - verticalGrid.clientWidth - 2;
}
function moveReel(direction) {
  const index = Math.max(0, Math.min(reelCards.length - 1, currentReel() + direction));
  if (reelCards[index]) verticalGrid.scrollTo({left: reelCards[index].offsetLeft - reelCards[0].offsetLeft, behavior: reducedMotion ? "instant" : "smooth"});
}
prevReel.addEventListener("click", () => moveReel(-1));
nextReel.addEventListener("click", () => moveReel(1));
verticalGrid.addEventListener("keydown", event => {
  if (event.target === verticalGrid && ["ArrowLeft", "ArrowRight"].includes(event.key)) {
    event.preventDefault(); moveReel(event.key === "ArrowRight" ? 1 : -1);
  }
});
let reelFrame;
verticalGrid.addEventListener("scroll", () => {
  cancelAnimationFrame(reelFrame); reelFrame = requestAnimationFrame(updateReels);
}, {passive:true});
addEventListener("resize", updateReels);
updateReels();

// Galeria acessível: miniaturas primeiro, imagem maior após interação.
const galleryItems = CONFIG.thumbnails.filter(item => safeMediaUrl(item.src) && item.alt && item.title);
const gallery = $("#thumbnailModal"), galleryImage = $("#galleryImage"), galleryStrip = $("#galleryStrip");
const galleryPrev = $("#galleryPrev"), galleryNext = $("#galleryNext");
let galleryIndex = 0, galleryReturnFocus, galleryOverflow;
$("#thumbnails").hidden = !galleryItems.length;
function selectThumbnail(index) {
  if (!galleryItems.length) return;
  galleryIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[galleryIndex];
  galleryImage.src = safeMediaUrl(item.src); galleryImage.alt = item.alt;
  $("#galleryCaption").textContent = item.title;
  $("#galleryCount").textContent = `${galleryIndex + 1} de ${galleryItems.length}`;
  [...galleryStrip.children].forEach((button, i) => button.setAttribute("aria-pressed", String(i === galleryIndex)));
  galleryPrev.disabled = galleryNext.disabled = galleryItems.length < 2;
}
galleryItems.forEach((item, index) => {
  const button = document.createElement("button"); button.type = "button";
  button.setAttribute("aria-label", `Ampliar: ${item.title}`);
  button.setAttribute("aria-pressed", "false");
  const image = document.createElement("img"); image.src = safeMediaUrl(item.src);
  image.alt = item.alt; image.loading = "lazy"; image.width = 160; image.height = 90;
  button.append(image); button.addEventListener("click", () => selectThumbnail(index));
  galleryStrip.append(button);
});
$("#openThumbnails").addEventListener("click", () => {
  if (!galleryItems.length) return;
  galleryReturnFocus = document.activeElement; galleryOverflow = document.body.style.overflow;
  selectThumbnail(0); gallery.showModal(); document.body.style.overflow = "hidden";
  $("#galleryClose").focus();
});
$("#galleryClose").addEventListener("click", () => gallery.close());
galleryPrev.addEventListener("click", () => selectThumbnail(galleryIndex - 1));
galleryNext.addEventListener("click", () => selectThumbnail(galleryIndex + 1));
gallery.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault(); selectThumbnail(galleryIndex + (event.key === "ArrowRight" ? 1 : -1));
  }
});
gallery.addEventListener("click", event => {
  const rect = gallery.getBoundingClientRect();
  if (event.target === gallery && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) gallery.close();
});
gallery.addEventListener("close", () => {
  document.body.style.overflow = galleryOverflow || "";
  galleryImage.removeAttribute("src");
  galleryReturnFocus?.focus({preventScroll:true});
});

// Navbar e menu móvel: Escape, foco contido e fundo inativo.
const nav = $("#nav"), links = $("#links"), mb = $("#menuBtn");
let menuOverflow = "";
const menuBackground = [document.querySelector("main"), document.querySelector("footer")];
const menuOriginalInert = menuBackground.map(element => element.inert);
const onScroll = () => nav.classList.toggle("solid", scrollY > 40 || links.classList.contains("open"));
function setMenu(open, returnFocus = true) {
  const wasOpen = links.classList.contains("open");
  links.classList.toggle("open", open);
  mb.setAttribute("aria-expanded", String(open));
  mb.textContent = open ? "Fechar" : "Menu";
  if (open && !wasOpen) menuOverflow = document.body.style.overflow;
  if (open) document.body.style.overflow = "hidden";
  else if (wasOpen) document.body.style.overflow = menuOverflow;
  menuBackground.forEach((element, i) => { element.inert = open || menuOriginalInert[i]; });
  onScroll();
  if (!open && wasOpen && returnFocus) mb.focus({preventScroll:true});
}
onScroll(); addEventListener("scroll", onScroll, {passive:true});
mb.addEventListener("click", () => setMenu(!links.classList.contains("open")));
links.addEventListener("click", event => {
  const anchor = event.target.closest("a");
  if (!anchor) return;
  setMenu(false, false);
  if (anchor.getAttribute("href")?.startsWith("#")) {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) { target.setAttribute("tabindex", "-1"); target.focus({preventScroll:true}); }
  } else mb.focus({preventScroll:true});
});
nav.addEventListener("keydown", event => {
  if (!links.classList.contains("open")) return;
  if (event.key === "Escape") { event.preventDefault(); setMenu(false); }
  if (event.key === "Tab") {
    const focusable = [mb, ...links.querySelectorAll("a[href]")].filter(element => !element.hidden);
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
addEventListener("resize", () => { if (innerWidth > 900 && links.classList.contains("open")) setMenu(false, false); });

// Entrada progressiva; o conteúdo permanece visível se as animações não iniciarem.
const revealElements = document.querySelectorAll(".rv, .svc");
if ("IntersectionObserver" in window && !reducedMotion) {
  const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in");
      io.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  revealElements.forEach((element) => io.observe(element));
  document.documentElement.classList.add("motion-ready");
} else {
  revealElements.forEach((element) => element.classList.add("in"));
}

// hero: parallax leve
const hf = $("#heroFrame");
if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
  addEventListener("scroll", () => { if (scrollY < innerHeight) hf.style.transform = `translateY(${-scrollY * 0.07}px)`; }, { passive: true });
// Capas de reserva quando a resolução máxima não está disponível.
document.querySelectorAll(".creator-avatar img").forEach((image) => {
  image.addEventListener("error", () => { image.hidden = true; });
});
document.querySelectorAll("#heroImg, #srImg, .thumb img").forEach((image) => {
  image.addEventListener("error", () => {
    if (image.src.includes("/maxresdefault.jpg")) image.src = image.src.replace("/maxresdefault.jpg", "/hqdefault.jpg");
    else if (!image.src.startsWith("data:")) image.src = ph("Edição de vídeo · Marco Melo");
  });
});

// Vinheta rápida e automática em cada entrada.
(() => {
  const intro = document.querySelector("#intro");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const background = [...document.querySelectorAll("body > header, body > main, body > footer, body > dialog, body > .skip")];
  const states = background.map(element => element.inert);
  const overflow = document.body.style.overflow;
  let finished = false;
  function finish() {
    if (finished) return;
    finished = true;
    intro.hidden = true;
    background.forEach((element, i) => { element.inert = states[i]; });
    document.body.style.overflow = overflow;
    document.removeEventListener("keydown", onKey);
    document.querySelector(".logo").focus({preventScroll:true});
  }
  function onKey(event) {
    if (event.key === "Escape") finish();
    if (event.key === "Tab" && !finished) event.preventDefault();
  }
  intro.hidden = false;
  background.forEach(element => { element.inert = true; });
  document.body.style.overflow = "hidden";
  intro.focus({preventScroll:true});
  document.addEventListener("keydown", onKey);
  setTimeout(() => {
    if (finished) return;
    intro.classList.add("intro-leaving");
    setTimeout(finish, reduce ? 0 : 350);
  }, reduce ? 500 : 1100);
})();

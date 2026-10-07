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
   ✏️ CONFIGURAÇÃO — edite só esta parte
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
  projects: [
    { title: "Casa Clutch", client: "Casa Clutch", category: "YouTube", year: "2026", editType: "Edição de vídeo",
      video: "https://youtu.be/lXB8Dn48W6s", thumbnail: "", vertical: false,
      description: "Vídeo editado para Casa Clutch.",
      services: ["Edição de vídeo"] },
    { title: "Santana", client: "Santana", category: "YouTube", year: "2026", editType: "Edição de vídeo",
      video: "https://youtu.be/S9YK_6tsb9M", thumbnail: "", vertical: false,
      description: "Vídeo editado para Santana.",
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
    <div class="thumb ${p.vertical ? "v" : ""}"><img src="${thumbOf(p) || ph("Capa — " + p.title)}" alt="Capa do projeto ${p.title}" loading="lazy">
      <span class="card-play" aria-hidden="true">▶</span><div class="ov"><span>${p.category}</span><span>Assistir ao vídeo ↗</span></div></div>
    <div class="meta"><h3>${p.title}</h3><span>${p.year}</span></div>
    <p class="muted">${p.category} — ${p.editType}</p></button>`;
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
function openProject(i) {
  const p = CONFIG.projects[i];
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

// navbar + menu mobile
const nav = $("#nav"), links = $("#links"), mb = $("#menuBtn");
const onScroll = () => nav.classList.toggle("solid", scrollY > 40 || links.classList.contains("open"));
onScroll(); addEventListener("scroll", onScroll, { passive: true });
mb.addEventListener("click", () => { const o = links.classList.toggle("open"); mb.setAttribute("aria-expanded", o); mb.textContent = o ? "Fechar" : "Menu"; nav.classList.toggle("solid", o || scrollY > 40); });
links.addEventListener("click", (e) => { if (e.target.closest("a")) { links.classList.remove("open"); mb.setAttribute("aria-expanded", false); mb.textContent = "Menu"; } });

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

// Introdução curta; aparece uma vez por sessão e nunca impede acesso ao site.
(() => {
  const intro = document.querySelector("#intro");
  const skip = document.querySelector("#introSkip");
  const sound = document.querySelector("#introSound");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  try { if (sessionStorage.getItem("portfolio-intro-seen")) return; } catch {}
  const previousFocus = document.activeElement;
  const previousOverflow = document.body.style.overflow;
  const background = [...document.querySelectorAll("body > header, body > main, body > footer, body > dialog, body > .skip")];
  const states = background.map(element => element.inert);
  let finished = false, finishing = false, audioContext;
  let autoTimer, exitTimer;
  function finish() {
    if (finished) return;
    finished = true;
    clearTimeout(autoTimer); clearTimeout(exitTimer);
    intro.hidden = true;
    intro.classList.remove("intro-leaving");
    document.body.style.overflow = previousOverflow;
    background.forEach((element, index) => { element.inert = states[index]; });
    try { sessionStorage.setItem("portfolio-intro-seen", "1"); } catch {}
    if (previousFocus && previousFocus !== document.body) previousFocus.focus({preventScroll:true});
    else document.querySelector(".logo").focus({preventScroll:true});
    document.removeEventListener("keydown", onIntroKey);
    if (audioContext) setTimeout(() => audioContext.close().catch(() => {}), 600);
  }
  function leave(immediate = false) {
    if (finished) return;
    if (immediate) return finish();
    if (finishing) return;
    finishing = true;
    clearTimeout(autoTimer);
    intro.classList.add("intro-leaving");
    exitTimer = setTimeout(finish, reduce ? 0 : 650);
  }
  async function playIntroSound() {
    const AudioAPI = window.AudioContext || window.webkitAudioContext;
    if (!AudioAPI) return;
    try {
      audioContext = new AudioAPI();
      await audioContext.resume();
      if (finished) { await audioContext.close(); return; }
      const now = audioContext.currentTime;
      const master = audioContext.createGain();
      master.gain.value = 0.12; master.connect(audioContext.destination);
      [220, 330, 440].forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator(), envelope = audioContext.createGain();
        const start = now + index * 0.065;
        oscillator.type = "sine"; oscillator.frequency.setValueAtTime(frequency, start);
        oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.2, start + 0.25);
        envelope.gain.setValueAtTime(0, start);
        envelope.gain.linearRampToValueAtTime(0.3, start + 0.015);
        envelope.gain.exponentialRampToValueAtTime(0.001, start + 0.45);
        oscillator.connect(envelope); envelope.connect(master);
        oscillator.start(start); oscillator.stop(start + 0.5);
      });
    } catch { /* A introdução continua mesmo quando áudio não está disponível. */ }
  }
  function onIntroKey(event) {
    if (event.key === "Escape") { event.preventDefault(); leave(true); }
    if (event.key === "Tab") {
      if (event.shiftKey && document.activeElement === skip) { event.preventDefault(); sound.focus(); }
      else if (!event.shiftKey && document.activeElement === sound) { event.preventDefault(); skip.focus(); }
    }
  }
  intro.hidden = false;
  document.body.style.overflow = "hidden";
  background.forEach(element => { element.inert = true; });
  skip.focus({preventScroll:true});
  document.addEventListener("keydown", onIntroKey);
  skip.addEventListener("click", () => leave(true));
  sound.addEventListener("click", () => {
    sound.disabled = true;
    void playIntroSound();
    leave();
  });
  autoTimer = setTimeout(() => leave(), reduce ? 1400 : 3200);
})();

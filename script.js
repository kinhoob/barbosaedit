/* =====================================================
   ✏️ CONFIGURAÇÃO — edite só esta parte
   Em "video"/"showreel" cole o link normal do YouTube, Vimeo
   ou Google Drive (ou o link de embed). Ele vira iframe sozinho.
   "thumbnail" é opcional: vazio = pega a capa do YouTube
   automaticamente; senão use um arquivo seu (ex: "img/casa.jpg").
   ===================================================== */
const CONFIG = {
  whatsapp: "https://wa.me/5581900000000",   // ← seu WhatsApp
  instagram: "https://instagram.com/seuusuario", // ← seu Instagram
  email: "mailto:seuemail@exemplo.com",      // ← seu e-mail
  showreel: { video: "", thumbnail: "" },    // ← link do showreel
  projects: [
    { title: "Casa Clutch", client: "Casa Clutch", category: "Long Form · YouTube", year: "2026", editType: "Vídeo longo",
      video: "", thumbnail: "", vertical: false,
      description: "Edição de vídeo longo para YouTube. (✏️ troque pela descrição real)",
      services: ["Decupagem", "Cortes", "Textos", "Sound Design", "Zooms", "Elementos visuais"] },
    { title: "Social Content", client: "✏️ cliente", category: "Reels · Short Form", year: "2026", editType: "Reels e Shorts",
      video: "", thumbnail: "", vertical: true,
      description: "Edição dinâmica para conteúdos rápidos. (✏️ troque pela descrição real)",
      services: ["Cortes", "Textos na tela", "Zooms", "Efeitos sonoros", "Ritmo"] },
    { title: "Content Cuts", client: "✏️ cliente", category: "Cortes · Social Media", year: "2026", editType: "Cortes",
      video: "", thumbnail: "", vertical: true,
      description: "Cortes objetivos a partir de conteúdos longos. (✏️ troque pela descrição real)",
      services: ["Decupagem", "Cortes", "Legendas", "Ritmo"] },
    { title: "Creative / AI", client: "✏️ cliente", category: "Criativo · IA", year: "2026", editType: "Efeitos e IA",
      video: "", thumbnail: "", vertical: false,
      description: "Recursos visuais e IA aplicados à edição. (✏️ troque pela descrição real)",
      services: ["Efeitos com IA", "Recursos visuais", "Edição"] },
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
document.querySelectorAll("[data-link]").forEach((a) => (a.href = CONFIG[a.dataset.link]));

// hero + showreel
const first = CONFIG.projects[0];
$("#heroImg").src = thumbOf(first) || ph("PLACEHOLDER — thumbnail do hero");
const sr = CONFIG.showreel;
$("#srImg").src = thumbOf(sr) || ph("PLACEHOLDER — defina o showreel em script.js");
$("#srPlay").addEventListener("click", () => {
  if (!sr.video) return alert("Defina o link do showreel em script.js (CONFIG.showreel.video).");
  $("#srBox").innerHTML = iframe(toEmbed(sr.video, true), "Showreel 2026");
});

// grid de projetos
const grid = $("#grid");
CONFIG.projects.forEach((p, i) => {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `<button class="card-btn" data-i="${i}" aria-label="Ver projeto ${p.title}">
    <div class="thumb ${p.vertical ? "v" : ""} rv clip"><img src="${thumbOf(p) || ph("PLACEHOLDER — " + p.title)}" alt="Thumbnail do projeto ${p.title}" loading="lazy">
      <div class="ov"><span>${p.category}</span><span class="blue">Ver projeto ↗</span></div></div>
    <div class="meta"><h3>${p.title}</h3><span>${p.year}</span></div>
    <p class="muted">${p.category} — ${p.editType}</p></button>`;
  grid.appendChild(card);
});

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
const onScroll = () => nav.classList.toggle("solid", scrollY > 40);
onScroll(); addEventListener("scroll", onScroll, { passive: true });
mb.addEventListener("click", () => { const o = links.classList.toggle("open"); mb.setAttribute("aria-expanded", o); mb.textContent = o ? "Fechar" : "Menu"; nav.classList.toggle("solid", o || scrollY > 40); });
links.addEventListener("click", (e) => { if (e.target.closest("a")) { links.classList.remove("open"); mb.setAttribute("aria-expanded", false); mb.textContent = "Menu"; } });

// reveals ao rolar (IntersectionObserver)
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -10% 0px" });
document.querySelectorAll(".rv, .svc").forEach((el, i) => io.observe(el));

// hero: parallax leve
const hf = $("#heroFrame");
if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
  addEventListener("scroll", () => { if (scrollY < innerHeight) hf.style.transform = `translateY(${-scrollY * 0.07}px)`; }, { passive: true });
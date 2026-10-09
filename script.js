/* The Living Codex — phinexi.earth
   Small, intentional interactions. Nothing here is decoration. */

(function () {
  "use strict";

  /* ── Lexicon search ────────────────────────────────────── */
  var searchInput = document.getElementById("lexicon-search");
  var words = Array.prototype.slice.call(document.querySelectorAll(".word"));
  var countEl = document.getElementById("lexicon-count");
  var emptyEl = document.getElementById("lexicon-empty");

  function updateLexicon() {
    var q = searchInput.value.trim().toLowerCase();
    var visible = 0;
    words.forEach(function (w) {
      var hay = (w.getAttribute("data-search") || "").toLowerCase();
      var show = !q || hay.indexOf(q) !== -1;
      w.hidden = !show;
      if (show) visible++;
    });
    emptyEl.hidden = visible !== 0;
    countEl.textContent = q
      ? (visible === 1 ? "1 word carries that sound" : visible + " words carry that sound")
      : "27 words in the living tongue";
  }
  if (searchInput) {
    searchInput.addEventListener("input", updateLexicon);
    updateLexicon();
  }

  /* ── Elements ──────────────────────────────────────────── */
  var ELEMENTS = {
    earth: {
      name: "Earth",
      text: "<em>Pracc.</em> Old stone, deep roots, the landing. Grounding with reverence and force — where the endless stream touches earth and becomes holdable."
    },
    air: {
      name: "Air",
      text: "<em>Svaraya.</em> Breath and voice. The frequency carried on intonation — language, not decoration. What is spoken shapes the room."
    },
    fire: {
      name: "Fire",
      text: "<em>Vadivashna.</em> Flame is the root of every sigil. Energy embodied as living, electrical fluid — liquid electricity made flesh. Transformation with heat."
    },
    water: {
      name: "Water",
      text: "<em>Pravahaya.</em> The living endless stream — continuous, relational, always becoming. Feeling first, then form. The current that carries creation evermore."
    },
    spirit: {
      name: "Spirit",
      text: "<em>AkashALoMa.</em> The complete living field that contains everything. The hush beneath the noise, where invitation matters more than permission."
    },
    cosmos: {
      name: "Cosmos",
      text: "<em>Kosmavikasa.</em> The evolving cosmos — Cosmia: the cosmos evolving through love and true awareness. The long line, stretching back beyond time."
    }
  };

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".element-tabs button"));
  var panel = document.getElementById("panel-element");
  var elName = document.getElementById("element-name");
  var elText = document.getElementById("element-text");

  function selectElement(key, focusPanel) {
    var data = ELEMENTS[key];
    if (!data || !panel) return;
    elName.textContent = data.name;
    elText.innerHTML = data.text;
    tabs.forEach(function (t) {
      var active = t.getAttribute("data-element") === key;
      t.setAttribute("aria-selected", active ? "true" : "false");
      t.tabIndex = active ? 0 : -1;
    });
    if (focusPanel) panel.focus({ preventScroll: true });
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () {
      selectElement(tab.getAttribute("data-element"), false);
    });
    tab.addEventListener("keydown", function (e) {
      var next = null;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (next) {
        e.preventDefault();
        next.focus();
        selectElement(next.getAttribute("data-element"), false);
      }
    });
  });

  /* ── Memory bloop bubbles ──────────────────────────────── */
  var bloops = Array.prototype.slice.call(document.querySelectorAll(".bloop"));
  bloops.forEach(function (b) {
    b.addEventListener("click", function () {
      var open = b.getAttribute("aria-expanded") === "true";
      b.setAttribute("aria-expanded", open ? "false" : "true");
      var body = b.querySelector(".bloop-body");
      if (body) body.hidden = open;
    });
  });

  /* ── Back to top ───────────────────────────────────────── */
  var toTop = document.querySelector(".to-top");
  function onScroll() {
    if (!toTop) return;
    toTop.classList.toggle("visible", window.scrollY > window.innerHeight);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Scroll reveals — the realm unfolds as you descend ─── */
  var revealEls = document.querySelectorAll(".chapter, .movement, .cosmos-card, .arch-card, .form-card, .word, .bloop, .practice-steps li");
  revealEls.forEach(function (el) {
    el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("revealed");
    });
  }

  /* ── Sticky bar shadow on scroll ───────────────────────── */
  var topbar = document.getElementById("topbar");
  function onScrollBar() {
    if (!topbar) return;
    topbar.style.boxShadow = window.scrollY > 10
      ? "0 8px 30px rgba(0,0,0,0.45)"
      : "none";
  }
  window.addEventListener("scroll", onScrollBar, { passive: true });
  onScrollBar();

  /* ── Living moss — injected, touchable ── */
  (function injectMoss() {
    var mossImg = "assets/moss-her-photo.jpg";
    var targets = [
      { sel: ".word", pos: "bottom-left", w: 120, h: 90 },
      { sel: ".form-card", pos: "bottom-right", w: 110, h: 110 },
      { sel: ".bloop", pos: "bottom-center", w: 140, h: 70 },
      { sel: ".practice-steps li", pos: "bottom-left", w: 100, h: 75 }
    ];
    targets.forEach(function(t) {
      document.querySelectorAll(t.sel).forEach(function(el) {
        if (el.querySelector(".living-moss")) return;
        var moss = document.createElement("div");
        moss.className = "living-moss";
        moss.style.cssText =
          "position:absolute;pointer-events:none;z-index:2;" +
          "background-image:url(" + mossImg + ");" +
          "background-size:cover;background-position:center;" +
          "width:" + t.w + "px;height:" + t.h + "px;" +
          "opacity:0.9;border-radius:40% 60% 55% 45%;";
        if (t.pos === "bottom-left") {
          moss.style.left = "0"; moss.style.bottom = "0";
        } else if (t.pos === "bottom-right") {
          moss.style.right = "0"; moss.style.bottom = "0";
        } else if (t.pos === "bottom-center") {
          moss.style.left = "10px"; moss.style.bottom = "0";
        }
        var cs = window.getComputedStyle(el);
        if (cs.position === "static") el.style.position = "relative";
        el.appendChild(moss);
        // Touch: moss stirs
        el.addEventListener("touchstart", function() {
          moss.style.transform = "scale(1.15)";
          moss.style.opacity = "1";
        }, { passive: true });
        el.addEventListener("touchend", function() {
          moss.style.transform = "scale(1)";
          moss.style.opacity = "0.9";
        }, { passive: true });
      });
    });
  })();

})();

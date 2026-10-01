"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Ganti nomor WhatsApp di sini (format internasional tanpa "+")
const WA_PHONE = "6282114073679";

// ---------- Buku: struktur halaman (mudah diedit) ----------
// Tiap leaf = 2 sisi: depan (tampil di kanan) & belakang (.back, tampil di kiri saat dibalik)
const PhotoFrame = ({ src, placeholder, className, hideImgOnError }) => (
  <div className={`photo-frame${className ? " " + className : ""}`}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt="foto kenangan" onError={hideImgOnError} />
    <div className="ph-placeholder" style={{ display: "none" }}>
      <span className="cam">📷</span>
      Taruh foto di sini
      <br />({placeholder})
    </div>
  </div>
);

const LEAVES = [
  [
    {
      className: "face cover-face",
      render: () => (
        <>
          <div className="cover-frame"></div>
          <div className="page-inner center">
            <div className="cover-emblem">❦</div>
            <div className="page-eyebrow">sebuah surat kecil</div>
            <h2>Dear You</h2>
            <div className="rule"></div>
            <p className="soft" style={{ color: "var(--gold-soft)" }}>
              untuk seseorang yang istimewa
            </p>
          </div>
        </>
      ),
    },
    {
      className: "face back theme-blush",
      render: ({ hideImgOnError }) => (
        <>
          <div className="corner tl"></div>
          <div className="corner br"></div>
          <div className="page-inner">
            <div className="page-eyebrow">Halaman 2</div>
            <h2>
              Teruntuk <span className="accent">Pemilik Mata Indah</span>
            </h2>
            <div className="flourish">
              <span>✦</span>
            </div>
            <PhotoFrame
              src="/foto1.jpg"
              placeholder="foto1.jpg"
              className="photo-tilt"
              hideImgOnError={hideImgOnError}
            />
            <p className="dropcap">
              Yang diam-diam membuat dunia terasa jauh lebih tenang.
            </p>
          </div>
          <div className="page-num">2</div>
        </>
      ),
    },
  ],
  [
    {
      className: "face theme-rose",
      render: ({ hideImgOnError }) => (
        <>
          <div className="corner tl"></div>
          <div className="corner br"></div>
          <div className="page-inner">
            <div className="page-eyebrow">Halaman 3</div>
            <h2>
              Sejak <span className="accent">Kapan</span> Entah
            </h2>
            <div className="flourish">
              <span>✦</span>
            </div>
            <PhotoFrame
              src="/foto2.jpg"
              placeholder="foto2.jpg"
              className="photo-tilt r"
              hideImgOnError={hideImgOnError}
            />
            <p className="dropcap">
              Aku mulai jatuh pada cara matamu memandang semesta.
            </p>
          </div>
          <div className="page-num">3</div>
        </>
      ),
    },
    {
      className: "face back theme-sand",
      render: ({ hideImgOnError }) => (
        <>
          <div className="corner tl"></div>
          <div className="corner br"></div>
          <div className="page-inner">
            <div className="page-eyebrow">Halaman 4</div>
            <h2>
              Binar <span className="accent">Matamu</span>
            </h2>
            <div className="flourish">
              <span>✦</span>
            </div>
            <PhotoFrame
              src="/foto3.jpg"
              placeholder="foto3.jpg"
              hideImgOnError={hideImgOnError}
            />
            <p className="dropcap">
              Tak hanya indah dipandang, namun menenangkan saat dikenang.
            </p>
          </div>
          <div className="page-num">4</div>
        </>
      ),
    },
  ],
  [
    {
      className: "face theme-mauve",
      render: ({ hideImgOnError }) => (
        <>
          <div className="corner tl"></div>
          <div className="corner br"></div>
          <div className="page-inner">
            <div className="page-eyebrow">Halaman 5</div>
            <h2>
              Serupa <span className="accent">Langit Malam</span>
            </h2>
            <div className="flourish">
              <span>✦</span>
            </div>
            <PhotoFrame
              src="/foto4.jpg"
              placeholder="foto4.jpg"
              className="photo-tilt"
              hideImgOnError={hideImgOnError}
            />
            <p className="dropcap">
              Sunyi, terkesan jauh, namun mustahil untuk berhenti diindahkan.
            </p>
          </div>
          <div className="page-num">5</div>
        </>
      ),
    },
    {
      className: "face back the-end",
      render: () => (
        <div className="page-inner center">
          <div className="end-ornament">❧</div>
          <div className="page-eyebrow">Halaman Terakhir</div>
          <h2>Karena Ada Manusia</h2>
          <div className="rule"></div>
          <p>Yang kehadirannya terlalu berarti untuk dijabarkan dalam satu kalimat.</p>
          <p className="soft">
            Mereka harus diabadikan — lewat lagu, lewat bait, dan lewat hal-hal kecil
            yang akan terus hidup.
          </p>
          <div className="rule"></div>
          <div className="end-mark">— Tamat —</div>
          <p className="soft" style={{ marginTop: 8, fontSize: ".95rem" }}>
            terima kasih sudah membaca sampai sini ♡
          </p>
        </div>
      ),
    },
  ],
];

export default function BirthdayGift() {
  // ---------- Intro → Main ----------
  const [showIntro, setShowIntro] = useState(true);
  const [introFading, setIntroFading] = useState(false);
  const [mainVisible, setMainVisible] = useState(false);
  const [mainOpacity, setMainOpacity] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      setIntroFading(true);
      setTimeout(() => {
        setShowIntro(false);
        setMainVisible(true);
        document.body.style.backgroundColor = "#4a0a0f";
        setTimeout(() => setMainOpacity(1), 100);
      }, 1000);
    }, 5800);
    return () => clearTimeout(t);
  }, []);

  // ---------- Music ----------
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [curTime, setCurTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggleMusic = useCallback(() => {
    const music = audioRef.current;
    if (!music) return;
    if (music.paused) {
      music
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
          alert("File lagu belum ada. Taruh 'panasea.mp3' di folder public/ ya.");
        });
    } else {
      music.pause();
      setPlaying(false);
    }
  }, []);

  // Sinkronkan progress bar & waktu dengan lagu yang sedang diputar
  useEffect(() => {
    const music = audioRef.current;
    if (!music) return;
    const onTime = () => setCurTime(music.currentTime || 0);
    const onMeta = () => setDuration(music.duration || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    music.addEventListener("timeupdate", onTime);
    music.addEventListener("loadedmetadata", onMeta);
    music.addEventListener("durationchange", onMeta);
    music.addEventListener("play", onPlay);
    music.addEventListener("pause", onPause);
    if (music.duration) setDuration(music.duration);
    return () => {
      music.removeEventListener("timeupdate", onTime);
      music.removeEventListener("loadedmetadata", onMeta);
      music.removeEventListener("durationchange", onMeta);
      music.removeEventListener("play", onPlay);
      music.removeEventListener("pause", onPause);
    };
  }, []);

  // Klik progress bar untuk seek (lompat ke posisi tertentu)
  const seekMusic = useCallback(
    (e) => {
      const music = audioRef.current;
      if (!music || !duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      music.currentTime = ratio * duration;
      setCurTime(music.currentTime);
    },
    [duration]
  );

  // ---------- Modal ----------
  const [modalOpen, setModalOpen] = useState(false);

  // ---------- Book state ----------
  const TOTAL_LEAVES = LEAVES.length;
  // Mode 1-halaman: tiap SISI = 1 halaman. Urutan: L0.front, L0.back, L1.front,
  // L1.back, ... -> TOTAL_PAGES = TOTAL_LEAVES * 2.
  const TOTAL_PAGES = TOTAL_LEAVES * 2;
  const bookRef = useRef(null);
  const overlayRef = useRef(null);
  const [bookOpen, setBookOpen] = useState(false);
  // flipped = berapa LEMBAR dibalik (dipakai mode 2-halaman / spread)
  const [flipped, setFlipped] = useState(0);
  // pageIdx = indeks HALAMAN aktif (dipakai mode 1-halaman): 0..TOTAL_PAGES
  const [pageIdx, setPageIdx] = useState(0);
  // arah transisi halaman: 1 = maju (geser dari kanan), -1 = mundur (dari kiri)
  const [slideDir, setSlideDir] = useState(1);
  const [spread, setSpread] = useState(false);
  const [hintHidden, setHintHidden] = useState(false);
  const [flippingIdx, setFlippingIdx] = useState(-1);
  const flipAnimTimer = useRef(null);

  const bookHintRef = useRef(null);
  const bookProgressRef = useRef(null);
  const flipPrevRef = useRef(null);
  const flipNextRef = useRef(null);
  const leafRefs = useRef([]);
  const sparklesSpawned = useRef(false);

  // Di mode 1-halaman, "selesai" saat sudah melewati halaman terakhir.
  const isFinished = bookOpen && (spread ? flipped === TOTAL_LEAVES : pageIdx >= TOTAL_PAGES);

  // Progres 0..1 sesuai mode
  const progress = spread ? flipped / TOTAL_LEAVES : pageIdx / TOTAL_PAGES;
  const canPrev = spread ? flipped > 0 : pageIdx > 0;
  const canNext = spread ? flipped < TOTAL_LEAVES : pageIdx < TOTAL_PAGES;

  // ---------- Layout size ----------
  const sizeBook = useCallback(() => {
    const vv = window.visualViewport;
    const vw = Math.round(vv ? vv.width : window.innerWidth);
    const vh = Math.round(vv ? vv.height : window.innerHeight);

    const BIG = vw >= 1100 && vw > vh; // laptop/desktop saja
    const perPage = (vw - 170) / 2;
    const isSpread = BIG && perPage >= 380;

    let availW, availH;
    if (isSpread) {
      availW = perPage;
      availH = vh - 140;
    } else {
      availW = vw - 92;
      availH = vh - 140;
    }

    let w = Math.min(availW, 470);
    let h = availH;
    const narrow = !isSpread && vw < 600;
    const rMin = narrow ? 0.5 : 0.62;
    const rMax = narrow ? 0.62 : 0.8;
    if (w / h > rMax) w = h * rMax;
    if (w / h < rMin) h = w / rMin;
    w = Math.max(180, w);
    h = Math.min(h, availH);

    document.documentElement.style.setProperty("--book-w", Math.round(w) + "px");
    document.documentElement.style.setProperty("--book-h", Math.round(h) + "px");
    return isSpread;
  }, []);

  // ---------- Render/apply ----------
  // Semua kelas leaf (.flipped / .face-show / z-index) diturunkan dari state
  // React murni (bukan classList imperatif) supaya re-render tidak menghapusnya.
  const applyLayout = useCallback(() => {
    const isSpread = sizeBook();
    setSpread(isSpread);
  }, [sizeBook]);

  // Kept in a ref so resize listeners always call the latest applyLayout
  const applyLayoutRef = useRef(applyLayout);
  useEffect(() => {
    applyLayoutRef.current = applyLayout;
  }, [applyLayout]);

  // Init layout on mount
  useEffect(() => {
    applyLayoutRef.current();
    window.addEventListener("load", () => applyLayoutRef.current());
    const t = setTimeout(() => applyLayoutRef.current(), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sembunyikan hint begitu mulai membalik halaman
  useEffect(() => {
    if ((spread ? flipped : pageIdx) > 0) setHintHidden(true);
  }, [flipped, pageIdx, spread]);

  // Resize / orientation listeners
  useEffect(() => {
    const onResize = () => applyLayoutRef.current();
    const onOrientation = () => setTimeout(() => applyLayoutRef.current(), 120);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onOrientation);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", onResize);
    }
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onOrientation);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", onResize);
      }
    };
  }, []);

  // ---------- Flip actions ----------
  const markFlipping = useCallback((idx) => {
    setFlippingIdx(idx);
    clearTimeout(flipAnimTimer.current);
    flipAnimTimer.current = setTimeout(() => setFlippingIdx(-1), 950);
  }, []);

  const flipNext = useCallback(() => {
    if (spread) {
      // Mode 2-halaman: maju 1 lembar
      setFlipped((f) => {
        if (f < TOTAL_LEAVES) {
          markFlipping(f);
          return f + 1;
        }
        return f;
      });
    } else {
      // Mode 1-halaman: maju 1 halaman (sisi)
      setSlideDir(1);
      setPageIdx((p) => (p < TOTAL_PAGES ? p + 1 : p));
    }
  }, [spread, markFlipping, TOTAL_LEAVES, TOTAL_PAGES]);

  const flipPrev = useCallback(() => {
    if (spread) {
      setFlipped((f) => {
        if (f > 0) {
          markFlipping(f - 1);
          return f - 1;
        }
        return f;
      });
    } else {
      setSlideDir(-1);
      setPageIdx((p) => (p > 0 ? p - 1 : p));
    }
  }, [spread, markFlipping, TOTAL_LEAVES]);

  // ---------- Sparkles ----------
  const spawnSparkles = useCallback(() => {
    if (sparklesSpawned.current) return;
    sparklesSpawned.current = true;
    const ov = overlayRef.current;
    if (!ov) return;
    for (let i = 0; i < 18; i++) {
      const s = document.createElement("div");
      s.className = "sparkle";
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      s.style.animationDelay = Math.random() * 4 + "s";
      s.style.animationDuration = 3 + Math.random() * 3 + "s";
      const sz = 2 + Math.random() * 3;
      s.style.width = s.style.height = sz + "px";
      ov.appendChild(s);
    }
  }, []);

  // ---------- Book open/close ----------
  const openBook = useCallback(() => {
    setBookOpen(true);
    setSpread(sizeBook());
    setFlipped(0);
    setPageIdx(0);
    setFlippingIdx(-1);
    setHintHidden(false);
    spawnSparkles();
  }, [sizeBook, spawnSparkles]);

  const closeBook = useCallback(() => {
    setBookOpen(false);
  }, []);

  const reopenBook = useCallback(() => {
    setFlipped(0);
    setPageIdx(0);
    setFlippingIdx(-1);
    setHintHidden(false);
  }, []);

  // ---------- Wheel ----------
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay || !bookOpen) return;
    let wheelLock = false;
    const onWheel = (e) => {
      if (!overlay.classList.contains("active")) return;
      if (overlay.classList.contains("finished")) return;
      if (wheelLock) return;
      if (Math.abs(e.deltaY) < 18 && Math.abs(e.deltaX) < 18) return;
      wheelLock = true;
      if (e.deltaY > 0 || e.deltaX > 0) flipNext();
      else flipPrev();
      setTimeout(() => (wheelLock = false), 900);
    };
    overlay.addEventListener("wheel", onWheel, { passive: true });
    return () => overlay.removeEventListener("wheel", onWheel);
  }, [bookOpen, flipNext, flipPrev]);

  // ---------- Touch swipe ----------
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    let startX = 0,
      startY = 0,
      dragging = false;
    const onStart = (e) => {
      if (overlay.classList.contains("finished")) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      dragging = true;
    };
    const onEnd = (e) => {
      if (!dragging) return;
      dragging = false;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) flipNext();
        else flipPrev();
      }
    };
    overlay.addEventListener("touchstart", onStart, { passive: true });
    overlay.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      overlay.removeEventListener("touchstart", onStart);
      overlay.removeEventListener("touchend", onEnd);
    };
  }, [flipNext, flipPrev]);

  // ---------- Click sides ----------
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const onClick = (e) => {
      if (overlay.classList.contains("finished")) return;
      if (
        e.target.closest(".flip-btn") ||
        e.target.closest(".book-close") ||
        e.target.closest(".page") ||
        e.target.closest(".book-closed")
      )
        return;
      const x = e.clientX / window.innerWidth;
      if (x > 0.6) flipNext();
      else if (x < 0.4) flipPrev();
    };
    overlay.addEventListener("click", onClick);
    return () => overlay.removeEventListener("click", onClick);
  }, [flipNext, flipPrev]);

  // ---------- Keyboard ----------
  useEffect(() => {
    const onKey = (e) => {
      const overlay = overlayRef.current;
      if (!overlay || !overlay.classList.contains("active")) return;
      if (overlay.classList.contains("finished")) {
        if (e.key === "Escape") closeBook();
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        flipNext();
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        flipPrev();
      }
      if (e.key === "Escape") closeBook();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flipNext, flipPrev, closeBook]);

  // ---------- WhatsApp ----------
  const [wish, setWish] = useState("");
  const sendToWhatsApp = useCallback(() => {
    const message = wish.trim();
    if (!message) {
      alert("Tulis pesanmu dulu yaa! ✨");
      return;
    }
    window.open(
      `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }, [wish]);

  const hideImgOnError = (e) => {
    e.currentTarget.style.display = "none";
    e.currentTarget.nextElementSibling.style.display = "block";
  };

  // Format detik -> "m:ss"
  const fmtTime = (s) => {
    if (!s || !isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const ss = Math.floor(s % 60);
    return `${m}:${ss < 10 ? "0" : ""}${ss}`;
  };

  // ---------- MODE 1 HALAMAN: render TEPAT SATU sisi halaman ----------
  // pageIdx: 0..TOTAL_PAGES-1. leaf = floor(pageIdx/2), sisi = pageIdx%2.
  // Halaman dirender datar (tanpa rotasi 3D) supaya tidak ada "sliver"
  // halaman lain yang menyembul di tepi. Semua 6 halaman tampil satu-satu.
  const renderSinglePage = () => {
    if (pageIdx >= TOTAL_PAGES) return null; // sudah lewat halaman terakhir -> layar tutup
    const leafIdx = Math.floor(pageIdx / 2);
    const faceIdx = pageIdx % 2; // 0 = depan, 1 = belakang
    const leaf = LEAVES[leafIdx];
    if (!leaf || !leaf[faceIdx]) return null;
    const face = leaf[faceIdx];
    return (
      <div
        className={`single-page ${face.className} slide-${slideDir > 0 ? "next" : "prev"}`}
        key={`${pageIdx}-${slideDir}`}
      >
        <div className="reveal">{face.render({ hideImgOnError })}</div>
      </div>
    );
  };

  return (
    <>
      {/* ===================== INTRO ===================== */}
      {showIntro && (
        <div
          id="intro-screen"
          style={{ opacity: introFading ? 0 : 1 }}
        >
          <div className="wrapper">
            <div className="candles">
              <div className="light__wave"></div>
              <div className="candle1">
                <div className="candle1__body">
                  <div className="candle1__eyes">
                    <span className="candle1__eyes-one"></span>
                    <span className="candle1__eyes-two"></span>
                  </div>
                  <div className="candle1__mouth"></div>
                </div>
                <div className="candle1__stick"></div>
              </div>
              <div className="candle2">
                <div className="candle2__body">
                  <div className="candle2__eyes">
                    <div className="candle2__eyes-one"></div>
                    <div className="candle2__eyes-two"></div>
                  </div>
                </div>
                <div className="candle2__stick"></div>
              </div>
              <div className="candle2__fire"></div>
              <div className="sparkles-one"></div>
              <div className="sparkles-two"></div>
              <div className="candle__smoke-one"></div>
              <div className="candle__smoke-two"></div>
            </div>
            <div className="floor"></div>
            <div className="loading-text" style={{ marginBottom: 150 }}>
              <span>L</span>
              <span>o</span>
              <span>a</span>
              <span>d</span>
              <span>i</span>
              <span>n</span>
              <span>g</span>
              <div className="dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== MAIN ===================== */}
      {mainVisible && (
        <div
          id="main-content"
          style={{ display: "flex", opacity: mainOpacity }}
        >
          <div className="container">
            <h1>Just For You</h1>
            <p className="subtitle">A Special Gift 🩵</p>

            <div className="playlist-wrapper">
              <div className={`song-art${playing ? " spinning" : ""}`} aria-hidden="true">
                <span className={`eq${playing ? " playing" : ""}`}>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                </span>
                <div className="song-disc">
                  ♪
                </div>
              </div>

              <div className="song-info">
                <b>Panasea</b>
                <small>Ardhito Pramono</small>
                <div className="song-time">
                  <span>{fmtTime(curTime)}</span>
                  <span>{fmtTime(duration)}</span>
                </div>
              </div>

              <button
                className="btn-music"
                onClick={toggleMusic}
                id="playBtn"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? "⏸" : "▶"}
              </button>

              <div
                className="song-progress"
                onClick={seekMusic}
                role="slider"
                aria-label="Progress lagu"
                aria-valuemin="0"
                aria-valuemax={Math.round(duration)}
                aria-valuenow={Math.round(curTime)}
              >
                <div
                  className="song-progress-fill"
                  style={{ width: duration ? (curTime / duration) * 100 + "%" : "0%" }}
                ></div>
              </div>
            </div>

            <audio id="myMusic" ref={audioRef} loop>
              <source src="/panasea.mp3" type="audio/mpeg" />
            </audio>

            <div className="menu-grid">
              <div className="menu-item" onClick={openBook}>
                <div className="icon-box">
                  <div className="envelope"></div>
                </div>
                <span>A Special Letter</span>
              </div>
              <div className="menu-item" onClick={() => setModalOpen(true)}>
                <div className="icon-box">
                  <div className="star-css"></div>
                </div>
                <span>Little Thoughts</span>
              </div>
            </div>

            <p className="tap-hint">Tap the cards to open</p>
          </div>
        </div>
      )}

      {/* ===================== BOOK (letter slides) ===================== */}
      <div
        className={`book-overlay${bookOpen ? " active" : ""}${isFinished ? " finished" : ""}`}
        id="bookOverlay"
        ref={overlayRef}
      >
        <div
          className="book-progress"
          id="bookProgress"
          ref={bookProgressRef}
          style={{ width: progress * 100 + "%" }}
        ></div>
        <button className="book-close" onClick={closeBook}>
          ×
        </button>
        <div className="book-title" id="bookTitle">
          Our Little Story{" "}
          <span style={{ opacity: 0.45, fontSize: ".6em", fontWeight: 400 }}>
            · v6
          </span>
        </div>

        <button
          className="flip-btn flip-prev"
          id="flipPrev"
          ref={flipPrevRef}
          onClick={flipPrev}
          disabled={!canPrev}
        >
          ‹
        </button>

        <div className={`book${spread ? " spread" : ""}`} id="book" ref={bookRef}>
          <div className="endpaper" aria-hidden="true">
            <div className="endpaper-orn">❦</div>
            <div className="endpaper-line"></div>
            <div className="endpaper-sub">our little story</div>
          </div>

          {spread
            ? /* ---------- MODE 2 HALAMAN (laptop/desktop): buku 3D ---------- */
              LEAVES.map((leaf, idx) => {
                const isLeafFlipped = idx < flipped;
                const isLeafVisible = isLeafFlipped || idx === flipped;
                return (
                  <div
                    className={`leaf${isLeafFlipped ? " flipped" : ""}${
                      idx === flippingIdx ? " flipping" : ""
                    }`}
                    data-leaf={idx}
                    key={idx}
                    ref={(el) => (leafRefs.current[idx] = el)}
                    style={{ zIndex: isLeafFlipped ? idx + 1 : TOTAL_LEAVES - idx }}
                  >
                    {leaf.map((face, fi) => {
                      const isBack = face.className.includes("back");
                      const showThis = isLeafFlipped ? isBack : !isBack;
                      const extraClass = `${showThis ? " face-show" : ""}${
                        showThis && isLeafVisible ? " reveal" : ""
                      }`;
                      return (
                        <div className={`${face.className}${extraClass}`} key={fi}>
                          {face.render({ hideImgOnError })}
                        </div>
                      );
                    })}
                  </div>
                );
              })
            : /* ---------- MODE 1 HALAMAN (HP/tablet): tepat 1 sisi per halaman ---------- */
              renderSinglePage()}
        </div>

        <button
          className="flip-btn flip-next"
          id="flipNext"
          ref={flipNextRef}
          onClick={flipNext}
          disabled={!canNext}
        >
          ›
        </button>
        <div
          className={`book-hint${hintHidden ? " hidden" : ""}`}
          id="bookHint"
          ref={bookHintRef}
        >
          ‹ geser / klik untuk membalik halaman ›
        </div>

        {/* layar penutup buku */}
        <div className="book-closed" id="bookClosed">
          <div className="closed-mark">❧</div>
          <p className="closed-text">
            Halaman terakhir sudah sampai.
            <br />
            Buku ini ditutup dengan satu doa kecil untukmu.
          </p>
          <div className="closed-actions">
            <button className="closed-btn" onClick={reopenBook}>
              ↺ Baca lagi
            </button>
            <button className="closed-btn ghost" onClick={closeBook}>
              ✕ Tutup
            </button>
          </div>
        </div>
      </div>

      {/* ===================== MODAL ===================== */}
      <div
        id="modalWishes"
        className={`modal-overlay${modalOpen ? " active" : ""}`}
        onClick={(e) => {
          if (e.target.id === "modalWishes") setModalOpen(false);
        }}
      >
        <div className="modal-card" onClick={(e) => e.stopPropagation()}>
          <span className="close-btn" onClick={() => setModalOpen(false)}>
            ×
          </span>
          <h3 style={{ textAlign: "center", marginBottom: 10 }}>
            Leave a Message ✨
          </h3>
          <p style={{ marginBottom: 15 }}>
            Tulis pesan, harapan, atau kata-kata manis untuk dikirim langsung:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <textarea
              id="wishMessage"
              placeholder="Tulis pesanmu di sini..."
              rows={4}
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "2px solid var(--maroon-light)",
                borderRadius: 12,
                fontFamily: "'Quicksand',sans-serif",
                fontSize: ".9rem",
                outline: "none",
                resize: "none",
                boxSizing: "border-box",
                background: "rgba(246,231,216,.95)",
                color: "#2b0608",
              }}
            />
            <button
              onClick={sendToWhatsApp}
              style={{
                background: "var(--tan)",
                color: "#2b0608",
                fontWeight: 700,
                border: "none",
                padding: 12,
                borderRadius: 12,
                cursor: "pointer",
                fontFamily: "'Quicksand',sans-serif",
                fontSize: ".95rem",
                marginTop: 5,
              }}
            >
              Kirim via WhatsApp 💬
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

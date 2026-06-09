import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/c895d9f9-a3a4-4391-a4d4-ab54d0014aa6/files/b8ba8007-fbd2-4afe-bf3d-14fd1e3ccb5a.jpg";
const CARS_IMG = "https://cdn.poehali.dev/projects/c895d9f9-a3a4-4391-a4d4-ab54d0014aa6/files/023a4a6c-f5ef-4242-86a4-40d14982b795.jpg";
const GUELL_IMG = "https://cdn.poehali.dev/projects/c895d9f9-a3a4-4391-a4d4-ab54d0014aa6/files/75d3676d-0d0f-4b5a-aca7-e684e578a730.jpg";

const NAV_ITEMS = [
  { id: "hero", label: "Главная" },
  { id: "history", label: "История" },
  { id: "cars", label: "Авто" },
  { id: "sights", label: "Достопримечательности" },
  { id: "hotels", label: "Отели" },
  { id: "restaurants", label: "Рестораны" },
  { id: "stats", label: "Статистика" },
  { id: "contact", label: "Контакты" },
];

const CAR_BRANDS = [
  { name: "Ferrari", tagline: "Scuderia Ferrari — страсть в металле", founded: "1939", logo: "🐴", color: "#FF2800" },
  { name: "Lamborghini", tagline: "Automobili folli per persone folli", founded: "1963", logo: "🐂", color: "#FFC300" },
  { name: "Maserati", tagline: "Luxury, sport and style", founded: "1914", logo: "🔱", color: "#4A90D9" },
  { name: "Alfa Romeo", tagline: "La meccanica delle emozioni", founded: "1910", logo: "🍀", color: "#CC0000" },
  { name: "Bugatti", tagline: "Art, Forme, Technique", founded: "1909", logo: "💎", color: "#6C8EBF" },
  { name: "McLaren", tagline: "Pure McLaren — скорость без компромиссов", founded: "1963", logo: "🧡", color: "#FF8000" },
];

const SIGHTS = [
  { name: "Саграда Фамилия", area: "Эйшампле", desc: "Шедевр Антонио Гауди — базилика строится с 1882 года и до сих пор не завершена", icon: "⛪", rating: "4.9", visitors: "4.5 млн/год" },
  { name: "Парк Гуэль", area: "Грасия", desc: "Сказочный парк с мозаикой, драконом и панорамой на весь город", icon: "🦎", rating: "4.7", visitors: "3 млн/год" },
  { name: "Лас-Рамблас", area: "Готический квартал", desc: "Главный бульвар Барселоны — сердце города, уличные артисты и рынок Бокерия", icon: "🌺", rating: "4.6", visitors: "10 млн/год" },
  { name: "Дом Батльо", area: "Пасео де Грасия", desc: "Дом-дракон Гауди — UNESCO Всемирное наследие, живая архитектура", icon: "🏠", rating: "4.8", visitors: "1 млн/год" },
  { name: "Барселонета", area: "Приморский квартал", desc: "Знаменитый городской пляж — 4 км белого песка в двух шагах от центра", icon: "🏖️", rating: "4.7", visitors: "7 млн/год" },
  { name: "Камп Ноу", area: "Лес-Кортс", desc: "Стадион ФК Барселона — крупнейший в Европе, 99 000 мест", icon: "⚽", rating: "4.8", visitors: "1.5 млн/год" },
];

const HOTELS = [
  { name: "Hotel Arts Barcelona", area: "Барселонета", stars: 5, rating: "9.4", price: "от €380/ночь", tag: "Вид на море", tagColor: "#E63946", desc: "Небоскрёб на берегу моря, терраса с бассейном и видом на Средиземноморье" },
  { name: "Mandarin Oriental", area: "Пасео де Грасия", stars: 5, rating: "9.5", price: "от €450/ночь", tag: "Топ рейтинг", tagColor: "#D4830A", desc: "Легендарный отель в сердце золотого квадрата, ресторан со звездой Мишлен" },
  { name: "W Barcelona", area: "Порт Олимпик", stars: 5, rating: "9.2", price: "от €320/ночь", tag: "Дизайн", tagColor: "#E63946", desc: "Iconic sail-shaped hotel — бескрайний вид на море и бары на крыше" },
  { name: "Casa Camper", area: "Готический квартал", stars: 4, rating: "9.1", price: "от €220/ночь", tag: "Бутик", tagColor: "#D4830A", desc: "Дизайнерский отель бренда Camper прямо в историческом центре города" },
];

const RESTAURANTS = [
  { name: "Tickets", area: "Сант-Антони", cuisine: "Авангардные тапас", stars: "⭐", rating: "9.7", price: "€€€", desc: "Ресторан братьев Адриа — звезда Мишлен, авангардная кухня в формате цирка", icon: "🎪" },
  { name: "Disfrutar", area: "Эйшампле", cuisine: "Haute Cuisine", stars: "⭐⭐⭐", rating: "9.9", price: "€€€€", desc: "3 звезды Мишлен — лучший ресторан мира 2023 года по версии The World's 50 Best", icon: "🌟" },
  { name: "La Boqueria Bar", area: "Рамблас", cuisine: "Каталонская", stars: "🏆", rating: "9.0", price: "€€", desc: "Легендарный рыбный бар на рынке Бокерия — свежайшие морепродукты с 1836 года", icon: "🦞" },
  { name: "Cinc Sentits", area: "Эйшампле", cuisine: "Современная каталонская", stars: "⭐⭐", rating: "9.6", price: "€€€€", desc: "2 звезды Мишлен, «Пять чувств» — путешествие сквозь вкусы Каталонии", icon: "🍷" },
];

const HISTORY_FACTS = [
  { year: "15 до н.э.", title: "Основание Барсино", desc: "Римский emperor Август основал колонию Barcino — будущую Барселону на берегу Средиземного моря", icon: "🏛️" },
  { year: "988", title: "Столица Каталонии", desc: "Барселона становится столицей Каталонского графства — начало каталонской идентичности", icon: "🦅" },
  { year: "1888", title: "Всемирная выставка", desc: "Барселона принимает Всемирную выставку — толчок к грандиозной реконструкции города", icon: "🏗️" },
  { year: "1992", title: "Олимпийские игры", desc: "Олимпиада-1992 превратила Барселону в один из главных туристических городов планеты", icon: "🏅" },
];

function StarRating({ count }: { count: number }) {
  return (
    <span style={{ color: "#F4A261", fontSize: "0.9rem", letterSpacing: "0.05em" }}>
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = NAV_ITEMS.map((n) => n.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY + 100 >= el.offsetTop) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const hoverIn = (el: HTMLDivElement, y = -6, shadow = "rgba(244,162,97,0.15)") => {
    el.style.transform = `translateY(${y}px)`;
    el.style.boxShadow = `0 20px 60px ${shadow}`;
  };
  const hoverOut = (el: HTMLDivElement) => {
    el.style.transform = "";
    el.style.boxShadow = "";
  };

  return (
    <div style={{ background: "#0D0A08", color: "#F5EFE6", fontFamily: "'IBM Plex Sans', sans-serif", overflowX: "hidden" }}>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(13,10,8,0.97)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(244,162,97,0.12)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <button onClick={() => scrollTo("hero")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Oswald', sans-serif", fontSize: "1.5rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            <span style={{ color: "#fff" }}>BARCE</span>
            <span style={{ color: "#E63946" }}>LONA</span>
          </button>

          <div className="hidden lg:flex" style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.78rem",
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: activeSection === item.id ? "#F4A261" : "rgba(255,255,255,0.65)",
                transition: "color 0.2s", padding: "4px 0",
                borderBottom: activeSection === item.id ? "1px solid #F4A261" : "1px solid transparent",
              }}>
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex" style={{ alignItems: "center", gap: "1rem" }}>
            <button onClick={() => navigate("/germany")} style={{
              background: "rgba(232,184,0,0.1)", border: "1px solid rgba(232,184,0,0.3)",
              cursor: "pointer", fontFamily: "'Oswald', sans-serif", fontSize: "0.72rem",
              textTransform: "uppercase", letterSpacing: "0.12em", color: "#E8B800",
              padding: "6px 14px", borderRadius: 50, transition: "all 0.2s",
            }}
              onMouseOver={(e) => { e.currentTarget.style.background = "rgba(232,184,0,0.2)"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "rgba(232,184,0,0.1)"; }}
            >🇩🇪 Германия</button>
            <div style={{ flexDirection: "column", gap: 2, display: "flex" }}>
              <div style={{ width: 32, height: 5, background: "#C60B1E" }} />
              <div style={{ width: 32, height: 5, background: "#F1BF00" }} />
              <div style={{ width: 32, height: 5, background: "#C60B1E" }} />
            </div>
          </div>

          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div style={{ background: "rgba(13,10,8,0.99)", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} style={{
                textAlign: "left", background: "none", border: "none", cursor: "pointer",
                borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "0.75rem 0",
                fontFamily: "'Oswald', sans-serif", fontSize: "1.1rem",
                textTransform: "uppercase", letterSpacing: "0.1em",
                color: activeSection === item.id ? "#F4A261" : "rgba(255,255,255,0.8)",
              }}>
                {item.label}
              </button>
            ))}
            <button onClick={() => navigate("/germany")} style={{
              textAlign: "left", background: "none", border: "none", cursor: "pointer",
              padding: "0.75rem 0", fontFamily: "'Oswald', sans-serif", fontSize: "1rem",
              textTransform: "uppercase", letterSpacing: "0.1em", color: "#E8B800",
            }}>🇩🇪 → Германия</button>
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <img src={HERO_IMG} alt="Барселона" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(13,10,8,0.2) 0%, rgba(13,10,8,0.65) 50%, rgba(13,10,8,1) 100%)" }} />
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, background: "#C60B1E" }} />
          <div style={{ flex: 1, background: "#F1BF00" }} />
          <div style={{ flex: 1, background: "#C60B1E" }} />
        </div>

        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 2rem 6rem", width: "100%" }}>
          <div style={{ maxWidth: 700 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.4rem 1.2rem", border: "1px solid rgba(230,57,70,0.35)",
              borderRadius: 50, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.78rem",
              letterSpacing: "0.1em", textTransform: "uppercase", color: "#E63946",
              background: "rgba(230,57,70,0.07)", marginBottom: "1.5rem",
            }}>
              🇪🇸 Туристический гид — Каталония, Испания
            </span>

            <h1 style={{
              fontFamily: "'Oswald', sans-serif", fontWeight: 700,
              fontSize: "clamp(3.5rem, 11vw, 9rem)", lineHeight: 0.9,
              textTransform: "uppercase", letterSpacing: "-0.02em",
              color: "#fff", marginBottom: "1.5rem",
            }}>
              ОТКРОЙТЕ<br />
              <span style={{ color: "#F4A261" }}>БАРСЕЛОНУ</span>
            </h1>

            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "1.1rem", color: "rgba(255,255,255,0.65)", marginBottom: "2.5rem", maxWidth: 520, lineHeight: 1.7 }}>
              Город Гауди, фламенко и солнечных пляжей. Столица Каталонии, где встречаются
              средневековая история, авангардная архитектура и бесконечное средиземноморское лето.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <button onClick={() => scrollTo("sights")} style={{
                background: "#E63946", color: "#fff", border: "none", cursor: "pointer",
                fontFamily: "'Oswald', sans-serif", fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.1em", padding: "1rem 2rem", fontSize: "0.85rem", transition: "all 0.2s",
              }}
                onMouseOver={(e) => (e.currentTarget.style.background = "#c52434")}
                onMouseOut={(e) => (e.currentTarget.style.background = "#E63946")}
              >Исследовать →</button>
              <button onClick={() => scrollTo("history")} style={{
                background: "transparent", color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer",
                fontFamily: "'Oswald', sans-serif", textTransform: "uppercase",
                letterSpacing: "0.1em", padding: "1rem 2rem", fontSize: "0.85rem", transition: "all 0.2s",
              }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = "#F4A261"; e.currentTarget.style.color = "#F4A261"; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "#fff"; }}
              >История города</button>
            </div>
          </div>

          <div style={{ marginTop: "4rem", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.07)" }}>
            {[
              { label: "Туристов в год", value: "32 млн" },
              { label: "Население", value: "1.66 млн" },
              { label: "Звёзд Мишлен", value: "24" },
              { label: "Объектов ЮНЕСКО", value: "9" },
            ].map((s) => (
              <div key={s.label} style={{ background: "rgba(13,10,8,0.8)", backdropFilter: "blur(8px)", padding: "1.25rem 1.5rem" }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#F4A261" }}>{s.value}</div>
                <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HISTORY ===== */}
      <section id="history" style={{ padding: "7rem 0", background: "#0D0A08" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "#E63946", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.75rem" }}>С 15 года до н.э.</p>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 5rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1, marginBottom: "4rem" }}>
            ИСТОРИЯ<br /><span style={{ color: "#F4A261" }}>БАРСЕЛОНЫ</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "3rem" }}>
            {[
              { border: "#E63946", title: "Каталонская душа", p1: "Барселона — не просто город. Это столица независимого духа Каталонии. Здесь говорят на каталанском, чтят свои традиции и гордятся уникальной идентичностью, которую не смогли сломить ни века господства Кастилии, ни режим Франко.", p2: "Архитектура Антонио Гауди стала символом не только города, но и всего каталонского модернизма — живого, органического, неповторимого." },
              { border: "#F4A261", title: "Современная Барселона", p1: "После Олимпиады 1992 года Барселона превратилась в один из самых модных городов мира. Технологический хаб, центр моды, гастрономическая столица Средиземноморья.", p2: "Сегодня Барселона входит в топ-5 самых посещаемых городов Европы, принимая ежегодно более 32 миллионов туристов." },
            ].map((c) => (
              <div key={c.title} style={{ background: "#161210", padding: "2rem", borderLeft: `4px solid ${c.border}` }}>
                <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.4rem", color: "#fff", textTransform: "uppercase", marginBottom: "1rem" }}>{c.title}</h3>
                <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: "1rem" }}>{c.p1}</p>
                <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>{c.p2}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem" }}>
            {HISTORY_FACTS.map((f, i) => (
              <div key={f.year} style={{ position: "relative", background: "#1A1410", padding: "1.5rem", cursor: "default", transition: "transform 0.3s, box-shadow 0.3s" }}
                onMouseOver={(e) => hoverIn(e.currentTarget as HTMLDivElement, -6, "rgba(230,57,70,0.12)")}
                onMouseOut={(e) => hoverOut(e.currentTarget as HTMLDivElement)}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: i % 2 === 0 ? "#E63946" : "#F4A261" }} />
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{f.icon}</div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#F4A261", marginBottom: "0.5rem" }}>{f.year}</div>
                <h4 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1rem", color: "#fff", textTransform: "uppercase", marginBottom: "0.75rem" }}>{f.title}</h4>
                <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CARS ===== */}
      <section id="cars" style={{ padding: "7rem 0", background: "#0A0806", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.18 }}>
          <img src={CARS_IMG} alt="Суперкары" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #0A0806 30%, rgba(10,8,6,0.5))" }} />
        </div>
        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "#F4A261", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.75rem" }}>Суперкары Средиземноморья</p>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 5rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1, marginBottom: "4rem" }}>
            ЛЕГЕНДАРНЫЕ<br /><span style={{ color: "#E63946" }}>АВТОБРЕНДЫ</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", marginBottom: "3rem" }}>
            {CAR_BRANDS.map((brand) => (
              <div key={brand.name} style={{ background: "rgba(26,20,16,0.85)", backdropFilter: "blur(8px)", padding: "1.5rem", border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", transition: "transform 0.3s, box-shadow 0.3s" }}
                onMouseOver={(e) => hoverIn(e.currentTarget as HTMLDivElement, -6, brand.color + "33")}
                onMouseOut={(e) => hoverOut(e.currentTarget as HTMLDivElement)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "3rem" }}>{brand.logo}</span>
                  <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.22)", textTransform: "uppercase", letterSpacing: "0.1em" }}>с {brand.founded}</span>
                </div>
                <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.5rem", fontWeight: 700, textTransform: "uppercase", color: brand.color, marginBottom: "0.4rem" }}>{brand.name}</h3>
                <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontStyle: "italic", fontSize: "0.82rem", color: "rgba(255,255,255,0.38)" }}>{brand.tagline}</p>
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(244,162,97,0.07)", border: "1px solid rgba(244,162,97,0.18)", padding: "2rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem", textAlign: "center" }}>
              {[
                { val: "2-е", label: "Место Барселоны по числу суперкаров на улицах Испании" },
                { val: "€8 млрд", label: "Оборот авторынка Каталонии в год" },
                { val: "120+", label: "Дилерских центров премиум-класса в городе" },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 700, color: "#F4A261", lineHeight: 1, marginBottom: "0.5rem" }}>{s.val}</div>
                  <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.42)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SIGHTS ===== */}
      <section id="sights" style={{ padding: "7rem 0", background: "#0D0A08", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.07 }}>
          <img src={GUELL_IMG} alt="Парк Гуэль" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "#0D0A08" }} />
        </div>
        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "#F4A261", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.75rem" }}>Must See</p>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 5rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1, marginBottom: "4rem" }}>
            ГЛАВНЫЕ<br /><span style={{ color: "#E63946" }}>ДОСТОПРИМЕЧАТЕЛЬНОСТИ</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {SIGHTS.map((s) => (
              <div key={s.name} style={{ background: "#161210", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden", cursor: "pointer", transition: "transform 0.3s, box-shadow 0.3s" }}
                onMouseOver={(e) => { hoverIn(e.currentTarget as HTMLDivElement, -6, "rgba(244,162,97,0.12)"); const bar = (e.currentTarget as HTMLDivElement).querySelector(".sight-bar") as HTMLElement; if (bar) bar.style.width = "100%"; }}
                onMouseOut={(e) => { hoverOut(e.currentTarget as HTMLDivElement); const bar = (e.currentTarget as HTMLDivElement).querySelector(".sight-bar") as HTMLElement; if (bar) bar.style.width = "0"; }}
              >
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "3rem" }}>{s.icon}</span>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.5rem", color: "#F4A261", fontWeight: 700 }}>★ {s.rating}</div>
                      <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.28)" }}>{s.visitors}</div>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.7rem", color: "#E63946", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.4rem" }}>📍 {s.area}</p>
                  <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.2rem", color: "#fff", textTransform: "uppercase", marginBottom: "0.75rem" }}>{s.name}</h3>
                  <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.84rem", color: "rgba(255,255,255,0.43)", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
                <div className="sight-bar" style={{ height: 3, width: 0, background: "#F4A261", transition: "width 0.5s ease" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOTELS ===== */}
      <section id="hotels" style={{ padding: "7rem 0", background: "#0A0806" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "#F4A261", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.75rem" }}>Лучшие 5 звёзд</p>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 5rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1, marginBottom: "4rem" }}>
            ОТЕЛИ<br /><span style={{ color: "#F4A261" }}>БАРСЕЛОНЫ</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.5rem" }}>
            {HOTELS.map((h) => (
              <div key={h.name} style={{ background: "#161210", padding: "1.75rem", border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", transition: "transform 0.3s, box-shadow 0.3s" }}
                onMouseOver={(e) => hoverIn(e.currentTarget as HTMLDivElement)}
                onMouseOut={(e) => hoverOut(e.currentTarget as HTMLDivElement)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div>
                    <span style={{ display: "inline-block", background: h.tagColor, color: "#fff", fontSize: "0.7rem", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", padding: "3px 10px", marginBottom: "0.6rem" }}>{h.tag}</span>
                    <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.25rem", color: "#fff", textTransform: "uppercase" }}>{h.name}</h3>
                    <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.3)", marginTop: 4 }}>📍 {h.area}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "2rem", color: "#F4A261", fontWeight: 700, lineHeight: 1 }}>{h.rating}</div>
                    <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.27)" }}>из 10</div>
                  </div>
                </div>
                <div style={{ marginBottom: "0.75rem" }}><StarRating count={h.stars} /></div>
                <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.84rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.7, marginBottom: "1.25rem" }}>{h.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1rem" }}>
                  <span style={{ fontFamily: "'Oswald', sans-serif", color: "#F4A261", fontSize: "1.1rem" }}>{h.price}</span>
                  <button style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.38)", textTransform: "uppercase", letterSpacing: "0.1em", transition: "color 0.2s" }}
                    onMouseOver={(e) => (e.currentTarget.style.color = "#F4A261")}
                    onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
                  >Забронировать →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RESTAURANTS ===== */}
      <section id="restaurants" style={{ padding: "7rem 0", background: "#0D0A08" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "#E63946", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.75rem" }}>¡Buen provecho!</p>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 5rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1, marginBottom: "4rem" }}>
            РЕСТОРАНЫ<br /><span style={{ color: "#F4A261" }}>И ГАСТРОНОМИЯ</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.5rem" }}>
            {RESTAURANTS.map((r) => (
              <div key={r.name} style={{ background: "#1A1410", padding: "1.75rem", border: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "1.25rem", cursor: "pointer", transition: "transform 0.3s, box-shadow 0.3s" }}
                onMouseOver={(e) => hoverIn(e.currentTarget as HTMLDivElement, -6, "rgba(230,57,70,0.1)")}
                onMouseOut={(e) => hoverOut(e.currentTarget as HTMLDivElement)}
              >
                <div style={{ fontSize: "3rem", flexShrink: 0 }}>{r.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                    <div>
                      <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.15rem", color: "#fff", textTransform: "uppercase" }}>{r.name}</h3>
                      <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", marginTop: 3 }}>📍 {r.area} · {r.cuisine}</p>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "1rem" }}>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.5rem", color: "#F4A261", fontWeight: 700, lineHeight: 1 }}>{r.rating}</div>
                      <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.28)" }}>/10</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.6rem", alignItems: "center" }}>
                    <span style={{ fontSize: "0.85rem" }}>{r.stars}</span>
                    <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.26)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{r.price}</span>
                  </div>
                  <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.84rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.7 }}>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section id="stats" style={{ padding: "7rem 0", background: "#0A0806", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #C60B1E 33%, #F1BF00 33%, #F1BF00 66%, #C60B1E 66%)" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "#F4A261", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.75rem" }}>Факты и цифры</p>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 5rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1, marginBottom: "4rem" }}>
            БАРСЕЛОНА<br /><span style={{ color: "#F4A261" }}>В ЦИФРАХ</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(255,255,255,0.05)", marginBottom: "3rem" }}>
            {[
              { val: "32 млн", label: "Туристов ежегодно", icon: "✈️", sub: "+8% к прошлому году" },
              { val: "1.66 млн", label: "Жителей города", icon: "👥", sub: "5-й город ЕС" },
              { val: "№4", label: "В рейтинге городов Европы", icon: "🏆", sub: "Euromonitor 2023" },
              { val: "€16 млрд", label: "Доходы от туризма", icon: "💰", sub: "рекорд 2023 года" },
              { val: "4.5 км²", label: "Готический квартал", icon: "🏛️", sub: "старейший район" },
              { val: "24", label: "Звёзды Мишлен", icon: "⭐", sub: "гастрономическая столица" },
              { val: "9", label: "Объектов ЮНЕСКО", icon: "🏗️", sub: "наследие Гауди" },
              { val: "300+", label: "Солнечных дней в году", icon: "☀️", sub: "средиземноморский климат" },
            ].map((s) => (
              <div key={s.label} style={{ background: "#161210", padding: "1.75rem", transition: "background 0.2s", cursor: "default" }}
                onMouseOver={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#1d1612")}
                onMouseOut={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#161210")}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{s.icon}</div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 700, color: "#F4A261", lineHeight: 1, marginBottom: "0.4rem" }}>{s.val}</div>
                <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.48)", lineHeight: 1.4, marginBottom: "0.4rem" }}>{s.label}</div>
                <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(244,162,97,0.55)" }}>{s.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "#161210", padding: "2rem", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.25rem", color: "#fff", textTransform: "uppercase", marginBottom: "1.5rem" }}>Популярные районы среди туристов</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { region: "Готический квартал", pct: 32, color: "#E63946" },
                { region: "Эйшампле / Саграда Фамилия", pct: 28, color: "#F4A261" },
                { region: "Барселонета и порт", pct: 20, color: "#E63946" },
                { region: "Грасия / Парк Гуэль", pct: 13, color: "#F4A261" },
                { region: "Прочие районы", pct: 7, color: "#444" },
              ].map((r) => (
                <div key={r.region} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.84rem", color: "rgba(255,255,255,0.52)", width: 230, flexShrink: 0 }}>{r.region}</span>
                  <div style={{ flex: 1, background: "rgba(255,255,255,0.07)", height: 8 }}>
                    <div style={{ height: "100%", width: `${r.pct}%`, background: r.color }} />
                  </div>
                  <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.45)", width: 32, textAlign: "right" }}>{r.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT / MAP ===== */}
      <section id="contact" style={{ padding: "7rem 0", background: "#0D0A08" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "#F4A261", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.75rem" }}>Найди нас</p>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 5rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1, marginBottom: "4rem" }}>
            КОНТАКТЫ<br /><span style={{ color: "#E63946" }}>И КАРТА</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                { icon: "🏢", border: "#F4A261", title: "Туристический центр", lines: ["Barcelona Tourism Office", "Plaça de Catalunya 17-S, 08002 Barcelona"] },
                { icon: "📞", border: "#E63946", title: "Телефон", lines: ["+34 932 853 832", "Пн–Пт: 9:00–20:00 CET"], highlight: 0 },
                { icon: "✉️", border: "#F4A261", title: "Email", lines: ["info@barcelonaturisme.com"], highlight: 0 },
              ].map((item) => (
                <div key={item.title} style={{ background: "#161210", padding: "1.5rem", borderLeft: `4px solid ${item.border}`, display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "2rem" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Oswald', sans-serif", color: "#fff", textTransform: "uppercase", fontSize: "1rem", marginBottom: "0.4rem" }}>{item.title}</div>
                    {item.lines.map((l, i) => (
                      <div key={i} style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: item.highlight === i ? "1.1rem" : "0.84rem", color: item.highlight === i ? "#F4A261" : "rgba(255,255,255,0.38)" }}>{l}</div>
                    ))}
                  </div>
                </div>
              ))}
              <div style={{ background: "#161210", padding: "1.5rem", borderLeft: "4px solid #E63946", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <span style={{ fontSize: "2rem" }}>🌐</span>
                <div>
                  <div style={{ fontFamily: "'Oswald', sans-serif", color: "#fff", textTransform: "uppercase", fontSize: "1rem", marginBottom: "0.75rem" }}>Социальные сети</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                    {["Instagram", "Facebook", "YouTube", "TikTok"].map((s) => (
                      <span key={s} style={{ display: "inline-flex", padding: "0.35rem 0.9rem", border: "1px solid rgba(244,162,97,0.28)", borderRadius: 50, fontFamily: "'Oswald', sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#F4A261", background: "rgba(244,162,97,0.04)", cursor: "pointer" }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ minHeight: 360, background: "#161210", border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden", position: "relative" }}>
              <iframe
                title="Барселона на карте"
                src="https://www.openstreetmap.org/export/embed.html?bbox=2.0825958251953125,41.33792012335048,2.2275543212890625,41.42152913492024&layer=mapnik&marker=41.38879,2.15899"
                style={{ width: "100%", height: "100%", minHeight: 360, filter: "invert(88%) hue-rotate(180deg) brightness(0.9) contrast(1.1)" }}
              />
              <div style={{ position: "absolute", bottom: 16, right: 16 }}>
                <a href="https://www.openstreetmap.org/?mlat=41.38879&mlon=2.15899#map=13/41.38879/2.15899" target="_blank" rel="noopener noreferrer"
                  style={{ background: "#E63946", color: "#fff", fontFamily: "'Oswald', sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", padding: "0.5rem 1rem", textDecoration: "none", display: "inline-block" }}
                >Открыть карту →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: "#080604", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "3rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", height: 4, marginBottom: "2.5rem" }}>
            <div style={{ flex: 1, background: "#C60B1E" }} />
            <div style={{ flex: 1, background: "#F1BF00" }} />
            <div style={{ flex: 1, background: "#C60B1E" }} />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "2rem" }}>
            <div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "2rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                <span style={{ color: "#fff" }}>BARCE</span><span style={{ color: "#E63946" }}>LONA</span>
              </div>
              <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.84rem", color: "rgba(255,255,255,0.22)" }}>Туристический гид — Каталония, Испания</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {NAV_ITEMS.map((item) => (
                <button key={item.id} onClick={() => scrollTo(item.id)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.28)", textTransform: "uppercase",
                  letterSpacing: "0.1em", transition: "color 0.2s",
                }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#F4A261")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}
                >{item.label}</button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "1rem" }}>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.14)" }}>© 2024 Barcelona Guide. Туристический информационный портал.</p>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.14)" }}>🇪🇸 Барселона · Каталония · Испания</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
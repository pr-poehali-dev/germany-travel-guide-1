import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/c895d9f9-a3a4-4391-a4d4-ab54d0014aa6/files/a6018c53-a9e7-44ea-ad89-82785065f001.jpg";
const CARS_IMG = "https://cdn.poehali.dev/projects/c895d9f9-a3a4-4391-a4d4-ab54d0014aa6/files/c99f5e76-01ce-4d8d-92cb-1c51265ef869.jpg";
const CASTLE_IMG = "https://cdn.poehali.dev/projects/c895d9f9-a3a4-4391-a4d4-ab54d0014aa6/files/6849b15a-3458-47a0-b086-bf74d3bf923f.jpg";

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
  { name: "BMW", tagline: "Баварские моторы", founded: "1916", logo: "🔵", color: "#1C69D4" },
  { name: "Mercedes-Benz", tagline: "Das Beste oder nichts", founded: "1926", logo: "⭐", color: "#BEBEBE" },
  { name: "Porsche", tagline: "Спорт и безупречность", founded: "1931", logo: "🐎", color: "#C7A13C" },
  { name: "Audi", tagline: "Vorsprung durch Technik", founded: "1909", logo: "⭕", color: "#BB0A21" },
  { name: "Volkswagen", tagline: "Народный автомобиль", founded: "1937", logo: "🚗", color: "#1B3A6B" },
  { name: "Opel", tagline: "Немецкие инновации с 1899", founded: "1899", logo: "⚡", color: "#E8C800" },
];

const SIGHTS = [
  { name: "Бранденбургские ворота", city: "Берлин", desc: "Символ объединённой Германии, построен в 1791 году как Ворота мира", icon: "🏛️", rating: "4.9", visitors: "2 млн/год" },
  { name: "Замок Нойшванштайн", city: "Бавария", desc: "Сказочный замок Людвига II — прообраз замков Disney, парит над облаками", icon: "🏰", rating: "4.8", visitors: "1.4 млн/год" },
  { name: "Кёльнский собор", city: "Кёльн", desc: "Готический шедевр XIII века — объект Всемирного наследия ЮНЕСКО", icon: "⛪", rating: "4.8", visitors: "6 млн/год" },
  { name: "Рейнская долина", city: "Рейн", desc: "Замки и виноградники вдоль величественного Рейна — открытка Германии", icon: "🏔️", rating: "4.7", visitors: "1 млн/год" },
  { name: "Октоберфест", city: "Мюнхен", desc: "Крупнейший в мире фестиваль пива — ежегодно более 6 миллионов гостей", icon: "🍺", rating: "4.9", visitors: "6 млн/год" },
  { name: "Дрезденская галерея", city: "Дрезден", desc: "Один из старейших музеев Европы с полотнами Рафаэля и Рубенса", icon: "🎨", rating: "4.7", visitors: "800 тыс/год" },
];

const HOTELS = [
  { name: "Adlon Kempinski", city: "Берлин", stars: 5, rating: "9.4", price: "от €350/ночь", tag: "Легендарный", tagColor: "#E8B800", desc: "Исторический отель у Бранденбургских ворот — символ берлинской роскоши с 1907 года" },
  { name: "Bayerischer Hof", city: "Мюнхен", stars: 5, rating: "9.2", price: "от €280/ночь", tag: "Лучший в городе", tagColor: "#CC0000", desc: "Гранд-отель в центре Мюнхена — 5 ресторанов, спа и вид на старый город" },
  { name: "Hotel Atlantic Hamburg", city: "Гамбург", stars: 5, rating: "9.1", price: "от €240/ночь", tag: "Исторический", tagColor: "#E8B800", desc: "Роскошный отель 1909 года на берегу озера Альстер, любимый королями и звёздами" },
  { name: "Breidenbacher Hof", city: "Дюссельдорф", stars: 5, rating: "9.3", price: "от €320/ночь", tag: "Топ-рейтинг", tagColor: "#CC0000", desc: "Элегантный 5-звёздочный отель в модном квартале Кёнигсаллее" },
];

const RESTAURANTS = [
  { name: "Lorenz Adlon Esszimmer", city: "Берлин", cuisine: "Haute Cuisine", stars: "⭐⭐", rating: "9.6", price: "€€€€", desc: "2 звезды Мишлен — авторская немецкая кухня с панорамным видом на Бранденбургские ворота", icon: "🍽️" },
  { name: "Hofbräuhaus", city: "Мюнхен", cuisine: "Баварская", stars: "🏆", rating: "9.0", price: "€€", desc: "Легендарное пивное заведение с 1589 года — обязательная остановка в Мюнхене", icon: "🍺" },
  { name: "Tim Raue", city: "Берлин", cuisine: "Азиатско-немецкая", stars: "⭐⭐", rating: "9.5", price: "€€€€", desc: "2 звезды Мишлен — дерзкое переосмысление немецкой кухни с азиатскими акцентами", icon: "🥢" },
  { name: "Schwarzwaldstube", city: "Бретен", cuisine: "Haute Cuisine", stars: "⭐⭐⭐", rating: "9.8", price: "€€€€", desc: "3 звезды Мишлен — лучший ресторан Германии, гастрономическое паломничество", icon: "🌟" },
];

const HISTORY_FACTS = [
  { year: "962", title: "Священная Римская Империя", desc: "Основание Священной Римской Империи германской нации — первого великого объединения немецких земель", icon: "👑" },
  { year: "1455", title: "Печатный станок Гутенберга", desc: "Иоганн Гутенберг изобретает книгопечатание и навсегда меняет мировую цивилизацию", icon: "📚" },
  { year: "1871", title: "Объединение Германии", desc: "Бисмарк объединяет немецкие государства в единую Германскую империю под прусским руководством", icon: "🦅" },
  { year: "1989", title: "Падение Берлинской стены", desc: "9 ноября — исторический день: объединение Восточной и Западной Германии", icon: "🧱" },
];

function StarRating({ count }: { count: number }) {
  return (
    <span style={{ color: "#E8B800", fontSize: "0.9rem", letterSpacing: "0.05em" }}>
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

export default function Germany() {
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

  const hoverIn = (el: HTMLDivElement, shadow = "rgba(232,184,0,0.15)") => {
    el.style.transform = "translateY(-6px)";
    el.style.boxShadow = `0 20px 60px ${shadow}`;
  };
  const hoverOut = (el: HTMLDivElement) => {
    el.style.transform = "";
    el.style.boxShadow = "";
  };

  return (
    <div style={{ background: "#0A0A0A", color: "#F5F0E8", fontFamily: "'IBM Plex Sans', sans-serif", overflowX: "hidden" }}>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(10,10,10,0.97)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(232,184,0,0.12)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>

          {/* Logo */}
          <button onClick={() => scrollTo("hero")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Oswald', sans-serif", fontSize: "1.5rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            <span style={{ color: "#fff" }}>DEUTSCH</span><span style={{ color: "#E8B800" }}>LAND</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex" style={{ alignItems: "center", gap: "1.5rem" }}>
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.78rem",
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: activeSection === item.id ? "#E8B800" : "rgba(255,255,255,0.6)",
                transition: "color 0.2s", padding: "4px 0",
                borderBottom: activeSection === item.id ? "1px solid #E8B800" : "1px solid transparent",
              }}>{item.label}</button>
            ))}
          </div>

          {/* Switch to Barcelona */}
          <div className="hidden lg:flex" style={{ alignItems: "center", gap: "1rem" }}>
            <button onClick={() => navigate("/")} style={{
              background: "rgba(230,57,70,0.1)", border: "1px solid rgba(230,57,70,0.3)",
              cursor: "pointer", fontFamily: "'Oswald', sans-serif", fontSize: "0.72rem",
              textTransform: "uppercase", letterSpacing: "0.12em", color: "#E63946",
              padding: "6px 14px", borderRadius: 50, transition: "all 0.2s",
            }}
              onMouseOver={(e) => { e.currentTarget.style.background = "rgba(230,57,70,0.2)"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "rgba(230,57,70,0.1)"; }}
            >🇪🇸 Барселона</button>
            {/* DE flag */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={{ width: 32, height: 4, background: "#000", border: "1px solid rgba(255,255,255,0.2)" }} />
              <div style={{ width: 32, height: 4, background: "#CC0000" }} />
              <div style={{ width: 32, height: 4, background: "#E8B800" }} />
            </div>
          </div>

          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div style={{ background: "rgba(10,10,10,0.99)", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} style={{
                textAlign: "left", background: "none", border: "none", cursor: "pointer",
                borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "0.75rem 0",
                fontFamily: "'Oswald', sans-serif", fontSize: "1.1rem",
                textTransform: "uppercase", letterSpacing: "0.1em",
                color: activeSection === item.id ? "#E8B800" : "rgba(255,255,255,0.8)",
              }}>{item.label}</button>
            ))}
            <button onClick={() => navigate("/")} style={{
              textAlign: "left", background: "none", border: "none", cursor: "pointer",
              padding: "0.75rem 0", fontFamily: "'Oswald', sans-serif", fontSize: "1rem",
              textTransform: "uppercase", letterSpacing: "0.1em", color: "#E63946",
            }}>🇪🇸 → Барселона</button>
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <img src={HERO_IMG} alt="Бранденбургские ворота" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.65) 55%, rgba(10,10,10,1) 100%)" }} />
        {/* DE flag stripe left */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, background: "#000" }} />
          <div style={{ flex: 1, background: "#CC0000" }} />
          <div style={{ flex: 1, background: "#E8B800" }} />
        </div>

        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 2rem 6rem", width: "100%" }}>
          <div style={{ maxWidth: 720 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.4rem 1.2rem", border: "1px solid rgba(232,184,0,0.35)",
              borderRadius: 50, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.78rem",
              letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8B800",
              background: "rgba(232,184,0,0.07)", marginBottom: "1.5rem",
              display: "inline-flex",
            }}>
              🇩🇪 Официальный туристический гид · Германия
            </span>

            <h1 style={{
              fontFamily: "'Oswald', sans-serif", fontWeight: 700,
              fontSize: "clamp(3.5rem, 11vw, 9rem)", lineHeight: 0.9,
              textTransform: "uppercase", letterSpacing: "-0.02em",
              color: "#fff", marginBottom: "1.5rem",
            }}>
              ОТКРОЙ<br /><span style={{ color: "#E8B800" }}>ГЕРМАНИЮ</span>
            </h1>

            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "1.1rem", color: "rgba(255,255,255,0.62)", marginBottom: "2.5rem", maxWidth: 540, lineHeight: 1.75 }}>
              Страна инженерного гения, средневековых замков и мировых автомобильных
              брендов. Добро пожаловать в самую посещаемую страну Европы.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <button onClick={() => scrollTo("sights")} style={{
                background: "#E8B800", color: "#000", border: "none", cursor: "pointer",
                fontFamily: "'Oswald', sans-serif", fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.1em", padding: "1rem 2rem", fontSize: "0.85rem", transition: "all 0.2s",
              }}
                onMouseOver={(e) => (e.currentTarget.style.background = "#d4a800")}
                onMouseOut={(e) => (e.currentTarget.style.background = "#E8B800")}
              >Исследовать →</button>
              <button onClick={() => scrollTo("history")} style={{
                background: "transparent", color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer",
                fontFamily: "'Oswald', sans-serif", textTransform: "uppercase",
                letterSpacing: "0.1em", padding: "1rem 2rem", fontSize: "0.85rem", transition: "all 0.2s",
              }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = "#E8B800"; e.currentTarget.style.color = "#E8B800"; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "#fff"; }}
              >История страны</button>
            </div>
          </div>

          {/* Stats bar */}
          <div style={{ marginTop: "4rem", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.07)" }}>
            {[
              { label: "Туристов в год", value: "39.6 млн" },
              { label: "Население", value: "84.4 млн" },
              { label: "Звёзд Мишлен", value: "316" },
              { label: "Объектов ЮНЕСКО", value: "52" },
            ].map((s) => (
              <div key={s.label} style={{ background: "rgba(10,10,10,0.8)", backdropFilter: "blur(8px)", padding: "1.25rem 1.5rem" }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#E8B800" }}>{s.value}</div>
                <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HISTORY ===== */}
      <section id="history" style={{ padding: "7rem 0", background: "#0A0A0A" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "#E8B800", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.75rem" }}>С 962 года</p>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 5rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1, marginBottom: "4rem" }}>
            ИСТОРИЯ<br /><span style={{ color: "#E8B800" }}>ГЕРМАНИИ</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "3rem" }}>
            {[
              { border: "#E8B800", title: "Культура и наследие", p1: "Германия — страна Бетховена, Баха и Брамса. Страна Гёте, Шиллера и Канта. Здесь родились теория относительности, квантовая физика и первый автомобиль в мире.", p2: "Немецкая культура оказала колоссальное влияние на весь мир — от философии до инженерии, от музыки до архитектуры Баухауса." },
              { border: "#CC0000", title: "Современная Германия", p1: "Сегодня Германия — крупнейшая экономика Европы. Страна является мировым лидером в машиностроении, химической промышленности и возобновляемой энергетике.", p2: "16 федеральных земель, каждая со своим характером — от баварских Альп до берлинского авангарда и Гамбургского порта." },
            ].map((c) => (
              <div key={c.title} style={{ background: "#111", padding: "2rem", borderLeft: `4px solid ${c.border}` }}>
                <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.4rem", color: "#fff", textTransform: "uppercase", marginBottom: "1rem" }}>{c.title}</h3>
                <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: "1rem" }}>{c.p1}</p>
                <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>{c.p2}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem" }}>
            {HISTORY_FACTS.map((f, i) => (
              <div key={f.year} style={{ position: "relative", background: "#161616", padding: "1.5rem", cursor: "default", transition: "transform 0.3s, box-shadow 0.3s" }}
                onMouseOver={(e) => hoverIn(e.currentTarget as HTMLDivElement, "rgba(232,184,0,0.12)")}
                onMouseOut={(e) => hoverOut(e.currentTarget as HTMLDivElement)}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: i % 2 === 0 ? "#E8B800" : "#CC0000" }} />
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{f.icon}</div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.6rem", fontWeight: 700, color: "#E8B800", marginBottom: "0.5rem" }}>{f.year}</div>
                <h4 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1rem", color: "#fff", textTransform: "uppercase", marginBottom: "0.75rem" }}>{f.title}</h4>
                <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CARS ===== */}
      <section id="cars" style={{ padding: "7rem 0", background: "#070707", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.2 }}>
          <img src={CARS_IMG} alt="Немецкие авто" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #070707 30%, rgba(7,7,7,0.5))" }} />
        </div>
        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "#CC0000", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.75rem" }}>Made in Germany</p>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 5rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1, marginBottom: "4rem" }}>
            НЕМЕЦКИЕ<br /><span style={{ color: "#E8B800" }}>АВТОБРЕНДЫ</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", marginBottom: "3rem" }}>
            {CAR_BRANDS.map((brand) => (
              <div key={brand.name} style={{ background: "rgba(20,16,12,0.88)", backdropFilter: "blur(8px)", padding: "1.5rem", border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", transition: "transform 0.3s, box-shadow 0.3s", position: "relative", overflow: "hidden" }}
                onMouseOver={(e) => { hoverIn(e.currentTarget as HTMLDivElement, brand.color + "33"); const bar = (e.currentTarget as HTMLDivElement).querySelector(".car-bar") as HTMLElement; if (bar) bar.style.width = "100%"; }}
                onMouseOut={(e) => { hoverOut(e.currentTarget as HTMLDivElement); const bar = (e.currentTarget as HTMLDivElement).querySelector(".car-bar") as HTMLElement; if (bar) bar.style.width = "0"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "3rem" }}>{brand.logo}</span>
                  <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.22)", textTransform: "uppercase", letterSpacing: "0.1em" }}>с {brand.founded}</span>
                </div>
                <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.5rem", fontWeight: 700, textTransform: "uppercase", color: brand.color, marginBottom: "0.4rem" }}>{brand.name}</h3>
                <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontStyle: "italic", fontSize: "0.82rem", color: "rgba(255,255,255,0.38)" }}>{brand.tagline}</p>
                <div className="car-bar" style={{ position: "absolute", bottom: 0, left: 0, height: 2, width: 0, background: brand.color, transition: "width 0.5s ease" }} />
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(232,184,0,0.07)", border: "1px solid rgba(232,184,0,0.18)", padding: "2rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem", textAlign: "center" }}>
              {[
                { val: "#1", label: "Страна по экспорту автомобилей в Европе" },
                { val: "5.6 млн", label: "Автомобилей произведено в 2023 году" },
                { val: "€227 млрд", label: "Выручка автопромышленности в год" },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 700, color: "#E8B800", lineHeight: 1, marginBottom: "0.5rem" }}>{s.val}</div>
                  <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.42)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SIGHTS ===== */}
      <section id="sights" style={{ padding: "7rem 0", background: "#0A0A0A", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.07 }}>
          <img src={CASTLE_IMG} alt="Нойшванштайн" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "#0A0A0A" }} />
        </div>
        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "#E8B800", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.75rem" }}>Must See</p>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 5rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1, marginBottom: "4rem" }}>
            ГЛАВНЫЕ<br /><span style={{ color: "#CC0000" }}>ДОСТОПРИМЕЧАТЕЛЬНОСТИ</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {SIGHTS.map((s) => (
              <div key={s.name} style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden", cursor: "pointer", transition: "transform 0.3s, box-shadow 0.3s" }}
                onMouseOver={(e) => { hoverIn(e.currentTarget as HTMLDivElement, "rgba(232,184,0,0.12)"); const bar = (e.currentTarget as HTMLDivElement).querySelector(".sight-bar") as HTMLElement; if (bar) bar.style.width = "100%"; }}
                onMouseOut={(e) => { hoverOut(e.currentTarget as HTMLDivElement); const bar = (e.currentTarget as HTMLDivElement).querySelector(".sight-bar") as HTMLElement; if (bar) bar.style.width = "0"; }}
              >
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "3rem" }}>{s.icon}</span>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.5rem", color: "#E8B800", fontWeight: 700 }}>★ {s.rating}</div>
                      <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.28)" }}>{s.visitors}</div>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.7rem", color: "#CC0000", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.4rem" }}>📍 {s.city}</p>
                  <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.2rem", color: "#fff", textTransform: "uppercase", marginBottom: "0.75rem" }}>{s.name}</h3>
                  <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.84rem", color: "rgba(255,255,255,0.43)", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
                <div className="sight-bar" style={{ height: 3, width: 0, background: "#E8B800", transition: "width 0.5s ease" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOTELS ===== */}
      <section id="hotels" style={{ padding: "7rem 0", background: "#070707" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "#E8B800", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.75rem" }}>5 звёзд</p>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 5rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1, marginBottom: "4rem" }}>
            ЛУЧШИЕ<br /><span style={{ color: "#E8B800" }}>ОТЕЛИ</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.5rem" }}>
            {HOTELS.map((h) => (
              <div key={h.name} style={{ background: "#111", padding: "1.75rem", border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", transition: "transform 0.3s, box-shadow 0.3s" }}
                onMouseOver={(e) => hoverIn(e.currentTarget as HTMLDivElement)}
                onMouseOut={(e) => hoverOut(e.currentTarget as HTMLDivElement)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div>
                    <span style={{ display: "inline-block", background: h.tagColor, color: h.tagColor === "#E8B800" ? "#000" : "#fff", fontSize: "0.7rem", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", padding: "3px 10px", marginBottom: "0.6rem" }}>{h.tag}</span>
                    <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.25rem", color: "#fff", textTransform: "uppercase" }}>{h.name}</h3>
                    <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.3)", marginTop: 4 }}>📍 {h.city}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "2rem", color: "#E8B800", fontWeight: 700, lineHeight: 1 }}>{h.rating}</div>
                    <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.27)" }}>из 10</div>
                  </div>
                </div>
                <div style={{ marginBottom: "0.75rem" }}><StarRating count={h.stars} /></div>
                <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.84rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.7, marginBottom: "1.25rem" }}>{h.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1rem" }}>
                  <span style={{ fontFamily: "'Oswald', sans-serif", color: "#E8B800", fontSize: "1.1rem" }}>{h.price}</span>
                  <button style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.38)", textTransform: "uppercase", letterSpacing: "0.1em", transition: "color 0.2s" }}
                    onMouseOver={(e) => (e.currentTarget.style.color = "#E8B800")}
                    onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
                  >Забронировать →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RESTAURANTS ===== */}
      <section id="restaurants" style={{ padding: "7rem 0", background: "#0A0A0A" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "#CC0000", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.75rem" }}>Guten Appetit!</p>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 5rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1, marginBottom: "4rem" }}>
            РЕСТОРАНЫ<br /><span style={{ color: "#E8B800" }}>ГЕРМАНИИ</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.5rem" }}>
            {RESTAURANTS.map((r) => (
              <div key={r.name} style={{ background: "#161616", padding: "1.75rem", border: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "1.25rem", cursor: "pointer", transition: "transform 0.3s, box-shadow 0.3s" }}
                onMouseOver={(e) => hoverIn(e.currentTarget as HTMLDivElement, "rgba(204,0,0,0.1)")}
                onMouseOut={(e) => hoverOut(e.currentTarget as HTMLDivElement)}
              >
                <div style={{ fontSize: "3rem", flexShrink: 0 }}>{r.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                    <div>
                      <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.15rem", color: "#fff", textTransform: "uppercase" }}>{r.name}</h3>
                      <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", marginTop: 3 }}>📍 {r.city} · {r.cuisine}</p>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "1rem" }}>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.5rem", color: "#E8B800", fontWeight: 700, lineHeight: 1 }}>{r.rating}</div>
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
      <section id="stats" style={{ padding: "7rem 0", background: "#070707", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #000 33%, #CC0000 33%, #CC0000 66%, #E8B800 66%)" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "#E8B800", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.75rem" }}>Факты и цифры</p>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 5rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1, marginBottom: "4rem" }}>
            ГЕРМАНИЯ<br /><span style={{ color: "#E8B800" }}>В ЦИФРАХ</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(255,255,255,0.05)", marginBottom: "3rem" }}>
            {[
              { val: "39.6 млн", label: "Иностранных туристов в год", icon: "✈️", sub: "+12% к 2022" },
              { val: "84.4 млн", label: "Жителей страны", icon: "👥", sub: "3-е место в ЕС" },
              { val: "№7", label: "В мировом рейтинге туризма", icon: "🏆", sub: "по версии UNWTO" },
              { val: "€43 млрд", label: "Доходы от туризма", icon: "💰", sub: "2023 год" },
              { val: "16", label: "Федеральных земель", icon: "🗺️", sub: "каждая уникальна" },
              { val: "4-я", label: "Экономика мира", icon: "📈", sub: "ВВП $4.4 трлн" },
              { val: "316", label: "Звёзд Мишлен", icon: "⭐", sub: "2-е место в Европе" },
              { val: "52", label: "Объекта ЮНЕСКО", icon: "🏛️", sub: "мировое наследие" },
            ].map((s) => (
              <div key={s.label} style={{ background: "#111", padding: "1.75rem", transition: "background 0.2s", cursor: "default" }}
                onMouseOver={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#181818")}
                onMouseOut={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#111")}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{s.icon}</div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 700, color: "#E8B800", lineHeight: 1, marginBottom: "0.4rem" }}>{s.val}</div>
                <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.48)", lineHeight: 1.4, marginBottom: "0.4rem" }}>{s.label}</div>
                <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(232,184,0,0.55)" }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Rating bar */}
          <div style={{ background: "#111", padding: "2rem", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.25rem", color: "#fff", textTransform: "uppercase", marginBottom: "1.5rem" }}>Рейтинг популярности регионов Германии</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { region: "Бавария", pct: 28, color: "#E8B800" },
                { region: "Берлин", pct: 22, color: "#CC0000" },
                { region: "Северный Рейн-Вестфалия", pct: 18, color: "#E8B800" },
                { region: "Гамбург", pct: 14, color: "#CC0000" },
                { region: "Баден-Вюртемберг", pct: 11, color: "#E8B800" },
                { region: "Прочие регионы", pct: 7, color: "#333" },
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
      <section id="contact" style={{ padding: "7rem 0", background: "#0A0A0A" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "#E8B800", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.75rem" }}>Найди нас</p>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 5rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1, marginBottom: "4rem" }}>
            КОНТАКТЫ<br /><span style={{ color: "#CC0000" }}>И КАРТА</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                { icon: "🏢", border: "#E8B800", title: "Туристическое агентство", lines: ["Germany Travel GmbH", "Unter den Linden 10, 10117 Berlin"] },
                { icon: "📞", border: "#CC0000", title: "Телефон", lines: ["+49 30 2500 2333", "Пн–Пт: 9:00–18:00 CET"], hl: 0 },
                { icon: "✉️", border: "#E8B800", title: "Email", lines: ["info@germany-travel.de"], hl: 0 },
              ].map((item) => (
                <div key={item.title} style={{ background: "#111", padding: "1.5rem", borderLeft: `4px solid ${item.border}`, display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "2rem" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Oswald', sans-serif", color: "#fff", textTransform: "uppercase", fontSize: "1rem", marginBottom: "0.4rem" }}>{item.title}</div>
                    {item.lines.map((l, i) => (
                      <div key={i} style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: item.hl === i ? "1.1rem" : "0.84rem", color: item.hl === i ? "#E8B800" : "rgba(255,255,255,0.38)" }}>{l}</div>
                    ))}
                  </div>
                </div>
              ))}
              <div style={{ background: "#111", padding: "1.5rem", borderLeft: "4px solid #CC0000", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <span style={{ fontSize: "2rem" }}>🌐</span>
                <div>
                  <div style={{ fontFamily: "'Oswald', sans-serif", color: "#fff", textTransform: "uppercase", fontSize: "1rem", marginBottom: "0.75rem" }}>Социальные сети</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                    {["Instagram", "Facebook", "YouTube", "TikTok"].map((s) => (
                      <span key={s} style={{ display: "inline-flex", padding: "0.35rem 0.9rem", border: "1px solid rgba(232,184,0,0.28)", borderRadius: 50, fontFamily: "'Oswald', sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8B800", background: "rgba(232,184,0,0.04)", cursor: "pointer" }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ minHeight: 380, background: "#111", border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden", position: "relative" }}>
              <iframe
                title="Берлин на карте"
                src="https://www.openstreetmap.org/export/embed.html?bbox=13.2881927490234,52.4638023707785,13.5280227661133,52.5752520643544&layer=mapnik&marker=52.5200066,13.404954"
                style={{ width: "100%", height: "100%", minHeight: 380, filter: "invert(90%) hue-rotate(180deg) brightness(0.85) contrast(1.1)" }}
              />
              <div style={{ position: "absolute", bottom: 16, right: 16 }}>
                <a href="https://www.openstreetmap.org/?mlat=52.52&mlon=13.4049#map=12/52.52/13.4049" target="_blank" rel="noopener noreferrer"
                  style={{ background: "#E8B800", color: "#000", fontFamily: "'Oswald', sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", padding: "0.5rem 1rem", textDecoration: "none", display: "inline-block" }}
                >Открыть карту →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "3rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", height: 4, marginBottom: "2.5rem" }}>
            <div style={{ flex: 1, background: "#000", border: "1px solid rgba(255,255,255,0.15)" }} />
            <div style={{ flex: 1, background: "#CC0000" }} />
            <div style={{ flex: 1, background: "#E8B800" }} />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "2rem" }}>
            <div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "2rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                <span style={{ color: "#fff" }}>DEUTSCH</span><span style={{ color: "#E8B800" }}>LAND</span>
              </div>
              <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.84rem", color: "rgba(255,255,255,0.22)" }}>Туристический гид по Германии</p>
              <button onClick={() => navigate("/")} style={{
                marginTop: "0.75rem", background: "none", border: "1px solid rgba(230,57,70,0.3)",
                cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.78rem",
                color: "#E63946", padding: "5px 14px", borderRadius: 50, transition: "all 0.2s",
              }}
                onMouseOver={(e) => (e.currentTarget.style.background = "rgba(230,57,70,0.1)")}
                onMouseOut={(e) => (e.currentTarget.style.background = "none")}
              >🇪🇸 Перейти к Барселоне</button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {NAV_ITEMS.map((item) => (
                <button key={item.id} onClick={() => scrollTo(item.id)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.28)", textTransform: "uppercase",
                  letterSpacing: "0.1em", transition: "color 0.2s",
                }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#E8B800")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}
                >{item.label}</button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "1rem" }}>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.14)" }}>© 2024 Deutschland Guide. Туристический информационный портал.</p>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.14)" }}>🇩🇪 Германия · Европа · Мир</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

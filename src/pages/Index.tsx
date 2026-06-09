import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/c895d9f9-a3a4-4391-a4d4-ab54d0014aa6/files/6d24a8d8-3389-422a-b41a-6dca37b113e0.jpg";
const CARS_IMG = "https://cdn.poehali.dev/projects/c895d9f9-a3a4-4391-a4d4-ab54d0014aa6/files/ef32a8e8-2ea3-4899-b0af-f90d633f7d0e.jpg";
const CASTLE_IMG = "https://cdn.poehali.dev/projects/c895d9f9-a3a4-4391-a4d4-ab54d0014aa6/files/cef7d00e-c6c8-49ea-9cd2-b71c129af6e4.jpg";

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
  { name: "Mercedes-Benz", tagline: "Nur das Beste", founded: "1926", logo: "⭐", color: "#C0C0C0" },
  { name: "Porsche", tagline: "Спорт и престиж", founded: "1931", logo: "🏇", color: "#C7A13C" },
  { name: "Audi", tagline: "Vorsprung durch Technik", founded: "1909", logo: "⭕", color: "#BB0A21" },
  { name: "Volkswagen", tagline: "Народный автомобиль", founded: "1937", logo: "🚗", color: "#1B3A6B" },
  { name: "Opel", tagline: "Инновации с 1899", founded: "1899", logo: "⚡", color: "#FFD700" },
];

const SIGHTS = [
  {
    name: "Бранденбургские ворота",
    city: "Берлин",
    desc: "Символ объединённой Германии, построен в 1791 году как Ворота мира",
    icon: "🏛️",
    rating: "4.9",
    visitors: "2 млн/год",
  },
  {
    name: "Замок Нойшванштайн",
    city: "Бавария",
    desc: "Сказочный замок Людвига II — прообраз замка из мультфильмов Disney",
    icon: "🏰",
    rating: "4.8",
    visitors: "1.4 млн/год",
  },
  {
    name: "Кёльнский собор",
    city: "Кёльн",
    desc: "Готический шедевр XIII века, объект Всемирного наследия ЮНЕСКО",
    icon: "⛪",
    rating: "4.8",
    visitors: "6 млн/год",
  },
  {
    name: "Рейнская долина",
    city: "Рейн",
    desc: "Величественные замки и виноградники вдоль берегов Рейна",
    icon: "🏔️",
    rating: "4.7",
    visitors: "1 млн/год",
  },
  {
    name: "Октоберфест",
    city: "Мюнхен",
    desc: "Крупнейший в мире фестиваль пива — ежегодно более 6 миллионов гостей",
    icon: "🍺",
    rating: "4.9",
    visitors: "6 млн/год",
  },
  {
    name: "Дрезденская галерея",
    city: "Дрезден",
    desc: "Один из старейших музеев Европы с полотнами Рафаэля и Рубенса",
    icon: "🎨",
    rating: "4.7",
    visitors: "800 тыс/год",
  },
];

const HOTELS = [
  {
    name: "Adlon Kempinski",
    city: "Берлин",
    stars: 5,
    rating: "9.4",
    price: "от €350/ночь",
    tag: "Легендарный",
    tagColor: "bg-gold text-black",
    desc: "Исторический отель у Бранденбургских ворот с вековой историей",
  },
  {
    name: "Bayerischer Hof",
    city: "Мюнхен",
    stars: 5,
    rating: "9.2",
    price: "от €280/ночь",
    tag: "Лучший в городе",
    tagColor: "bg-red-de text-white",
    desc: "Гранд-отель в центре Мюнхена с видом на старый город",
  },
  {
    name: "Hotel Atlantic Hamburg",
    city: "Гамбург",
    stars: 5,
    rating: "9.1",
    price: "от €240/ночь",
    tag: "Исторический",
    tagColor: "bg-gold text-black",
    desc: "Роскошный отель 1909 года на берегу озера Альстер",
  },
  {
    name: "Breidenbacher Hof",
    city: "Дюссельдорф",
    stars: 5,
    rating: "9.3",
    price: "от €320/ночь",
    tag: "Топ-рейтинг",
    tagColor: "bg-red-de text-white",
    desc: "Элегантный отель в модном квартале Дюссельдорфа",
  },
];

const RESTAURANTS = [
  {
    name: "Lorenz Adlon Esszimmer",
    city: "Берлин",
    cuisine: "Haute Cuisine",
    stars: "⭐⭐",
    rating: "9.6",
    price: "€€€€",
    desc: "2 звезды Мишлен, авторская немецкая кухня с потрясающим видом",
    icon: "🍽️",
  },
  {
    name: "Hofbräuhaus",
    city: "Мюнхен",
    cuisine: "Баварская",
    stars: "🏆",
    rating: "9.0",
    price: "€€",
    desc: "Легендарное пивное заведение 1589 года — must visit в Мюнхене",
    icon: "🍺",
  },
  {
    name: "Tim Raue",
    city: "Берлин",
    cuisine: "Азиатско-немецкая",
    stars: "⭐⭐",
    rating: "9.5",
    price: "€€€€",
    desc: "2 звезды Мишлен, дерзкое переосмысление немецкой кухни",
    icon: "🥢",
  },
  {
    name: "Restaurant Schwarzwaldstube",
    city: "Бретен",
    cuisine: "Баварская",
    stars: "⭐⭐⭐",
    rating: "9.8",
    price: "€€€€",
    desc: "3 звезды Мишлен — лучший ресторан Германии по версии Мишлен",
    icon: "🌟",
  },
];

const HISTORY_FACTS = [
  {
    year: "962",
    title: "Священная Римская Империя",
    desc: "Основание Священной Римской Империи германской нации — первого государственного объединения немецких земель",
    icon: "👑",
  },
  {
    year: "1455",
    title: "Печатный станок Гутенберга",
    desc: "Иоганн Гутенберг изобретает книгопечатание, навсегда изменив мировую цивилизацию",
    icon: "📚",
  },
  {
    year: "1871",
    title: "Объединение Германии",
    desc: "Бисмарк объединяет германские государства в единую Германскую империю",
    icon: "🦅",
  },
  {
    year: "1989",
    title: "Падение Берлинской стены",
    desc: "9 ноября 1989 года — исторический день объединения Восточной и Западной Германии",
    icon: "🧱",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <span className="star-rating">
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <div className="min-h-screen bg-dark text-light overflow-x-hidden">

      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/95 backdrop-blur-md border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <button
            onClick={() => scrollTo("hero")}
            className="font-display text-2xl font-bold tracking-widest uppercase"
          >
            <span className="text-white">DEUTSCH</span>
            <span className="text-gold">LAND</span>
          </button>

          <div className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link font-body text-sm tracking-wide uppercase transition-colors ${
                  activeSection === item.id ? "text-gold active" : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex flex-col gap-0.5">
            <div className="w-8 h-1 bg-black border border-white/20"></div>
            <div className="w-8 h-1 bg-red-de"></div>
            <div className="w-8 h-1 bg-gold"></div>
          </div>

          <button
            className="lg:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-black/98 border-t border-white/10 px-6 py-4 flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left font-display text-lg uppercase tracking-wider py-2 border-b border-white/10 last:border-0 ${
                  activeSection === item.id ? "text-gold" : "text-white/80"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section id="hero" className="relative min-h-screen flex items-end overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Бранденбургские ворота"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="hero-mask absolute inset-0" />

        <div className="absolute left-0 top-0 bottom-0 w-1.5 flex flex-col">
          <div className="flex-1 bg-black" />
          <div className="flex-1 bg-red-de" />
          <div className="flex-1 bg-gold" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pb-24 w-full">
          <div className="max-w-3xl animate-fade-up">
            <p className="brand-pill mb-6 inline-flex">
              <span>🇩🇪</span> Официальный туристический гид
            </p>
            <h1
              className="section-title text-white mb-6"
              style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
            >
              ОТКРОЙ<br />
              <span className="text-gold">ГЕРМАНИЮ</span>
            </h1>
            <p className="font-body text-lg text-white/70 mb-10 max-w-xl leading-relaxed">
              Страна инженерного гения, средневековых замков, мировых автомобильных брендов
              и богатейшей культуры. Добро пожаловать в самую посещаемую страну Европы.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("sights")}
                className="bg-gold text-black font-display font-bold uppercase tracking-wider px-8 py-4 text-sm hover:brightness-110 transition-all duration-200"
              >
                Исследовать →
              </button>
              <button
                onClick={() => scrollTo("history")}
                className="border border-white/30 text-white font-display uppercase tracking-wider px-8 py-4 text-sm hover:border-gold hover:text-gold transition-all duration-200"
              >
                История страны
              </button>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {[
              { label: "Туристов в год", value: "39.6 млн" },
              { label: "Население", value: "84.4 млн" },
              { label: "Звёзд Мишлен", value: "316" },
              { label: "Объектов ЮНЕСКО", value: "52" },
            ].map((s) => (
              <div key={s.label} className="bg-black/70 backdrop-blur px-6 py-5">
                <div className="font-display text-2xl font-bold text-gold">{s.value}</div>
                <div className="font-body text-xs text-white/50 uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HISTORY ===== */}
      <section id="history" className="py-28 bg-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end gap-6 mb-16">
            <div>
              <p className="font-body text-gold text-sm uppercase tracking-widest mb-3">С 962 года</p>
              <h2 className="section-title text-white">
                ИСТОРИЯ<br /><span className="text-gold">ГЕРМАНИИ</span>
              </h2>
            </div>
            <div className="hidden md:block flex-1 h-px bg-white/10 mb-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray1 p-8 border-l-4 border-gold">
              <h3 className="font-display text-2xl text-white mb-4 uppercase">Культура и наследие</h3>
              <p className="font-body text-white/60 leading-relaxed mb-4">
                Германия — страна Бетховена, Баха и Брамса. Страна Гёте, Шиллера и Канта.
                Здесь родились теория относительности, квантовая физика и первый автомобиль.
              </p>
              <p className="font-body text-white/60 leading-relaxed">
                Немецкая культура оказала колоссальное влияние на весь мир — от философии
                до инженерии, от музыки до архитектуры Баухауса.
              </p>
            </div>
            <div className="bg-gray1 p-8 border-l-4 border-red-de">
              <h3 className="font-display text-2xl text-white mb-4 uppercase">Современная Германия</h3>
              <p className="font-body text-white/60 leading-relaxed mb-4">
                Сегодня Германия — крупнейшая экономика Европы и третья в мире.
                Страна является мировым лидером в машиностроении, химической промышленности
                и возобновляемой энергетике.
              </p>
              <p className="font-body text-white/60 leading-relaxed">
                16 федеральных земель, каждая со своим характером и традициями —
                от баварских Альп до берлинского авангарда.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HISTORY_FACTS.map((f, i) => (
              <div key={f.year} className="relative bg-gray2 p-6 card-hover group">
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: i % 2 === 0 ? "var(--gold)" : "var(--red)" }}
                />
                <div className="text-4xl mb-4">{f.icon}</div>
                <div className="font-display text-3xl font-bold text-gold mb-2">{f.year}</div>
                <h4 className="font-display text-lg text-white uppercase mb-3 group-hover:text-gold transition-colors">
                  {f.title}
                </h4>
                <p className="font-body text-sm text-white/50 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CARS ===== */}
      <section id="cars" className="py-28 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={CARS_IMG} alt="Немецкие автомобили" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="font-body text-red-de text-sm uppercase tracking-widest mb-3">Made in Germany</p>
            <h2 className="section-title text-white">
              НЕМЕЦКИЕ<br /><span className="text-gold">АВТОБРЕНДЫ</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {CAR_BRANDS.map((brand) => (
              <div
                key={brand.name}
                className="bg-gray1/80 backdrop-blur p-6 border border-white/10 card-hover group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl">{brand.logo}</span>
                  <span className="font-body text-xs text-white/30 uppercase tracking-widest">
                    с {brand.founded}
                  </span>
                </div>
                <h3
                  className="font-display text-2xl font-bold uppercase mb-2 transition-colors"
                  style={{ color: brand.color }}
                >
                  {brand.name}
                </h3>
                <p className="font-body text-sm text-white/50 italic">{brand.tagline}</p>
                <div
                  className="mt-4 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: brand.color }}
                />
              </div>
            ))}
          </div>

          <div className="bg-gold/10 border border-gold/30 p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { val: "#1", label: "Страна по экспорту автомобилей в Европе" },
                { val: "5.6 млн", label: "Автомобилей произведено в 2023 году" },
                { val: "€227 млрд", label: "Выручка автопромышленности в год" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="number-big mb-2">{s.val}</div>
                  <div className="font-body text-sm text-white/50 uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SIGHTS ===== */}
      <section id="sights" className="py-28 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={CASTLE_IMG} alt="Нойшванштайн" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "var(--dark)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end gap-6 mb-16">
            <div>
              <p className="font-body text-gold text-sm uppercase tracking-widest mb-3">Must See</p>
              <h2 className="section-title text-white">
                ДОСТОПРИМЕЧАТЕЛЬНОСТИ
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SIGHTS.map((s) => (
              <div
                key={s.name}
                className="bg-gray1 border border-white/10 card-hover group overflow-hidden cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-5xl">{s.icon}</span>
                    <div className="text-right">
                      <div className="font-display text-2xl text-gold font-bold">★ {s.rating}</div>
                      <div className="font-body text-xs text-white/30">{s.visitors}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-body text-xs text-red-de uppercase tracking-widest">
                      📍 {s.city}
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-white uppercase group-hover:text-gold transition-colors mb-3">
                    {s.name}
                  </h3>
                  <p className="font-body text-sm text-white/50 leading-relaxed">{s.desc}</p>
                </div>
                <div className="h-1 w-0 group-hover:w-full bg-gold transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOTELS ===== */}
      <section id="hotels" className="py-28 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="font-body text-gold text-sm uppercase tracking-widest mb-3">5 звёзд</p>
            <h2 className="section-title text-white">
              ЛУЧШИЕ<br /><span className="text-gold">ОТЕЛИ</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {HOTELS.map((h) => (
              <div
                key={h.name}
                className="bg-gray1 p-7 border border-white/10 card-hover group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span
                      className={`inline-block text-xs font-display uppercase tracking-widest px-3 py-1 mb-3 ${h.tagColor}`}
                    >
                      {h.tag}
                    </span>
                    <h3 className="font-display text-xl text-white uppercase group-hover:text-gold transition-colors">
                      {h.name}
                    </h3>
                    <p className="font-body text-sm text-white/40 mt-1">📍 {h.city}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-3xl text-gold font-bold">{h.rating}</div>
                    <div className="font-body text-xs text-white/30">из 10</div>
                  </div>
                </div>
                <div className="mb-4">
                  <StarRating count={h.stars} />
                </div>
                <p className="font-body text-sm text-white/50 leading-relaxed mb-4">{h.desc}</p>
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="font-display text-gold text-lg">{h.price}</span>
                  <button className="font-body text-sm text-white/50 hover:text-gold transition-colors uppercase tracking-wide">
                    Забронировать →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RESTAURANTS ===== */}
      <section id="restaurants" className="py-28 bg-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="font-body text-red-de text-sm uppercase tracking-widest mb-3">Guten Appetit</p>
            <h2 className="section-title text-white">
              РЕСТОРАНЫ<br /><span className="text-gold">ГЕРМАНИИ</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {RESTAURANTS.map((r) => (
              <div
                key={r.name}
                className="bg-gray2 p-7 border border-white/10 card-hover group cursor-pointer flex gap-5"
              >
                <div className="text-5xl flex-shrink-0">{r.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-display text-xl text-white uppercase group-hover:text-gold transition-colors">
                        {r.name}
                      </h3>
                      <p className="font-body text-xs text-white/40 mt-1">📍 {r.city} · {r.cuisine}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <div className="font-display text-2xl text-gold font-bold">{r.rating}</div>
                      <div className="font-body text-xs text-white/30">/10</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm">{r.stars}</span>
                    <span className="font-body text-xs text-white/30 uppercase tracking-wider">{r.price}</span>
                  </div>
                  <p className="font-body text-sm text-white/50 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section id="stats" className="py-28 bg-black relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-2"
          style={{ background: "linear-gradient(90deg, #000 33%, #CC0000 33%, #CC0000 66%, #E8B800 66%)" }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="font-body text-gold text-sm uppercase tracking-widest mb-3">Факты и цифры</p>
            <h2 className="section-title text-white">
              ГЕРМАНИЯ<br /><span className="text-gold">В ЦИФРАХ</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {[
              { val: "39.6 млн", label: "Иностранных туристов в год", icon: "✈️", sub: "+12% к 2022" },
              { val: "84.4 млн", label: "Жителей страны", icon: "👥", sub: "3-е место в ЕС" },
              { val: "№7", label: "В мировом рейтинге туризма", icon: "🏆", sub: "по версии UNWTO" },
              { val: "€43 млрд", label: "Доходы от туризма в год", icon: "💰", sub: "2023 год" },
              { val: "16", label: "Федеральных земель", icon: "🗺️", sub: "каждая уникальна" },
              { val: "4-я", label: "Экономика мира", icon: "📈", sub: "ВВП $4.4 трлн" },
              { val: "316", label: "Ресторанов со звездой Мишлен", icon: "⭐", sub: "2-е место в Европе" },
              { val: "52", label: "Объекта Всемирного наследия", icon: "🏛️", sub: "по версии ЮНЕСКО" },
            ].map((s) => (
              <div key={s.label} className="bg-gray1 p-7 hover:bg-gray2 transition-colors">
                <div className="text-3xl mb-4">{s.icon}</div>
                <div className="number-big mb-2">{s.val}</div>
                <div className="font-body text-sm text-white/60 leading-tight mb-2">{s.label}</div>
                <div className="font-body text-xs uppercase tracking-wider" style={{ color: "var(--gold)", opacity: 0.7 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gray1 p-8 border border-white/10">
            <h3 className="font-display text-xl text-white uppercase mb-6">
              Рейтинг популярности регионов Германии
            </h3>
            <div className="space-y-4">
              {[
                { region: "Бавария", pct: 28, color: "#E8B800" },
                { region: "Берлин", pct: 22, color: "#CC0000" },
                { region: "Северный Рейн-Вестфалия", pct: 18, color: "#E8B800" },
                { region: "Гамбург", pct: 14, color: "#CC0000" },
                { region: "Баден-Вюртемберг", pct: 11, color: "#E8B800" },
                { region: "Прочие регионы", pct: 7, color: "#444" },
              ].map((r) => (
                <div key={r.region} className="flex items-center gap-4">
                  <span className="font-body text-sm text-white/60 w-52 flex-shrink-0">{r.region}</span>
                  <div className="flex-1 bg-white/10 h-2">
                    <div
                      className="h-full transition-all duration-1000"
                      style={{ width: `${r.pct}%`, background: r.color }}
                    />
                  </div>
                  <span className="font-display text-sm text-white/60 w-8 text-right">{r.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT / MAP ===== */}
      <section id="contact" className="py-28 bg-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="font-body text-gold text-sm uppercase tracking-widest mb-3">Найди нас</p>
            <h2 className="section-title text-white">
              КОНТАКТЫ<br /><span className="text-gold">И КАРТА</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="bg-gray1 p-6 border-l-4 border-gold flex gap-4 items-start">
                <span className="text-3xl">🏢</span>
                <div>
                  <div className="font-display text-white uppercase text-lg mb-1">Туристическое агентство</div>
                  <div className="font-body text-white/50 text-sm">Germany Travel GmbH</div>
                  <div className="font-body text-white/40 text-sm">Unter den Linden 10, 10117 Berlin</div>
                </div>
              </div>
              <div className="bg-gray1 p-6 border-l-4 border-red-de flex gap-4 items-start">
                <span className="text-3xl">📞</span>
                <div>
                  <div className="font-display text-white uppercase text-lg mb-1">Телефон</div>
                  <div className="font-body text-gold text-lg">+49 30 2500 2333</div>
                  <div className="font-body text-white/40 text-sm">Пн–Пт: 9:00–18:00 CET</div>
                </div>
              </div>
              <div className="bg-gray1 p-6 border-l-4 border-gold flex gap-4 items-start">
                <span className="text-3xl">✉️</span>
                <div>
                  <div className="font-display text-white uppercase text-lg mb-1">Email</div>
                  <div className="font-body text-gold">info@germany-travel.de</div>
                </div>
              </div>
              <div className="bg-gray1 p-6 border-l-4 border-red-de flex gap-4 items-start">
                <span className="text-3xl">🌐</span>
                <div>
                  <div className="font-display text-white uppercase text-lg mb-1">Социальные сети</div>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {["Instagram", "Facebook", "YouTube", "TikTok"].map((s) => (
                      <span key={s} className="brand-pill text-xs cursor-pointer">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="h-96 lg:h-auto min-h-72 bg-gray2 border border-white/10 overflow-hidden relative">
              <iframe
                title="Берлин на карте"
                src="https://www.openstreetmap.org/export/embed.html?bbox=13.2881927490234,52.4638023707785,13.5280227661133,52.5752520643544&layer=mapnik&marker=52.5200066,13.404954"
                className="w-full h-full"
                style={{ filter: "invert(90%) hue-rotate(180deg) brightness(0.85) contrast(1.1)" }}
              />
              <div className="absolute bottom-4 right-4">
                <a
                  href="https://www.openstreetmap.org/?mlat=52.52&mlon=13.4049#map=12/52.52/13.4049"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gold text-black font-display text-xs uppercase tracking-wider px-4 py-2 hover:brightness-110 transition-all"
                >
                  Открыть карту →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="de-flag-line mb-10">
            <span /><span /><span />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="font-display text-3xl font-bold tracking-widest uppercase mb-2">
                <span className="text-white">DEUTSCH</span>
                <span className="text-gold">LAND</span>
              </div>
              <p className="font-body text-sm text-white/30">
                Туристический гид по Германии — культура, история, автомобили
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="font-body text-xs text-white/40 hover:text-gold transition-colors uppercase tracking-wider"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4">
            <p className="font-body text-xs text-white/20">
              © 2024 Deutschland Guide. Туристический информационный портал.
            </p>
            <p className="font-body text-xs text-white/20">
              🇩🇪 Германия · Европа · Мир
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

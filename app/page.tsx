import HomeSections from "./components/home/HomeSections";
import MobileMenu from "./components/MobileMenu";
import { FLAG_ICONS } from "./lib/flag-icons";

const navItems = [
  { label: "О нас", href: "#top" },
  { label: "Локации", href: "#locations" },
  { label: "Новости", href: "#news" },
  { label: "Стоимость услуг", href: "#calculator" },
  { label: "Предложения и замечания", href: "#footer" },
  { label: "Сотрудничество", href: "#footer" },
];

const tariffs = [
  { code: "ru", flag: FLAG_ICONS.ru, to: "В Россию", price: "ОТ 10 $/КГ", plan: "эконом" },
  { code: "ru", flag: FLAG_ICONS.ru, to: "В Россию", price: "ОТ 12 $/КГ", plan: "стандарт" },
  { code: "by", flag: FLAG_ICONS.by, to: "В Беларусь", price: "ОТ 12 $/КГ" },
  { code: "kz", flag: FLAG_ICONS.kz, to: "В Казахстан", price: "ОТ 12 $/КГ" },
  { code: "am", flag: FLAG_ICONS.am, to: "В Армению", price: "ОТ 12 $/КГ" },
  { code: "kg", flag: FLAG_ICONS.kg, to: "В Кыргызстан", price: "ОТ 12 $/КГ" },
  { code: "uz", flag: FLAG_ICONS.uz, to: "В Узбекистан", price: "ОТ 12 $/КГ" },
];

function ChevronIcon() {
  return (
    <img className="chevron-icon" src="/assets/icons/ui/chevron-down.svg" alt="" width="24" height="24" />
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="EGLSHIP — на главную">
          <img src="/assets/figma/logo.webp" alt="EGLSHIP" width="223" height="70" />
        </a>

        <nav className="desktop-nav" aria-label="Основная навигация">
          {navItems.map((item) => (
            <a href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
        </nav>

        <nav className="compact-nav" aria-label="Основная навигация">
          <a href="#locations">Локации</a>
          <a href="#calculator">Стоимость услуг</a>
          <details>
            <summary>Еще <ChevronIcon /></summary>
            <div>
              <a href="#top">О нас</a>
              <a href="#footer">Предложения и замечания</a>
              <a href="#footer">Сотрудничество</a>
            </div>
          </details>
        </nav>

        <div className="header-actions">
          <details className="language-switcher">
            <summary className="language-summary" aria-label="Выбрать язык">
              <img className="language-flag language-flag-image" src="/assets/icons/ui/russia-flag.svg" alt="" width="20" height="20" />
              <span>Рус</span>
              <ChevronIcon />
            </summary>
            <div className="language-menu">
              <a className="is-active" href="?lang=ru" aria-current="true">
                <img className="language-flag language-flag-image" src="/assets/icons/ui/russia-flag.svg" alt="" width="20" height="20" />
                <span><strong>RU</strong><small>Русский</small></span>
              </a>
              <a href="?lang=en">
                <span className="language-flag language-flag-en" aria-hidden="true" />
                <span><strong>EN</strong><small>English</small></span>
              </a>
            </div>
          </details>
          <a className="track-link" href="#tracking">
            Отследить посылку
          </a>
          <a className="login-link" href="#login">
            <span className="login-text">Войти</span>
            <span className="login-icon" aria-hidden="true">
              <picture>
                <source media="(max-width: 700px)" srcSet="/assets/icons/ui/user-circle.svg" />
                <img src="/assets/icons/ui/logout.svg" alt="" width="24" height="24" />
              </picture>
            </span>
          </a>
          <MobileMenu items={navItems} />
        </div>
      </div>
    </header>
  );
}

function StoreButton({ store }: { store: "apple" | "google" }) {
  const isApple = store === "apple";

  return (
    <a className="store-button" href="#download" aria-label={isApple ? "Загрузить в App Store" : "Доступно в Google Play"}>
      <span className={`store-icon ${isApple ? "store-icon-apple" : "store-icon-google"}`}>
        <img
          src={isApple ? "/assets/icons/ui/apple.svg" : "/assets/icons/ui/google-play.svg"}
          alt=""
          width={isApple ? 40 : 28}
          height={isApple ? 40 : 28}
        />
      </span>
      <span>
        <small>{isApple ? "Загрузите в" : "Доступно в"}</small>
        <strong>{isApple ? "App Store" : "Google Play"}</strong>
      </span>
    </a>
  );
}

function TariffTicker() {
  const duplicatedTariffs = [...tariffs, ...tariffs, ...tariffs, ...tariffs];

  return (
    <div className="tariff-ticker" aria-label="Тарифы доставки по странам">
      <div className="ticker-track">
        {duplicatedTariffs.map((tariff, index) => (
          <article className="tariff-card" key={`${tariff.to}-${tariff.plan ?? "no-plan"}-${index}`} aria-hidden={index >= tariffs.length}>
            <img className="flag" src={tariff.flag} alt="" width="80" height="80" />
            <span className="tariff-copy">
              <small>{tariff.to}</small>
              <strong>{tariff.price}</strong>
              {tariff.plan && <em>{tariff.plan}</em>}
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-visual">
          <div className="hero-background" aria-hidden="true" />
          <div className="hero-shade" aria-hidden="true" />
          <Header />

          <div className="hero-stage">
            <div className="hero-copy">
              <h1 id="hero-title">Надёжная доставка<br />товаров из США</h1>
              <p className="hero-lead">В Россию, Беларусь, Казахстан, Киргизию, Узбекистан и Армению</p>
              <p className="hero-description">
                Покупайте в Apple, Amazon, eBay и 1000+ других магазинов.<br className="desktop-break" />
                Мы возьмём на себя все логистические вопросы.
              </p>

              <form className="tracking-form" id="tracking" action="#tracking">
                <label className="sr-only" htmlFor="tracking-number">Трек-номер отправления</label>
                <div className="tracking-input-wrap">
                  <input id="tracking-number" name="tracking" type="text" placeholder="Введите трек-номер, например, 25267" autoComplete="off" />
                  <span className="mobile-tracking-placeholder" aria-hidden="true">Введите трек-номер</span>
                </div>
                <button type="submit">Отследить посылку</button>
              </form>

              <p className="download-note">Скачайте мобильное приложение для быстрого отслеживания отправлений</p>
              <div className="store-buttons">
                <StoreButton store="apple" />
                <StoreButton store="google" />
              </div>
            </div>

            <div className="eagle-wrap" aria-hidden="true">
              <span className="eagle-glow" />
              <span className="eagle-motion">
                <picture className="eagle-picture">
                  <source media="(max-width: 700px)" srcSet="/assets/images/hero/eagle-mobile.webp" />
                  <img className="eagle" src="/assets/figma/hero-eagle.webp" alt="" width="439" height="671" />
                </picture>
              </span>
            </div>
          </div>
        </div>

        <TariffTicker />
      </section>

      <HomeSections />
    </main>
  );
}

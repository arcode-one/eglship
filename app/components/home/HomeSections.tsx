import ShippingCalculator from "./ShippingCalculator";
import WarehouseSlider from "./WarehouseSlider";
import styles from "./home-sections.module.css";

const A = "/assets/figma/page/exact";
const COMPANY_ASSETS = "/assets/images/company";

const stats = [
  { number: "10+", text: "лет опыта в международной логистике — мы знаем, как быстро и безопасно доставлять ваши посылки", tone: "orange" },
  { number: "100+", text: "тысяч обработанных заказов, быстрая адаптация под любые задачи и минимальные сроки", tone: "orange" },
  { number: "6", suffix: "ШТАТОВ", text: "с нашими пунктами приёма, которые отправляют по 5 тонн товаров в неделю. Сеть складов, профессиональный персонал и логистическая система — всё для вашего удобства", tone: "light" },
  { number: "100%", text: "грузов растаможено без дополнительных затрат и бюрократии — мы берём всё на себя", tone: "light" },
  { number: "100", suffix: "ТОНН", text: "посылок в месяц, с точностью сборки 99,9% — гарантия качества и надёжности", tone: "warm" },
];

const reviewTitles = ["Наконец-то нашёл сервис...", "Заказывала одежду из...", "Прозрачные цены и отл...", "С EGLSHIP всё под контролем:"];
const newsItems = Array.from({ length: 4 }, (_, index) => ({ id: index, date: "20/03/2026", title: "Изменение лимитов беспошлинного ввоза", text: "Небольшой текст в две строки, информация о том, о чём будет эта новость. Текст в 2 строки с многоточием..." }));

function ParcelRail() {
  return <div className={styles.parcelRail} aria-hidden="true"><img src="/assets/images/decor/parcel-divider.webp" alt="" width="3840" height="233" /></div>;
}

function SectionHeading({ children, centered = false }: { children: React.ReactNode; centered?: boolean }) {
  return <h2 className={`${styles.sectionHeading} ${centered ? styles.centered : ""}`}>{children}</h2>;
}

function StoreBadge({ store }: { store: "apple" | "google" }) {
  const apple = store === "apple";
  return <a className={styles.storeBadge} href="#download" aria-label={apple ? "Загрузить в App Store" : "Доступно в Google Play"}><img className={apple ? styles.storeBadgeApple : styles.storeBadgeGoogle} src={apple ? "/assets/icons/ui/apple.svg" : "/assets/icons/ui/google-play.svg"} alt="" width={apple ? 40 : 28} height={apple ? 40 : 28} /><span><small>{apple ? "Загрузите в" : "Доступно в"}</small><strong>{apple ? "App Store" : "Google Play"}</strong></span></a>;
}

function WhyUsSection() {
  return (
    <section className={styles.whySection} id="next" aria-labelledby="why-title">
      <div className={styles.pageContainer}>
        <SectionHeading><span id="why-title">Почему выбирают</span> <em>EGLSHIP</em></SectionHeading>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => <article className={`${styles.statCard} ${styles[`stat${index + 1}`]} ${styles[stat.tone]}`} key={stat.number + index}><span className={styles.cardIndex}>0{index + 1}</span><p className={styles.statNumber}>{stat.number} {stat.suffix && <small>{stat.suffix}</small>}</p><p className={styles.statText}>{stat.text}</p></article>)}
          <span className={styles.whyEagle} aria-hidden="true">
            <img className={styles.whyEagleBase} src="/assets/images/why-us/why-eagle.svg" alt="" width="255" height="312" />
            <img className={styles.whyEagleArm} data-motion="eagle-wing" src="/assets/images/why-us/why-eagle.svg" alt="" width="255" height="312" />
          </span>
          <img className={styles.whyParcels} data-motion="parcel-stack" src="/assets/images/why-us/parcel-stack.svg" alt="" width="252" height="487" />
        </div>
      </div>
      <ParcelRail />
    </section>
  );
}

function CompanySection() {
  return (
    <section className={styles.companySection} id="locations" aria-labelledby="company-title">
      <div className={styles.pageContainer}>
        <div className={styles.companyTitle} id="company-title"><strong>EGLSHIP</strong><span>ВАШ НАДЁЖНЫЙ ПАРТНЁР<br />В ФУЛФИЛМЕНТЕ</span></div>
        <div className={styles.mapPanel}>
          <div className={styles.mapMetrics}>
            <p><strong><span className={styles.desktopValue}>4</span><span className={styles.mobileValue}>3</span></strong><span>СТРАТЕГИЧЕСКИ РАСПОЛОЖЕННЫХ <em>СКЛАДА В США</em></span></p>
            <p><strong><span className={styles.desktopValue}>7</span><span className={styles.mobileValue}>4</span></strong><span><em>ПУНКТОВ ПРИЕМА</em> ТОВАРОВ В США</span></p>
            <p><strong>100 000+</strong><span><em>ЗАКАЗОВ</em> ОБРАБОТАНО С НАШИХ СКЛАДОВ</span></p>
          </div>
          <div className={styles.mapVisual}>
            <img className={styles.usaMap} src={`${A}/map-exact.webp`} alt="Карта пунктов приёма EGLSHIP в США" width="1240" height="760" />
            <span className={styles.mapEagleGlow} aria-hidden="true" />
            <img className={styles.mapEagle} src={`${COMPANY_ASSETS}/map-eagle.svg`} alt="" width="327" height="423" />
            <img className={styles.mapSparkle} src={`${COMPANY_ASSETS}/map-sparkle.svg`} alt="" width="115" height="115" />
            <div className={styles.mapPins} aria-hidden="true">{Array.from({ length: 6 }, (_, index) => <img key={index} src={`${COMPANY_ASSETS}/map-pin.svg`} alt="" width="125" height="188" />)}</div>
            <div className={`${styles.mapInfo} ${styles.mapInfoOne}`}><b>PHILADELPHIA <em>Reception point</em></b><span><img src={`${A}/map-card-icon.svg`} alt="" />6158 Lemona Ave, Van Nuys, CA</span></div>
            <div className={`${styles.mapInfo} ${styles.mapInfoTwo}`}><b>PHILADELPHIA <em>Reception point</em></b><span><img src={`${A}/map-card-icon.svg`} alt="" />6158 Lemona Ave, Van Nuys, CA</span></div>
          </div>
        </div>
        <WarehouseSlider />
      </div>
    </section>
  );
}

function TelegramSection() {
  return (
    <section className={styles.telegramSection} aria-labelledby="telegram-title">
      <SectionHeading centered><span id="telegram-title">Ваш персональный помощник<br />в</span> <em>Telegram</em></SectionHeading>
      <div className={styles.telegramScene}>
        <img className={styles.telegramEagle} src={`${A}/telegram-eagle.webp`} alt="" width="612" height="629" />
        <img className={styles.paperPlane} src={`${A}/telegram-plane.webp`} alt="" width="628" height="182" />
        <div className={`${styles.speech} ${styles.speechOne}`}>Отслеживайте статус<br />посылки в реальном<br />времени</div>
        <div className={`${styles.speech} ${styles.speechTwo}`}>Получайте уведомления<br />о поступлении товара<br />на склад</div>
        <div className={styles.telegramMessages} aria-label="Примеры уведомлений Telegram"><p>Добрый день, ваша посылка готова к оплате<br />Сумма: 123,00 USD <time>4:00pm ✓✓</time></p><p>Добрый день, ваша посылка приехала)<br />Номер посылки 777 <time>8:00pm ✓✓</time></p></div>
        <a className={styles.telegramButton} href="#telegram"><img src={`${A}/telegram-button.svg`} alt="" width="24" height="24" />Перейти в TELEGRAM BOT</a>
      </div>
      <ParcelRail />
    </section>
  );
}

function ReviewsSection() {
  return (
    <section className={styles.reviewsSection} aria-labelledby="reviews-title">
      <div className={styles.pageContainer}>
        <SectionHeading centered><span id="reviews-title">О нас говорят</span> <em>лидеры мнений</em></SectionHeading>
        <div className={styles.reviewsIntro}><strong>СРЕДНЯЯ ОЦЕНКА — 4.87 ИЗ 5.</strong><div><p>За 10+ лет десятки тысяч наших клиентов из России, Беларуси, Казахстана оформили заказ товаров из США и оставили более 10000 отзывов.</p><p>Посмотрите обзоры на наш сервис от популярных блогеров и экспертов в социальных сетях.</p></div></div>
        <div className={styles.reviewGrid}>{reviewTitles.map((title) => <article className={styles.reviewCard} key={title}><img className={styles.reviewImage} src="/assets/images/reviews/review-placeholder.svg" alt="Заглушка видеоотзыва клиента EGLSHIP" width="632" height="1154" /><div className={styles.reviewCopy}><h3>{title}</h3><footer><img src="/assets/images/reviews/avatar-placeholder.svg" alt="" width="48" height="48" /><span><strong>Виктория, Москва</strong><small>Блогер</small></span><time dateTime="2026-02-26">26.02.2026</time></footer></div></article>)}</div>
      </div>
      <ParcelRail />
    </section>
  );
}

function NewsSection() {
  return (
    <section className={styles.newsSection} id="news" aria-labelledby="news-title">
      <div className={styles.pageContainer}>
        <SectionHeading><span id="news-title">Новости</span></SectionHeading>
        <p className={styles.newsLead}>Самая свежая и важная информация о работе склада, сайта, наших партнеров и американских магазинов.</p>
        <div className={styles.newsGrid}>{newsItems.map((item) => <article className={styles.newsCard} key={item.id}><div className={styles.newsText}><time dateTime="2026-03-20">{item.date}</time><h3>{item.title}</h3><p>{item.text}</p></div><a href="#news">Читать</a></article>)}</div>
        <a className={styles.secondaryButton} href="#news">Читать все новости</a>
      </div>
    </section>
  );
}

function ShoppingCta() {
  return <section className={styles.ctaOuter} aria-labelledby="cta-title"><div className={styles.ctaSection}><div className={styles.ctaPanel}><h2 id="cta-title">Готовы к шоппингу в США?</h2><p>Заменить текст. 2 минуты и у вас личный адрес в США и вы можете безопасно получать покупки из американских магазинов: объединяем посылки, оформляем доставку и сопровождаем груз на каждом этапе.</p><a href="#register">Получить адрес в США</a><div className={styles.ctaTrust}><span><img src="/assets/icons/cta/clock.svg" alt="" />2 минуты на регистрацию</span><span><img src="/assets/icons/cta/safety-certificate.svg" alt="" />Без подписок и скрытых платежей</span></div></div></div></section>;
}

function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.footerTop}>
        <div className={styles.contacts}>
          <a href="tel:+19112345677"><i><img src="/assets/icons/footer/contacts/phone.svg" alt="" /></i><strong>US</strong><span>+19112345677</span></a>
          <a href="#telegram"><i><img src="/assets/icons/footer/contacts/telegram.svg" alt="" /></i><span>Telegram</span></a>
          <a href="#instagram"><i><img src="/assets/icons/footer/contacts/instagram.svg" alt="" /></i><span>Instagram</span></a>
          <a href="mailto:info@eglship.com"><i><img src="/assets/icons/footer/contacts/email.svg" alt="" /></i><span>info@eglship.com</span></a>
        </div>
        <div className={styles.questionFormCluster}>
          <img className={styles.footerEagle} src="/assets/images/footer/form-eagle.svg" alt="" width="256" height="348" />
          <form className={styles.questionForm} action="#footer">
            <h2><img src={`${A}/footer-question.svg`} alt="" /><b>ОСТАЛИСЬ ВОПРОСЫ?</b><span>Заинтересовало<br />предложение?</span></h2>
            <p>Получите обратный звонок или сообщение от нашей команды, и мы обсудим ваши потребности в доставке. Напишите нам.</p>
            <div className={styles.formRow}><label>Имя<input name="name" type="text" placeholder="Сергей" /></label><label>Номер телефона<input name="phone" type="tel" placeholder="+7 (911) 234-56-77" /></label></div>
            <label>Email<input name="email" type="email" placeholder="info@eglship.com" /></label>
            <label className={styles.checkbox}><input type="checkbox" defaultChecked /><span>Я соглашаюсь с условиями работы и политикой обработки персональных данных</span></label>
            <label className={styles.checkbox}><input type="checkbox" /><span>Я подтверждаю, что введённая мной информация является точной и была получена мной законным путем</span></label>
            <button type="submit">Отправить запрос</button>
          </form>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <a className={styles.footerBrand} href="#top" aria-label="EGLSHIP — вернуться наверх"><img src="/assets/figma/logo.webp" alt="EGLSHIP" width="223" height="70" /></a>
        <nav aria-label="Навигация в подвале"><a href="#top">О нас</a><a href="#locations">Локации</a><a href="#news">Новости</a><a href="#calculator">Стоимость услуг</a><a href="#footer">Предложения и замечания</a><a href="#footer">Сотрудничество</a></nav>
        <div className={styles.footerApps} id="download"><strong>Скачайте мобильное приложение</strong><p>Загрузите мобильное приложение для более быстрого отслеживания и получения обновлений.</p><div><StoreBadge store="apple" /><StoreBadge store="google" /></div></div>
        <small className={styles.copyright}>© Eglship 2026</small>
        <div className={styles.legal}><a href="#footer">Публичная оферта</a><a href="#footer">Политика конфиденциальности</a><a href="#footer">Правила сервиса</a></div>
      </div>
    </footer>
  );
}

export default function HomeSections() {
  return (
    <>
      <WhyUsSection />
      <CompanySection />
      <ShippingCalculator />
      <TelegramSection />
      <ReviewsSection />
      <NewsSection />
      <ShoppingCta />
      <Footer />
    </>
  );
}

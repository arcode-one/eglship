import Link from "next/link";
import { basePath } from "./lib/site";
import styles from "./not-found.module.css";

function assetUrl(path: string) {
  return `${basePath}${path}`;
}

export default function NotFound() {
  return (
    <main className={styles.page} aria-labelledby="not-found-title">
      <img
        className={styles.background}
        src={assetUrl("/assets/figma/hero-bg.webp")}
        alt=""
        aria-hidden="true"
      />
      <div className={styles.shade} aria-hidden="true" />

      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="EGLSHIP — на главную">
          <img
            src={assetUrl("/assets/figma/logo.webp")}
            alt="EGLSHIP"
            width="223"
            height="70"
          />
        </Link>
        <span className={styles.headerNote}>Надёжная доставка товаров из США</span>
      </header>

      <section className={styles.stage}>
        <div className={styles.card}>
          <p className={styles.code} aria-hidden="true">404</p>
          <h1 id="not-found-title">Эта страница не доехала</h1>
          <p className={styles.description}>
            Возможно, адрес изменился или ссылка устарела. Вернитесь на главную — там всё на месте.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primaryAction} href="/">
              Вернуться на главную
            </Link>
            <Link className={styles.secondaryAction} href="/#tracking">
              Отследить посылку
            </Link>
          </div>
        </div>

        <div className={styles.eagleWrap} aria-hidden="true">
          <span className={styles.eagleGlow} />
          <img
            className={styles.eagle}
            src={assetUrl("/assets/figma/hero-eagle.webp")}
            alt=""
            width="439"
            height="671"
          />
        </div>
      </section>

      <p className={styles.footerNote}>EGLSHIP · доставляем важное</p>
    </main>
  );
}

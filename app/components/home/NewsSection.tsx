"use client";

import { useState } from "react";
import styles from "./home-sections.module.css";

const newsItems = Array.from({ length: 4 }, (_, index) => ({
  id: index,
  date: "20/03/2026",
  title: "Изменение лимитов беспошлинного ввоза",
  text: "Небольшой текст в две строки, информация о том, о чём будет эта новость. Текст в 2 строки с многоточием...",
}));

export default function NewsSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className={styles.newsSection} id="news" aria-labelledby="news-title">
      <div className={styles.pageContainer}>
        <h2 className={styles.sectionHeading} id="news-title">Новости</h2>
        <p className={styles.newsLead}>Самая свежая и важная информация о работе склада, сайта, наших партнеров и американских магазинов.</p>
        <div className={`${styles.newsGrid} ${isExpanded ? styles.newsGridExpanded : ""}`}>
          {newsItems.map((item) => (
            <article className={styles.newsCard} key={item.id}>
              <div className={styles.newsText}>
                <time dateTime="2026-03-20">{item.date}</time>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <a href="#news">Читать</a>
            </article>
          ))}
        </div>
        <button
          className={styles.secondaryButton}
          type="button"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded(true)}
        >
          Читать все новости
        </button>
      </div>
    </section>
  );
}

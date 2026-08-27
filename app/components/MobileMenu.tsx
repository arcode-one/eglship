"use client";

import { useEffect, useRef, useState } from "react";

type NavigationItem = {
  label: string;
  href: string;
};

export default function MobileMenu({ items }: { items: NavigationItem[] }) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const closeMenu = () => setIsOpen(false);
    const handleOutsideInteraction = (event: Event) => {
      if (isOpen && !event.composedPath().includes(menu)) {
        closeMenu();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("pointerdown", handleOutsideInteraction, true);
    document.addEventListener("click", handleOutsideInteraction, true);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", closeMenu, { passive: true });
    window.addEventListener("resize", closeMenu);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideInteraction, true);
      document.removeEventListener("click", handleOutsideInteraction, true);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", closeMenu);
      window.removeEventListener("resize", closeMenu);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <details className="mobile-menu" ref={menuRef} open={isOpen}>
      <summary
        className="menu-button"
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={isOpen}
        onClick={(event) => {
          event.preventDefault();
          setIsOpen((current) => !current);
        }}
      >
        <img src="/assets/icons/ui/mobile-menu.svg" alt="" width="24" height="24" />
      </summary>
      <nav className="mobile-menu-panel" aria-label="Мобильная навигация">
        {items.map((item) => (
          <a href={item.href} key={item.label} onClick={closeMenu}>{item.label}</a>
        ))}

        <div className="mobile-menu-controls">
          <details className="mobile-language-switcher">
            <summary aria-label="Выбрать язык">
              <span>
                <img className="language-flag language-flag-image" src="/assets/icons/ui/russia-flag.svg" alt="" width="20" height="20" />
                Рус
              </span>
              <img className="chevron-icon" src="/assets/icons/ui/chevron-down.svg" alt="" width="20" height="20" />
            </summary>
            <div className="mobile-language-options">
              <a className="is-active" href="?lang=ru" aria-current="true" onClick={closeMenu}>
                <img className="language-flag language-flag-image" src="/assets/icons/ui/russia-flag.svg" alt="" width="20" height="20" />
                Русский
              </a>
              <a href="?lang=en" onClick={closeMenu}>
                <img className="language-flag language-flag-image" src="/assets/icons/ui/english-flag.svg" alt="" width="20" height="20" />
                English
              </a>
            </div>
          </details>
          <a className="mobile-track-link" href="#tracking" onClick={closeMenu}>Отследить посылку</a>
        </div>
      </nav>
    </details>
  );
}

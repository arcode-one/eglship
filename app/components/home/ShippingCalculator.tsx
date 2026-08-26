"use client";

import { useMemo, useState } from "react";
import { FLAG_ICONS } from "../../lib/flag-icons";
import styles from "./home-sections.module.css";

const A = "/assets/figma/page/exact";
const CALCULATOR_ICONS = "/assets/icons/calculator";
const countries = [
  { code: "ru-econom", label: "Россия, эконом", rate: 10, flag: FLAG_ICONS.ru },
  { code: "ru", label: "Россия, стандарт", rate: 12, flag: FLAG_ICONS.ru },
  { code: "by", label: "Беларусь", rate: 12, flag: FLAG_ICONS.by },
  { code: "kz", label: "Казахстан", rate: 12, flag: FLAG_ICONS.kz },
  { code: "am", label: "Армения", rate: 12, flag: FLAG_ICONS.am },
  { code: "kg", label: "Кыргызстан", rate: 12, flag: FLAG_ICONS.kg },
  { code: "uz", label: "Узбекистан", rate: 12, flag: FLAG_ICONS.uz },
];

const benefits = [
  { icon: `${CALCULATOR_ICONS}/benefits/visa-card.svg`, label: "Банковские карты" },
  { icon: `${CALCULATOR_ICONS}/benefits/mastercard.svg`, label: "Платёжные системы" },
  { icon: `${CALCULATOR_ICONS}/benefits/bitcoin.svg`, label: "Криптовалюта" },
  { icon: `${CALCULATOR_ICONS}/benefits/smart-watch.svg`, label: "Быстрые платежи" },
];

const paymentMethods = [
  { icon: `${CALCULATOR_ICONS}/methods/visa.svg`, label: "Visa" },
  { icon: `${CALCULATOR_ICONS}/methods/mastercard.svg`, label: "Mastercard" },
  { icon: `${CALCULATOR_ICONS}/methods/venmo.svg`, label: "Venmo" },
  { icon: `${CALCULATOR_ICONS}/methods/mir.svg`, label: "МИР" },
  { icon: `${CALCULATOR_ICONS}/methods/paypal.svg`, label: "PayPal" },
  { icon: `${CALCULATOR_ICONS}/methods/apple-pay.svg`, label: "Apple Pay" },
  { icon: `${CALCULATOR_ICONS}/methods/google-pay.svg`, label: "Google Pay" },
  { icon: `${CALCULATOR_ICONS}/methods/crypto.svg`, label: "Криптовалюта" },
  { icon: `${CALCULATOR_ICONS}/methods/zelle.svg`, label: "Zelle" },
  { icon: `${CALCULATOR_ICONS}/methods/american-express.svg`, label: "American Express" },
];

function DimensionField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return <label>{label}<span className={styles.dimensionInput}><input value={value} min="1" type="number" onChange={(event) => onChange(Number(event.target.value))} /><span className={styles.dimensionUnit}><b>СМ</b><img src={`${A}/chevron.svg`} alt="" /></span></span></label>;
}

export default function ShippingCalculator() {
  const [country, setCountry] = useState(countries[0]);
  const [weight, setWeight] = useState(12.6);
  const [length, setLength] = useState(74);
  const [width, setWidth] = useState(128);
  const [height, setHeight] = useState(356);

  const price = useMemo(() => {
    const volumeWeight = (length * width * height) / 5000 / 1000;
    return Math.round(Math.max(weight, volumeWeight) * country.rate);
  }, [country, weight, length, width, height]);

  return (
    <section className={styles.calculatorSection} id="calculator" aria-labelledby="calculator-title">
      <div className={styles.calculatorHero}>
        <div className={styles.calculatorInner}>
          <h2 id="calculator-title"><em>Рассчитайте</em> стоимость доставки</h2>
          <div className={styles.calculatorContent}>
            <form className={styles.calculatorForm} onSubmit={(event) => event.preventDefault()}>
              <div className={styles.countryPicker} aria-label="Выберите страну доставки">{countries.map((item) => <button className={item.code === country.code ? styles.countryActive : ""} type="button" key={item.code} onClick={() => setCountry(item)} aria-label={item.label} title={item.label}><img src={item.flag} alt="" width="80" height="80" /><small>{item.code === "ru-econom" ? "эконом" : item.code === "ru" ? "стандарт" : ""}</small></button>)}</div>
              <label>Ваш город<input type="text" placeholder="Например Москва" /></label>
              <label>Вес посылки<span className={styles.weightInput}><input value={weight || ""} min="0.1" step="0.1" type="number" placeholder="00.00" onChange={(event) => setWeight(Number(event.target.value))} /><b>Килограмм</b></span></label>
              <p>Указать габариты посылки (по желанию)</p>
              <div className={styles.dimensionRow}><DimensionField label="Длина" value={length} onChange={setLength} /><DimensionField label="Ширина" value={width} onChange={setWidth} /><DimensionField label="Высота" value={height} onChange={setHeight} /></div>
              <output className={styles.calculatorTotal}><span>СТОИМОСТЬ ДОСТАВКИ:</span><strong>{price} $</strong></output>
            </form>
            <img className={styles.calculatorEagle} src="/assets/images/calculator/calculator-eagle.svg" alt="" width="546" height="683" />
          </div>
        </div>
      </div>
      <div className={styles.paymentSection}>
        <div className={styles.paymentBenefits}>{benefits.map(({ icon, label }) => <span key={icon}><img src={icon} alt="" /><small>{label}</small></span>)}</div>
        <h3><em>Оплачивайте так,</em> как удобно вам</h3>
        <div className={styles.paymentDescriptions}><div><strong>ПЛАТЕЖНЫЕ СИСТЕМЫ</strong><p>Популярные платежные системы всех стран и России</p></div><div><strong>КРИПТОВАЛЮТА</strong><p>Принимаем самые популярные криптовалюты</p></div></div>
        <div className={styles.paymentLogos}>{paymentMethods.map(({ icon, label }) => <span key={icon}><img src={icon} alt={label} /></span>)}</div>
      </div>
      <div className={styles.brandRail} aria-hidden="true">
        <img src="/assets/images/calculator/brand-tape.svg" alt="" width="1920" height="71" />
      </div>
    </section>
  );
}

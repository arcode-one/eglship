"use client";

import { useMemo, useState } from "react";
import { FLAG_ICONS } from "../../lib/flag-icons";
import styles from "./home-sections.module.css";

const CALCULATOR_ICONS = "/assets/icons/calculator";
const DIMENSION_ARROW = `${CALCULATOR_ICONS}/dimension-chevron.svg`;
type DimensionUnit = "cm" | "in";

const dimensionUnits: Array<{ value: DimensionUnit; short: string; countries: string }> = [
  { value: "cm", short: "СМ", countries: "Россия и СНГ" },
  { value: "in", short: "IN", countries: "США" },
];
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

function DimensionField({ label, value, unit, onChange, onUnitChange }: { label: string; value: number; unit: DimensionUnit; onChange: (value: number) => void; onUnitChange: (unit: DimensionUnit) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedUnit = dimensionUnits.find((item) => item.value === unit) ?? dimensionUnits[0];

  return (
    <div className={styles.dimensionField}>
      <span className={styles.dimensionLabel}>{label}</span>
      <span className={styles.dimensionInput}>
        <input aria-label={`${label}, ${selectedUnit.countries}`} value={value} min="1" step="0.1" type="number" onChange={(event) => onChange(Number(event.target.value))} />
        <span className={`${styles.dimensionUnit} ${isOpen ? styles.dimensionUnitOpen : ""}`}>
          <button
            className={styles.dimensionUnitButton}
            type="button"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-label={`Единицы измерения: ${selectedUnit.short}. Выбрать единицы для поля «${label}»`}
            onClick={() => setIsOpen((current) => !current)}
          >
            <b>{selectedUnit.short}</b>
            <img className={styles.dimensionUnitArrow} src={DIMENSION_ARROW} alt="" />
          </button>
          {isOpen && (
            <span className={styles.dimensionUnitMenu} role="listbox" aria-label={`Единицы измерения для поля «${label}»`}>
              {dimensionUnits.map((item) => (
                <button
                  className={item.value === unit ? styles.dimensionUnitOptionActive : ""}
                  type="button"
                  role="option"
                  aria-selected={item.value === unit}
                  key={item.value}
                  onClick={() => {
                    onUnitChange(item.value);
                    setIsOpen(false);
                  }}
                >
                  <b>{item.short}</b>
                  <small>{item.countries}</small>
                </button>
              ))}
            </span>
          )}
        </span>
      </span>
    </div>
  );
}

export default function ShippingCalculator() {
  const [country, setCountry] = useState(countries[0]);
  const [weight, setWeight] = useState<number | "">("");
  const [length, setLength] = useState(74);
  const [width, setWidth] = useState(128);
  const [height, setHeight] = useState(356);
  const [dimensionUnit, setDimensionUnit] = useState<DimensionUnit>("cm");

  const changeDimensionUnit = (nextUnit: DimensionUnit) => {
    if (nextUnit === dimensionUnit) return;

    const factor = nextUnit === "in" ? 1 / 2.54 : 2.54;
    const convert = (value: number) => {
      const converted = value * factor;
      const nearestInteger = Math.round(converted);
      return nextUnit === "cm" && Math.abs(converted - nearestInteger) <= 0.15
        ? nearestInteger
        : Math.round(converted * 10) / 10;
    };
    setLength((value) => convert(value));
    setWidth((value) => convert(value));
    setHeight((value) => convert(value));
    setDimensionUnit(nextUnit);
  };

  const price = useMemo(() => {
    const actualWeight = weight === "" ? 12.6 : weight;
    const unitFactor = dimensionUnit === "in" ? 2.54 : 1;
    const volumeWeight = (length * unitFactor * width * unitFactor * height * unitFactor) / 5000 / 1000;
    return Math.round(Math.max(actualWeight, volumeWeight) * country.rate);
  }, [country, weight, length, width, height, dimensionUnit]);

  return (
    <section className={styles.calculatorSection} id="calculator" aria-labelledby="calculator-title">
      <div className={styles.calculatorHero}>
        <div className={styles.calculatorInner}>
          <h2 id="calculator-title"><em>Рассчитайте</em> стоимость доставки</h2>
          <div className={styles.calculatorContent}>
            <form className={styles.calculatorForm} onSubmit={(event) => event.preventDefault()}>
              <div className={styles.calculatorMain}>
                <div className={styles.countryPicker} aria-label="Выберите страну доставки">
                  {countries.map((item) => (
                    <button
                      className={item.code === country.code ? styles.countryActive : ""}
                      type="button"
                      key={item.code}
                      onClick={() => setCountry(item)}
                      aria-label={item.label}
                      aria-pressed={item.code === country.code}
                      title={item.label}
                    >
                      <img src={item.flag} alt="" width="80" height="80" />
                      {item.code === "ru-econom" && <small>*эконом</small>}
                      {item.code === "ru" && <small>*стандарт</small>}
                    </button>
                  ))}
                </div>
                <div className={styles.calculatorFields}>
                  <label>Ваш город<input type="text" placeholder="Например Москва" /></label>
                  <label>Вес посылки<span className={styles.weightInput}><input value={weight} min="0.1" step="0.1" type="number" placeholder="00.00" onChange={(event) => setWeight(event.target.value === "" ? "" : Number(event.target.value))} /><b>Килограмм</b></span></label>
                  <div className={styles.calculatorDimensions}>
                    <p>Указать габариты посылки (по желанию)</p>
                    <div className={styles.dimensionRow}>
                      <DimensionField label="Длина" value={length} unit={dimensionUnit} onChange={setLength} onUnitChange={changeDimensionUnit} />
                      <DimensionField label="Ширина" value={width} unit={dimensionUnit} onChange={setWidth} onUnitChange={changeDimensionUnit} />
                      <DimensionField label="Высота" value={height} unit={dimensionUnit} onChange={setHeight} onUnitChange={changeDimensionUnit} />
                    </div>
                  </div>
                </div>
              </div>
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

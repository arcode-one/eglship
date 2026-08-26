"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import styles from "./home-sections.module.css";

const warehouses = [
  "/assets/images/company/warehouse-1.webp",
  "/assets/images/company/warehouse-2.webp",
  "/assets/images/company/warehouse-3.webp",
  "/assets/images/company/warehouse-1.webp",
];

export default function WarehouseSlider() {
  const pointerId = useRef<number | null>(null);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const velocity = useRef(0);
  const momentumFrame = useRef<number | null>(null);

  const stopMomentum = () => {
    if (momentumFrame.current === null) return;
    cancelAnimationFrame(momentumFrame.current);
    momentumFrame.current = null;
  };

  useEffect(() => stopMomentum, []);

  const finishDrag = (event: PointerEvent<HTMLDivElement>, withMomentum = true) => {
    if (pointerId.current !== event.pointerId) return;

    const slider = event.currentTarget;

    if (slider.hasPointerCapture(event.pointerId)) {
      slider.releasePointerCapture(event.pointerId);
    }

    pointerId.current = null;

    const momentum = withMomentum ? velocity.current * 8 : 0;
    let speed = Math.max(-18, Math.min(18, momentum));
    const glide = () => {
      if (Math.abs(speed) < 0.35) {
        slider.classList.remove(styles.warehouseGridDragging);
        momentumFrame.current = null;
        return;
      }

      const previousScrollLeft = slider.scrollLeft;
      slider.scrollLeft += speed;
      speed *= 0.88;

      if (slider.scrollLeft === previousScrollLeft) speed = 0;
      momentumFrame.current = requestAnimationFrame(glide);
    };

    if (Math.abs(speed) >= 0.35) {
      momentumFrame.current = requestAnimationFrame(glide);
    } else {
      slider.classList.remove(styles.warehouseGridDragging);
    }
  };

  return (
    <div
      className={styles.warehouseGrid}
      role="region"
      aria-label="Фотографии складов EGLSHIP"
      onPointerDown={(event) => {
        if (event.pointerType !== "mouse" || event.button !== 0) return;

        stopMomentum();
        pointerId.current = event.pointerId;
        lastX.current = event.clientX;
        lastTime.current = performance.now();
        velocity.current = 0;
        event.currentTarget.setPointerCapture(event.pointerId);
        event.currentTarget.classList.add(styles.warehouseGridDragging);
      }}
      onPointerMove={(event) => {
        if (pointerId.current !== event.pointerId) return;

        const now = performance.now();
        const deltaX = event.clientX - lastX.current;
        const elapsed = Math.max(now - lastTime.current, 8);
        const instantVelocity = -deltaX / elapsed;

        event.currentTarget.scrollLeft -= deltaX;
        velocity.current = velocity.current * 0.58 + instantVelocity * 0.42;
        lastX.current = event.clientX;
        lastTime.current = now;
      }}
      onPointerUp={finishDrag}
      onPointerCancel={(event) => finishDrag(event, false)}
    >
      {warehouses.map((image, index) => (
        <article className={styles.warehouseCard} key={`${image}-${index}`}>
          <img src={image} alt={`Склад EGLSHIP ${index + 1}`} width="1088" height="796" draggable={false} />
          <div>
            <h3>Название, адрес</h3>
            <p>Небольшой текст в две строки, информация о том, о чем будет эта новость. Текст в 2 строки с многоточием</p>
          </div>
        </article>
      ))}
    </div>
  );
}

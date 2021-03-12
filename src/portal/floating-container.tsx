import React, { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { getScrollbarWidth } from "utils";
import { PORTAL_CONTAINER_ID } from "./portal-container";
import styles from "./styles.scss";
import { getContainerStyles } from "./utils";

/** Пропы для  FloatingContainer. */
export interface FloatingContainerProps {
  /**
   * Колбэк, который будет вызван при клике вне контейнера.
   */
  onClickOutside: () => void;

  /** Элемент, к которому цепляется контейнер. */
  anchorEl: HTMLDivElement;
}

/**
 * Висящий контейнер.
 *
 * @description Размещает переданные дочерние элементы в портал-контейнере (вне основного дерева) с максимальным z-index.
 */
export const FloatingContainer: React.FC<FloatingContainerProps> = ({
  children,
  onClickOutside,
  anchorEl,
}) => {
  const portalContainer = document.getElementById(PORTAL_CONTAINER_ID);

  if (!portalContainer) {
    return null;
  }

  useEffect(() => {
    // Симуляция события onClickOutside
    // Любое событие "click", которое дошло до document и не было перехвачено и прервано, вызывает колбэк `onClickOutside`
    document.addEventListener("click", onClickOutside);

    // При монтировании висящего контейнера запрещаем скролл и задаем паддинг в ширину скроллбара,
    // чтобы не дергался контент при удалении скроллбара.
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${getScrollbarWidth()}px`;

    // Удаляем слушатели при размонтировании
    return () => {
      document.removeEventListener("click", onClickOutside);

      // Возвращаем начальные параметры body
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "unset";
    };
  }, []);

  const handleContainerClick = useCallback((e: React.SyntheticEvent) => {
    // Клик внутри контейнера дропдауна не должен его закрывать.
    // Останавливаем всплытие события, чтобы оно не дошло до document и не вызвал onClickOutside.
    e.stopPropagation();
  }, []);

  return ReactDOM.createPortal(
    <div
      style={getContainerStyles(anchorEl)}
      className={styles.floatingContainer}
      onClick={handleContainerClick}
    >
      {children}
    </div>,
    portalContainer
  );
};

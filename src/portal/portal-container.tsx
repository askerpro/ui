import React from "react";
import styles from "./styles.scss";

export const PORTAL_CONTAINER_ID = "portal-container";

/**
 * Размещает DOM-узел для портала и применяет необходимые стили к нему.
 *
 * @description Этот компонент должен быть размещен рядом с корневым компонентом приложения.
 * 
 * @example
 * <>
 *  <PortalContainer />
 *  <App />
 * </>
 */
export const PortalContainer: React.FC = () => (
  <div className={styles.container} id={PORTAL_CONTAINER_ID} />
);

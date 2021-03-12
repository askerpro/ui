import React, { useContext } from "react";
import { DropMenuContext } from "./context";
import styles from "./styles.scss";

/** Пропы для MenuItem. */
export interface IMenuItemProps {
  /** Иконка, которая будет добавлена в конец элемента. */
  icon?: React.ComponentType<React.SVGAttributes<HTMLOrSVGElement>>;
}

/** Элемент списка для DropMenu. */
export const MenuItem: React.FC<IMenuItemProps> = ({
  children,
  icon: Icon,
}) => {
  const { onItemClick } = useContext(DropMenuContext);
  return (
    <li onClick={onItemClick} className={styles.menuItem}>
      {children}
      {Icon && <Icon className={styles.icon} />}
    </li>
  );
};

MenuItem.displayName = "MenuItem";

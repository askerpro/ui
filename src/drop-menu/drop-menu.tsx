import React, { useState, useCallback, useRef } from "react";
import { FloatingContainer } from "portal";
import { DropMenuContext } from "./context";
import { IMenuItemProps, MenuItem } from "./menu-item";
import styles from "./styles.scss";
import { isTouchDevice } from "utils";

/** Пропы для DropMenu */
export interface DropMenuProps {
  /** Элемент, к которому привязываем меню. */
  trigger: React.ReactNode;
}

/**
 * Выпадающее меню.
 */
export const DropMenu: React.FC<DropMenuProps> = ({ children, trigger }) => {
  // Текущее состояние открытости выпадающего списка.
  const [isOpen, setIsOpen] = useState(false);

  // Реф на элемент, который содержит триггер. К этому элементу мы цепляем висящий контейнер.
  const anchorRef = useRef<HTMLDivElement>(null);

  // Проверяем все ли дочерние элементы являются инстансами MenuItem
  const childrenArray = React.Children.toArray(children).map((child) => {
    if ((child as React.ReactElement).type !== MenuItem) {
      throw new Error("Only MenuItem is allowed as DropMenu children");
    }

    return child as React.ReactElement<IMenuItemProps>;
  });

  const openMenu = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const switchOpenState = isOpen ? closeMenu : openMenu;

  return (
    <div onMouseLeave={closeMenu}>
      <div
        ref={anchorRef}
        onClick={(e) => {
          // Останавливаем всплытие события, чтобы оно не дошло до document и не вызвал onClickOutside.
          // В идеале эта логика должна быть инкапсулирована внутри FloatingContainer, но из-за особенностей обработки событий React-ом
          // вынести ее туда оказалось проблематично. В рамках какого-нибудь рефактора надо бы попробовать все-таки ее туда запихнуть.
          e.preventDefault();
          switchOpenState();
        }}
        // Не вешаем ховер событие, если текущее устройство с touch экраном. Иначе при клике на элемент
        // сработают оба события onClick и onMouseEnter
        // Не встречался с такими проблемами, скроее всего аналитику для интерфейса требуется доработать, чтобы избавиться от подобных проблем
        // Ну или я дурак :)
        onMouseEnter={isTouchDevice ? undefined : openMenu}
      >
        {trigger}
      </div>
      {isOpen && (
        <FloatingContainer
          anchorEl={anchorRef.current!}
          onClickOutside={closeMenu}
        >
          <DropMenuContext.Provider
            value={{
              onItemClick: closeMenu,
            }}
          >
            <ul className={styles.itemsContainer}>{childrenArray}</ul>
          </DropMenuContext.Provider>
        </FloatingContainer>
      )}
    </div>
  );
};

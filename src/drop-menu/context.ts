import { createContext } from "react";

/** Интерфейс контекста для внутренних нужд DropMenu. */
export interface DropMenuContext {
  /** Колбэк на клик по элементу выпадающего списка */
  onItemClick: () => void;
}

export const DropMenuContext = createContext<DropMenuContext>({
  onItemClick: () => {},
});

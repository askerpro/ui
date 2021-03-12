import React from "react";
import { DropMenu, MenuItem } from "..";
import styles from "./styles.scss";
import { Share2, Edit, Trash2, MoreVertical } from "react-feather";

export default {
  title: "DropMenu",

  parameters: {
    layout: "fullscreen",
  },
};

const DropMenuTemplate = () => (
  <DropMenu
    trigger={
      <button>
        <MoreVertical size="16px" />
      </button>
    }
  >
    <MenuItem icon={Share2}>Поделиться в социальных сетях</MenuItem>
    <MenuItem icon={Edit}>Редактировать страницу</MenuItem>
    <MenuItem icon={Trash2}>Удалить страницу</MenuItem>
  </DropMenu>
);

const DropMenuRow = () => (
  <div className={styles.dropMenuRowContainer}>
    <DropMenuTemplate />
    <DropMenuTemplate />
    <DropMenuTemplate />
  </div>
);

export const Positions = () => {
  return (
    <div className={styles.mainContainer}>
      <DropMenuRow />
      <DropMenuRow />
      <DropMenuRow />
    </div>
  );
};

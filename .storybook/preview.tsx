import React from "react";
import { addDecorator } from "@storybook/react";
import { PortalContainer } from "../src/portal";
import "../src/app.scss"

// Добавляем портал контейнер в DOM
addDecorator((storyFn) => {
  return (
    <>
      <PortalContainer />
      {storyFn()}
    </>
  );
});

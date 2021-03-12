import React from "react";

enum POSITION {
  BOTTOM_RIGHT = "BOTTOM_RIGHT",
  TOP_RIGHT = "TOP_RIGHT",
  BOTTOM_LEFT = "BOTTOM_LEFT",
  TOP_LEFT = "TOP_LEFT",
}

interface Point {
  x: number;
  y: number;
}

/**
 * Считает площадь прямоугольника, ограниченного заданными диагональными точками.
 */
const getSquare = (p1: Point, p2: Point) =>
  Math.abs((p1.x - p2.x) * (p1.y - p2.y));

/**
 * Утилитарный класс, который инкапсулирует некоторую логику для определения позиции размещения контента.
 */
class ContainerPosition {
  anchorPoint: Point;
  windowEdgePoint: Point;
  /**
   * @param {Point} anchorPoint Якорная точка, к которой вешается контейнер.
   * @param {Point} windowEdgePoint Точка на границе экрана, в сторону которой размещается контейнер.
   */
  constructor(anchorPoint: Point, windowEdgePoint: Point) {
    this.anchorPoint = anchorPoint;
    this.windowEdgePoint = windowEdgePoint;
  }

  /**
   * Считает площадь прямоугольника от якорной точки контейнера до границы экрана.
   * Является мерилом количества свободного пространства.
   */
  getArea = () => getSquare(this.anchorPoint, this.windowEdgePoint);

  /** Возвращает стили для размещения контейнера, в зависимости от расположения якорной точки относительно границ экрана. */
  getStyles = () => {
    let styles: React.CSSProperties = {};
    if (this.windowEdgePoint.x > this.anchorPoint.x) {
      styles.left = this.anchorPoint.x;
    } else {
      styles.right = window.innerWidth - this.anchorPoint.x;
    }

    if (this.windowEdgePoint.y > this.anchorPoint.y) {
      styles.top = this.anchorPoint.y;
    } else {
      styles.bottom =
        window.innerHeight - this.anchorPoint.y - window.innerHeight;
    }

    return styles;
  };
}

const initDirections = (
  anchorRect: DOMRect
): Record<POSITION, ContainerPosition> => ({
  [POSITION.BOTTOM_RIGHT]: new ContainerPosition(
    {
      x: anchorRect.x,
      y: anchorRect.y + anchorRect.height,
    },
    {
      x: window.innerWidth,
      y: window.innerHeight,
    }
  ),
  [POSITION.TOP_RIGHT]: new ContainerPosition(
    {
      x: anchorRect.x,
      y: anchorRect.y,
    },
    { x: window.innerWidth, y: 0 }
  ),
  [POSITION.BOTTOM_LEFT]: new ContainerPosition(
    {
      x: anchorRect.x + anchorRect.width,
      y: anchorRect.y + anchorRect.height,
    },
    { x: 0, y: window.innerHeight }
  ),
  [POSITION.TOP_LEFT]: new ContainerPosition(
    {
      x: anchorRect.x + anchorRect.width,
      y: anchorRect.y,
    },
    { x: 0, y: 0 }
  ),
});

/**
 * Возвращает стили для контейнера.
 *
 * @description Определяет позицию для контейнера с максимальным свободным местом и возвращает стили для размещения контейнера в этой области.
 *
 * @param anchorEl - Якорный элемент, к которому цепляется контейнер.
 */
export const getContainerStyles = (anchorEl: HTMLDivElement) => {
  if (!anchorEl) {
    return;
  }

  const directions = initDirections(anchorEl.getBoundingClientRect());

  let maxArea = 0;
  let maxAreaDirection: POSITION | undefined;

  Object.values(POSITION).forEach((direction) => {
    const area = directions[direction].getArea();

    if (area > maxArea) {
      maxArea = area;
      maxAreaDirection = direction;
    }
  });

  if (maxAreaDirection === undefined) {
    throw new Error("Max area direction search error");
  }

  return directions[maxAreaDirection].getStyles();
};

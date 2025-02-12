import { useSize } from 'ahooks';
import { useRef } from 'react';

export function useTableScroll(scrollX: number = 702) {
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  const size = useSize(tableWrapperRef);

  function getTableScrollY() {
    const height = size?.height;

    if (!height) return undefined;

    return height - 300;
  }

  const scrollConfig = {
    x: scrollX,
    y: getTableScrollY(),
  };

  return {
    scrollConfig,
    tableWrapperRef,
  };
}

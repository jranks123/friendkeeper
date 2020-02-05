import { Item } from "../store/items/types";

export const getNewIdNumber = (items: Item[]): number => {
  if (items.length > 0) {
    return (
      items.map(x => x.id).reduce((x, y) => Math.max(x, y)) + 1
    );
  }
  return 1;
};

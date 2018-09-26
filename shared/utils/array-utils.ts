export const swapElements = ([...source]: any[], indexX: number, indexY: number) => source.length > 1
  ? ([source[indexX], source[indexY]] = [source[indexY], source[indexX]], source) : source;

export const moveElement = (source: any[], from: number, to: number) => {
  source.splice(to, 0, source.splice(from, 1)[0]);
  return [ ...source ];
};

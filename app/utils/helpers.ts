// export function getRandomColorListForProjectTags(n: number) {
//    const res: IProjectTagColor[] = [];
//    const tempProjectColors = [...projectTagColors];
//    while (res.length < n) {
//       const mySelectedColorIndex = Math.floor(
//          tempProjectColors.length * Math.random()
//       );
//       res.push(tempProjectColors[mySelectedColorIndex]);
//       tempProjectColors.splice(mySelectedColorIndex, 1);
//    }
//    return res;
// }

export const convertPriceRangeToText = (priceRange: IProjectPriceRange) => {
   return `${priceRange.min} - ${
      priceRange.max === Infinity ? "above" : priceRange.max
   }`;
};

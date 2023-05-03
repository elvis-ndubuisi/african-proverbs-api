import lodash from "lodash";

export function shuffle(array: {}[]) {
  return lodash.shuffle(array);
}

interface Adage {
  adage: string;
  translations?: any;
  interpretation?: string;
  uniqueTo?: string;
}

function shuffleAndRemap(array: Adage[]) {
  // Shuffle the array using the Fisher-Yates algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  // Create a new array of objects with remapped data
  const remappedArray = array.map((obj) => {
    const { adage, interpretation, translations, uniqueTo } = obj;
    const trnasArr = Object.entries(translations);
    return {
      author: "63f9d731c2e0f1370aa14110",
      native: trnasArr.length > 0 ? trnasArr[0][0] : uniqueTo,
      proverb: adage,
      interpretation: interpretation,
      translations:
        trnasArr.length > 0
          ? trnasArr.map((arr) => {
              return {
                dialect: arr[0],
                proverb: arr[1],
              };
            })
          : {},
      country: uniqueTo,
    };
  });

  return remappedArray;
}

export default shuffleAndRemap;

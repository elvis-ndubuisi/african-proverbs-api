import shuffeRemap, { shuffle } from "./shuffleAndRemap.utils";
import fs from "fs";
import { adage, proverbs } from "./data";

// const result = shuffeRemap(adage);

// fs.writeFile("./remapped.json", JSON.stringify(result, null, 2), (err) => {
//   if (err) console.error(err);

//   console.log("finished");
// });

const result = shuffle(proverbs);

fs.writeFile("./proverbs.json", JSON.stringify(result, null, 2), (err) => {
  console.log("finished");
});

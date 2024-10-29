import Names from "./04-names.js";
import sayHi from "./05-utils.js";
import { name, mood } from "./06-alt-flavour.js";

const namesArray = Object.values(Names);
const numNames = namesArray.length;

for (let i = 0; i < numNames; i++) {
  sayHi(namesArray[i]);
  console.log(`${mood[0]}`);
}

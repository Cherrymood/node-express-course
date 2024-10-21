import Names from "./04-names.js";
import sayHi from "./05-utils.js";
import { name, mood } from "./06-alt-flavour.js";

const numNames = 4;
const namesArray = Object.values(Names);

for (let i = 0; i < numNames; i++) {
  sayHi(namesArray[i]);
  console.log(`${mood[0]}`);
}

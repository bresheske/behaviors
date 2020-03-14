import { Apple, Color, Event } from "./entities/apple/model";
import { invoke } from "./entities/apple/apple";

/**
 * main executor just for some test runs.
 */


// scenario where the user just picks red, and
// nothing else.
const apple: Apple = {
    color: Color.Red
};

(async () => {
    const result = await invoke(apple, Event.onSeed);
})();
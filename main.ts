import { Apple, Color, Event, Sweetness } from "./entities/apple/model";
import { invoke } from "./entities/apple/apple";

/**
 * main executor just for some test runs.
 */

(async () => {
    // scenario where the user just picks red, and
    // nothing else.
    let apple: Apple = {
        color: Color.Red
    };
    await invoke(apple, Event.onSeed);
    await invoke(apple, Event.onRipe);
    await invoke(apple, Event.onRotten);
})();
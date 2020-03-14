import { Apple, Sweetness, Event, Color } from "../entities/apple/model";
import { invoke } from "../entities/apple/apple";

describe(`sweet apples`, () => {
    it(`on ripe, a sweet apple turns pink`, async () => {
        const apple: Apple = { sweetness: Sweetness.Sweet };
        await invoke(apple, Event.onRipe);
        expect(apple.color).toBe(Color.Pink);
    });
});
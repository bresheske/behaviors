import { Apple, Sweetness, Event, Color } from "../entities/apple/model";
import { invoke } from "../entities/apple/apple";
import * as sweet from '../entities/apple/behaviors/sweetness/sweet';

describe(`sweet apples`, () => {
    it(`on ripe, a sweet apple turns pink`, async () => {
        const apple: Apple = { sweetness: Sweetness.Sweet };
        await invoke(apple, Event.onRipe);
        expect(apple.color).toBe(Color.Pink);
    });
});
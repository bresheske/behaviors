import { Apple, Sweetness, Color } from "../../model";

/**
 * 'example' business logic for the sweetness. the apple's color
 * turns Pink when a sweet apple turns ripe.
 */
export async function onRipe(apple: Apple): Promise<boolean> {
    if (apple.sweetness !== Sweetness.Sweet)
        return false;

    apple.color = Color.Pink;

    return true;
}
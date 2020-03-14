import { Apple, Color } from "../../model";

/**
 * when an apple is red, we do something special when
 * the apple is created as a seed.
 */
export async function onSeed(apple: Apple): Promise<boolean> {
    if (apple.color !== Color.Red)
        return true;

    console.log(`a red apple was created!!`);
    return true;
}

/**
 * when an apple is red, we also do something special when
 * the apple becomes rotten
 */
export async function onRotten(apple: Apple): Promise<boolean> {
    if (apple.color !== Color.Red)
        return true;

    console.log(`a red apple has rotted.`);
    return true;
}
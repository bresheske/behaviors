import { Apple, Sweetness } from "../../model";

export async function onRipe(apple: Apple): Promise<boolean> {
    if (apple.sweetness !== Sweetness.Sweet)
        return true;

    console.log(`woah I'm a sweet apple!`);
    return true;
}
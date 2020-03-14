import { Apple, Sweetness, Color } from "../../model";

export async function onRipe(apple: Apple): Promise<boolean> {
    if (apple.sweetness !== Sweetness.Sweet)
        return false;

    apple.color = Color.Pink;

    return true;
}
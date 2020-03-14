import { Apple } from "../../model";

export async function onRipe(apple: Apple): Promise<boolean> {
    console.log(`woah I'm a sweet apple!`);
    return true;
}
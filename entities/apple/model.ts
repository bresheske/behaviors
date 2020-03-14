
/**
 * First - all of the enum states.
 */

export enum Color {
    Red = 'Red',
    Green = 'Green',
    Pink = 'Pink',
    Yellow = 'Yellow',
    Orange = 'Orange'
}

export enum Size {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
    ExtraLarge = 'ExtraLarge'
}

export enum Weight {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
    ExtraLarge = 'ExtraLarge'
}

export enum Sweetness {
    Sweet = 'Sweet',
    Moderate = 'Moderate',
    Sour = 'Sour'
}

export enum State {
    Seed = 'Seed',
    Growing = 'Growing',
    PreRipe = 'PreRipe',
    Ripe = 'Ripe',
    Rotten = 'Rotten'
}

export enum Event {
    onSeed = 'onSeed',
    onGrowing = 'onGrowing',
    onPreRipe = 'onPreRipe',
    onRipe = 'onRipe',
    onRotten = 'onRotten'
}

/**
 * Alias of 'behavior', which is a function that executes on an
 * apple and returns true (for success) or false (for failure).
 */
export type Behavior = (apple: Apple) => Promise<boolean>

/**
 * The regular apple model
 */

export interface Apple {
    color?: Color,
    size?: Size,
    weight?: Weight,
    sweetness?: Sweetness,
    currentState?: State
}

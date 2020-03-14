# Behaviors
A small proof-of-concept about behavioral design. 

## Problem Statement
An application with literally infinite scope.  

### Case Study
A particular entity _apple_ has a few 'states' (perhaps 'Seed', 'Growing', 'PreRipe', 'Ripe', 'Rotten', etc), and other 'stateful' types of data (perhaps 'Color', 'Size', 'Weight'). The stateful types of data are configurable based on whatever a user might want. Maybe we have a UI form that allows a user to choose:

Apple Color:

 - Red
 - Green
 - Pink
 - Yellow
 - Orange

Apple Size:

 - Small
 - Medium
 - Large
 - Extra Large

Apple Weight:

 - Small
 - Medium
 - Large
 - Extra Large

Based on what the user decides to create as their new apple, the lifecycle of the apple goes through different behaviors (or blocks of code). 

**Question**: At this point, can we determine what our system supports?

From a testing perspective, perhaps the only way to fully know we're ready for production is if we test all possible permutations of our configurations and send our apples through their lifecycles. 

5 Colors * 4 Sizes * 4 Weights. That's 80 full end-to-end tests for a full apple's lifecycle.  And this is a considerably tiny application with limited scope. 

But now our Product Owner comes in and says "We now need the user to be able to determine sweet and sour apples." So the team determines we need to add another selection to our UI:

Apple Sweetness:

 - Sweet
 - Moderate
 - Sour

Some might think we just added 3 more properties, so perhaps we just need to add 3 more tests. But lets take a step back here. 

5 Colors * 4 Sizes * 4 Weights * 3 Sweetness. We're now up to 240 permutations of data that a user may select, and we, as a development team, need to support. The QA engineers freek out a bit.  They freek out even more knowing the backlog is full of configuration options that still need to be implemented.  Your product owner freeks out even more knowing that he has to work with a team that points a story asking to add 1 field to a UI at an 80. 

## Approach
So perhaps there's a different way to support large amounts of configurability in a system. Perhaps we don't need to support permutations, but rather behaviors. 

The product owner created the 'sweetness' attribute because it affects some logic in the lifecycle.  When the apple changes state (to 'Ripe' perhaps), it might execute some custom logic **_only if_** the sweetness is set to 'sweet'.

So the idea here is to create a set of behaviors we support, rather than needing to test all of the permutations. 

Apples will fire 'events'. These events are currently defined as 'onSeed', 'onGrowing', 'onPreRipe', 'onRipe', and 'onRotten'. Behaviors will execute only if they're subscribed to events. Behaviors are currently defined as 'Color/Red, Color/Green, ...'.  If our testing approach pans out, we only have 16 behaviors to test, rather than 240 permutations. A massive win if we can get away with it.

## Results
Lets start by looking at some sample code. Here's what it took to define a new 'sweet' behavior with some sample business logic.  

### Code Sample & Tests

```typescript
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
```

The code design seems to result in a couple of points:

 - Creating more behaviors from here on out is actually pretty simple.
 - The behaviors defined in instances of entities don't impact each other, and can be modified and tested independently.

Here's how we can test our system as well. Jest was added into the project to execute logic.

```typescript
import { Apple, Sweetness, Event, Color } from "../entities/apple/model";
import { invoke } from "../entities/apple/apple";

describe(`sweet apples`, () => {
    it(`on ripe, a sweet apple turns pink`, async () => {
        const apple: Apple = { sweetness: Sweetness.Sweet };
        await invoke(apple, Event.onRipe);
        expect(apple.color).toBe(Color.Pink);
    });
});
```

A couple of other points:

 - We can test our system from a high-layer of abstraction, allowing us to specifically test acceptance criteria of a story or requirement.
 - This satisfies 100% automation for CI/CD.

### Other Architectural Concerns
There's always other what-if cases to concider when creating a system like this.

#### Behavior Conflicts
Here's the current code of the `apple.ts` file:

```typescript
/**
 * Invokes an action on an apple, and notifies the
 * behaviors that need to listen to these events.
 */
export async function invoke(apple: Apple, event: Event): Promise<boolean> {
    // grab all of our events that subscribe to this event and
    // filter the behaviors to only match the properties of the apple
    const behaviors = behaviorCache
        .filter((f) => !!f[event]);

    // now invoke all of the behaviors
    const results = await Promise.all(behaviors.map((behavior) => (<any>(behavior))[event](apple)));

    // return if the total event was successful or not
    // if we have a single failure, we fail.
    return !results.some(r => !r);
}
```

Notice the `await Promise.all(...)`.  This means that any behavior could finish before another. For example, both 'Red' and 'Sweet' behaviors could invoke at the same time for any event, and there's no telling which one would finish first.

This is a solvable problem though, we could implement a chain a precedence to order the behaviors first, then execute in sequence rather than concurrently.

#### Concurrency
What if two or more behaviors are attempting to modify the state of a single entity at the same time? So this problem isn't specific to our proof of concept. This is a problem that's typically solved by using locks, queues, throttling, or some other mechanism, but this is still a problem with our POC. 

Something I would try would probably be a locking mechanism, as it keeps our invocations synchronous and therefor simple. Queueing is a bit more resilient, but tends to leave calling code or tests 'in the dark' on when business processes actually complete, and adds a ton of complexity into the system.
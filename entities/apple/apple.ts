/**
 * this just sends apples to a new state,
 * and fires events to the behaviors.
 */

import { Apple, Event, Behavior } from './model';
import * as glob from 'glob';
const fs = require('fs');
const path = require('path');

function getBehaviors(event: Event): Behavior[] {
    // fancy little mapping to grab all of the js files
    // in our behaviors folder, require those files into
    // memory, and finally filter out the behaviors that
    // do not subscribe to this specific event.
    return glob
        .sync('**/behaviors/**/*.js')
        .map((f) => path.resolve(f))
        .map((f) => require(f))
        .filter((f) => !!f[event]);
}

/**
 * Invokes an action on an apple, and notifies the
 * behaviors that need to listen to these events.
 */
export async function invoke(apple: Apple, event: Event): Promise<boolean> {
    // grab all of our events that subscribe to this event
    const behaviors = getBehaviors(event);
    console.log(behaviors);

    // now invoke all of the behaviors
    const results = await Promise.all(behaviors.map((behavior) => (<any>(behavior))[event](apple)));

    // return if the total event was successful or not
    // if we have a single failure, we fail.
    return !results.some(r => !r);
}
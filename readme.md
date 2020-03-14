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

### Approach
So perhaps there's a different way to support large amounts of configurability in a system. Perhaps we don't need to support permutations, but rather behaviors. 

The product owner created the 'sweetness' attribute because it affects some logic in the lifecycle.  When the apple changes state (to 'Ripe' perhaps), it might execute some custom logic **_only if_** the sweetness is set to 'sweet'.

So the idea here is to create a set of behaviors we support, rather than needing to test all of the permutations. 

Apples will fire 'events'. These events are currently defined as 'onSeed', 'onGrowing', 'onPreRipe', 'onRipe', and 'onRotten'. Behaviors will execute only if they're subscribed to events. Behaviors are currently defined as 'Color/Red, Color/Green, ...'.  If our testing approach pans out, we only have 16 behaviors to test, rather than 240 permutations. A massive win if we can get away with it.
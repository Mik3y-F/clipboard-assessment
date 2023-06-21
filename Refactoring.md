# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

In the refactored version, I've extracted two helper functions: `getPartitionKey` and `hash`. This makes the main function easier to read and understand since each function now has a specific, clear purpose. `getPartitionKey` determines what the initial candidate for the partition key should be based on the provided event, while `hash` simply hashes its input with `sha3-512`.

This refactor breaks up the complexity and makes the code more maintainable. If we need to change how we get the partition key or how we hash data, we only have to modify those small functions. The flow of `deterministicPartitionKey` is also more straightforward and its structure reflects its purpose more clearly. I used an early return when the candidate is null or undefined to achieve this by getting rid of the nested conditionals.

made the `TRIVIAL_PARTITION_KEY` and `MAX_PARTITION_KEY_LENGTH` global constants (personal preference) this way deterministicPartitionKey is more in line with the Single Responsibility Principle. I also made `candidate` a constant because mutating state can be unsafe

Moved the typechecking logic to getPetitionKeyCandidate because I noticed for a test case where the `partitionKey` was 0 the test was failing. Following the logic from the function given I figured if the partition key returned for 12 is `"12"` then 0 should also be `"0"` this is an assumption that would have to be clarified by the business logic requirements :-  I took it to be a bug in the initial implementation and handled it as seen in the `getPartitionKey` logic

Some of the Type checking logic would have been sorted out in TS easily. (Wasn't sure whether or not to use it so I simply let it be as it is in JS as requested)

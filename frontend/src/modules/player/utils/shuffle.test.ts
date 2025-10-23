import { v4 as uuidv4 } from 'uuid';
import { describe, expect, it } from 'vitest';

import {
  combineUuids,
  getRandomValue,
  shuffleAllButLastItemInArray,
} from './shuffle';

describe('shuffleAllButLastItemInArray', () => {
  // check if the function shuffles all items except the last one with different UUID seeds
  it('shuffles all items except the last one with different uuid seeds', () => {
    // create a sample array
    const inputArray = [1, 2, 3, 4, 5];
    // generate different uuids
    const uuid1 = '550e8400-e29b-41e4-b716-446655440000';
    const uuid2 = '550e8400-e29b-41e4-a716-446655440003';

    // call the function with different UUID seeds
    const shuffledArray1 = shuffleAllButLastItemInArray(inputArray, uuid1);
    const shuffledArray2 = shuffleAllButLastItemInArray(inputArray, uuid2);

    expect(shuffledArray1[inputArray.length - 1]).to.equal(
      inputArray[inputArray.length - 1],
    );
    expect(shuffledArray2[inputArray.length - 1]).to.equal(
      inputArray[inputArray.length - 1],
    );
    expect(shuffledArray1).to.not.deep.equal(shuffledArray2);
  });

  // MARK: commenting out temporarily as test should be deterministic
  // it('should produce all possible orderings with uniform distribution', () => {
  //   // only testing short arrays, as otherwise distribution is too sparse
  //   // (actual number of items shuffled is one fewer than this, as we keep the last item fixed).
  //   const arrayLength = 4;
  //   const originalArray = Array.from(
  //     { length: arrayLength },
  //     (_, index) => index,
  //   );
  //
  //   // improvement: only test few participants, to be realistic
  //   const numIterations = 10000;
  //   const permutationCounts: Record<string, number> = {};
  //
  //   for (let i = 0; i < numIterations; i += 1) {
  //     const seed = uuidv4();
  //     const shuffled = shuffleAllButLastItemInArray([...originalArray], seed);
  //     // ignore the last element
  //     const key = shuffled.slice(0, -1).join(',');
  //
  //     if (permutationCounts[key]) {
  //       permutationCounts[key] += 1;
  //     } else {
  //       permutationCounts[key] = 1;
  //     }
  //   }
  //
  //   const permutations = Object.keys(permutationCounts);
  //   // remove one because we are not counting the last element, which is always the same
  //   const expectedPermutationsCount = factorial(arrayLength - 1);
  //
  //   // check if all permutations were generated
  //   expect(permutations.length).to.equal(expectedPermutationsCount);
  //
  //   // check for uniform distribution
  //   const averageCount = numIterations / expectedPermutationsCount;
  //   // 5% tolerance
  //   const tolerance = 0.05;
  //   permutations.forEach((perm) => {
  //     const count = permutationCounts[perm];
  //     expect(count).to.be.closeTo(averageCount, averageCount * tolerance);
  //   });
  // });

  // check if the function shuffles all items except the last one with the same UUID seed
  it('shuffles all items except the last one with the same uuid seed', () => {
    // create a sample array
    const inputArray = [1, 2, 3, 4, 5];
    // generate one uuid
    const seed = uuidv4();

    // call the function with the same uuid seed multiple times
    const shuffledArray1 = shuffleAllButLastItemInArray(inputArray, seed);
    const shuffledArray2 = shuffleAllButLastItemInArray(inputArray, seed);

    expect(shuffledArray1[inputArray.length - 1]).to.equal(
      inputArray[inputArray.length - 1],
    );
    expect(shuffledArray2[inputArray.length - 1]).to.equal(
      inputArray[inputArray.length - 1],
    );
    expect(shuffledArray1).to.deep.equal(shuffledArray2);
  });

  // check if the function handles arrays with one element
  it('handles arrays with only one element', () => {
    const inputArray = [1];
    const seed = uuidv4();
    const shuffledArray = shuffleAllButLastItemInArray(inputArray, seed);
    expect(shuffledArray).to.deep.equal(inputArray);
  });

  // check if the function handles empty arrays
  it('handles empty arrays', () => {
    // empty array
    const inputArray: number[] = [];
    const seed = uuidv4();
    const shuffledArray = shuffleAllButLastItemInArray(inputArray, seed);

    // assert that the array remains empty
    expect(shuffledArray).to.deep.equal(inputArray);
  });
});

describe('getRandomValue', () => {
  it('should return a number', () => {
    const result = getRandomValue('seed', 100);
    expect(result).to.be.a('number');
  });

  it('should always return a positive number or zero', () => {
    const result = getRandomValue('negative test', 100);
    expect(result).to.be.at.least(0);
  });

  it('should return a value less than the maximum value', () => {
    const max = 50;
    const result = getRandomValue('max test', max);
    expect(result).to.be.lessThan(max);
  });

  it('should return consistent results for the same seed and max', () => {
    const seed = 'consistent';
    const max = 100;
    const firstCall = getRandomValue(seed, max);
    const secondCall = getRandomValue(seed, max);
    expect(firstCall).to.equal(secondCall);
  });

  it('should return consistent results for the same uuid and max', () => {
    const seed = uuidv4();
    const max = 100;
    const firstCall = getRandomValue(seed, max);
    const secondCall = getRandomValue(seed, max);
    expect(firstCall).to.equal(secondCall);
  });

  it('should return different results for different seeds', () => {
    const seed1 = 'seed1';
    const seed2 = 'seed2';
    const max = 100;
    const result1 = getRandomValue(seed1, max);
    const result2 = getRandomValue(seed2, max);
    expect(result1).not.to.equal(result2);
  });

  it('should return different results for different uuids', () => {
    const uuid1 = '550e8400-e29b-41d4-a716-446655440000';
    const uuid2 = '550e8400-e29b-41d4-a716-446655440001';
    const max = 100;
    const result1 = getRandomValue(uuid1, max);
    const result2 = getRandomValue(uuid2, max);
    expect(result1).not.to.equal(result2);
  });

  it('should handle the maximum integer size', () => {
    const result = getRandomValue('big number', Number.MAX_SAFE_INTEGER);
    expect(result).to.be.a('number');
    expect(result).to.be.at.least(0).and.to.be.below(Number.MAX_SAFE_INTEGER);
  });

  it('should return 0 when max is 1', () => {
    const result = getRandomValue('any seed', 1);
    expect(result).to.equal(0);
  });

  it('behaves predictably when max is 0', () => {
    expect(getRandomValue('error case', 0)).to.equal(0);
  });

  it('should produce all possible outputs with uniform distribution', () => {
    // only testing low numbers
    const arrayLength = 10;

    const numIterations = 1000000;
    const counts: Record<string, number> = {};

    for (let i = 0; i < numIterations; i += 1) {
      const seed = uuidv4();
      const shuffled = getRandomValue(seed, arrayLength);

      if (counts[shuffled]) {
        counts[shuffled] += 1;
      } else {
        counts[shuffled] = 1;
      }
    }

    const keys = Object.keys(counts);

    // check if all permutations were generated
    expect(keys.length).to.equal(arrayLength);

    // check for uniform distribution
    const averageCount = numIterations / arrayLength;
    // 5% tolerance
    const tolerance = 0.05;
    keys.forEach((n) => {
      const count = counts[n];
      expect(count).to.be.closeTo(averageCount, averageCount * tolerance);
    });
  });
});

describe('combineUuids', () => {
  it('should combine two uuids to produce a consistent third uuid', () => {
    // Arrange
    const uuid1 = 'c72a79d3-2f2b-47f0-8f3b-872e2c36c26e';
    const uuid2 = 'd163a18d-517e-4a0f-a9c8-c92e3b2e3b92';
    // manually calculated
    const expectedUuid = 'd2292b4e-fdc8-5f98-a953-9d09c48746fe';

    // Act
    const result = combineUuids(uuid1, uuid2);

    // Assert
    expect(result).to.equal(expectedUuid);
  });

  it('should return a string', () => {
    // Arrange
    const uuid1 = 'c72a79d3-2f2b-47f0-8f3b-872e2c36c26e';
    const uuid2 = 'd163a18d-517e-4a0f-a9c8-c92e3b2e3b92';

    // Act
    const result = combineUuids(uuid1, uuid2);

    // Assert
    expect(result).to.be.a('string');
  });
});

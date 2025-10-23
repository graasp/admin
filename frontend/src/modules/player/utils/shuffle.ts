import { v5 as uuidv5 } from 'uuid';

export function getRandomValue(seed: string, max: number): number {
  if (max === 0) {
    return 0;
  }

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = hash * 31 + seed.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  // max is never attained
  return Math.abs(hash) % max;
}

export function shuffleArray<T>(array: T[], seed: string = ''): T[] {
  // make a copy of the original array
  const shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // max is i + 1 as getRandomValue does modulo over the max to get an answer in the range of the array indexes
    const j = getRandomValue(seed, i + 1);
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export function shuffleAllButLastItemInArray<T>(
  array: T[],
  seed: string = '',
): T[] {
  if (!array?.length || array.length === 1) {
    return array;
  }

  const allButLast = array.slice(0, array.length - 1);
  const lastElement = array[array.length - 1];
  return [...shuffleArray(allButLast, seed), lastElement];
}

export function factorial(n: number): number {
  return n ? n * factorial(n - 1) : 1;
}

export function combineUuids(uuid1: string, uuid2?: string): string {
  const combinedUUID = uuid1 + uuid2;
  // use v5 UUID with URL namespace
  return uuidv5(combinedUUID, uuidv5.URL);
}

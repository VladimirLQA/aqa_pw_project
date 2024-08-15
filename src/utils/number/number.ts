export const getRandomObjectValue =
  <T extends Record<string, string>>(
    object: T, random = Math.random,
  ) => {
    const values = Object.values(object);
    const randomIdx = Math.floor(random() * values.length);
    return values[randomIdx];
  };

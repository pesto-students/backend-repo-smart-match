/**
 * Create an object composed of the picked object properties
 * @param object - The source object
 * @param keys - The keys to pick from the source object
 * @returns An object composed of the picked properties
 */
const Pick = <T extends object, K extends keyof T>(object: T, keys: K[]): Partial<T> => {
  return keys.reduce((obj: Partial<T>, key: K) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {} as Partial<T>);
};

export default Pick;
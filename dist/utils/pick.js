/**
 * Create an object composed of the picked object properties
 * @param object - The source object
 * @param keys - The keys to pick from the source object
 * @returns An object composed of the picked properties
 */
const Pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            // eslint-disable-next-line no-param-reassign
            obj[key] = object[key];
        }
        return obj;
    }, {});
};
export default Pick;
//# sourceMappingURL=Pick.js.map
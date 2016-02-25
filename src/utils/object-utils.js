export default {
  contains(obj, properties) {
    return properties.every(property => {
      return obj.hasOwnProperty(property);
    });
  },

  notContains(obj, properties) {
    return properties.every(property => {
      return !obj.hasOwnProperty(property);
    });
  },

  containsAtLeastOne(obj, properties) {
    return properties.some(property => {
      return obj.hasOwnProperty(property);
    });
  }
}

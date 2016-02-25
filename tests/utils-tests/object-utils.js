import objectUtils from '../../src/utils/object-utils';

describe('Object utils tests', () => {
  const obj = {
    x: 1,
    y: 2,
    z: 3
  };

  describe('contains', () => {
    it('should return true', () => {
      const result = objectUtils.contains(obj, ['x', 'y', 'z']);

      expect(result).to.be.true;
    });

    it('should return false', () => {
      const result = objectUtils.contains(obj, ['x', 'y', 'z', 'c']);

      expect(result).to.be.false;
    });
  });

  describe('notContains', () => {
    it('should return true', () => {
      const result = objectUtils.notContains(obj, ['a', 'b', 'c']);

      expect(result).to.be.true;
    });

    it('should return false', () => {
      const result = objectUtils.notContains(obj, ['x', 'b', 'c']);

      expect(result).to.be.false;
    });
  });

  describe('containsAtLeastOne', () => {
    it('should return true', () => {
      const result = objectUtils.containsAtLeastOne(obj, ['a', 'b', 'x']);

      expect(result).to.be.true;
    });

    it('should return false', () => {
      const result = objectUtils.containsAtLeastOne(obj, ['a', 'b', 'c']);

      expect(result).to.be.false;
    });
  });
});

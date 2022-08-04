import { stringify } from './stringify';


describe('stringify', () => {
  describe('primitives', () => {
    it('should stringify string properties', () => {
      const str = stringify({
        foo: 'bar'
      });

      expect(str).toBe('{\n\t"foo": "bar"\n}\n');
    });

    it('should stringify number properties', () => {
      const str = stringify({
        foo: 1234
      });

      expect(str).toBe('{\n\t"foo": 1234\n}\n');
    });

    it('should stringify boolean properties', () => {
      const str = stringify({
        foo: true
      });

      expect(str).toBe('{\n\t"foo": true\n}\n');
    });
  });

  it('should strip undefined properties', () => {
    const str = stringify({
      foo: true,
      bar: undefined
    });

    expect(str).toBe('{\n\t"foo": true\n}\n');
  });

  it('should add commas if there comes a property afterwards', () => {
    const str = stringify({
      foo: 1,
      bar: 2
    });

    expect(str).toBe('{\n\t"foo": 1,\n\t"bar": 2\n}\n');
  });

  it('should add trailing comma', () => {
    const str = stringify({
      foo: 'bar'
    });

    expect(str).toBe('{\n\t"foo": "bar"\n}\n');
  });

  it('should stringify an empty object', () => {
    expect(stringify({})).toBe('{}\n');
  });

  it('should stringify an empty array', () => {
    expect(stringify([])).toBe('[]\n');
  });
});
import { stringify } from './stringify';


describe('stringify', () => {
  describe('when stringifying primitive properties', () => {
    it('should stringify strings', () => {
      const str = stringify({
        foo: 'bar'
      });

      expect(str).toBe('{\n\t"foo": "bar"\n}\n');
    });

    it('should escape backspace characters inside of strings', () => {
      const str = stringify({
        path: 'C:\\a\\b\\c'
      });

      expect(str).toBe('{\n\t"path": "C:\\\\a\\\\b\\\\c"\n}\n');
    });

    it('should stringify numbers', () => {
      const str = stringify({
        foo: 1234
      });

      expect(str).toBe('{\n\t"foo": 1234\n}\n');
    });

    it('should stringify booleans', () => {
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

  it('should not add trailing commas', () => {
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
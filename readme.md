Alternative to built-in `JSON.stringify()`.

The built-in `JSON.stringify()` output is too compact to be properly readable for humans while
its pretty-mode is too verbose for data sets that contains larger arrays or nested objects.

This library produces a compact format that remains readable by humans. It does this by 
chopping down blocks (arrays, lists) that only contain primitive values.

For example:

```ts
stringify({
  a: 1,
  b: 2,
  c: [
    { 
      a: 1, 
      b: 2 
    },
    { 
      a: 1, 
      b: 2
    }
  ],
  d: {
    a: { 
      a: 1, 
      b: 2 
    },
    b: { 
      a: 1,
      b: 2,
      c: {
        a: 1,
        b: 2 
      }
    }
  }
});
```

Will produce this output:

```json
{
  "a": 1,
  "b": 2,
  "c": [
    { "a": 1, "b": 2 },
    { "a": 1, "b": 2 }
  ],
  "d": {
    "a": { "a": 1, "b": 2 },
    "b": { 
      "a": 1, 
      "b": 2,
      "c": { "a": 1, "b": 2 }
    }
  }
}
```


Alternative to built-in `JSON.stringify()`.

The built-in method is either too compact to be readable by humans or too verbose to
be practical. This produces a more compact pretty-print format that remains readable
while not blowing up the size of the resulting JSON string. It does this by chopping
down blocks (arrays, lists) that only contain primitive values.

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


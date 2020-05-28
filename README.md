# bl-id-generator

## Unique ID

The id is composed of 12 random characters from an array of 62 (a-z,
A-Z and 0-9). This gives an extremly low probability of creating two
equals. If you have already created 1 million unique IDs the chance
of creating one whitch is equal is: `3 in 100 quadrillion.`

The IDs will look like:

```text
2wkO7CoKbtHH
2ufzrNLHLkl5
u8W1aiUnitEp
```

## Simple to use

```typescript
import { generator, barcode } from "bl-id-generator";

const id = generator.generate(); // returns one unique ID
const ids = generate.generate(100); // returns an array of 100 unique IDS
```

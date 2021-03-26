# measure.js
[![Node.js Package](https://github.com/pablo-mayrgundter/measure.js/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/pablo-mayrgundter/measure.js/actions/workflows/npm-publish.yml)

Utility for working with measurements in common units and magnitudes.

Units: meter, gram, second, ampere, kelvin, candela, mole

Magnitudes: Yotta (10^24) - Yocto (10^-24)

Example usage:
```javascript
import Measure from './measure.js';

const m1 = Measure.parse('1000m');
const m2 = Measure.parse('1km');
m1.equals(m2); // true
const m3 = new Measure(1, Measure.Magnitude.KILO, Measure.Unit.METER);
m3.equals(m2); // true
```

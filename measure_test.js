import Testing from './lib/testing.js/testing.mjs';
import Magnitude from './Magnitude.js';
import Measure from './Measure.js';
import Unit from './Unit.js';

const tests = new Testing();

function assertEquals(expected, actual) {
  tests.assertTrue(expected.equals(actual), `expected: ${expected}, actual: ${actual}`);
}

// Magnitude
tests.add('Magnitude from', () => {
  tests.assertEquals(1, Magnitude.KILO.from(1000, Magnitude.UNIT));
  tests.assertEquals(1000, Magnitude.UNIT.from(1, Magnitude.KILO));
});

// Measure
tests.add('Test equals', () => {
  const first = new Measure(1, Magnitude.UNIT, Unit.METER);
  const second = new Measure(1, Magnitude.UNIT, Unit.METER);
  tests.assertTrue(first.equals(second), `expected (${first}).equals(${second})`);
});

tests.add('Test parse', () => {
  assertEquals(new Measure(1, Magnitude.UNIT, Unit.METER),
               Measure.parse('1 m'));
  assertEquals(new Measure(1, Magnitude.KILO, Unit.METER),
               Measure.parse('1000 m'));
  assertEquals(new Measure(1, Magnitude.KILO, Unit.METER),
               Measure.parse('1e3 m'));
  assertEquals(new Measure(123.4, Magnitude.KILO, Unit.METER),
               Measure.parse('1.234E5 m'));
  assertEquals(new Measure(123.4, Magnitude.KILO, Unit.METER),
               Measure.parse('1.234e5 m'));
});

tests.add('Test scalar not equals', () => {
  const first = new Measure(1, Magnitude.UNIT, Unit.METER);
  const second = new Measure(2, Magnitude.UNIT, Unit.METER);
  tests.assertTrue(!first.equals(second), `expected (${first}).equals(${second})`);
});

tests.add('Test unit not equals', () => {
  const first = new Measure(1, Magnitude.UNIT, Unit.METER);
  const second = new Measure(2, Magnitude.UNIT, Unit.GRAM);
  tests.assertTrue(!first.equals(second), `expected (${first}).equals(${second})`);
});

tests.add('Test magnitude not equals', () => {
  const first = new Measure(1, Magnitude.UNIT, Unit.METER);
  const second = new Measure(2, Magnitude.KILO, Unit.GRAM);
  tests.assertTrue(!first.equals(second), `expected (${first}).equals(${second})`);
});

tests.add('Test convertTo magnitude', () => {
  const input = new Measure(1000, Magnitude.UNIT, Unit.METER);
  const out = input.convertTo(Magnitude.KILO);
  tests.assertEquals(1, out.scalar);
  tests.assertEquals(Unit.METER, out.unit);
  tests.assertEquals(Magnitude.KILO, out.magnitude);
});

tests.add('Test toString', () => {
  const input = new Measure(1000, Magnitude.UNIT, Unit.METER);
  tests.assertEquals('1000m', input.toString());
  const out = input.convertTo(Magnitude.KILO);
  tests.assertEquals('1km', out.toString());
});

tests.run();

// js/Magnitude.js
var magnitudeByAbbrev = {};
var magnitudeByName = {};
var Magnitude = class {
  constructor(exponent, name, abbrev) {
    this.exponent = exponent;
    this.name = name;
    this.abbrev = abbrev;
    magnitudeByName[name] = this;
    magnitudeByAbbrev[abbrev] = this;
  }
  from(scalar, mag) {
    const expDiff = mag.exponent - this.exponent;
    const mult = Math.pow(10, expDiff);
    const result = scalar * mult;
    return result;
  }
  toString() {
    return this.name;
  }
};
Magnitude.lookup = (str) => {
  const magnitude = magnitudeByAbbrev[str];
  if (magnitude) {
    return magnitude;
  }
  return magnitudeByName[str];
};
Magnitude.YOTTA = new Magnitude(24, "yotta", "Y");
Magnitude.ZETTA = new Magnitude(21, "zetta", "Z");
Magnitude.EXA = new Magnitude(18, "exa", "E");
Magnitude.PETA = new Magnitude(15, "peta", "P");
Magnitude.TERA = new Magnitude(12, "tera", "T");
Magnitude.GIGA = new Magnitude(9, "giga", "G");
Magnitude.MEGA = new Magnitude(6, "mega", "M");
Magnitude.KILO = new Magnitude(3, "kilo", "k");
Magnitude.HECTO = new Magnitude(2, "hecto", "h");
Magnitude.DECA = new Magnitude(1, "deca", "D");
Magnitude.UNIT = new Magnitude(0, "", "");
Magnitude.DECI = new Magnitude(-1, "deci", "d");
Magnitude.CENTI = new Magnitude(-2, "centi", "c");
Magnitude.MILLI = new Magnitude(-3, "milli", "m");
Magnitude.MICRO = new Magnitude(-6, "micro", "\u03BC");
Magnitude.NANO = new Magnitude(-9, "nano", "n");
Magnitude.PICO = new Magnitude(-12, "pico", "p");
Magnitude.FEMTO = new Magnitude(-15, "femto", "f");
Magnitude.ATTO = new Magnitude(-18, "atto", "a");
Magnitude.ZETO = new Magnitude(-21, "zepto", "z");
Magnitude.YOCTO = new Magnitude(-24, "yocto", "y");

// js/Unit.js
var unitByAbbrev = {};
var unitByName = {};
var Unit = class {
  constructor(name, abbrev, dimension) {
    this.name = name;
    this.abbrev = abbrev;
    this.dimension = dimension;
    unitByAbbrev[abbrev] = this;
    unitByName[name] = this;
  }
  toString() {
    return this.name;
  }
};
Unit.lookup = (str) => {
  const unit = unitByAbbrev[str];
  if (unit) {
    return unit;
  }
  return unitByName[str];
};
Unit.METER = new Unit("meter", "m", "length");
Unit.GRAM = new Unit("gram", "g", "mass");
Unit.SECOND = new Unit("second", "s", "time");
Unit.AMPERE = new Unit("ampere", "A", "electric current");
Unit.KELVIN = new Unit("kelvin", "K", "temperature");
Unit.CANDELA = new Unit("candela", "cd", "luminous intensity");
Unit.MOLE = new Unit("mole", "mol", "amount of substance");

// js/Measure.js
var Measure = class {
  constructor(scalar, magnitude, unit) {
    if (typeof scalar != "number") {
      throw "Invalid scalar given: " + scalar;
    }
    if (typeof magnitude != "object" || magnitude.constructor.name != "Magnitude") {
      throw "Invalid magnitude given: " + magnitude;
    }
    if (typeof unit != "object" || unit.constructor.name != "Unit") {
      throw "Invalid unit given: " + unit;
    }
    this.scalar = scalar;
    this.magnitude = magnitude || Magnitude.UNIT;
    this.unit = unit;
  }
  identical(other) {
    return this.scalar === other.scalar && this.magnitude === other.magnitude && this.unit === other.unit;
  }
  equals(other) {
    const thisUnit = this.convertToUnit();
    const otherUnit = other.convertToUnit();
    return thisUnit.scalar === otherUnit.scalar && thisUnit.magnitude === otherUnit.magnitude && thisUnit.unit === otherUnit.unit;
  }
  convertTo(mag) {
    return new Measure(mag.from(this.scalar, this.magnitude), mag, this.unit);
  }
  convertToUnit() {
    return this.convertTo(Magnitude.UNIT);
  }
  toString() {
    let s = "";
    s += this.scalar;
    s += this.magnitude.abbrev;
    s += this.unit.abbrev;
    return s;
  }
};
Measure.Magnitude = Magnitude;
Measure.Unit = Unit;
Measure.parse = (s) => {
  if (typeof s != "string") {
    throw "Given string is null or not string: " + s;
  }
  const m = s.match(/(-?\d+(?:.\d+)?(?:[eE]\d+)?)\s*([khdnmgtpfaezy\u03BC])?\s*([mgsAKLn])/);
  if (!m) {
    throw "Could not parse measure from given string: " + s;
  }
  const scalar = parseFloat(m[1]);
  if (m.length == 2) {
    const unit2 = m[2];
    const ul2 = Unit.lookup(unit2);
    return new Measure(parseFloat(scalar), Magnitude.UNIT, ul2);
  }
  const magnitude = m[2] || null;
  const unit = m[3];
  const ml = magnitude == null ? Magnitude.UNIT : Magnitude.lookup(magnitude);
  const ul = Unit.lookup(unit);
  return new Measure(scalar == null ? 0 : parseFloat(scalar), ml, ul);
};
export {
  Measure as default
};

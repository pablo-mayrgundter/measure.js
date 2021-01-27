const magnitudeByAbbrev = {};
const magnitudeByName = {};

export default class Magnitude {
  constructor(exponent, name, abbrev) {
    this.exponent = exponent;
    this.name = name;
    this.abbrev = abbrev;
    magnitudeByName[name] = this;
    magnitudeByAbbrev[abbrev] = this;
  }


  lookup(str) {
    const magnitude = magnitudeByAbbrev[str];
    if (magnitude) {
      return magnitude;
    }
    return magnitudeByName[str];
  }


  /**
   * Converts the given scalar in the given magnitude to the
   * equivalent scalar in this magnitude.
   */
  from(scalar, mag) {
    const expDiff = mag.exponent - this.exponent;
    const mult = Math.pow(10, expDiff);
    const result = scalar * mult;
    return result;
  }


  toString() {
    return this.name;
  }
}


// TODO: declare the following as static after Safari adopts:
// https://github.com/tc39/proposal-static-class-features
  Magnitude.YOTTA = new Magnitude(24, 'yotta', 'Y');
  Magnitude.ZETTA = new Magnitude(21, 'zetta', 'Z');
  Magnitude.EXA = new Magnitude(18, 'exa', 'E');
  Magnitude.PETA = new Magnitude(15, 'peta', 'P');
  Magnitude.TERA = new Magnitude(12, 'tera', 'T');
  Magnitude.GIGA = new Magnitude(9, 'giga', 'G');
  Magnitude.MEGA = new Magnitude(6, 'mega', 'M');
  Magnitude.KILO = new Magnitude(3, 'kilo', 'k');
  Magnitude.HECTO = new Magnitude(2, 'hecto', 'h');
  Magnitude.DECA = new Magnitude(1, 'deca', 'D');
  Magnitude.UNIT = new Magnitude(0, '', '');
  Magnitude.DECI = new Magnitude(-1, 'deci', 'd');
  Magnitude.CENTI = new Magnitude(-2, 'centi', 'c');
  Magnitude.MILLI = new Magnitude(-3, 'milli', 'm');
  Magnitude.MICRO = new Magnitude(-6, 'micro', '\u03BC');
  Magnitude.NANO = new Magnitude(-9, 'nano', 'n');
  Magnitude.PICO = new Magnitude(-12, 'pico', 'p');
  Magnitude.FEMTO = new Magnitude(-15, 'femto', 'f');
  Magnitude.ATTO = new Magnitude(-18, 'atto', 'a');
  Magnitude.ZETO = new Magnitude(-21, 'zepto', 'z');
  Magnitude.YOCTO = new Magnitude(-24, 'yocto', 'y');

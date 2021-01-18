const magnitudeByAbbrev = {};
const magnitudeByName = {};

export default class Magnitude {


  static YOTTA = new Magnitude(24, 'yotta', 'Y');
  static ZETTA = new Magnitude(21, 'zetta', 'Z');
  static EXA = new Magnitude(18, 'exa', 'E');
  static PETA = new Magnitude(15, 'peta', 'P');
  static TERA = new Magnitude(12, 'tera', 'T');
  static GIGA = new Magnitude(9, 'giga', 'G');
  static MEGA = new Magnitude(6, 'mega', 'M');
  static KILO = new Magnitude(3, 'kilo', 'k');
  static HECTO = new Magnitude(2, 'hecto', 'h');
  static DECA = new Magnitude(1, 'deca', 'D');
  static UNIT = new Magnitude(0, '', '');
  static DECI = new Magnitude(-1, 'deci', 'd');
  static CENTI = new Magnitude(-2, 'centi', 'c');
  static MILLI = new Magnitude(-3, 'milli', 'm');
  static MICRO = new Magnitude(-6, 'micro', '\u03BC');
  static NANO = new Magnitude(-9, 'nano', 'n');
  static PICO = new Magnitude(-12, 'pico', 'p');
  static FEMTO = new Magnitude(-15, 'femto', 'f');
  static ATTO = new Magnitude(-18, 'atto', 'a');
  static ZETO = new Magnitude(-21, 'zepto', 'z');
  static YOCTO = new Magnitude(-24, 'yocto', 'y');


  static lookup(str) {
    const magnitude = magnitudeByAbbrev[str];
    if (magnitude) {
      return magnitude;
    }
    return magnitudeByName[str];
  }


  constructor(exponent, name, abbrev) {
    this.exponent = exponent;
    this.name = name;
    this.abbrev = abbrev;
    magnitudeByName[name] = this;
    magnitudeByAbbrev[abbrev] = this;
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

const unitByAbbrev = {};
const unitByName = {};

export default class Unit {

  static METER = new Unit('meter', 'm', 'length');
  static GRAM = new Unit('gram', 'g', 'mass');
  static SECOND = new Unit('second', 's', 'time');
  static AMPERE = new Unit('ampere', 'A', 'electric current');
  static KELVIN = new Unit('kelvin', 'K', 'temperature');
  static CANDELA = new Unit('candela', 'cd', 'luminous intensity');
  static MOLE = new Unit('mole', 'mol', 'amount of substance');

  static lookup(str) {
    const unit = unitByAbbrev[str];
    if (unit) {
      return unit;
    }
    return unitByName[str];
  }


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
}

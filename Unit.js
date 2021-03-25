const unitByAbbrev = {};
const unitByName = {};

export default class Unit {

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


// TODO: declare the following as static after Safari adopts:
// https://github.com/tc39/proposal-static-class-features
  Unit.lookup = str => {
    const unit = unitByAbbrev[str];
    if (unit) {
      return unit;
    }
    return unitByName[str];
  }



  Unit.METER = new Unit('meter', 'm', 'length');
  Unit.GRAM = new Unit('gram', 'g', 'mass');
  Unit.SECOND = new Unit('second', 's', 'time');
  Unit.AMPERE = new Unit('ampere', 'A', 'electric current');
  Unit.KELVIN = new Unit('kelvin', 'K', 'temperature');
  Unit.CANDELA = new Unit('candela', 'cd', 'luminous intensity');
  Unit.MOLE = new Unit('mole', 'mol', 'amount of substance');

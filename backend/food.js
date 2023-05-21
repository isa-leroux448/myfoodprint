class Ingredient {
    constructor(name, amount, unit) {
      this.name = name;
      this.amount = amount;
      this.unit = unit;
      this.file = readFoodC02EmissionFile();
    }
  
    getCo2Emissions() {
      const category = this.file[this.name];
      const temp = this.amount / 453.6;
  
      return 0;
    }
  }
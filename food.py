import pandas as pd
from main import read_food_c02_emission_file


class Ingredient:
    """
    This is the class for a single ingredient
    """
    def __init__(self, name: str, amount: float, unit: str):
        self.name = name
        self.amount = amount
        self.unit = unit
        self.file = read_food_c02_emission_file()

    def get_co2_emissions(self) -> float:
        """
        This function will calculate the amount of co2 emissions for this specific ingredient
        :return:
        """
        category = self.file.get(self.name)

        temp = self.amount/453.6

        return 0




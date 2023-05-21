from __future__ import annotations
from typing import List
from food import Ingredient
import pandas as pd


def split_list(lst, n):
    """Split a list into sublists containing n elements."""
    return [lst[i:i + n] for i in range(0, len(lst), n)]


def read_food_c02_emission_file() -> dict:
    """
    Translate input from csv file to tuple for standard calculation for sale
    salary.
    """
    dt = pd.read_excel('data/FoodCarbon.xlsx')
    data = pd.DataFrame(dt, columns=['category', 'commodity', 'miles',
                                     'gram',
                                     'production',
                                     'transport'])
    result = {}

    d1 = data.loc[0:11, ['commodity', 'miles',
                         'gram',
                         'production',
                         'transport']].values.flatten().tolist()

    d2 = data.loc[12:23, ['commodity', 'miles',
                          'gram',
                          'production',
                          'transport']].values.flatten().tolist()

    d3 = data.loc[24:62, ['commodity', 'miles',
                          'gram',
                          'production',
                          'transport']].values.flatten().tolist()
    d4 = data.loc[63:84, ['commodity', 'miles',
                          'gram',
                          'production',
                          'transport']].values.flatten().tolist()
    d5 = data.loc[85:86, ['commodity', 'miles',
                          'gram',
                          'production',
                          'transport']].values.flatten().tolist()
    d6 = data.loc[87:99, ['commodity', 'miles',
                          'gram',
                          'production',
                          'transport']].values.flatten().tolist()
    d7 = data.loc[100:102, ['commodity', 'miles',
                            'gram',
                            'production',
                            'transport']].values.flatten().tolist()
    d8 = data.loc[103:114, ['commodity', 'miles',
                            'gram',
                            'production',
                            'transport']].values.flatten().tolist()
    d9 = data.loc[115:120, ['commodity', 'miles',
                            'gram',
                            'production',
                            'transport']].values.flatten().tolist()
    d10 = data.loc[121:185, ['commodity', 'miles',
                             'gram',
                             'production',
                             'transport']].values.flatten().tolist()
    d11 = data.loc[186:191, ['commodity', 'miles',
                             'gram',
                             'production',
                             'transport']].values.flatten().tolist()
    d12 = data.loc[192:211, ['commodity', 'miles',
                             'gram',
                             'production',
                             'transport']].values.flatten().tolist()
    d13 = data.loc[212:214, ['commodity', 'miles',
                             'gram',
                             'production',
                             'transport']].values.flatten().tolist()
    d14 = data.loc[215:252, ['commodity', 'miles',
                             'gram',
                             'production',
                             'transport']].values.flatten().tolist()

    dt1 = split_list(d1, 5)
    dt2 = split_list(d2, 5)
    dt3 = split_list(d3, 5)
    dt4 = split_list(d4, 5)
    dt5 = split_list(d5, 5)
    dt6 = split_list(d6, 5)
    dt7 = split_list(d7, 5)
    dt8 = split_list(d8, 5)
    dt9 = split_list(d9, 5)
    dt10 = split_list(d10, 5)
    dt11 = split_list(d11, 5)
    dt12 = split_list(d12, 5)
    dt13 = split_list(d13, 5)
    dt14 = split_list(d14, 5)

    for index, row in data.iterrows():
        if str(row['category']).lower() != 'nan':
            if str(row['category']).lower() == 'beans':
                result[str(row['category']).lower()] = dt1
            elif str(row['category']).lower() == 'dairy':
                result[str(row['category']).lower()] = dt2
            elif str(row['category']).lower() == 'fruits':
                result[str(row['category']).lower()] = dt3
            elif str(row['category']).lower() == 'grains':
                result[str(row['category']).lower()] = dt4
            elif str(row['category']).lower() == 'herbs':
                result[str(row['category']).lower()] = dt5
            elif str(row['category']).lower() == 'meat/poultry':
                result[str(row['category']).lower()] = dt6
            elif str(row['category']).lower() == 'miscellaneous food groups':
                result[str(row['category']).lower()] = dt7
            elif str(row['category']).lower() == 'nuts and seeds':
                result[str(row['category']).lower()] = dt8
            elif str(row['category']).lower() == 'oils':
                result[str(row['category']).lower()] = dt9
            elif str(row['category']).lower() == 'processed foods':
                result[str(row['category']).lower()] = dt10
            elif str(row['category']).lower() == 'root crops':
                result[str(row['category']).lower()] = dt11
            elif str(row['category']).lower() == 'seafood':
                result[str(row['category']).lower()] = dt12
            elif str(row['category']).lower() == 'tubers':
                result[str(row['category']).lower()] = dt13
            elif str(row['category']).lower() == 'vegetables':
                result[str(row['category']).lower()] = dt14

    return result


def read_chatgpt_input() -> List[Ingredient]:
    """
    This function will read the csv file given from chat gpt
    :return: List[Ingredient]
    """
    dt = pd.read_csv('data/GPTdata.xlsx')
    data = pd.DataFrame(dt, columns=['name', 'amount'])
    result = []
    for index, row in data.iterrows():
        if str(row['name']).lower() != 'nan':
            a = Ingredient(str(row['name']).lower(), float(row['amount']), 'gram')
            result.append(a)

    return result

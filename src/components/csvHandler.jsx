import React, { useEffect, useState } from 'react';
import Foodcarbon from '../assets/foodcarbon.js';

const CSVHandler = (props) => {
  const dicts = Foodcarbon;
  const commodities = dicts.map((item) => item.commodity);
  const carbonValues = dicts.map((item) => item.total);

  const ingredients = Object.keys(props.dict);
  const quantities = Object.values(props.dict);

  let factor;
  let total = 0;

  for (let i = 0; i < ingredients.length; i++) {
      let rawCarbon = null;
      factor = quantities[i] / 100;

      for (let j = 0; j < commodities.length; j++) {
          console.log(ingredients[i])
          if (commodities[j].toLowerCase().includes(ingredients[i])) {
              rawCarbon = carbonValues[i];
              console.log(rawCarbon)
              break;
          }
      }

      if (rawCarbon == null) {
          console.log("nope");
          rawCarbon = 0;
          // chatGPT call to categorize ingredients[i]
          // rawCarbon = response
      }

      total += rawCarbon * factor;
  }

  return total;

}

export default CSVHandler;

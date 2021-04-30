import {
  pushDataBy7UniqueIds,
  compoundSummedArray,
  sumNArrays,
} from "../utility/utility";

// 8 product pages - can be adjusted to (n) product pages
export const productPages = [
  {
    "product 1": "/products/product-1/",
    id: 1,
  },
  {
    "product 2": "/products/product-2/",
    id: 2,
  },
  {
    "product 3": "/products/product-3/",
    id: 3,
  },
  {
    "product 4": "/products/product-4",
    id: 4,
  },
  {
    "product 5": "/products/product-5/",
    id: 5,
  },
  {
    "product 6": "/products/product-6/",
    id: 6,
  },
  {
    "product 7": "/products/product-7/",
    id: 7,
  },
  {
    "product 8": "/products/product-8/",
    id: 8,
  },
];

export const filterByProductPages = (obj, arrayOfProductPageObjects) => {
  const { dimensions } = obj;
  const [, goalPreviousStep1] = dimensions;
  // filter by goalPreviousStep1 page by matching regex exp using productPage object
  return arrayOfProductPageObjects.filter((productPageObj) => {
    // build regex expression from product page values
    const expression = `.*${Object.values(productPageObj)[0].replace(
      /\//g,
      "\\/"
    )}?$`;
    const productPageRegex = new RegExp(expression, "ig");
    return goalPreviousStep1.match(productPageRegex);
  });
};

// TODO: needs refactoring - remove hard coded arrays
export const aggregateProductPageData = (gaArrOfObjs, productPageArrOfObjs) => {
  let arr1 = [],
    arr2 = [],
    arr3 = [],
    arr4 = [],
    arr5 = [],
    arr6 = [],
    arr7 = [],
    arr8 = [];

  const mappedArrOfGaObj = gaArrOfObjs.map((gaObj) => {
    // desctructure gaObj data into dimensions and metrics properties
    const { dimensions, metrics } = gaObj;
    const [, goalPreviousStep1] = dimensions;

    // loop through product page obj and unpack product page values
    for (const productPageObj of productPageArrOfObjs.values()) {
      const expression = `.*${Object.values(productPageObj)[0]}$`;
      const productPageRegex = new RegExp(expression, "ig");

      // check if product page regex matches goalPreviousStep url
      if (productPageRegex.test(goalPreviousStep1)) {
        // separate filtered product page data into 7 unique arrays
        const pushedDataBySevenUniqueIds = pushDataBy7UniqueIds(
          productPageObj.id,
          metrics
        );

        // these if checks help remove any empty array within arrays from the 7 unique arrays
        if (pushedDataBySevenUniqueIds[0].length > 0) {
          arr1.push(
            pushedDataBySevenUniqueIds[0].map((arrOfStrings) => {
              return arrOfStrings.map((str) => parseInt(str));
            })
          );
        }

        if (pushedDataBySevenUniqueIds[1].length > 0) {
          arr2.push(
            pushedDataBySevenUniqueIds[1].map((arrOfStrings) => {
              return arrOfStrings.map((str) => parseInt(str));
            })
          );
        }

        if (pushedDataBySevenUniqueIds[2].length > 0) {
          arr3.push(
            pushedDataBySevenUniqueIds[2].map((arrOfStrings) => {
              return arrOfStrings.map((str) => parseInt(str));
            })
          );
        }

        if (pushedDataBySevenUniqueIds[3].length > 0) {
          arr4.push(
            pushedDataBySevenUniqueIds[3].map((arrOfStrings) => {
              return arrOfStrings.map((str) => parseInt(str));
            })
          );
        }

        if (pushedDataBySevenUniqueIds[4].length > 0) {
          arr5.push(
            pushedDataBySevenUniqueIds[4].map((arrOfStrings) => {
              return arrOfStrings.map((str) => parseInt(str));
            })
          );
        }

        if (pushedDataBySevenUniqueIds[5].length > 0) {
          arr6.push(
            pushedDataBySevenUniqueIds[5].map((arrOfStrings) => {
              return arrOfStrings.map((str) => parseInt(str));
            })
          );
        }

        if (pushedDataBySevenUniqueIds[6].length > 0) {
          arr7.push(
            pushedDataBySevenUniqueIds[6].map((arrOfStrings) => {
              return arrOfStrings.map((str) => parseInt(str));
            })
          );
        }

        if (pushedDataBySevenUniqueIds[7].length > 0) {
          arr8.push(
            pushedDataBySevenUniqueIds[7].map((arrOfStrings) => {
              return arrOfStrings.map((str) => parseInt(str));
            })
          );
        }
      }
    }
  });

  // remove first array in array of arrays to use as base for sumNArrays function
  const baseArray1 = arr1.shift();
  const baseArray2 = arr2.shift();
  const baseArray3 = arr3.shift();
  const baseArray4 = arr4.shift();
  const baseArray5 = arr5.shift();
  const baseArray6 = arr6.shift();
  const baseArray7 = arr7.shift();
  const baseArray8 = arr8.shift();

  // run compoundSummedArray with sumNArrays inside of it. This will sum (n) arrays into single array.
  // takes base array (first array of array), then remaining arrays, followed by util function (sumNArray), which reduces into single array
  return [
    compoundSummedArray(baseArray1[0], arr1, sumNArrays),
    compoundSummedArray(baseArray2[0], arr2, sumNArrays),
    compoundSummedArray(baseArray3[0], arr3, sumNArrays),
    compoundSummedArray(baseArray4[0], arr4, sumNArrays),
    compoundSummedArray(baseArray5[0], arr5, sumNArrays),
    compoundSummedArray(baseArray6[0], arr6, sumNArrays),
    compoundSummedArray(baseArray7[0], arr7, sumNArrays),
    compoundSummedArray(baseArray8[0], arr8, sumNArrays),
  ];
};

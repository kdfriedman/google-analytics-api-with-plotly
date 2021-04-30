export const getLengthOfAllCharOccurences = (string, targetChar) => {
  const plusSymbolList = [];
  for (let char of string) {
    if (char.includes(targetChar)) plusSymbolList.push(char);
  }
  return plusSymbolList.length;
};

// sums (n) arrays into a single new array with total sum of all values in original index
export const sumNArrays = (arrBase, ...nArrays) => {
  const result = [];
  let arrayBase = arrBase;

  for (let arr of nArrays) {
    const reducedArr = arrayBase.reduce((accumVal, currentVal, i) => {
      accumVal[i] = currentVal + arr[i];
      return accumVal;
    }, []);

    arrayBase = reducedArr;
    result.push(reducedArr);
  }

  return result[result.length - 1];
};

// used inconjunction with sumNArrays, meant to facilitate an array of arrays as second argument
export const compoundSummedArray = (
  arrBase,
  arrayOfArrays,
  sumArrayCallback
) => {
  let baseArray = arrBase;
  arrayOfArrays.forEach((arr) => {
    baseArray = sumArrayCallback(baseArray, arr[0]);
  });
  return baseArray;
};

export const mapTwoUnrelatedArrays = (arr1, arr2, joinDataCallback) => {
  // using map to associate two unrelated arrays
  return arr1.map((item, i) => joinDataCallback(item, i, arr2));
};

// TODO: needs refactoring - remove hard coded arrays and generate dynamically
export const pushDataBy7UniqueIds = (id, data) => {
  // used for separating data into 7 unique arrays by unique ids
  const arr1 = [];
  const arr2 = [];
  const arr3 = [];
  const arr4 = [];
  const arr5 = [];
  const arr6 = [];
  const arr7 = [];
  const arr8 = [];

  if (id === 1) arr1.push(data);
  if (id === 2) arr2.push(data);
  if (id === 3) arr3.push(data);
  if (id === 4) arr4.push(data);
  if (id === 5) arr5.push(data);
  if (id === 6) arr6.push(data);
  if (id === 7) arr7.push(data);
  if (id === 8) arr8.push(data);

  return [arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8];
};

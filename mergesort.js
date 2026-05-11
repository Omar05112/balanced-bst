export default function mergeSort(array){
  let newArray = [];
  if (array.length === 1 || array.length === 0) return array;
  else {
    let middleIndex = Math.round(array.length / 2);
    let firstHalf = array.slice(0, middleIndex);
    let secondHalf = array.slice(middleIndex);
    let mergedFirst = mergeSort(firstHalf);
    let mergedSecond = mergeSort(secondHalf);
    return merge(mergedFirst, mergedSecond);
  }
  function merge(arrayA, arrayB) {
    let m = arrayA.length - 1;
    let n = arrayB.length - 1;

    let i = 0;
    let j = 0;
    let k = 0;
    while (i <= m && j <= n) {
      if (arrayA[i] < arrayB[j]) {
        newArray[k] = arrayA[i];
        k++;
        i++;
      } else {
        newArray[k] = arrayB[j];
        k++;
        j++;
      }
    }

    for (; i <= m; i++) {
      newArray[k] = arrayA[i];
      k++;
    }

    for (; j <= n; j++) {
      newArray[k] = arrayB[j];
      k++;
    }

    return newArray;
  }
};



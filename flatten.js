// This function flattens all nested arrays into a 1 dimensional array

const flatten = (array) => {
  const flattenedArray = [];
  // Iterate through the array
  // Check if the value/item is an array or not
  // If it is, recursively call this function again
  // If it's not an array, push to final array
  for (let item of array) {
    if (Array.isArray(item)) {
      flattenedArray.push(...flatten(item));
      continue;
    }

    flattenedArray.push(item);
  }

  return flattenedArray;
};

console.log(flatten([1, 2, [3, 4], 5, [6]])); // => [1, 2, 3, 4, 5, 6]

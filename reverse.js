// This function takes in an array of string from the Command line
// It will print each string after it has been reversed
const reverseString = (commandLineArray) => {
  const stringArrays = commandLineArray.slice(2);

  for (let i = 0; i < stringArrays.length; i++) {
    let reversedString = "";
    for (let j = stringArrays[i].length - 1; j >= 0; j--) {
      reversedString += stringArrays[i][j];
    }
    console.log("Reversed String", reversedString);
  }

  return;
};

reverseString(process.argv);

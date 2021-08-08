// This funtion takes in array of string from the command line
// Transforms each word into pig latin by moving the first letter to the end and then adding ay to the end
// Print the items as a single sentence
const pigLatin = (commandLineArray) => {
  let finalSentence = "";
  const stringArray = commandLineArray.slice(2);

  for (let i = 0; i < stringArray.length; i++) {
    let pigLatinWord = `${stringArray[i].slice(1)}${stringArray[i][0]}ay`;
    finalSentence += `${pigLatinWord} `;
  }

  console.log("Final sentence", finalSentence.trim());
  return finalSentence.trim();
};

pigLatin(process.argv);

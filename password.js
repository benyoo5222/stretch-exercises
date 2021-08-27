// This function takes in a single argument from the command line
// It takes the single argument and prints out an "obfuscated" version
// Rules to make the string an obfuscated:
/*
    1. Every "a" will turn into a 4
    2. Every "e" will turn into a 3
    3. Every "o" will turn into a 0
    4. Every "l" will turn into a 1
 */

const obfuscate = (password) => {
  let obfuscatedString = "";
  const obfuscateRuleObject = {
    a: "4",
    e: "3",
    o: "0",
    l: "1",
  };
  // We are going to iterate through the string that's passed to the function
  // If a letter matches one of the conditions outlined above
  // We are going to substitute the letter'

  for (let letter of password) {
    obfuscatedString += obfuscateRuleObject[letter]
      ? obfuscateRuleObject[letter]
      : letter;
  }

  console.log("New Password:", obfuscatedString);
  return;
};

obfuscate(process.argv[2]);

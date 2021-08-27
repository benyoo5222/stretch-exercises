# Stretch Exercises

## Summary

This [repo](git@github.com:benyoo5222/stretch-exercises.git) is used to practice doing stretch (or kata) exercises. These mostly include writing functions that transform data without using built in methods.

### Table of Content

- [Pig Latin](./pig-latin.js)
- [Reverse String](./reverse.js)
- [Obfuscate](./password.js)

_Pig Latin_

This function takes in an array of strings from the command line and returns a single sentence. Each word from the array must be transformed to `pig latin`. To make it simple, the first letter of the word moves to the end and `ay` is added to the end.

```javascript
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
```

_Reverse String_

This function takes in an array of string from the command line and prints each word in reverse.

```javascript
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
```

_Password (Obfuscate)_

This function takes in a single parameter from the command line and prints out an "obfuscated" version of the passed in string.

```javascript
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
```

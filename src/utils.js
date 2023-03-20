/**
 * Converts a decimal number to an 8-bit binary sequence.
 *
 * @param {number} num - The decimal number to convert.
 * @returns {number[]} An array of 8 bits representing the binary sequence.
 */
function convertDecimalNumToEightBit(num) {
  var arrayOfBits = [];

  // Fill in the binary sequence with leading zeros until it has a length of 8
  while (arrayOfBits.length < 8) {
    // If the binary sequence is empty, create it by converting the decimal number to binary
    if (arrayOfBits.length == 0) {
      var initialBinarySequence = num.toString(2);
      // Add each bit of the binary sequence to the array of bits, starting from the left
      for (var i = 0; i < initialBinarySequence.length; i++) {
        arrayOfBits.unshift(+initialBinarySequence[i]);
      }
    } else {
      // Add a leading zero to the binary sequence
      arrayOfBits.push(0);
    }
  }

  return arrayOfBits;
}

/**
 * Generates an array of all possible 8-bit binary sequences.
 *
 * @returns {number[][]} An array of arrays, where each inner array represents an 8-bit binary sequence.
 */
function generateAllPossibleEightBitBinarySequences() {
  var eightBitMegaList = [];

  // Generate all possible 8-bit binary sequences
  for (var num = 0; num < 256; num++) {
    eightBitMegaList.push(convertDecimalNumToEightBit(num));
  }

  return eightBitMegaList;
}

/**
 * Returns a randomly shuffled array of indices from 0 to 255.
 *
 * @returns {number[]} A randomly shuffled array of indices from 0 to 255.
 */
function produceRandomSelectionOrder() {
  // Create an array of indices from 0 to 255
  var indices = [];
  for (var i = 0; i < 256; i++) {
    indices.push(i);
  }

  // Shuffle the array of indices using the Fisher-Yates shuffle algorithm
  for (var j = indices.length - 1; j > 0; j--) {
    var k = Math.floor(Math.random() * (j + 1));
    var temp = indices[j];
    indices[j] = indices[k];
    indices[k] = temp;
  }

  // Return the shuffled array of indices
  return indices;
}

function generateIncorrectAnswerChoices(correctAnswerChoice) {
  const maxNumber = 255;
  const randomNumbers = [];

  let randomNumberOne = Math.floor(Math.random() * (maxNumber + 1));
  let randomNumberTwo = Math.floor(Math.random() * (maxNumber + 1));

  while (randomNumberOne === correctAnswerChoice) {
    randomNumberOne = Math.floor(Math.random() * (maxNumber + 1));
  }

  while (
    randomNumberTwo === randomNumberOne ||
    randomNumberTwo === correctAnswerChoice
  ) {
    randomNumberTwo = Math.floor(Math.random() * (maxNumber + 1));
  }

  randomNumbers.push(randomNumberOne);
  randomNumbers.push(randomNumberTwo);

  return randomNumbers;
}

export {
  generateAllPossibleEightBitBinarySequences,
  produceRandomSelectionOrder,
  generateIncorrectAnswerChoices
};

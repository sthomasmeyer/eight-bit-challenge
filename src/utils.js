function convertDecimalNumToEightBit(num) {
  return num.toString(2).padStart(8, '0').split('').map(Number);
}

function generateAllPossibleEightBitBinarySequences() {
  const sequences = [];
  for (let num = 0; num < 256; num++) {
    sequences.push(convertDecimalNumToEightBit(num));
  }
  return sequences;
}

function produceRandomSelectionOrder() {
  const indices = Array.from({ length: 256 }, (_, i) => i);
  return shuffleArray(indices);
}

function generateIncorrectAnswerChoices(correctAnswerChoice) {
  let first = Math.floor(Math.random() * 256);
  while (first === correctAnswerChoice) {
    first = Math.floor(Math.random() * 256);
  }

  let second = Math.floor(Math.random() * 256);
  while (second === first || second === correctAnswerChoice) {
    second = Math.floor(Math.random() * 256);
  }

  return [first, second];
}

function shuffleArray(items) {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function getRoundDurationSeconds(round) {
  if (round < 8) return 32;
  if (round < 16) return 24;
  if (round < 24) return 16;
  return 8;
}

function shouldIgnoreKeyEvent(event) {
  if (
    event.defaultPrevented ||
    event.repeat ||
    event.isComposing ||
    event.ctrlKey ||
    event.metaKey ||
    event.altKey
  ) {
    return true;
  }

  const target = event.composedPath?.()[0] ?? event.target;
  return (
    target instanceof Element &&
    target.matches('input, textarea, select, [contenteditable="true"]')
  );
}

export {
  generateAllPossibleEightBitBinarySequences,
  produceRandomSelectionOrder,
  generateIncorrectAnswerChoices,
  shuffleArray,
  getRoundDurationSeconds,
  shouldIgnoreKeyEvent
};

import React, { useEffect, useMemo, useRef } from 'react';
import AnswerChoice from './AnswerChoice';
import { shouldIgnoreKeyEvent, shuffleArray } from '../utils';
import '../styles/AnswerChoices.css';

const AnswerChoices = ({
  correctAnswer,
  incorrectAnswerOne,
  incorrectAnswerTwo,
  handleAnswerSelection
}) => {
  // Shuffle once per round so unrelated re-renders keep card positions stable.
  const shuffledValues = useMemo(() => {
    return shuffleArray([
      correctAnswer,
      incorrectAnswerOne,
      incorrectAnswerTwo
    ]);
  }, [correctAnswer, incorrectAnswerOne, incorrectAnswerTwo]);

  const buttonRefs = useRef([]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (shouldIgnoreKeyEvent(event)) return;

      if (event.key === '1' || event.key === '2' || event.key === '3') {
        const selectedValue = shuffledValues[Number(event.key) - 1];
        if (selectedValue !== undefined) {
          event.preventDefault();
          handleAnswerSelection(selectedValue);
        }
        return;
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        const buttons = buttonRefs.current;
        const activeElement = document.activeElement;
        const currentIndex = buttons.indexOf(activeElement);
        const canFocusFromContainer =
          currentIndex !== -1 ||
          activeElement === document.body ||
          activeElement?.tagName === 'MAIN';

        if (!canFocusFromContainer) return;

        event.preventDefault();
        if (currentIndex === -1) {
          const initialIndex = event.key === 'ArrowRight' ? 0 : 2;
          buttons[initialIndex]?.focus();
        } else {
          const delta = event.key === 'ArrowRight' ? 1 : -1;
          const nextIndex = (currentIndex + delta + 3) % 3;
          buttons[nextIndex]?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shuffledValues, handleAnswerSelection]);

  return (
    <div className='AnswerChoices'>
      <div className='AnswerChoices-user-direction'>
        <p>Evaluate the 8-bit binary sequence and select its decimal value.</p>
      </div>
      <div className='AnswerChoice-wrapper'>
        {shuffledValues.map((decimalValue, index) => (
          <div key={decimalValue} className={`AnswerChoice${index + 1}`}>
            <AnswerChoice
              index={index + 1}
              decimalValue={decimalValue}
              handleAnswerSelection={handleAnswerSelection}
              buttonRef={(el) => {
                buttonRefs.current[index] = el;
              }}
            />
          </div>
        ))}
      </div>
      <p className='KeyboardLegend' aria-hidden='true'>
        <kbd>1</kbd>–<kbd>3</kbd> select · <kbd>←</kbd> <kbd>→</kbd> navigate ·{' '}
        <kbd>T</kbd> theme
      </p>
    </div>
  );
};

export default AnswerChoices;

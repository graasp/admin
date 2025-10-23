/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { type KeyboardEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { $patchStyleText } from '@lexical/selection';
import { $getSelection, LexicalEditor } from 'lexical';
import { MinusIcon, PlusIcon } from 'lucide-react';

import { NS } from '@/config/constants';

export const DEFAULT_FONT_SIZE = 15;
const MAX_ALLOWED_FONT_SIZE = 30;
const MIN_ALLOWED_FONT_SIZE = 10;

type UpdateFontSizeType = 'increment' | 'decrement';

export function FontSize({
  selectionFontSize,
  disabled = false,
  editor,
}: {
  selectionFontSize: string;
  disabled?: boolean;
  editor: LexicalEditor;
}) {
  const { t } = useTranslation(NS.PageEditor, {
    keyPrefix: 'TOOLBAR.FONT_SIZE',
  });
  const [inputChangeFlag, setInputChangeFlag] = useState<boolean>(false);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    const inputValueNumber = Number(selectionFontSize);

    if (e.key === 'Tab') {
      return;
    }
    if (['e', 'E', '+', '-'].includes(e.key) || isNaN(inputValueNumber)) {
      e.preventDefault();
      return;
    }
    setInputChangeFlag(true);
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.preventDefault();

      updateFontSizeByInputValue(inputValueNumber);
    }
  };

  const handleInputBlur = () => {
    if (selectionFontSize !== '' && inputChangeFlag) {
      const inputValueNumber = Number(selectionFontSize);
      updateFontSizeByInputValue(inputValueNumber);
    }
  };

  const updateFontSizeByInputValue = (inputValueNumber: number) => {
    let updatedFontSize = inputValueNumber;
    if (inputValueNumber > MAX_ALLOWED_FONT_SIZE) {
      updatedFontSize = MAX_ALLOWED_FONT_SIZE;
    } else if (inputValueNumber < MIN_ALLOWED_FONT_SIZE) {
      updatedFontSize = MIN_ALLOWED_FONT_SIZE;
    }

    updateFontSizeInSelection(editor, String(updatedFontSize) + 'px', null);
    setInputChangeFlag(false);
  };

  return (
    <>
      <button
        type="button"
        disabled={
          disabled ||
          (selectionFontSize !== '' &&
            Number(selectionFontSize) <= MIN_ALLOWED_FONT_SIZE)
        }
        onClick={() => updateFontSize(editor, 'decrement', selectionFontSize)}
        className="toolbar-item font-decrement"
        aria-label={t('DECREASE')}
        title={t('DECREASE')}
      >
        <MinusIcon size={14} />
      </button>

      <input
        name="fontSize"
        type="number"
        title="Font size"
        value={selectionFontSize}
        disabled={disabled}
        style={{
          textAlign: 'center',
          borderRadius: 10,
          borderWidth: 2,
          borderColor: '#ccc',
          borderStyle: 'solid',
          width: 30,
          height: 30,
          boxSizing: 'border-box',
          // disable arrows in input type number
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          '-moz-appearance': 'textfield',
        }}
        className="font-size-input"
        min={MIN_ALLOWED_FONT_SIZE}
        max={MAX_ALLOWED_FONT_SIZE}
        onKeyDown={handleKeyPress}
        onBlur={handleInputBlur}
      />

      <button
        type="button"
        disabled={
          disabled ||
          (selectionFontSize !== '' &&
            Number(selectionFontSize) >= MAX_ALLOWED_FONT_SIZE)
        }
        onClick={() => updateFontSize(editor, 'increment', selectionFontSize)}
        className="toolbar-item font-increment"
        aria-label={t('INCREASE')}
        title={t('INCREASE')}
      >
        <PlusIcon size={14} />
      </button>
    </>
  );
}

/**
 * Calculates the new font size based on the update type.
 * @param currentFontSize - The current font size
 * @param updateType - The type of change, either increment or decrement
 * @returns the next font size
 */
const calculateNextFontSize = (
  currentFontSize: number,
  updateType: UpdateFontSizeType | null,
) => {
  if (!updateType) {
    return currentFontSize;
  }

  let updatedFontSize: number = currentFontSize;
  switch (updateType) {
    case 'decrement':
      switch (true) {
        case currentFontSize > MAX_ALLOWED_FONT_SIZE:
          updatedFontSize = MAX_ALLOWED_FONT_SIZE;
          break;
        case currentFontSize >= 48:
          updatedFontSize -= 12;
          break;
        case currentFontSize >= 24:
          updatedFontSize -= 4;
          break;
        case currentFontSize >= 14:
          updatedFontSize -= 2;
          break;
        case currentFontSize >= 9:
          updatedFontSize -= 1;
          break;
        default:
          updatedFontSize = MIN_ALLOWED_FONT_SIZE;
          break;
      }
      break;

    case 'increment':
      switch (true) {
        case currentFontSize < MIN_ALLOWED_FONT_SIZE:
          updatedFontSize = MIN_ALLOWED_FONT_SIZE;
          break;
        case currentFontSize < 12:
          updatedFontSize += 1;
          break;
        case currentFontSize < 20:
          updatedFontSize += 2;
          break;
        case currentFontSize < 36:
          updatedFontSize += 4;
          break;
        case currentFontSize <= 60:
          updatedFontSize += 12;
          break;
        default:
          updatedFontSize = MAX_ALLOWED_FONT_SIZE;
          break;
      }
      break;

    default:
      break;
  }
  return updatedFontSize;
};

/**
 * Patches the selection with the updated font size.
 */
const updateFontSizeInSelection = (
  editor: LexicalEditor,
  newFontSize: string | null,
  updateType: UpdateFontSizeType | null,
) => {
  const getNextFontSize = (prevFontSize: string | null): string => {
    if (!prevFontSize) {
      prevFontSize = `${DEFAULT_FONT_SIZE}px`;
    }
    prevFontSize = prevFontSize.slice(0, -2);
    const nextFontSize = calculateNextFontSize(
      Number(prevFontSize),
      updateType,
    );
    return `${nextFontSize}px`;
  };

  editor.update(() => {
    if (editor.isEditable()) {
      const selection = $getSelection();
      if (selection !== null) {
        $patchStyleText(selection, {
          'font-size': newFontSize || getNextFontSize,
        });
      }
    }
  });
};

const updateFontSize = (
  editor: LexicalEditor,
  updateType: UpdateFontSizeType,
  inputValue: string,
) => {
  if (inputValue !== '') {
    const nextFontSize = calculateNextFontSize(Number(inputValue), updateType);
    updateFontSizeInSelection(editor, String(nextFontSize) + 'px', null);
  } else {
    updateFontSizeInSelection(editor, null, updateType);
  }
};

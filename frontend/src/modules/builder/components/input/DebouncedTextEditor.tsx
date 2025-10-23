import { type JSX, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import TextEditor from '@/ui/TextEditor/TextEditor';

import { stripHtml } from '~builder/utils/item';

const { useDebounce } = hooks;

export const DEBOUNCE_MS = 1000;

type Props = {
  id?: string;
  initialValue?: string;
  showActions: boolean;
  onUpdate: (newValue?: string) => void;
};

export const DebouncedTextEditor = ({
  id,
  initialValue,
  onUpdate,
}: Props): JSX.Element => {
  const { t } = useTranslation(NS.Builder);
  // prevent to call onUpdate when initialValue changed
  const [startDebounce, setStartDebounce] = useState(false);
  const [value, setValue] = useState(initialValue);
  const debouncedValue = useDebounce(value, DEBOUNCE_MS);

  useEffect(() => {
    if (startDebounce) {
      onUpdate(debouncedValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const isHTMLValueEmpty = (html: string) =>
    stripHtml(html).trim().length === 0;

  const handleValueUpdated = (newValue: string) => {
    // ReactQuill Textarea return <p><br></p> if empty.
    // To store empty, we have to check if html contains text or not.
    setValue(isHTMLValueEmpty(newValue) ? '' : newValue);
    setStartDebounce(true);
  };

  return (
    <TextEditor
      id={id}
      value={value}
      onChange={(newValue) => handleValueUpdated(newValue)}
      placeholderText={t('DESCRIPTION.PLACEHOLDER')}
    />
  );
};

export default DebouncedTextEditor;

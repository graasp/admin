import { type JSX, type MouseEvent, useState } from 'react';

import { IconButton, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

import { ChevronDown, LanguagesIcon } from 'lucide-react';

import { LANGS } from '@/config/langs';

type Props = {
  id?: string;
  lang: string;
  dense?: boolean;
  color?: string;
  onChange: (newLang: string) => void;
};

const values = Object.entries(LANGS).map(([value, text]) => ({
  value,
  text,
}));

const LanguageSwitch = ({
  id,
  lang: rawLang,
  onChange,
  color,
  dense = true,
}: Props): JSX.Element => {
  // we cast the language so we can use index signatures
  const lang = rawLang in LANGS ? (rawLang as keyof typeof LANGS) : 'en';
  const languageLabel = LANGS[lang];

  const handleChange = (newLang: string) => {
    onChange(newLang);
    setAnchorEl(null);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menu = (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      slotProps={{
        list: {
          'aria-labelledby': 'basic-button',
        },
      }}
    >
      {values.map(({ value, text }) => (
        <MenuItem
          key={value}
          id={value}
          value={value}
          onClick={() => handleChange(value)}
          selected={value === lang}
        >
          {text}
        </MenuItem>
      ))}
    </Menu>
  );

  if (dense) {
    return (
      <div id={id}>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ fontWeight: 'bold', color }}
        >
          <LanguagesIcon />
        </IconButton>
        {menu}
      </div>
    );
  }

  return (
    <div>
      <Button
        id={id}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<LanguagesIcon />}
        endIcon={<ChevronDown size={15} />}
        sx={{ fontWeight: 'bold', color }}
      >
        {languageLabel}
      </Button>
      {menu}
    </div>
  );
};

export default LanguageSwitch;

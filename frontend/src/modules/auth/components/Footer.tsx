import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

import LanguageSwitch from '@/components/ui/LanguageSwitch';

export function Footer() {
  const { i18n } = useTranslation();
  return (
    <Box
      display="flex"
      justifyContent="end"
      alignItems="center"
      flexDirection="column"
      width="100%"
    >
      <LanguageSwitch
        lang={i18n.language}
        onChange={(lang) => i18n.changeLanguage(lang)}
      />
      <Typography variant="caption" color="darkgrey">
        © Graasp 2014 - {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}

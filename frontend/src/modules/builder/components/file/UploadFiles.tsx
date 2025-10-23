import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

import { MAX_FILE_SIZE, formatFileSize } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { DASHBOARD_UPLOADER_ID } from '@/config/selectors';

import { BUILDER } from '../../langs';
import { FileUploader } from './FileUploader';

const FILE_UPLOAD_MAX_FILES = 15;

type Props = {
  onComplete: () => void;
};
const UploadFiles = ({ onComplete }: Props): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  return (
    <>
      <Typography variant="body1">
        {translateBuilder(BUILDER.UPLOAD_FILE_INFORMATIONS)}
      </Typography>
      <Typography variant="body1">
        {translateBuilder(BUILDER.UPLOAD_FILE_LIMITATIONS_TEXT, {
          maxFiles: FILE_UPLOAD_MAX_FILES,
          maxSize: formatFileSize(MAX_FILE_SIZE),
        })}
      </Typography>
      <Box id={DASHBOARD_UPLOADER_ID}>
        <FileUploader onComplete={onComplete} />
      </Box>
    </>
  );
};

export default UploadFiles;

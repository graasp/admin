import { type JSX, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Dialog, Stack, styled, useTheme } from '@mui/material';

import { ThumbnailSize } from '@graasp/sdk';

import { ImageUpIcon } from 'lucide-react';

import { useAuth } from '@/AuthContext';
import CropModal, { MODAL_TITLE_ARIA_LABEL_ID } from '@/components/CropModal';
import { AVATAR_SIZE, NS } from '@/config/constants';
import { hooks, mutations } from '@/config/queryClient';
import {
  AVATAR_UPLOAD_ICON_ID,
  AVATAR_UPLOAD_INPUT_ID,
  MEMBER_AVATAR_IMAGE_ID,
  MEMBER_AVATAR_WRAPPER_ID,
} from '@/config/selectors';

import { useUploadProgress } from './useUploadProgress';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const HoveredBox = styled(Stack)(
  ({ size, zIndex }: { size: number; zIndex: number }) => ({
    zIndex,
    alignItems: 'center',
    justifyContent: 'center',
    height: size,
    width: size,
    position: 'absolute',
    opacity: 0,
    transition: 'opacity 0.2s ease-in-out',
    ':hover': {
      opacity: 0.85,
    },
  }),
);

export function AvatarUploader(): JSX.Element {
  const { user } = useAuth();
  const uploadAvatar = mutations.useUploadAvatar();
  const { data: avatarUrl } = hooks.useAvatarUrl({
    id: user!.id,
    size: ThumbnailSize.Medium,
  });
  const { update } = useUploadProgress();
  const inputRef = useRef<HTMLInputElement>(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [fileSource, setFileSource] = useState<string>();
  const theme = useTheme();
  const { t } = useTranslation(NS.Account);

  const onSelectFile = ({ target }: { target: HTMLInputElement }) => {
    if (target.files && target.files?.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setFileSource(reader.result as string),
      );
      reader.readAsDataURL(target.files?.[0]);
      setShowCropModal(true);
    }
  };

  const onClose = () => {
    setShowCropModal(false);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const onConfirmCrop = (croppedImage: Blob | null): void => {
    onClose();

    if (!croppedImage) {
      console.error('croppedImage is not defined');
      return;
    }
    // submit cropped image
    try {
      uploadAvatar.mutate({ file: croppedImage, onUploadProgress: update });
    } catch (error) {
      console.error(error);
    }
  };

  const onEdit = () => {
    inputRef.current?.click();
  };

  return (
    <Stack justifyContent="flex-start" direction="column">
      <Stack
        id={MEMBER_AVATAR_WRAPPER_ID}
        onClick={onEdit}
        onKeyDown={(event) => {
          if (['Enter', ' '].includes(event.key)) {
            onEdit();
          }
        }}
        aria-label="change avatar"
        tabIndex={0}
        height={AVATAR_SIZE}
        width={AVATAR_SIZE}
        borderRadius={50}
        bgcolor="#E4DFFF"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        position="relative"
        sx={{ cursor: 'pointer' }}
      >
        <HoveredBox
          bgcolor={theme.palette.primary.main}
          size={AVATAR_SIZE}
          borderRadius={2}
          zIndex={theme.zIndex.drawer - 2}
        >
          <ImageUpIcon color={theme.palette.primary.contrastText} />
        </HoveredBox>
        {avatarUrl ? (
          <img
            id={MEMBER_AVATAR_IMAGE_ID}
            alt={t('PROFILE_AVATAR_CURRENT_ALT')}
            src={avatarUrl}
            height={AVATAR_SIZE}
            width={AVATAR_SIZE}
          />
        ) : (
          <ImageUpIcon
            id={AVATAR_UPLOAD_ICON_ID}
            color={theme.palette.primary.main}
          />
        )}
      </Stack>
      <VisuallyHiddenInput
        id={AVATAR_UPLOAD_INPUT_ID}
        type="file"
        accept="image/*"
        onChange={onSelectFile}
        ref={inputRef}
      />
      {fileSource && (
        <Dialog
          open={showCropModal}
          onClose={onClose}
          aria-labelledby={MODAL_TITLE_ARIA_LABEL_ID}
        >
          <CropModal
            onClose={onClose}
            src={fileSource}
            onConfirm={onConfirmCrop}
          />
        </Dialog>
      )}
    </Stack>
  );
}

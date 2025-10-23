export const MIN_SHORT_LINK_LENGTH = 6;
export const MAX_SHORT_LINK_LENGTH = 255;

export function randomString(length: number): string {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const random = Array.from({ length }, () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters.charAt(randomIndex);
  }).join('');

  return random;
}

export function randomAlias(length: number = MIN_SHORT_LINK_LENGTH): string {
  if (length < MIN_SHORT_LINK_LENGTH || length > MAX_SHORT_LINK_LENGTH)
    throw new Error(
      `Length must be between ${MIN_SHORT_LINK_LENGTH} and ${MAX_SHORT_LINK_LENGTH}`,
    );
  return randomString(length);
}

/**
 * Check that the given alias is valid.
 * If valid, it return an InvalidAliasCause interface with isValid = true.
 * Otherwise, it return the translation key of the cause of invalidation.
 *
 * @param alias The alias validate
 * @returns InvalidAliasCause interface containing informations about the invalidation.
 */
export function isValidAlias(alias: string) {
  const regex = /^[a-zA-Z0-9-]*$/;
  const aliasLength = alias.length;
  const invalidCharacters = alias.match(/[^a-zA-Z0-9-]/g);

  if (aliasLength < MIN_SHORT_LINK_LENGTH) {
    return {
      messageKey: 'SHORT_LINK_MIN_CHARS_ERROR' as const,
      data: MIN_SHORT_LINK_LENGTH,
      isValid: false,
    };
  }

  if (aliasLength > MAX_SHORT_LINK_LENGTH) {
    return {
      messageKey: 'SHORT_LINK_MIN_CHARS_ERROR' as const,
      data: MAX_SHORT_LINK_LENGTH,
      isValid: false,
    };
  }
  if (!regex.test(alias)) {
    return {
      messageKey: 'SHORT_LINK_INVALID_CHARS_ERROR' as const,
      data: invalidCharacters,
      isValid: false,
    };
  }

  return {
    isValid: true,
  };
}

export const MOCK_USE_SUGGESTIONS = ({ address }: { address: string }) => {
  if (address) {
    return {
      data: [
        { addressLabel: 'suggestion 1' },
        { addressLabel: 'suggestion 2' },
        { addressLabel: 'suggestion 3' },
      ],
    };
  }
  return { data: undefined };
};

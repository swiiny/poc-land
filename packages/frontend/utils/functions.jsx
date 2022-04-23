export const addDefaultSrc = (e) => {
  e.target.src = '';
};

export const formatAddress = (address) => {
  if (!address) {
    return '';
  }

  const visibleCount = 4;

  const prefixSeven = address.slice(0, visibleCount);
  const suffixSeven = address.slice(address.length - visibleCount - 1);

  return `${prefixSeven}...${suffixSeven}`;
};

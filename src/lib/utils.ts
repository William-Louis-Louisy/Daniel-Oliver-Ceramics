export function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export const emptyStringToUndefined = (value: unknown) => {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  return trimmed === '' ? undefined : trimmed;
};

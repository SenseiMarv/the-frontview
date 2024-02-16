export const twJoin = (...args: string[]) => {
  return args.filter(Boolean).join(' ');
};

export type InputProps = {
  newValue: string;
  value: string;
  setValue: (arg: string) => void;
  setError: (arg: string) => void;
  acceptHandler: () => void;
};

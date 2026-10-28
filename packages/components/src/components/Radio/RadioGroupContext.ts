import { createContext } from 'react';

export interface RadioGroupContextValue {
  name: string;
  value: string;
  required: boolean;
  select: (value: string) => void;
}

// RadioGroup이 내려주는 값. Radio와 RadioCard가 함께 읽는다(공개 API는 아님).
export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  'aria-label'?: string;
  className?: string;
}

export interface InputProps {
  value: number;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  'aria-label'?: string;
  className?: string;
}

export interface CounterState {
  count: number;
  step: number;
  isValidStep: boolean;
}

export interface HistoryEntry {
  id: string;
  operation: 'increment' | 'decrement' | 'reset';
  step: number;
  result: number;
  timestamp: number;
}

export interface HistoryState {
  entries: HistoryEntry[];
  canUndo: boolean;
  isHistoryVisible: boolean;
}

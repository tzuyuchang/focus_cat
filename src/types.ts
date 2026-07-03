export type FocusMode = {
  id: string;
  label: string;
  durationMinutes: number;
};

export type SessionResult = {
  modeLabel: string;
  durationMinutes: number;
  distractions: number;
};

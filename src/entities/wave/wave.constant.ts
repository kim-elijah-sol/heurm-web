export const DEFAULT_SELECTED_WAVE_NAME = 'Every' as const;

export const NONE_GROPING_WAVE_NAME = 'None Wave' as const;

export const FILTERING_WAVE_LIST = [
  {
    name: DEFAULT_SELECTED_WAVE_NAME,
  },
  {
    name: NONE_GROPING_WAVE_NAME,
  },
] as { name: string }[];

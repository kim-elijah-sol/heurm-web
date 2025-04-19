import { globalStyle } from '@macaron-css/core';

globalStyle('*, *::before, *::after', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
  fontSize: 16,
  WebkitFontSmoothing: 'antialiased',
});

globalStyle('button, input, textarea, select', {
  appearance: 'none',
  border: 'none',
  outline: 'none',
});

globalStyle('button', {
  cursor: 'pointer',
});

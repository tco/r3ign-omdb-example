import { measures, borderStyle, display, colors } from './definitions.js';

export const join = (...joinable) => [...joinable].join(' ');
export const compose = (...composable) => Object.assign({}, ...composable);
export const coloredBorder = color => join(measures.onePixel, borderStyle.solid, color);

export const media = {
    overflow:   'hidden',
    zoom:       1
};

export const blackContainer = {
    display: display.block,
    backgroundColor: colors.black,
    color: colors.white
};

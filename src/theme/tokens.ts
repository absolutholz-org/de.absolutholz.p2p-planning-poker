export const spacing = {
	lg: '1.5rem',
	md: '1rem',
	sm: '0.5rem',
	'sm-md': '0.75rem',
	xl: '2rem',
	xs: '0.25rem',
	xxl: '3rem',
} as const;

export const radius = {
	lg: '12px',
	md: '8px',
	pill: 'calc(infinity * 1px)',
	sm: '4px',
	xl: '16px',
	xxl: '24px',
} as const;

export const iconSizes = {
	lg: '1.5rem',
	md: '1.25rem',
	sm: '1rem',
	xl: '2rem',
	xs: '0.75rem',
	xxl: '3rem',
} as const;

export const fontSizes = {
	'2xl': '1.5rem',
	'3xl': '2.25rem',
	lg: '1.125rem',
	md: '1rem',
	sm: '0.875rem',
	xl: '1.25rem',
	xs: '0.75rem',
} as const;

export const shadows = {
	lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
	md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
	sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
	xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
} as const;

export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radius;
export type IconToken = keyof typeof iconSizes;
export type FontToken = keyof typeof fontSizes;
export type ShadowToken = keyof typeof shadows;

export const space = (s: SpacingToken) => `var(--sys-spacing-${s})`;
export const borderRadius = (r: RadiusToken) => `var(--sys-radius-${r})`;
export const iconSize = (i: IconToken) => `var(--sys-icon-size-${i})`;
export const fontSize = (f: FontToken) => `var(--sys-font-size-${f})`;
export const shadow = (s: ShadowToken) => `var(--sys-shadow-${s})`;

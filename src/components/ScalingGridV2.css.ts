import { createVar, globalStyle, style } from '@vanilla-extract/css';

const appPadding = createVar('appPadding');
const appGap = createVar('appGap');

const fontXs = createVar('fontXs');
const fontSm = createVar('fontSm');
const fontMd = createVar('fontMd');
const fontLg = createVar('fontLg');

const radiusSm = createVar('radiusSm');
const radiusMd = createVar('radiusMd');

const controlPaddingX = createVar('controlPaddingX');
const controlGap = createVar('controlGap');
const gridRowHeight = createVar('gridRowHeight');

const ratioLabelWidth = createVar('ratioLabelWidth');
const ratioUnitWidth = createVar('ratioUnitWidth');
const ratioDeleteWidth = createVar('ratioDeleteWidth');

/*
 * Modern dashboard palette (Linear / Vercel / GitHub Dark inspired).
 * Three layers: canvas → surfaces → recessed inputs.
 * Section groups use stepped surfaces + semantic stripe accents.
 */
const colorBg = createVar('colorBg');
const colorBgGradient = createVar('colorBgGradient');
const colorSurface = createVar('colorSurface');
const colorInputBg = createVar('colorInputBg');
const colorText = createVar('colorText');
const colorTextHeading = createVar('colorTextHeading');
const colorBorder = createVar('colorBorder');
const colorInputBorder = createVar('colorInputBorder');
const colorAccent = createVar('colorAccent');
const colorAccentBg = createVar('colorAccentBg');
const colorActionBorder = createVar('colorActionBorder');
const colorFocus = createVar('colorFocus');
const colorShadow = createVar('colorShadow');
const colorOnAccent = createVar('colorOnAccent');
const colorGroupResultSurface = createVar('colorGroupResultSurface');
const colorGroupResultStripe = createVar('colorGroupResultStripe');
const colorGroupInputSurface = createVar('colorGroupInputSurface');
const colorGroupInputStripe = createVar('colorGroupInputStripe');
const colorGroupRecipeSurface = createVar('colorGroupRecipeSurface');
const colorGroupBinderSurface = createVar('colorGroupBinderSurface');
const colorGroupBinderStripe = createVar('colorGroupBinderStripe');
const colorGroupAdditiveSurface = createVar('colorGroupAdditiveSurface');
const colorGroupAdditiveStripe = createVar('colorGroupAdditiveStripe');
const colorResultCard = createVar('colorResultCard');
const colorResultDisclosure = createVar('colorResultDisclosure');
const colorResultValue = createVar('colorResultValue');
const colorGroupTotalSurface = createVar('colorGroupTotalSurface');
const colorWarning = createVar('colorWarning');
const colorComponentA = createVar('colorComponentA');
const colorComponentB = createVar('colorComponentB');
const colorComponentC = createVar('colorComponentC');
const colorComponentD = createVar('colorComponentD');
const colorComponentSand = createVar('colorComponentSand');

/** Light — clean dashboard (Vercel-style) */
const themeVarsLight = {
  [colorBg]: '#F4F6F9',
  [colorBgGradient]: '#E9EEF4',
  [colorSurface]: '#FFFFFF',
  [colorInputBg]: '#F8FAFC',
  [colorText]: '#64748B',
  [colorTextHeading]: '#0F172A',
  [colorBorder]: '#E2E8F0',
  [colorInputBorder]: '#CBD5E1',
  [colorAccent]: '#2563EB',
  [colorAccentBg]: 'rgba(37, 99, 235, 0.1)',
  [colorActionBorder]: '#1D4ED8',
  [colorFocus]: '#3B82F6',
  [colorShadow]: '0 2px 8px rgba(15, 23, 42, 0.06), 0 8px 20px rgba(15, 23, 42, 0.08)',
  [colorOnAccent]: '#FFFFFF',
  [colorGroupResultSurface]: '#EEF2F7',
  [colorGroupResultStripe]: '#0EA5E9',
  [colorGroupInputSurface]: '#FFFFFF',
  [colorGroupInputStripe]: '#2563EB',
  [colorGroupRecipeSurface]: '#F8FAFC',
  [colorGroupBinderSurface]: '#F8FAFC',
  [colorGroupBinderStripe]: '#2563EB',
  [colorGroupAdditiveSurface]: '#E2E8F0',
  [colorGroupAdditiveStripe]: '#2563EB',
  [colorResultCard]: '#F1F5F9',
  [colorResultValue]: '#0F172A',
  [colorResultDisclosure]: '#2563EB',
  [colorGroupTotalSurface]: '#E2E8F0',
  [colorWarning]: '#EA580C',
  [colorComponentA]: '#2563EB',
  [colorComponentB]: '#10B981',
  [colorComponentC]: '#8B5CF6',
  [colorComponentD]: '#64748B',
  [colorComponentSand]: '#94A3B8',
};

/** Dark — mockup-inspired dashboard */
const themeVarsDark = {
  [colorBg]: '#0B1220',
  [colorBgGradient]: '#0D1524',
  [colorSurface]: '#121C2B',
  [colorInputBg]: '#0A121F',
  [colorText]: '#93A4BC',
  [colorTextHeading]: '#F8FAFC',
  [colorBorder]: '#27374D',
  [colorInputBorder]: '#32435D',
  [colorAccent]: '#3B82F6',
  [colorAccentBg]: 'rgba(59, 130, 246, 0.12)',
  [colorActionBorder]: '#2563EB',
  [colorFocus]: '#3B82F6',
  [colorShadow]: '0 2px 8px rgba(0, 0, 0, 0.25), 0 12px 32px rgba(0, 0, 0, 0.35)',
  [colorOnAccent]: '#FFFFFF',
  [colorGroupResultSurface]: '#161F30',
  [colorGroupResultStripe]: '#3B82F6',
  [colorGroupInputSurface]: '#121C2B',
  [colorGroupInputStripe]: '#3B82F6',
  [colorGroupRecipeSurface]: '#131D2C',
  [colorGroupBinderSurface]: '#151E2D',
  [colorGroupBinderStripe]: '#3B82F6',
  [colorGroupAdditiveSurface]: '#101826',
  [colorGroupAdditiveStripe]: '#3B82F6',
  [colorResultCard]: '#0A121F',
  [colorResultValue]: '#F8FAFC',
  [colorResultDisclosure]: '#3B82F6',
  [colorGroupTotalSurface]: '#0D1624',
  [colorWarning]: '#FB923C',
  [colorComponentA]: '#3B82F6',
  [colorComponentB]: '#34D399',
  [colorComponentC]: '#A78BFA',
  [colorComponentD]: '#94A3B8',
  [colorComponentSand]: '#C4B5A0',
};

const themeRoot = {
  vars: themeVarsDark,
  '@media': {
    '(prefers-color-scheme: light)': {
      vars: themeVarsLight,
    },
  },
};

globalStyle('html, body, #root', {
  margin: 0,
  width: '100%',
  minHeight: '100%',
});

globalStyle('body', {
  overflow: 'hidden',
});

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});

globalStyle('button, input, select', {
  font: 'inherit',
});

const areaBase = style({
  minWidth: 0,
  minHeight: 0,
  overflow: 'hidden',
});

const fullAreaGrid = style({
  width: '100%',
  height: '100%',
  minWidth: 0,
  minHeight: 0,
  display: 'grid',
});

export const pageFrame = style([
  themeRoot,
  {
    width: '100%',
    minHeight: '100dvh',
    display: 'grid',
    placeItems: 'center',
    background: `linear-gradient(180deg, ${colorBg} 0%, ${colorBgGradient} 100%)`,
    color: colorText,
    fontFamily:
      '"Inter", "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
  },
]);

export const mobileViewport = style([
  themeRoot,
  {
    width: 'min(100vw, 430px)',
    height: 'min(100dvh, 932px)',

    containerName: 'app',
    containerType: 'size',

    overflow: 'hidden',
    background: `linear-gradient(180deg, ${colorBg} 0%, ${colorBgGradient} 100%)`,
  },
]);

export const appScrollLayer = style({
  width: '100%',
  height: '100%',
  overflow: 'hidden',

  '@container': {
    'app (min-aspect-ratio: 1 / 1)': {
      overflowY: 'auto',
      overflowX: 'hidden',
    },
  },
});

export const calculatorGrid = style({
  width: '100%',
  minHeight: '100%',
  height: '100%',

  display: 'grid',
  gridTemplateRows: 'repeat(15, minmax(0, 1fr))',

  padding: appPadding,
  gap: appGap,

  vars: {
    [appPadding]: 'clamp(8px, min(3cqw, 1.6cqh), 14px)',
    [appGap]: 'clamp(4px, min(1.4cqw, 0.8cqh), 8px)',

    [fontXs]: 'clamp(10px, min(2.6cqw, 1.55cqh), 12px)',
    [fontSm]: 'clamp(11px, min(3cqw, 1.8cqh), 14px)',
    [fontMd]: 'clamp(12px, min(3.6cqw, 2.15cqh), 16px)',
    [fontLg]: 'clamp(17px, min(5.6cqw, 3.2cqh), 26px)',

    [radiusSm]: 'clamp(6px, min(1.8cqw, 1cqh), 10px)',
    [radiusMd]: 'clamp(8px, min(2.4cqw, 1.4cqh), 14px)',

    [controlPaddingX]: 'clamp(8px, min(3cqw, 1.6cqh), 14px)',
    [controlGap]: 'clamp(3px, min(1.1cqw, 0.7cqh), 7px)',
    [gridRowHeight]: `calc((100cqh - 2 * ${appPadding} - 14 * ${appGap}) / 15)`,

    [ratioLabelWidth]: 'clamp(26px, 9cqw, 40px)',
    [ratioUnitWidth]: 'clamp(40px, 13cqw, 58px)',
    [ratioDeleteWidth]: 'clamp(24px, 7cqw, 32px)',
  },

  '@container': {
    'app (min-aspect-ratio: 9 / 16)': {
      vars: {
        [appPadding]: 'clamp(6px, min(2.4cqw, 1.3cqh), 12px)',
        [appGap]: 'clamp(3px, min(1cqw, 0.6cqh), 6px)',

        [fontXs]: 'clamp(9px, min(2.3cqw, 1.45cqh), 11px)',
        [fontSm]: 'clamp(10px, min(2.6cqw, 1.6cqh), 13px)',
        [fontMd]: 'clamp(11px, min(3cqw, 1.85cqh), 15px)',
        [fontLg]: 'clamp(15px, min(4.6cqw, 2.7cqh), 23px)',
      },
    },

    'app (min-aspect-ratio: 3 / 4)': {
      vars: {
        [appPadding]: 'clamp(5px, min(2cqw, 1cqh), 10px)',
        [appGap]: 'clamp(2px, min(0.8cqw, 0.5cqh), 5px)',

        [fontXs]: 'clamp(8px, min(2cqw, 1.2cqh), 10px)',
        [fontSm]: 'clamp(9px, min(2.3cqw, 1.4cqh), 12px)',
        [fontMd]: 'clamp(10px, min(2.7cqw, 1.65cqh), 14px)',
        [fontLg]: 'clamp(14px, min(4cqw, 2.4cqh), 21px)',
      },
    },

    'app (min-aspect-ratio: 1 / 1)': {
      minHeight: '667px',
    },
  },
});

export const headerArea = style([
  areaBase,
  {
    gridRow: 'span 1',
    display: 'grid',
    placeItems: 'center',
  },
]);

export const resultsSectionGroup = style([
  areaBase,
  {
    gridRow: 'span 5',
    display: 'grid',
    gridTemplateRows: 'minmax(0, 0.8fr) minmax(0, 3fr) minmax(0, 1.2fr)',
    gap: controlGap,

    background: colorGroupResultSurface,
    border: `1px solid ${colorBorder}`,
    borderLeft: `4px solid ${colorGroupResultStripe}`,
    borderRadius: radiusMd,
    boxShadow: colorShadow,
    padding: 'clamp(4px, min(1.1cqw, 0.65cqh), 7px)',
  },
]);

export const resultsSectionDisclosureSlot = style({
  minWidth: 0,
  minHeight: 0,
});

export const resultsSectionRowsSlot = style({
  minWidth: 0,
  minHeight: 0,

  paddingTop: controlGap,
  borderTop: `1px solid ${colorBorder}`,
});

export const resultsSectionTotalSlot = style({
  minWidth: 0,
  minHeight: 0,

  paddingTop: controlGap,
  borderTop: `1px solid ${colorBorder}`,
});

export const knownInputGroup = style([
  areaBase,
  {
    gridRow: 'span 2',
    display: 'grid',
    gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
    gap: controlGap,
    overflow: 'visible',
    position: 'relative',
    zIndex: 30,

    background: colorGroupInputSurface,
    border: `1px solid ${colorBorder}`,
    borderLeft: `3px solid ${colorAccent}`,
    borderRadius: radiusMd,
    boxShadow: colorShadow,
    padding: 'clamp(4px, min(1.1cqw, 0.65cqh), 7px)',
  },
]);

export const knownInputGroupSelectSlot = style([
  fullAreaGrid,
  {
    minWidth: 0,
    minHeight: 0,
    overflow: 'visible',
  },
]);

export const knownInputGroupWeightRow = style({
  minWidth: 0,
  minHeight: 0,

  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.28fr)',
  gap: appGap,

  paddingTop: controlGap,
  borderTop: `1px solid ${colorBorder}`,
});

export const recipeSectionGroup = style([
  areaBase,
  {
    gridRow: 'span 1',
    display: 'grid',
    overflow: 'visible',
    position: 'relative',
    zIndex: 35,

    background: colorGroupRecipeSurface,
    border: `1px solid ${colorBorder}`,
    borderLeft: `3px solid ${colorAccent}`,
    borderRadius: radiusMd,
    boxShadow: colorShadow,
    padding: 'clamp(4px, min(1.1cqw, 0.65cqh), 7px)',
  },
]);

export const recipeSectionSelectSlot = style([
  fullAreaGrid,
  {
    minWidth: 0,
    minHeight: 0,
    overflow: 'visible',
  },
]);

export const binderSectionGroup = style([
  areaBase,
  {
    gridRow: 'span 3',
    display: 'grid',
    gridTemplateRows: 'minmax(0, 2fr) minmax(0, 1fr)',
    gap: controlGap,

    background: colorGroupBinderSurface,
    border: `1px solid ${colorBorder}`,
    borderLeft: `3px solid ${colorAccent}`,
    borderRadius: radiusMd,
    boxShadow: colorShadow,
    padding: 'clamp(4px, min(1.1cqw, 0.65cqh), 7px)',
  },
]);

export const binderSectionRatioSlot = style({
  minWidth: 0,
  minHeight: 0,
  height: '100%',
});

export const additiveSectionGroup = style([
  areaBase,
  {
    gridRow: 'span 3',
    display: 'grid',
    gridTemplateRows: 'minmax(0, 2fr) minmax(0, 1fr)',
    gap: controlGap,
    overflow: 'visible',
    position: 'relative',
    zIndex: 40,

    background: colorGroupAdditiveSurface,
    border: `1px solid ${colorBorder}`,
    borderLeft: `3px solid ${colorAccent}`,
    borderRadius: radiusMd,
    boxShadow: colorShadow,
    padding: 'clamp(4px, min(1.1cqw, 0.65cqh), 7px)',
  },
]);

export const additiveSectionRatioSlot = style({
  minWidth: 0,
  minHeight: 0,
  height: '100%',
});

export const sectionGroupActionSlot = style([
  fullAreaGrid,
  {
    minWidth: 0,
    minHeight: 0,
    overflow: 'visible',

    paddingTop: controlGap,
    borderTop: `1px solid ${colorBorder}`,
  },
]);

export const appTitle = style({
  margin: 0,
  maxWidth: '100%',

  fontSize: fontLg,
  lineHeight: 1,
  fontWeight: 600,
  color: colorTextHeading,

  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const controlBase = style({
  minWidth: 0,
  minHeight: 0,
  width: '100%',
  height: '100%',

  border: 0,
  borderRadius: radiusMd,
  paddingInline: controlPaddingX,

  fontSize: fontMd,
  lineHeight: 1.15,
  fontWeight: 750,

  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const inputControlBase = style({
  minWidth: 0,
  minHeight: 0,
  width: '100%',
  height: '100%',

  border: `2px solid ${colorInputBorder}`,
  borderRadius: radiusMd,
  paddingInline: controlPaddingX,

  background: colorInputBg,
  color: colorTextHeading,
  caretColor: colorFocus,

  fontSize: fontMd,
  lineHeight: 1.15,
  fontWeight: 600,
  textAlign: 'center',

  selectors: {
    '&:focus': {
      outline: 'none',
      borderColor: colorFocus,
    },
    '&:disabled': {
      opacity: 0.55,
      cursor: 'not-allowed',
    },
  },
});

const cardSurfaceBase = {
  background: colorSurface,
  border: `1px solid ${colorBorder}`,
  boxShadow: colorShadow,
};

export const resultDisclosureControl = style([
  controlBase,
  {
    background: colorResultCard,
    color: colorResultDisclosure,
    fontSize: fontSm,
    fontWeight: 600,
    border: `1px solid ${colorBorder}`,
    boxShadow: 'none',
  },
]);

export const fullRowSelectControl = style([
  controlBase,
  {
    ...cardSurfaceBase,
    color: colorTextHeading,
  },
]);

export const weightInputControl = style([inputControlBase]);

export const weightUnitLabel = style({
  minWidth: 0,
  height: '100%',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  fontSize: fontMd,
  lineHeight: 1.15,
  fontWeight: 600,
  color: colorTextHeading,
});

export const selectActionControl = style([
  controlBase,
  {
    background: colorAccent,
    color: colorOnAccent,
    fontWeight: 600,
    border: `1px solid ${colorActionBorder}`,
    boxShadow: 'none',
  },
]);

export const selectActionOutlineControl = style([
  controlBase,
  {
    background: 'transparent',
    color: colorAccent,
    fontWeight: 600,
    border: `1px solid ${colorAccent}`,
    boxShadow: 'none',

    selectors: {
      '&:disabled': {
        opacity: 0.45,
        cursor: 'not-allowed',
      },
    },
  },
]);

export const selectSurfaceControl = style([
  controlBase,
  {
    background: colorInputBg,
    color: colorTextHeading,
    fontWeight: 600,
    border: `1px solid ${colorInputBorder}`,
    boxShadow: 'none',
  },
]);

export const resultRowsGrid = style({
    minWidth: 0,
    minHeight: 0,
    height: '100%',
  
    display: 'grid',
    gap: appGap,
  
    selectors: {
      '&:has(> :nth-child(1):last-child)': {
        gridTemplateRows: 'minmax(0, 1fr)',
      },
  
      '&:has(> :nth-child(2):last-child)': {
        gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
      },
    },
  });
  
  const resultRowBase = style({
    minWidth: 0,
    minHeight: 0,
    height: '100%',
  
    display: 'grid',
    gap: appGap,
  
    selectors: {
      '&:has(> :nth-child(1):last-child)': {
        gridTemplateColumns: 'minmax(0, 1fr)',
      },
  
      '&:has(> :nth-child(2):last-child)': {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      },
  
      '&:has(> :nth-child(3):last-child)': {
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      },
  
      '&:has(> :nth-child(4):last-child)': {
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
      },
    },
  });
  
  export const binderResultRow = style([resultRowBase]);
  
  export const additiveResultRow = style([resultRowBase]);

export const resultCard = style({
  minWidth: 0,
  minHeight: 0,
  height: '100%',

  display: 'grid',
  gridTemplateRows: 'minmax(0, 0.8fr) minmax(0, 1.4fr) minmax(0, 0.8fr)',
  alignItems: 'center',
  justifyItems: 'stretch',

  borderRadius: radiusMd,
  padding: 'clamp(3px, min(1cqw, 0.6cqh), 6px)',

  ...cardSurfaceBase,
  color: colorTextHeading,

  overflow: 'hidden',
});

export const resultCardHeader = style({
  width: '100%',
  minWidth: 0,
  alignSelf: 'stretch',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: controlGap,
});

export const resultCardHeaderTitle = style({
  minWidth: 0,
  flex: '1 1 auto',

  fontSize: fontXs,
  lineHeight: 1,
  fontWeight: 600,
  textAlign: 'left',
  color: colorTextHeading,

  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const componentLabelBase = {
  display: 'flex',
  alignItems: 'center',
  gap: controlGap,
  minWidth: 0,
  flex: '1 1 auto',
  fontSize: fontXs,
  lineHeight: 1,
  fontWeight: 600,
  textAlign: 'left' as const,
  whiteSpace: 'nowrap' as const,
  overflow: 'hidden',
  textOverflow: 'ellipsis' as const,
};

export const binderLabelA = style([
  componentLabelBase,
  {
    color: colorComponentA,
    selectors: {
      '&::before': {
        content: '""',
        width: 'clamp(5px, min(1.4cqw, 0.8cqh), 7px)',
        height: 'clamp(5px, min(1.4cqw, 0.8cqh), 7px)',
        borderRadius: '50%',
        background: colorComponentA,
        flexShrink: 0,
      },
    },
  },
]);

export const binderLabelB = style([
  componentLabelBase,
  {
    color: colorComponentB,
    selectors: {
      '&::before': {
        content: '""',
        width: 'clamp(5px, min(1.4cqw, 0.8cqh), 7px)',
        height: 'clamp(5px, min(1.4cqw, 0.8cqh), 7px)',
        borderRadius: '50%',
        background: colorComponentB,
        flexShrink: 0,
      },
    },
  },
]);

export const binderLabelC = style([
  componentLabelBase,
  {
    color: colorComponentC,
    selectors: {
      '&::before': {
        content: '""',
        width: 'clamp(5px, min(1.4cqw, 0.8cqh), 7px)',
        height: 'clamp(5px, min(1.4cqw, 0.8cqh), 7px)',
        borderRadius: '50%',
        background: colorComponentC,
        flexShrink: 0,
      },
    },
  },
]);

export const binderLabelD = style([
  componentLabelBase,
  {
    color: colorComponentD,
    selectors: {
      '&::before': {
        content: '""',
        width: 'clamp(5px, min(1.4cqw, 0.8cqh), 7px)',
        height: 'clamp(5px, min(1.4cqw, 0.8cqh), 7px)',
        borderRadius: '50%',
        background: colorComponentD,
        flexShrink: 0,
      },
    },
  },
]);

export const additiveLabelSand = style([
  componentLabelBase,
  {
    color: colorComponentSand,
    textTransform: 'capitalize',
  },
]);

export const resultCardDeleteButton = style({
  flex: '0 0 auto',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  padding: 0,
  border: 'none',
  background: 'transparent',
  boxShadow: 'none',
  appearance: 'none',
  color: colorText,
  cursor: 'pointer',
  lineHeight: 0,

  selectors: {
    '&:disabled': {
      opacity: 0.25,
      cursor: 'default',
    },
    '&:not(:disabled):hover': {
      color: colorTextHeading,
    },
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      outline: `2px solid ${colorFocus}`,
      outlineOffset: '2px',
      borderRadius: radiusSm,
    },
  },
});

export const resultCardDeleteIcon = style({
  display: 'block',
  flexShrink: 0,
});


export const resultOutputCard = style({
  minWidth: 0,
  minHeight: 0,
  height: '100%',

  display: 'grid',
  gridTemplateRows: 'minmax(0, 0.8fr) minmax(0, 1.4fr) minmax(0, 0.8fr)',
  alignItems: 'center',
  justifyItems: 'stretch',

  borderRadius: radiusMd,
  padding: 'clamp(3px, min(1cqw, 0.6cqh), 6px)',

  background: colorResultCard,
  border: `2px solid ${colorInputBorder}`,
  boxShadow: 'none',
  color: colorText,

  overflow: 'hidden',
  userSelect: 'text',
});

export const resultOutputTotalCard = style({
  minWidth: 0,
  minHeight: 0,
  height: '100%',

  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) auto',
  alignItems: 'center',
  gap: controlGap,

  borderRadius: radiusMd,
  paddingInline: controlPaddingX,

  background: colorGroupTotalSurface,
  border: `1px solid ${colorBorder}`,
  boxShadow: 'none',
  color: colorText,

  overflow: 'hidden',
  userSelect: 'text',
});

export const resultOutputLabel = style({
  minWidth: 0,
  maxWidth: '100%',

  fontSize: fontXs,
  lineHeight: 1,
  fontWeight: 600,
  color: colorText,

  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const resultOutputValue = style({
  minWidth: 0,
  maxWidth: '100%',

  fontSize: fontMd,
  lineHeight: 1,
  fontWeight: 700,
  color: colorResultValue,
  fontVariantNumeric: 'tabular-nums',

  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const resultOutputUnit = style({
  minWidth: 0,
  maxWidth: '100%',

  fontSize: fontXs,
  lineHeight: 1,
  fontWeight: 600,
  color: colorText,

  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const resultOutputTotalValue = style([
  resultOutputValue,
  {
    fontSize: fontLg,
    fontWeight: 750,
  },
]);

export const totalResultCard = style({
  minWidth: 0,
  minHeight: 0,
  height: '100%',

  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) auto',
  alignItems: 'center',
  gap: controlGap,

  borderRadius: radiusMd,
  paddingInline: controlPaddingX,

  ...cardSurfaceBase,
  color: colorTextHeading,

  overflow: 'hidden',
});

export const resultLabel = style({
  minWidth: 0,
  maxWidth: '100%',

  fontSize: fontXs,
  lineHeight: 1,
  fontWeight: 600,
  color: colorText,

  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const resultValue = style({
  minWidth: 0,
  maxWidth: '100%',

  fontSize: fontMd,
  lineHeight: 1,
  fontWeight: 600,
  color: colorTextHeading,

  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const resultUnit = style({
  minWidth: 0,
  maxWidth: '100%',

  fontSize: fontXs,
  lineHeight: 1,
  fontWeight: 600,
  color: colorText,

  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});


export const controlRowsGrid = style({
    minWidth: 0,
    minHeight: 0,
    height: '100%',
  
    display: 'grid',
    gap: appGap,
  
    selectors: {
      '&:has(> :nth-child(1):last-child)': {
        gridTemplateRows: 'minmax(0, 1fr)',
      },
  
      '&:has(> :nth-child(2):last-child)': {
        gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
      },
    },
});

/* Control Four Columns Row */
const controlFourColumnsRowBase = style({
    minWidth: 0,
    minHeight: 0,
    height: '100%',
  
    display: 'grid',
    gap: appGap,
  
    selectors: {
      '&:has(> :nth-child(1):last-child)': {
        gridTemplateColumns: 'minmax(0, 1fr)',
      },
  
      '&:has(> :nth-child(2):last-child)': {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      },
  
      '&:has(> :nth-child(3):last-child)': {
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      },
  
      '&:has(> :nth-child(4):last-child)': {
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
      },
    },
  });
  
  export const binderControlFourColumnsRow = style([controlFourColumnsRowBase]);

  export const binderControlRowWithSeparators = style({
    minWidth: 0,
    minHeight: 0,
    height: '100%',

    display: 'flex',
    alignItems: 'stretch',
    gap: appGap,
  });

  export const binderRatioCardSlot = style({
    flex: '1 1 0',
    minWidth: 0,
    minHeight: 0,
  });

  export const binderRatioSeparator = style({
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    fontSize: fontMd,
    lineHeight: 1,
    fontWeight: 600,
    color: colorText,
  });

  export const additiveControlRow = style({
    minWidth: 0,
    minHeight: 0,
    height: '100%',

    display: 'flex',
    alignItems: 'stretch',
    gap: appGap,
  });

  export const additiveRatioCardSlot = style({
    flex: '1 1 0',
    minWidth: 0,
    minHeight: 0,
  });
  
  export const additiveControlFourColumnsRow = style([controlFourColumnsRowBase]);

/* Ratio Control Four Columns */

export const ratioMaxFourGrid = style({
  width: '100%',
  height: '100%',
  minWidth: 0,
  minHeight: 0,

  display: 'grid',
  gap: appGap,

  selectors: {
    '&:has(> :nth-child(1):last-child)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
      gridTemplateRows: 'minmax(0, 1fr)',
    },

    '&:has(> :nth-child(2):last-child)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
      gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
    },

    '&:has(> :nth-child(3):last-child)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
    },

    '&:has(> :nth-child(4):last-child)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
    },
  },
});

export const ratioEmptyState = style({
  minWidth: 0,
  minHeight: 0,
  height: '100%',

  display: 'grid',
  placeItems: 'center',

  borderRadius: radiusMd,
  paddingInline: controlPaddingX,

  ...cardSurfaceBase,

  fontSize: fontSm,
  fontWeight: 600,
  lineHeight: 1,
  color: colorText,

  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const ratioControlFourColumns = style({
  minWidth: 0,
  minHeight: 0,
  height: '100%',

  display: 'grid',
  gridTemplateColumns: `${ratioLabelWidth} minmax(0, 1fr) ${ratioUnitWidth} ${ratioDeleteWidth}`,
  alignItems: 'center',
  gap: controlGap,

  borderRadius: radiusMd,
  padding: 'clamp(3px, min(1cqw, 0.6cqh), 6px)',

  ...cardSurfaceBase,

  overflow: 'hidden',

  selectors: {
    [`${ratioMaxFourGrid}:has(> :nth-child(3):last-child) > &:nth-child(3)`]:
      {
        gridColumn: '1 / -1',
      },
  },
});

export const ratioControlThreeColumns = style({
    minWidth: 0,
    minHeight: 0,
    height: '100%',
  
    display: 'grid',
    gridTemplateColumns: `minmax(0, 1fr) ${ratioUnitWidth} ${ratioDeleteWidth}`,
    alignItems: 'center',
    gap: controlGap,
  
    borderRadius: radiusMd,
    padding: 'clamp(3px, min(1cqw, 0.6cqh), 6px)',
  
    ...cardSurfaceBase,
  
    overflow: 'hidden',
  
    selectors: {
      [`${ratioMaxFourGrid}:has(> :nth-child(3):last-child) > &:nth-child(3)`]:
        {
          gridColumn: '1 / -1',
        },
    },
  });

const ratioSegmentBase = style({
  minWidth: 0,
  minHeight: 0,
  width: '100%',
  height: '100%',

  border: 0,
  borderRadius: radiusSm,

  fontSize: fontSm,
  lineHeight: 1.15,
  fontWeight: 850,

  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const ratioLabelSegment = style([
  ratioSegmentBase,
  {
    background: colorAccentBg,
    color: colorTextHeading,
  },
]);

export const ratioValueInput = style([
  inputControlBase,
  {
    borderRadius: radiusSm,
    padding: 0,
  },
]);

export const ratioUnitSegment = style([
  ratioSegmentBase,
  {
    background: colorAccentBg,
    color: colorTextHeading,
  },
]);

export const ratioDeleteSegment = style([
  ratioSegmentBase,
  {
    background: colorSurface,
    color: colorText,

    selectors: {
      '&:disabled': {
        opacity: 0.25,
      },
    },
  },
]);

export const appSelectRoot = style({
    width: '100%',
    height: '100%',
    minWidth: 0,
    minHeight: 0,
  
    position: 'relative',
    overflow: 'visible',
  
    selectors: {
      '&:focus-within': {
        zIndex: 100,
      },
    },
  });

export const appSelectRootOpen = style({
  zIndex: 200,
});
  
  export const appSelectTrigger = style([
  selectActionOutlineControl,
  {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    transition: 'box-shadow 120ms ease, border-color 120ms ease',
  },
]);

export const appSelectTriggerOpen = style({
  outline: 'none',
  borderColor: colorAccent,
  boxShadow: `0 0 0 3px ${colorAccentBg}`,
});
  
  export const appSelectTriggerText = style({
    minWidth: 0,
    maxWidth: '100%',
    width: '100%',
  
    textAlign: 'center',
  
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });
  
  export const appSelectChevron = style({
    position: 'absolute',
    right: controlPaddingX,
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: fontSm,
    lineHeight: 1.15,
    opacity: 0.75,
    transition: 'transform 120ms ease',
  });

export const appSelectChevronOpen = style({
  transform: 'translateY(-50%) rotate(180deg)',
});
  
  export const appSelectPanel = style({
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1000,

    display: 'grid',
    gap: controlGap,

    padding: appGap,
    borderRadius: radiusMd,

    background: colorSurface,
    border: `1px solid ${colorAccent}`,
    boxShadow: colorShadow,

    maxHeight: `min(calc(6 * ${gridRowHeight} + 5 * ${controlGap} + 2 * ${appPadding}), 55cqh)`,
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
  });
  
  export const appSelectPanelDown = style({
    top: `calc(100% + ${appGap})`,
  });
  
  export const appSelectPanelUp = style({
    bottom: `calc(100% + ${appGap})`,
  });

export const appSelectPanelOpen = style({
  border: `2px solid ${colorAccent}`,
  boxShadow: `${colorShadow}, 0 0 0 3px ${colorAccentBg}`,
});

export const appSelectPanelHeading = style({
  minHeight: gridRowHeight,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingInline: controlPaddingX,

  fontSize: fontXs,
  lineHeight: 1.15,
  fontWeight: 600,
  textAlign: 'center',
  color: colorText,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
});
  
  export const appSelectOption = style([
    selectActionOutlineControl,
    {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: gridRowHeight,
      minHeight: gridRowHeight,
      paddingBlock: 0,
      fontSize: fontMd,
      lineHeight: 1.15,
      fontWeight: 600,
      textAlign: 'center',

      selectors: {
        '&[aria-selected="true"]': {
          background: colorAccentBg,
          color: colorAccent,
          borderColor: colorAccent,
        },
        '&:hover': {
          background: colorAccentBg,
        },
      },
    },
  ]);
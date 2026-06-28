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

const ratioLabelWidth = createVar('ratioLabelWidth');
const ratioUnitWidth = createVar('ratioUnitWidth');
const ratioDeleteWidth = createVar('ratioDeleteWidth');

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

export const pageFrame = style({
  width: '100%',
  minHeight: '100dvh',
  display: 'grid',
  placeItems: 'center',
  background: '#111',
  fontFamily:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
});

export const mobileViewport = style({
  width: 'min(100vw, 430px)',
  height: 'min(100dvh, 932px)',

  containerName: 'app',
  containerType: 'size',

  overflow: 'hidden',
  background: '#f3f3f3',
});

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

export const resultsArea = style([
  areaBase,
  {
    gridRow: 'span 5',
    display: 'grid',
    gridTemplateRows: 'minmax(0, 0.8fr) minmax(0, 3fr) minmax(0, 1.2fr)',
    gap: appGap,
  },
]);

export const knownComponentArea = style([
    areaBase,
    fullAreaGrid,
    {
      gridRow: 'span 1',
      overflow: 'visible',
      position: 'relative',
      zIndex: 30,
    },
  ]);

export const knownWeightArea = style([
  areaBase,
  {
    gridRow: 'span 1',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.28fr)',
    gap: appGap,
  },
]);

export const recipeArea = style([
    areaBase,
    fullAreaGrid,
    {
      gridRow: 'span 1',
      overflow: 'visible',
      position: 'relative',
      zIndex: 20,
    },
  ]);

export const binderRatioArea = style([
  areaBase,
  {
    gridRow: 'span 2',
  },
]);

export const binderActionArea = style([
  areaBase,
  fullAreaGrid,
  {
    gridRow: 'span 1',
  },
]);

export const additiveRatioArea = style([
  areaBase,
  {
    gridRow: 'span 2',
  },
]);

export const additiveActionArea = style([
    areaBase,
    fullAreaGrid,
    {
      gridRow: 'span 1',
      overflow: 'visible',
      position: 'relative',
      zIndex: 40,
    },
  ]);

export const appTitle = style({
  margin: 0,
  maxWidth: '100%',

  fontSize: fontLg,
  lineHeight: 1,
  fontWeight: 850,

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

  border: '2px solid #dcdcdc',
  borderRadius: radiusMd,
  paddingInline: controlPaddingX,

  background: '#ffffff',
  color: '#111',

  fontSize: fontMd,
  lineHeight: 1.15,
  fontWeight: 750,
  textAlign: 'center',

  selectors: {
    '&:focus': {
      outline: 'none',
      borderColor: '#111',
    },
  },
});

export const resultDisclosureControl = style([
  controlBase,
  {
    background: '#ffffff',
    color: '#222',
    fontSize: fontSm,
  },
]);

export const fullRowSelectControl = style([
  controlBase,
  {
    background: '#ffffff',
    color: '#111',
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
  fontWeight: 750,
  color: '#111',
});

export const selectActionControl = style([
  controlBase,
  {
    background: '#111',
    color: '#ffffff',
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

  background: '#ffffff',
  color: '#111',

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
  fontWeight: 650,
  textAlign: 'left',

  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

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
  color: '#888',
  cursor: 'pointer',
  lineHeight: 0,

  selectors: {
    '&:disabled': {
      opacity: 0.3,
      cursor: 'default',
    },
    '&:not(:disabled):hover': {
      color: '#111',
    },
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      outline: '2px solid #111',
      outlineOffset: '2px',
      borderRadius: radiusSm,
    },
  },
});

export const resultCardDeleteIcon = style({
  display: 'block',
  flexShrink: 0,
});


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

  background: '#111',
  color: '#ffffff',

  overflow: 'hidden',
});

export const resultLabel = style({
  minWidth: 0,
  maxWidth: '100%',

  fontSize: fontXs,
  lineHeight: 1,
  fontWeight: 650,

  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const resultValue = style({
  minWidth: 0,
  maxWidth: '100%',

  fontSize: fontMd,
  lineHeight: 1,
  fontWeight: 850,

  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const resultUnit = style({
  minWidth: 0,
  maxWidth: '100%',

  fontSize: fontXs,
  lineHeight: 1,
  fontWeight: 650,

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
    fontWeight: 850,
    color: '#111',
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

  background: '#ffffff',
  color: '#777',

  fontSize: fontSm,
  fontWeight: 700,
  lineHeight: 1,

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

  background: '#ffffff',

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
  
    background: '#ffffff',
  
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
    background: '#e9e9e9',
    color: '#111',
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
    background: '#e9e9e9',
    color: '#111',
  },
]);

export const ratioDeleteSegment = style([
  ratioSegmentBase,
  {
    background: '#dcdcdc',
    color: '#111',

    selectors: {
      '&:disabled': {
        opacity: 0.35,
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
  
  export const appSelectTrigger = style([
    selectActionControl,
    {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
  ]);
  
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
  });
  
  export const appSelectPanel = style({
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1000,
  
    display: 'grid',
    gap: appGap,
  
    padding: appGap,
    borderRadius: radiusMd,
  
    background: '#ffffff',
    boxShadow: '0 12px 32px rgb(0 0 0 / 0.24)',
  
    overflow: 'hidden',
  });
  
  export const appSelectPanelDown = style({
    top: `calc(100% + ${appGap})`,
  });
  
  export const appSelectPanelUp = style({
    bottom: `calc(100% + ${appGap})`,
  });
  
  export const appSelectOption = style([
    selectActionControl,
    {
      textAlign: 'center',
  
      selectors: {
        '&[aria-selected="true"]': {
          background: '#ffffff',
          color: '#111',
        },
      },
    },
  ]);
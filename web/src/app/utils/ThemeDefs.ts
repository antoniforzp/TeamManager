export interface AppThemeDef {
  themeId: number;
  properties: any;
}

export const defaultTheme: AppThemeDef = {
  themeId: 1,
  properties: {
    '--foreground-default': '#f2f0eb',
    '--primary-default': '#141511',

    '--table-default': '#f8f7f4',
    '--table-selected-default': '#dbdad5',

    '--table-hover-default': '#e6e4df',
    '--table-selected-hover-default': '#bebebc',
  },
};

export const claretTheme: AppThemeDef = {
  themeId: 2,
  properties: {
    '--foreground-default': '#dbd3bd',
    '--primary-default': '#5e0d0d',

    '--table-default': '#f8f7f4',
    '--table-selected-default': '#dbdad5',

    '--table-hover-default': '#e6e4df',
    '--table-selected-hover-default': '#bebebc',
  },
};

export const darkTheme: AppThemeDef = {
  themeId: 3,
  properties: {
    '--foreground-default': '#dbd3bd',
    '--primary-default': '#5e0d0d',

    '--table-default': '#f8f7f4',
    '--table-selected-default': '#dbdad5',

    '--table-hover-default': '#e6e4df',
    '--table-selected-hover-default': '#bebebc',
  },
};

export const appThemeDefs: AppThemeDef[] = [
  defaultTheme,
  claretTheme,
  darkTheme,
];

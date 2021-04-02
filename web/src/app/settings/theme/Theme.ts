export interface Theme {
  name: string;
  properties: any;
}

export const defaultTheme: Theme = {
  name: 'Default',
  properties: {
    '--foreground-default': '#f2f0eb',
    '--primary-default': '#141511',

    '--table-default': '#f8f7f4',
    '--table-selected-default': '#dbdad5',

    '--table-hover-default': '#e6e4df',
    '--table-selected-hover-default': '#bebebc',
  },
};

export const claretTheme: Theme = {
  name: 'Claret',
  properties: {
    '--foreground-default': '#dbd3bd',
    '--primary-default': '#5e0d0d',

    '--table-default': '#f8f7f4',
    '--table-selected-default': '#dbdad5',

    '--table-hover-default': '#e6e4df',
    '--table-selected-hover-default': '#bebebc',
  },
};

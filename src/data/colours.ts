export type ColourPalletName = 'autumn' | 'dawn' | 'fishfood' | 'grandad' | 'teal';

type ColourPallet = { range: string[]; lightest: string; secondLightest: string };

export const colourPallets: { [name in ColourPalletName]: ColourPallet } = {
  autumn: {
    range: ['#008585', '#74a892', '#dae0b8', '#fbf2c4', '#f0daa5', '#dea66f', '#d68a58', '#cf6e41', '#c7522a'],
    lightest: '#fbf2c4',
    secondLightest: '#e5c185',
  },
  dawn: {
    range: ['#00202e', '#003f5c', '#2c4875', '#8a508f', '#bc5090', '#ff6361', '#ff8531', '#ffa600', '#ffd380'],
    lightest: '#ffd380',
    secondLightest: '#ffa600',
  },
  fishfood: {
    range: ['#0a2d2e', '#1c4e4f', '#436e6f', '#6a8e8f', '#879693', '#a49e97', '#deae9f', '#efd7cf', '#f7ebe7'],
    lightest: '#f7ebe7',
    secondLightest: '#efd7cf',
  },
  grandad: {
    range: ['#476066', '#657268', '#838469', '#d69e49', '#eadaa0', '#cb9979', '#ab5852', '#562c29'],
    lightest: '#eadaa0',
    secondLightest: '#cb9979',
  },
  teal: {
    range: ['#1b7865', '#3eb59d', '#8bd0c2', '#c5e8e1', '#faf7ef'],
    lightest: '#faf7ef',
    secondLightest: '#c5e8e1',
  },
};

module.exports = {
  purge: {},
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1366px',
    },
    extend: {
      fontFamily: {
        nunitosans: ['Nunito Sans', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      background: {
        default: '#E5E5E5',
      },
      backgroundImage:{
        'background-image': "url('/Assets/Images/banner_home.png')",
      },
      colors: {
        brand: {
          alabaster: '#fbfbfb',
          atomictangerine: '#fea070',
          biscay: '#193b68b2',
          biscay2: '#193b68',
          biscay3: '#193b6899',
          black: '#000000', 
          cerulean: '#00b2dd',
          lightyellow:'#fffadd',
          dixie: '#e19421',
          fairpink: '#ffece9',
          frenchpass: '#bcebff', 
          gin: '#e8f2ef',
          star:'#d00205',
          graynurse: '#eaeaea',
          gunsmoke: '#848484',
          heavymetal: '#2c2c2c',
          hintofred: '#f9f9f9',
          indigo: '#616ccf',
          iron: '#d7d7d7',
          linkwater: '#d5ebf6',
          manatee: '#8e9aab',
          martinique: '#35364f',
          mercury: '#e5e5e5',
          mercury2: '#dfe1e5',
          mountaineadow: '#2ec28b',
          mountainmist: '#969696',
          mountainmist2: '#9494',
          primary: '#004171',
          secondary:'#005d8d',
          lightblue: '#CFF1FF',
          lightgreen:'#42ba85',
          lightpurple:'#f5e3fb',
          lightbluee:'#0065ff',
        },
        gray:{
          primary: '#3A3A3A',
          secondary: '#8E9AAB',
          highlight: '#c4c4c4',
          tertiary: '#8E9AAB',
        }
      },
      scale: {
        '0': '0',
        '25': '.25',
        '50': '.5',
        '75': '.75',
        '90': '.9',
        '95': '.95',
        '100': '1',
        '105': '1.05',
        '110': '1.1',
        '125': '1.25',
        '150': '1.5',
        '200': '2',
      }
    },
  },
  animation:{

  },
  variants: {
      opacity: ['disabled'],
      borderWidth: ['responsive', 'first', 'last'],
      borderRadius: ['first', 'last'],
      margin: ['first', 'last'],
      scale: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
};

/* eslint-disable object-curly-newline */
import {
  createTheme,
  defaultVariantColorsResolver,
  parseThemeColor,
} from '@mantine/core';
import { yellowGreen, brightPurple, darkBrand } from './colors';
import classes from '../components/Forms/LostPetForm/lostpetform.module.css';

const theme = createTheme({
  colors: {
    brand: yellowGreen,
    purpleBrand: brightPurple,
    dark: darkBrand,
  },
  primaryColor: 'brand',
  black: darkBrand,
  fontFamily: 'Poppins, sans-serif',
  headings: {
    fontFamily: 'Poppins, sans-serif',
  },
  components: {
    Button: {
      styles: (t) => ({
        root: {
          height: '48px',
          padding: '0px 28px',
          borderRadius: '50px',
          fontSize: t.fontSizes.md,
        },
      }),
    },
    DatePickerInput: {
      classNames: () => ({
        calendarHeaderControl: classes.headerControl,
        calendarHeader: classes.calendarHeader,
        monthCell: classes.monthCell,
      }),
    },
    DateInput: {
      classNames: () => ({
        calendarHeaderControl: classes.headerControl,
        calendarHeader: classes.calendarHeader,
        monthCell: classes.monthCell,
      }),
    },
  },
  variantColorResolver: (input) => {
    const defaultResolvedColors = defaultVariantColorsResolver(input);
    const parsedColor = parseThemeColor({
      color: input.color || input.theme.primaryColor,
      theme: input.theme,
    });

    // Override some properties for variant
    if (
      parsedColor.isThemeColor &&
      parsedColor.color === 'brand' &&
      input.variant === 'filled'
    ) {
      return {
        ...defaultResolvedColors,
        color: 'var(--mantine-color-black)',
        hoverColor: 'var(--mantine-color-black)',
      };
    }

    return defaultResolvedColors;
  },
});

export default theme;

// Estilos comunes reutilizables en toda la app

import { ViewStyle } from 'react-native';

export const COMMON_STYLES: {
  shadow: ViewStyle;
  shadowStrong: ViewStyle;
  card: ViewStyle;
} = {
  // Sombra para tarjetas
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  
  // Sombra más pronunciada
  shadowStrong: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  
  // Contenedor de tarjeta estándar
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 24,
  },
};

export default COMMON_STYLES;
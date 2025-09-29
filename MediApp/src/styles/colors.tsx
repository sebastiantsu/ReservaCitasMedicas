// Paleta de colores de la aplicación

export const COLORS = {
  // Colores principales
  primary: '#6366F1',
  primaryDark: '#4F46E5',
  
  // Colores neutros
  white: '#FFFFFF',
  lightGray: '#F3F4F6',
  mediumGray: '#9CA3AF',
  darkGray: '#374151',
  black: '#1F2937',
  
  // Colores de acento
  blue: '#3B82F6',
  success: '#10B981',
  successLight: '#D1FAE5',
} as const;

// Tipo para las claves de colores (opcional, para type safety)
export type ColorKeys = keyof typeof COLORS;

export default COLORS;
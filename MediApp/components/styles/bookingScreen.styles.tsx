// src/styles/bookingScreen.styles.ts
import { StyleSheet } from 'react-native';

const FONT_FAMILY = {
  bold: 'System', // Puedes cambiarlo a tu fuente personalizada, ej: 'Poppins-Bold'
  regular: 'System', // ej: 'Poppins-Regular'
};

const COLORS = {
  primary: '#6200ee',
  background: '#f4f6f8',
  white: '#ffffff',
  textPrimary: '#212121',
  textSecondary: '#757575',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1, // Hace que el contenedor ocupe toda la pantalla
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 40,
    // Sombra para darle profundidad (efecto de tarjeta)
    elevation: 5, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY.bold,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.bold,
    color: COLORS.textPrimary,
    marginTop: 24,
    marginBottom: 16,
  },
});
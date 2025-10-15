// src/styles/verificationScreen.styles.ts
import { StyleSheet } from 'react-native';
import { COLORS } from './colors'; // Importamos desde el mismo directorio

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary, // Fondo principal de la app
  },
  content: {
    flex: 1,
    justifyContent: 'center', // Centra la tarjeta verticalmente
    alignItems: 'center',   // Centra la tarjeta horizontalmente
    padding: 20,
  },
  backButton: {
    position: 'absolute', // Permite posicionarlo sobre el contenido
    top: 50,  // Ajusta según la barra de estado de tu dispositivo
    left: 20,
    padding: 10,
    zIndex: 1, // Asegura que esté por encima de otros elementos
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center', // Centra el contenido de la tarjeta
    // Sombra para darle profundidad
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40, // Círculo perfecto
    backgroundColor: COLORS.successLight, // Un verde muy claro
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 32, // Espaciado entre líneas
  },
  details: {
    flexDirection: 'row',
    marginTop: 10,
  },
  detailBadge: {
    backgroundColor: COLORS.background, // Gris claro
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
  },
  detailText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
});
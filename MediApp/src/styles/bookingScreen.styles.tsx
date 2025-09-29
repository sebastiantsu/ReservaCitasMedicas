import { StyleSheet } from 'react-native';
import { COLORS } from './colors';
import { COMMON_STYLES } from './commonStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    ...COMMON_STYLES.card,
    ...COMMON_STYLES.shadow,
    margin: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '500',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.darkGray,
    marginBottom: 12,
  },
});
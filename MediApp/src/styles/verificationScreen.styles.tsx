import { StyleSheet } from 'react-native';
import { COLORS } from './colors';
import { COMMON_STYLES } from './commonStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  card: {
    ...COMMON_STYLES.card,
    ...COMMON_STYLES.shadow,
    padding: 40,
    alignItems: 'center',
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.successLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 32,
  },
  details: {
    flexDirection: 'row',
    gap: 16,
  },
  detailBadge: {
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  detailText: {
    fontSize: 14,
    color: COLORS.darkGray,
    fontWeight: '500',
  },
});
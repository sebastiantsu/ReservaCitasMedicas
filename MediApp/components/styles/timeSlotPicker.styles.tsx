import { StyleSheet } from 'react-native';
import { COLORS } from '../../src/styles/colors';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.darkGray,
    marginBottom: 12,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  timeText: {
    fontSize: 15,
    color: COLORS.darkGray,
  },
});
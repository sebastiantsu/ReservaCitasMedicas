// src/components/ConfirmationCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles/confirmationCard.styles';

interface ConfirmationCardProps {
  date: Date;
  time: string;
  onConfirm: () => void;
}

const ConfirmationCard: React.FC<ConfirmationCardProps> = ({ date, time, onConfirm }) => {
  const formatDate = (date: Date): string => {
    const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>3. Confirmar Cita</Text>
      
      <View style={styles.details}>
        <View style={styles.detailBadge}>
          <Text style={styles.detailText}>{formatDate(date)}</Text>
        </View>
        <View style={styles.detailBadge}>
          <Text style={styles.detailText}>{time}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.confirmButton}
        onPress={onConfirm}
        activeOpacity={0.8}
      >
        <Text style={styles.confirmButtonText}>Confirmar cita</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmationCard;
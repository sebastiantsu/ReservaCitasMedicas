// src/components/TimeSlotPicker.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Search } from 'lucide-react-native';
import { COLORS } from '../styles/colors';
import { styles } from './styles/timeSlotPicker.styles';

interface TimeSlotPickerProps {
  selectedTime: string;
  onTimeSelect: () => void;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({ selectedTime, onTimeSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>2. Selecciona un horario</Text>
      
      <TouchableOpacity 
        style={styles.input}
        onPress={onTimeSelect}
      >
        <Search size={20} color={COLORS.mediumGray} />
        <Text style={styles.timeText}>{selectedTime}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TimeSlotPicker;
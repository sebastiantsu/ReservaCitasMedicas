import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Calendar from '../components/calendar';
import ConfirmationCard from '../components/confirmationCard';
import { styles } from '../components/styles/bookingScreen.styles';
import TimeSlotPicker from '../components/timeSlotPicker';

export default function BookingScreen(): React.JSX.Element {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 3, 20));
  const [selectedTime, setSelectedTime] = useState<string>('9:41 am - 10:41 am');

  const handleConfirm = (): void => {
    router.push({
      pathname: '/verification',
      params: {
        date: selectedDate.toISOString(),
        time: selectedTime
      }
    });
  };

  const handleTimeSelect = (): void => {
    console.log('Abrir selector de horarios');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.mainTitle}>Cuida tu bienestar</Text>
          <Text style={styles.subtitle}>Agenda una cita</Text>

          <Text style={styles.sectionTitle}>1. Selecciona una fecha</Text>
          <Calendar 
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />

          <TimeSlotPicker 
            selectedTime={selectedTime}
            onTimeSelect={handleTimeSelect}
          />

          <ConfirmationCard 
            date={selectedDate}
            time={selectedTime}
            onConfirm={handleConfirm}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
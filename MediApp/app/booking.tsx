import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import Calendar from '../components/Calendar';
import TimeSlotPicker from '../components/TimeSlotPicker';
import ConfirmationCard from '../components/ConfirmationCard';
import { styles } from '../src/styles/bookingScreen.styles';

export default function BookingScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 3, 20));
  const [selectedTime, setSelectedTime] = useState('9:41 am - 10:41 am');

  const handleConfirm = () => {
    router.push({
      pathname: '/verification',
      params: {
        date: selectedDate.toISOString(),
        time: selectedTime
      }
    });
  };

  const handleTimeSelect = () => {
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
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { COLORS } from '../src/styles/colors';
import { styles } from './styles/calendar.styles';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 3));

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const changeMonth = (direction: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const renderCalendarDays = () => {
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = 
        selectedDate?.getDate() === day && 
        selectedDate?.getMonth() === currentMonth.getMonth() &&
        selectedDate?.getFullYear() === currentMonth.getFullYear();

      days.push(
        <TouchableOpacity
          key={day}
          style={[styles.calendarDay, isSelected && styles.selectedDay]}
          onPress={() => onDateSelect(date)}
        >
          <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.monthText}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Text>
        <View style={styles.navigation}>
          <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.navButton}>
            <ArrowLeft size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeMonth(1)} style={styles.navButton}>
            <ArrowRight size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.weekDaysContainer}>
        {dayNames.map((day, index) => (
          <Text key={index} style={styles.weekDayText}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.daysGrid}>
        {renderCalendarDays()}
      </View>
    </View>
  );
};

export default Calendar;
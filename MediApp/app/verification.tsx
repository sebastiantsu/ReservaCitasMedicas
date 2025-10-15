import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Check } from 'lucide-react-native';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../components/styles/verificationScreen.styles';
import { COLORS } from '../src/styles/colors';

export default function VerificationScreen(): React.JSX.Element {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const date: Date = params.date ? new Date(params.date as string) : new Date();
  const time: string = params.time as string || '9:41 AM';

  const formatDate = (date: Date): string => {
    const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const formatTime = (timeString: string): string => {
    const startTime = timeString.split(' - ')[0];
    return startTime.toUpperCase();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <ArrowLeft size={24} color={COLORS.white} />
        </TouchableOpacity>

        <View style={styles.card}>
          <View style={styles.successIcon}>
            <Check size={48} color={COLORS.success} strokeWidth={3} />
          </View>

          <Text style={styles.title}>
            Tu cita ha sido{'\n'}confirmada con éxito!
          </Text>

          <View style={styles.details}>
            <View style={styles.detailBadge}>
              <Text style={styles.detailText}>{formatDate(date)}</Text>
            </View>
            <View style={styles.detailBadge}>
              <Text style={styles.detailText}>{formatTime(time)}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
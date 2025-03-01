import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DailyActivities from '../components/DailyActivities';

const DailyScreen = () => {
  // Sample data for daily activities
  const dailyActivities = {
    morning: [
      {
        title: 'Embracing Your Body: A Self-Compassion Meditation',
        description: 'Embrace self-compassion and shift from body criticism to kindness and appreciation with this guided meditation',
        type: 'meditation',
      },
      {
        title: 'Morning Mindfulness',
        description: 'Start your day with clarity and purpose',
        type: 'meditation',
      }
    ],
    afternoon: [
      {
        title: 'Communication Skills for Self-Respect - FAST Technique',
        description: 'Equip yourself with skills to maintain boundaries and self-respect in relationships 📈',
        type: 'technique',
      },
      {
        title: 'Appearance ideals in the media',
        description: 'Session',
        type: 'session',
      },
      {
        title: 'Body Dysmorphic Disorder Screener',
        description: '10-item screening questionnaire for Body Dysmorphic Disorder',
        type: 'assessment',
      }
    ],
    evening: [
      {
        title: 'Overcoming Self-Doubt',
        description: 'Unleash your full potential by silencing your inner critic',
        type: 'exercise',
      },
      {
        title: 'Silencing Your Inner Critic',
        description: 'Challenge the negative, self-doubting voice in your head that undermines your confidence',
        type: 'exercise',
      },
      {
        title: 'Evening Reflection',
        description: 'Review your day and set intentions for tomorrow',
        type: 'journal',
      }
    ],
  };

  return (
    <View style={styles.container}>
      <DailyActivities activities={dailyActivities} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

export default DailyScreen;
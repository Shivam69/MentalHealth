import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import WellnessDashboard from '../components/WellnessDashboard';
import DailyActivities from '../components/DailyActivities';

const HomeScreen = () => {
  const wellnessScores = {
    mentalWellbeing: {
      score: 41,
      change: -9,
    },
    workLifeBalance: {
      score: 47,
      change: 7,
    },
    selfEfficacy: {
      score: 50,
      change: -30,
    },
  };

  const dailyActivities = {
    morning: [
      {
        title: 'Embracing Your Body: A Self-Compassion Meditation',
        description: 'Embrace self-compassion and shift from body criticism to kindness and appreciation with this guided meditation',
        type: 'meditation',
      }
    ],
    afternoon: [
      {
        title: 'Communication Skills for Self-Respect - FAST Technique',
        description: 'Equip yourself with skills to maintain boundaries and self-respect in relationships 📈',
        type: 'technique',
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
      }
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <DailyActivities activities={dailyActivities} />
      <WellnessDashboard scores={wellnessScores} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default HomeScreen;
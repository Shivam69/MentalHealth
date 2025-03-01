import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressCircle from './ProgressCircle';

const MemoizedProgressCircle = React.memo(ProgressCircle);

const WellnessDashboard = ({ scores }) => {
  const categories = useMemo(() => [
    { key: 'mentalWellbeing', label: 'Mental Wellbeing', color: '#FF6B6B' },
    { key: 'workLifeBalance', label: 'Work-Life Balance', color: '#FFB347' },
    { key: 'selfEfficacy', label: 'Self Efficacy', color: '#FFB347' }
  ], []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your areas for growth are:</Text>
      <View style={styles.scoreContainer}>
        {categories.map(category => (
          <MemoizedProgressCircle
            key={category.key}
            score={scores[category.key].score}
            scoreChange={scores[category.key].change}
            scoreLabel={category.label}
            color={category.color}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
});

export default React.memo(WellnessDashboard);
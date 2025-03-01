import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const ProgressCircle = ({ 
  score, 
  total = 90, 
  size = 80, 
  strokeWidth = 8,
  scoreLabel,
  scoreChange,
  color
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / total) * (circumference * 0.75); // Limit to 270°

  // Define colors
  const changeColor = scoreChange >= 0 ? '#4CAF50' : '#FF6B6B';
  const changeSymbol = scoreChange >= 0 ? '+' : '';

  return (
    <View style={styles.container}>
      <View style={styles.svgContainer}>
        <Svg width={size} height={size}>
          {/* Background Circle (270°) */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke="#E0E0E0"
            fill="transparent"
            strokeDasharray={circumference * 0.75}
            strokeDashoffset={0}
            transform={`rotate(135, ${size / 2}, ${size / 2})`}
          />
          
          {/* Progress Arc */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke={color}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference * 0.75}
            strokeDashoffset={circumference * 0.75 - progress}
            transform={`rotate(135, ${size / 2}, ${size / 2})`} // Start from 135°
          />
        </Svg>

        {/* Score Text */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>{score}</Text>
          <Text style={[styles.changeText, { color: changeColor }]}>
            ({changeSymbol}{scoreChange})
          </Text>
        </View>
      </View>
      <Text style={styles.outOfText}>{score} out of {total}</Text>
      {/* Label */}
      <View style={styles.labelView}>
      <Text style={styles.label}>{scoreLabel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  svgContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  scoreText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  changeText: {
    fontSize: 12,
    marginTop: 2,
  },
  outOfText: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  labelView:{
  width:80
  },
  label: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ProgressCircle;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ActivityItem = ({ 
  title, 
  description, 
  type, 
  onPress, 
  isCompleted, 
  isPlaying, 
  isCurrentActivity, 
  onComplete
}) => {
  return (
    <>
     {isPlaying && isCurrentActivity ? (
        <View style={styles.nowPlayingContainer}>
          <Text style={styles.nowPlayingTitle}>Now Playing</Text>
          <Text style={styles.nowPlayingActivity}>{title}</Text>
          <View style={styles.audioContainer}>
          <TouchableOpacity style={styles.playPauseButton} testID="activity-item" onPress={onPress}>
            {isPlaying ?  <Icon name="pause" size={14} color="white" /> : <Icon name="play" size={14} color="white" />}
            <Text style={styles.playPauseButtonText}>{isPlaying ? "Pause" : "Resume"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.completeButton} onPress={onComplete}>
          <Icon name="check" size={14} color="#194b5f" />
            <Text style={styles.completeButtonText}> Mark as Complete</Text>
          </TouchableOpacity>
          </View>
        </View>
      ) :
      <TouchableOpacity  
      style={[styles.container, isCompleted && styles.completedContainer]}
      onPress={onPress}
    >
        <View style={styles.content}>
          <View style={styles.playButton}>
            <Image 
              source={isCompleted ? require("../assets/checked.png") : require("../assets/playBtn.png")} 
              style={!isCompleted ? styles.playBtn : styles.checkedBtn} 
              resizeMode="contain" 
            />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.type}>{type.charAt(0).toUpperCase() + type.slice(1)} • {getEstimatedTime(type)}</Text>
          </View>
        </View>
    </TouchableOpacity>}
    </>
  );
};


// Helper function for estimated time
const getEstimatedTime = (type) => {
  const times = {
    meditation: "5-10 min",
    technique: "7 min",
    exercise: "10 min",
    session: "15 min",
    journal: "5 min",
    assessment: "3 min",
  };
  return times[type] || "5 min";
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eaeaea",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  completedContainer: {
    backgroundColor: "#e6f2ed",
    borderLeftWidth: 3,
    borderLeftColor: "#28a745",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  nowPlayingContainer: {
    backgroundColor: "#f0f8ff",
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#194b5f",
    marginBottom:15
  },
  nowPlayingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#194b5f",
    marginBottom: 5,
  },
  nowPlayingActivity: {
    fontSize: 14,
    color: "#333",
    marginBottom: 12,
  },
  playPauseButton: {
    backgroundColor: "#194b5f",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 10,
    flexDirection:'row',
    alignItems:'center'
  },
  playPauseButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  completeButton: {
    backgroundColor: "transparent",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#194b5f",
    alignSelf: "flex-start",
    flexDirection:'row',
    alignItems:'center'
  },
  completeButtonText: {
    color: "#194b5f",
    fontWeight: "600",
    fontSize: 14,
  },
  audioContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  playButton: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: {
    fontWeight: "600",
    fontSize: 14,
  },
  completedBadge: {
    fontSize: 10,
    color: "#28a745",
    backgroundColor: "#e6f2ed",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 5,
  },
  description: {
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
    marginBottom: 4,
  },
  type: {
    fontSize: 10,
    color: "#888",
    fontWeight: "500",
  },
  playBtn: {
    height: 45,
    width: 45,
  },
  checkedBtn:{
    height:30,
    width:30
  }
});

export default ActivityItem;

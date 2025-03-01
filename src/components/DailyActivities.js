import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import Sound from 'react-native-sound';
import ActivityItem from "./ActivityItem";
import Svg, { Circle, Rect } from "react-native-svg";

Sound.setCategory('Playback');

const ICONS = { Morning: "☀️", Afternoon: "🌤️", Evening: "🌙" };
const AUDIO_MAPPING = {
  meditation: 'meditation_audio.mp3',
  technique: 'technique_audio.mp3',
  exercise: 'exercise_audio.mp3',
  session: 'meditation_audio.mp3',
  journal: 'technique_audio.mp3',
  assessment: 'exercise_audio.mp3',
};

const ActivitySection = React.memo(({ 
  title, activities, onActivityPress, completedActivities, currentActivity, isPlaying, handleCompleteActivity, sound, setIsPlaying
}) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionIcon}>{ICONS[title] || "📅"}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {activities.map((activity, index) => (
      <ActivityItem
        key={activity.title}
        {...activity}
        isCompleted={completedActivities.some(item => item.title === activity.title)}
        onPress={() => onActivityPress(activity, title.toLowerCase())}
        isPlaying={isPlaying && currentActivity?.title === activity.title}
        isCurrentActivity={currentActivity?.title === activity.title}
        onComplete={() => {
          handleCompleteActivity(activity);
          sound?.pause();
          setIsPlaying(false);
        }}
      />
    ))}
  </View>
));

const DailyActivities = ({ activities }) => {
  const [completedActivities, setCompletedActivities] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [sound, setSound] = useState(null);
  const [reminderStatus, setReminderStatus] = useState(false);
  
  useEffect(() => () => sound?.release(), [sound]);

  const totalActivities = useMemo(() => Object.values(activities).flat().length, [activities]);
  const completedCount = completedActivities.length;
  const progressPercentage = completedCount / totalActivities;
  const progressPosition = 350 * progressPercentage;

  const handleCompleteActivity = useCallback((activity) => {
    setCompletedActivities(prev => prev.some(item => item.title === activity.title) ? prev : [...prev, activity]);
  }, []);

  const handlePlayPause = useCallback((activity) => {
    if (currentActivity?.title !== activity.title && sound) {
      sound.stop();
      sound.release();
      setSound(null);
      setIsPlaying(false);
    }

    if (currentActivity?.title === activity.title && sound) {
      isPlaying ? sound.pause() : sound.play(success => success ? handleCompleteActivity(activity) : Alert.alert('Playback failed'));
      setIsPlaying(!isPlaying);
      return;
    }

    setCurrentActivity(activity);
    const audioFile = AUDIO_MAPPING[activity.type] || 'meditation_audio.mp3';
    const newSound = new Sound(audioFile, Sound.MAIN_BUNDLE, error => {
      if (error) return Alert.alert('Failed to load sound', error.message);
      setSound(newSound);
      newSound.play(success => success ? handleCompleteActivity(activity) : Alert.alert('Playback failed'));
      setIsPlaying(true);
    });
  }, [currentActivity, isPlaying, sound]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    return hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.textContainer}>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.subheading}>Try these activities daily to improve mental health & productivity</Text>
            <TouchableOpacity
              style={[styles.reminderButton, reminderStatus && styles.reminderButtonActive]}
              onPress={() => setReminderStatus(prev => !prev)}
            >
              <Text style={[styles.reminderButtonText, reminderStatus && styles.reminderButtonTextActive]}>🔔 Set reminder</Text>
            </TouchableOpacity>
          </View>
          <Image source={require("../assets/header_Bg.png")} style={styles.headerImage} resizeMode="contain" />
        </View>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{completedCount >= 3 ? `Goal reached! ${completedCount}/${totalActivities}` : `Complete ${3 - completedCount} more to stay focused`}</Text>
        <Svg width={350} height={12}>
          <Rect x="0" y="4" width="350" height="4" fill="#D9D9D9" rx="2" />
          <Rect x="0" y="4" width={progressPosition} height="4" fill="#194b5f" rx="2" />
          <Circle cx={progressPosition} cy="6" r="6" fill="#194b5f" />
        </Svg>
        <Text style={styles.participantsText}>🔥 2615 people are doing sessions with you this hour</Text>
      </View>

      {["Morning", "Afternoon", "Evening"].map(section => (
        <ActivitySection 
          key={section} 
          title={section} 
          activities={activities[section.toLowerCase()]} 
          onActivityPress={handlePlayPause}
          completedActivities={completedActivities}
          currentActivity={currentActivity}
          isPlaying={isPlaying}
          handleCompleteActivity={handleCompleteActivity}
          sound={sound}
          setIsPlaying={setIsPlaying}
        />
      ))}
    </ScrollView>
  );
};


// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#194b5f",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    width: "60%",
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
    marginBottom: 5,
  },
  subheading: {
    fontSize: 14,
    color: "#B3E5FC",
    marginBottom: 15,
    lineHeight: 18
  },
  reminderButton: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: "flex-start",
    marginBottom: 20,
    backgroundColor: "transparent",
  },
  reminderButtonActive: {
    backgroundColor: "white",
  },
  reminderButtonText: {
    fontWeight: "700",
    fontSize: 14,
    color: "white",
  },
  reminderButtonTextActive: {
    color: "black",
  },
  headerImage: {
    height: "100%",
    width: 160,
    bottom: 20,
  },
  progressContainer: {
    backgroundColor: "#ede1e0",
    padding: 20,
  },
  progressText: {
    color: "#194b5f",
    marginBottom: 10,
    fontWeight: "700",
    fontSize: 14,
  },
  participantsText: {
    color: "#194b5f",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 10,
  },
  section: {
    paddingHorizontal: 15,
    paddingTop: 25
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quoteContainer: {
    padding: 20,
    marginTop: 10,
    marginBottom: 40,
    alignItems: "center",
  },
  quote: {
    fontStyle: "italic",
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  quoteAuthor: {
    fontSize: 12,
    color: "#888",
  },
  nowPlayingContainer: {
    margin: 15,
    padding: 15,
    backgroundColor: "#f0f8ff",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#194b5f",
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
    alignSelf: "flex-start",
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
  },
  completeButtonText: {
    color: "#194b5f",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default DailyActivities;
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Alert,
  Modal,
  Switch
} from "react-native";
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

const ReminderModal = ({ visible, onClose, onSave }) => {
  const [reminderTimes, setReminderTimes] = useState({
    "8:00 AM": false,
    "12:00 PM": false,
    "4:00 PM": false,
  });

  const toggleReminder = (time) => {
    setReminderTimes(prev => ({
      ...prev,
      [time]: !prev[time]
    }));
  };

  const handleSave = () => {
    onSave(reminderTimes);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHandle} />
          
          <Text style={styles.modalTitle}>Set Daily Reminders</Text>
          <Text style={styles.modalSubtitle}>Choose the times you'd like to receive reminders</Text>
          
          {Object.keys(reminderTimes).map((time) => (
            <View key={time} style={styles.reminderItem}>
              <Text style={styles.reminderTime}>{time}</Text>
              <Switch
                trackColor={{ false: "#D9D9D9", true: "#B3E5FC" }}
                thumbColor={reminderTimes[time] ? "#194b5f" : "#f4f3f4"}
                ios_backgroundColor="#D9D9D9"
                onValueChange={() => toggleReminder(time)}
                value={reminderTimes[time]}
              />
            </View>
          ))}
          
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const DailyActivities = ({ activities }) => {
  const [completedActivities, setCompletedActivities] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [sound, setSound] = useState(null);
  const [reminderStatus, setReminderStatus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeReminders, setActiveReminders] = useState({});
  
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

  const handleSetReminders = (reminderTimes) => {
    setActiveReminders(reminderTimes);
    const hasActiveReminders = Object.values(reminderTimes).some(value => value === true);
    setReminderStatus(hasActiveReminders);
    
    // Here you would implement actual reminder notifications
    if (hasActiveReminders) {
      Alert.alert(
        "Reminders Set", 
        `You will be notified at the selected times.`,
        [{ text: "OK" }]
      );
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.textContainer}>
              <Text style={styles.greeting}>{getGreeting()}</Text>
              <Text style={styles.subheading}>Try these activities daily to improve mental health & productivity</Text>
              <TouchableOpacity
                style={[styles.reminderButton, reminderStatus && styles.reminderButtonActive]}
                onPress={() => setModalVisible(true)}
              >
                <Text style={[styles.reminderButtonText, reminderStatus && styles.reminderButtonTextActive]}>
                  🔔 {reminderStatus ? "Reminders set" : "Set reminder"}
                </Text>
              </TouchableOpacity>
            </View>
            <Image source={require("../assets/header_Bg.png")} style={styles.headerImage} resizeMode="contain" />
          </View>
        </View>

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {completedCount >= 3 
              ? `Goal reached! ${completedCount}/${totalActivities}` 
              : `Complete ${3 - completedCount} more to stay focused`}
          </Text>
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

      <ReminderModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSetReminders}
      />
    </>
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
    color: "#194b5f",
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
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  modalHandle: {
    alignSelf: 'center',
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#D9D9D9',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#194b5f',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 25,
  },
  reminderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  reminderTime: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  saveButton: {
    backgroundColor: '#194b5f',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DailyActivities;
# MentalHealthApp

A React Native mobile application focused on improving mental health and wellness through daily activities, guided meditations, and progress tracking.

## Overview

MentalHealthApp provides users with personalized mental wellness activities throughout the day, tracks wellness metrics, and encourages daily habits that promote better mental health.

## Features

- **Daily Activities**: Structured morning, afternoon, and evening activities
- **Wellness Dashboard**: Track key wellness metrics like mental wellbeing, work-life balance, and self-efficacy
- **Audio Guided Sessions**: Listen to guided meditations, techniques, and exercises
- **Progress Tracking**: Monitor your completion progress and growth areas
- **Reminders**: Set reminders to stay consistent with your wellness routine

## Screenshots

[Screenshots would be added here]

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/MentalHealthApp.git

# Navigate to project directory
cd MentalHealthApp

# Install dependencies
npm install

# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Technologies

- React Native (v0.76.7)
- React Navigation (v7)
- React Native SVG
- React Native Sound
- React Native Reanimated

## Project Structure

```
MentalHealthApp/
├── components/
│   ├── ActivityItem.js       # Individual activity component
│   ├── DailyActivities.js    # Container for daily activities
│   ├── ProgressCircle.js     # Circular progress indicator
│   └── WellnessDashboard.js  # Wellness metrics dashboard
├── screens/
│   └── HomeScreen.js         # Main home screen
├── assets/
│   ├── header_Bg.png
│   ├── playBtn.png
│   └── checked.png
└── [other project files]
```

## Key Components

### HomeScreen

The main screen of the application displaying the wellness dashboard and daily activities.

### DailyActivities

Manages the display and interaction with morning, afternoon, and evening wellness activities.

### WellnessDashboard

Displays key wellness metrics using circular progress indicators.

### ActivityItem

Individual activity card with play/pause functionality and completion tracking.

## Development

### Prerequisites

- Node.js >= 18
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

## Audio Assets

The application uses the following audio files which should be added to the project:
- meditation_audio.mp3
- technique_audio.mp3
- exercise_audio.mp3

## Customization

### Activity Types

The app supports several activity types:
- Meditation
- Technique
- Exercise
- Session
- Journal
- Assessment

### Wellness Metrics

Track progress in:
- Mental Wellbeing
- Work-Life Balance
- Self Efficacy

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[License information would go here]

## Acknowledgements

- [Any libraries, resources, or inspirations would be listed here]
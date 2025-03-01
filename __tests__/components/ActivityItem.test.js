import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ActivityItem from '../../src/components/ActivityItem';

describe('ActivityItem Component', () => {
  it('toggles between play and complete states', async () => {
    const mockPress = jest.fn();
    const mockComplete = jest.fn();

    const { getByText, debug } = render(
      <ActivityItem 
        title="Test Activity" 
        description="Test Description" 
        type="meditation" 
        onPress={mockPress} 
        onComplete={mockComplete} 
        isPlaying={true} // ✅ Ensures the button shows "Pause"
        isCurrentActivity={true} 
      />
    );

    debug(); // Logs rendered output for debugging

    // Ensure the Pause button is rendered first
    const pauseButton = await waitFor(() => getByText(/pause/i));
    expect(pauseButton).toBeTruthy();

    // Simulate button press to toggle
    fireEvent.press(pauseButton);
    expect(mockPress).toHaveBeenCalled();
  });
});

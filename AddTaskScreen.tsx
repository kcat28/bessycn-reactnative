import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from './components/Header';
import SetTask from './components/SetTask';
import RewardsAssign from './components/RewardsAssign';
import HiveMateAssign from './components/HiveMateAssign';
import Schedule from './components/Schedule';
import Description from './components/Description';

const image = require('./resources/BeePattern2.png');

const AddTask = () => {

  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [isToggleEnabled, setIsToggleEnabled] = useState(false);

   // State for SetTask component
   const [imageUri, setImageUri] = useState<string | null>(null);
   const [taskName, setTaskName] = useState('');
   const [category, setCategory] = useState<string | null>(null);

  // State for Description component
  const [description, setDescription] = useState('');

  // State for Schedule component
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [recurrenceSelected, setRecurrenceSelected] = useState<string | null>(null);
  const [isRecurrenceNeverEnds, setIsRecurrenceNeverEnds] = useState<boolean>(false);
 
  // State for RewardsAssign component
  const [selectedReward, setSelectedReward] = useState<number | null>(null);

  // State for HiveMateAssign component
  const [selectedHiveMates, setSelectedHiveMates] = useState<Array<{ user_id: number}>>([]);

  const handleCreateTask = async () => {
    const taskData = {
      title: taskName, // Match "title"
      description: description && description.trim() !== "" ? description : null, // Match "description"
      category, // Match "category"
      task_status: "Ongoing", // Match "task_status" default value is always 'ongoing' as per db design
      rewardpts: selectedReward,
      schedules: selectedHiveMates.length > 0 ?
        (isToggleEnabled
          ? selectedHiveMates.slice(0, 1) // Only one entry if toggle is on
          : selectedHiveMates // Map all hive mates if toggle is off
        ).map((mate) => ({
        user_id: isToggleEnabled ? null : mate.user_id,
        start_date: startDate.toISOString().split('T')[0], // "YYYY-MM-DD", // Match "start_date"
        end_date: isRecurrenceNeverEnds ? null : endDate.toISOString().split('T')[0], // Match "end_date" // "YYYY-MM-DD"
        recurrence: recurrenceSelected, // Match "recurrence"
        dueTime: endTime.toISOString().split('T')[1].split('.')[0], // Match "dueTime" (adjust naming) // "HH:mm:ss"
      }))
    : [
      {
        user_id: null,
        start_date: startDate.toISOString().split('T')[0], // "YYYY-MM-DD", // Match "start_date"
        end_date: isRecurrenceNeverEnds ? null : endDate.toISOString().split('T')[0], // Match "end_date" // "YYYY-MM-DD"
        recurrence: recurrenceSelected, // Match "recurrence"
        dueTime: endTime.toISOString().split('T')[1].split('.')[0], // Match "dueTime" (adjust naming) // "HH:mm:ss"
    },
  ],
      assignments: selectedHiveMates.length > 0 ? 
        (isToggleEnabled
          ? selectedHiveMates.slice(0, 1) // Only one entry if toggle is on
          : selectedHiveMates // Map all hive mates if toggle is off
        ).map((mate) => ({
            user_id: isToggleEnabled ? null : mate.user_id, // Match "user_id"
            assignedDate: startDate.toISOString().split('T')[0], // Match "assignedDate" // "YYYY-MM-DD"
          }))
        : [
          {
            user_id: null, // Set user_id to null
            assignedDate: startDate.toISOString().split('T')[0], // "YYYY-MM-DD"
          },
        ], // Include date even when no users are assigned
    };
    
    try {
      console.log('Task data being sent:', taskData);
      const response = await fetch('http://192.168.0.106:8080/tasks/createFullTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Task created successfully');
      } else {
          console.log('Task data being sent:', taskData);
        const errorMessage = await response.text(); // Get backend error message if available
        Alert.alert('Error', `Failed to create task: ${errorMessage}`);
      }
    } catch (error) {
      Alert.alert('Error', `An error occurred: ${(error as any).message}`);
  }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <Header />
          <KeyboardAwareScrollView
            onScroll={(event) => {
              const { contentOffset } = event.nativeEvent;
              setScrollPosition(contentOffset); // Update scroll position dynamically
            }}
            contentContainerStyle={styles.scrollContent}
            resetScrollToCoords={scrollPosition}
            scrollEventThrottle={16}
            scrollEnabled={true}
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
            extraScrollHeight={100}
          >
            <View style={styles.bodyContainer}>
              <SetTask 
                imageUri={imageUri}
                setImageUri={setImageUri}
                taskName={taskName}
                setTaskName={setTaskName}
                category={category}
                setCategory={setCategory}
                isToggleEnabled={isToggleEnabled} 
                setIsToggleEnabled={setIsToggleEnabled}
              />
              <RewardsAssign setSelectedReward={setSelectedReward} />
              {!isToggleEnabled && (<HiveMateAssign selectedHiveMates={selectedHiveMates} setSelectedHiveMates={setSelectedHiveMates} isToggleEnabled={isToggleEnabled}  />)}
              <Schedule
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                endTime={endTime}
                setEndTime={setEndTime}
                recurrenceSelected={recurrenceSelected}
                setRecurrenceSelected={setRecurrenceSelected}
                isRecurrenceNeverEnds={isRecurrenceNeverEnds}
                setIsRecurrenceNeverEnds={setIsRecurrenceNeverEnds}
              />
              <Description description={description} setDescription={setDescription} />

              <View>
              <TouchableOpacity onPress={handleCreateTask}>
              <Text style={styles.button}>Create Task</Text>
              </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};


AddTask.options = {
  headerShown: false, 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
  },
  scrollContent: {
    flexGrow: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
  button: {
    fontFamily: 'Work Sans',
    fontSize:20,
    fontWeight: 600,
    color: '#FFF',
    backgroundColor: '#FFDB36',
    padding: 12,
    paddingHorizontal: 90,
    borderRadius: 10,
  }

});

export default AddTask;

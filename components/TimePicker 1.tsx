import React, { Dispatch, SetStateAction, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface TimePickerProps{
  selectedTime: Date;
  setSelectedTime: Dispatch<SetStateAction<Date>>;

}
const TimePicker:React.FC<TimePickerProps> = ({ selectedTime, setSelectedTime }) => {
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false); // State for showing the modal

  const handleConfirm = (date: Date) => {
    setIsTimePickerVisible(false); // Hide the picker after selection

    // Set the selected time but keep today's date (or whatever date you're working with).
    const updatedTime = new Date(selectedTime);
    updatedTime.setHours(date.getHours());
    updatedTime.setMinutes(date.getMinutes());

    setSelectedTime(updatedTime); // Update only the time part
  };

  const handleCancel = () => {
    setIsTimePickerVisible(false); // Hide the picker on cancel
  };
  

  // Format the time as HH:MM AM/PM
  const formatTime = (time: Date) => {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours || 12; // Convert '0' hours to '12'

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.timeButton} onPress={() => setIsTimePickerVisible(true)} activeOpacity={0.8}>
        <Image source={require('../resources/schedule.png')} style={{width:26, height:26}} />
        <Text style={styles.timeText}>{formatTime(selectedTime)}</Text>
        <Image source={isTimePickerVisible ? require('../resources/arrowDown.png') : require('../resources/arrowUP.png')} style={{marginLeft:205}} />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isTimePickerVisible} // Whether the modal is visible or not
        mode="time" // Set to 'time' to show the time picker
        date={selectedTime} // Set the currently selected time as the initial value
        onConfirm={handleConfirm} // Callback when time is selected
        onCancel={handleCancel} // Callback when the modal is canceled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 10,
    width: '100%',
    borderWidth:1,
    borderRadius: 5,
    borderColor: 'lightgray',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  timeButton: {
    borderRadius: 10,
    flexDirection:'row',
    alignItems:'center',
    padding:12
  },
  timeText: {
    color: '#61646b',
    fontSize: 16,
    marginLeft: 16,
  },
});

export default TimePicker;

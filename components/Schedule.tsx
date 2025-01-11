import React, {useState} from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import DatePicker from './DatePicker 1';
import TimePicker from './TimePicker 1';
import Checkbox from 'expo-checkbox';

interface ScheduleProps {
    startDate: Date;
    setStartDate: (date: Date) => void;
    endDate: Date;
    setEndDate: (date: Date) => void;
    endTime: Date;
    setEndTime: React.Dispatch<React.SetStateAction<Date>>;
    recurrenceSelected: string | null;
    setRecurrenceSelected: (recurrence: string | null) => void;
    isRecurrenceNeverEnds: boolean;
    setIsRecurrenceNeverEnds: (value: boolean) => void;
}

const Schedule: React.FC<ScheduleProps> = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    endTime,
    setEndTime,
    recurrenceSelected,
    setRecurrenceSelected,
    isRecurrenceNeverEnds,
    setIsRecurrenceNeverEnds,
}) => {
   
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
            
                <View style={styles.bodyContainer}>
                    <Text style={styles.title}>Schedule</Text>


                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => setRecurrenceSelected(recurrenceSelected === 'Once' ? null:'Once')} style={[recurrenceSelected === 'Once' && styles.selectedButton]}>
                        <Text style={styles.button}>Once</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setRecurrenceSelected(recurrenceSelected === 'Daily' ? null:'Daily')} style={[recurrenceSelected === 'Daily' && styles.selectedButton]}>
                        <Text style={styles.button}>Daily</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setRecurrenceSelected(recurrenceSelected === 'Weekly' ? null:'Weekly')}  style={[recurrenceSelected === 'Weekly' && styles.selectedButton]}>
                        <Text style={styles.button}>Weekly</Text>
                    </TouchableOpacity>
                </View>

                <Text style={[styles.title, {fontWeight: 'regular'}]}>Start Date</Text>
                <View style ={styles.dateContainer}>
                    <DatePicker selectedDate={startDate} setSelectedDate={setStartDate}/>
                </View>

                <Text style={[styles.title, {fontWeight: 'regular'}]}>End Date</Text>
                <View style={styles.checkboxContainer}>
                <Checkbox
                    style={styles.checkbox}
                    value={isRecurrenceNeverEnds}
                    onValueChange={setIsRecurrenceNeverEnds}
                    color={isRecurrenceNeverEnds ? '#61646b' : undefined}
                />
                <Text style={{paddingLeft:10, fontFamily: 'Work Sans', color: '#61646B'}}>Never Ends</Text>
                </View>

                <View style ={styles.dateContainer}>
                      {!isRecurrenceNeverEnds && (<DatePicker selectedDate={endDate} setSelectedDate={setEndDate}/>)}
                </View>

                <Text style={[styles.title, {fontWeight: 'regular'}]}>Due by Time</Text>
                <View style={styles.dateContainer}>
                    <TimePicker selectedTime={endTime} setSelectedTime={setEndTime} />
                </View>

                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 10,
        alignItems: 'flex-start',   
        backgroundColor: '#FFF8DA',
    },
    bodyContainer: {
        alignItems: 'flex-start',
        paddingBottom: 50,
    },
    title: {
        padding: 12,
        fontSize: 16,
        color: "#61646B",
        fontWeight: "bold",
        fontFamily: 'Work Sans',
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 30,

    },
    button:{
        borderColor: '#61646B',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#FFF',
        color: "#61646B",
        fontFamily: 'Work Sans',
        fontWeight: 500,
        padding: 5,
        paddingRight: 30,
        paddingLeft: 30,
    },
    selectedButton:{
        borderColor: '#E7BE00',
        borderWidth: 3,
        borderRadius: 10,
        color: '#E7BE00',
        backgroundColor: '#E7BE00',
    },
    dateContainer:{
        justifyContent: 'center',
        marginLeft: Platform.OS === 'ios' ? 30: 10,
    
    }, 
    checkbox:{
        width:20,
        height:20,
        borderWidth:1,
        borderColor:'#61646B',
        borderRadius:5,
    },
    checkboxContainer:{
        flexDirection: 'row',
        marginLeft:20,
        padding: 5,
    },
    
})

export default Schedule;

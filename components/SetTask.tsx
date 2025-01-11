import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Switch, TextInput, Platform } from 'react-native';
import ProfilePictureUploader from './ProfilePictureUploader';

const taskicon = require('../resources/Task.png');
const choreicon = require('../resources/Chore.png');

interface SetTaskProps {
    imageUri: string | null;
    setImageUri: (uri: string | null) => void;
    taskName: string;
    setTaskName: (name: string) => void;
    category: string | null;
    setCategory: (category: string | null) => void;
    isToggleEnabled: boolean;
    setIsToggleEnabled: (enabled: boolean) => void;
}

const SetTask: React.FC<SetTaskProps> = ({ imageUri, setImageUri, taskName, setTaskName, category, setCategory, isToggleEnabled, setIsToggleEnabled }) => {
    //const [isEnabled, setIsEnabled] = React.useState(false);
    //const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    // const [imageUri, setImageUri] = useState<string | null>(null);
    // const [text, setText] = useState('');
    // const [category, setCategory] = useState<string | null>(null);


  return (
    <View style={style.container}>
        <Text style = {style.title}>Set your Task name</Text>
        <View style={style.iconInput}>
        <ProfilePictureUploader imageUri={imageUri} setImageUri={setImageUri} size={70}/>
        <TextInput
            style={style.textInput}
            value={taskName}
            onChangeText={setTaskName}
            placeholder="Enter task name" 
        />
        </View>
        <Text style={style.category}>Category</Text>
        <View style = {style.miscChore}>
            <TouchableOpacity onPress={() => setCategory(category === 'Task' ? null: 'Task')}  style={[style.categoryButton, category === 'Task' && style.selectedButton]}>
                <Image source={taskicon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCategory(category === 'Chore' ? null: 'Chore')} style={[style.categoryButton, category === 'Chore' && style.selectedButton]}>
                <Image source={choreicon} />
            </TouchableOpacity>
        </View>

        <View style = {style.toggle}>
            <Switch onValueChange={setIsToggleEnabled} value={isToggleEnabled}  style={{paddingLeft:5, paddingTop:15}}/>
            <Text style={{paddingLeft:25, paddingTop: Platform.OS === 'ios' ? 30: 0, fontFamily: "Work Sans", fontWeight:500, color:"#61646B"}}>Can be completed by any members</Text>
        </View>
    </View>
  );
};

const style = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'flex-start',
        paddingLeft: 10,
        paddingBottom: 20,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#AFB1B6',
    },
    title:{
        fontSize: 15,
        fontWeight: 500,
        color: '#61646B',
        fontFamily: 'Work Sans',
        paddingTop: 10,
        paddingLeft: 75,
    },
    iconInput:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 5,
        width: '100%',
    },
    textInput: {
        flex: 1,
        height: 50,
        borderColor: '#61646B',
        borderWidth: 1.5,
        marginLeft: 8,
        marginRight: 20,
        paddingHorizontal: 8,
        borderRadius: 6,
    },
    category:{
        fontSize: 15,
        fontWeight: 600,
        color: '#61646B',
        fontFamily: 'Work Sans',
        paddingTop: 10,
        paddingLeft: 5,
        paddingBottom: 10,
    },
    miscChore:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        justifyContent: 'space-between',
        width: '30%',
    }, 
    toggle:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryButton: {
        borderRadius: 5,
        
      },
      selectedButton: {
        backgroundColor: '#E7BE00', // Highlight the selected button
        padding: 3,
      },

});

export default SetTask;
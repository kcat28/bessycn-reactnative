import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import  {useRouter} from 'expo-router';

const image = require('../resources/X.png');
const Header = () =>{
    const router = useRouter();

    const handleClose = () =>{
        router.back(); //go back to previous screen
    }

    return (
        <View style={style.header}>
            <TouchableOpacity style={style.closeButton} onPress={handleClose}>
                <Image source={image}/>
            </TouchableOpacity>
            <Text style={style.title}>Add Task</Text>
        </View>
    )
}

const style = StyleSheet.create({
    header: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#FFEFA4', 
    },
    title: {
        fontSize: 24,
        color: '#61646B',
        fontWeight: 'bold',
        fontFamily: 'Work Sans',
        paddingBottom: 10,
    },
    closeButton:{
        paddingTop: 20,
        position: 'absolute',
        top: 10,
        left: 10,
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }

});
export default Header;
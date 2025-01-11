import React from 'react';
import { StyleSheet, Text, View, TextInput, Platform } from 'react-native';
import { useState } from 'react';

interface setDescriptionProps {
    description: string | null;
    setDescription: (Description: string) => void;
}

const Description: React.FC<setDescriptionProps> = ({ description, setDescription }) => {

    //const [value, onChangeText] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.Title}>Description</Text>

                <View style={styles.textBox}>
                    <TextInput
                        editable
                        multiline
                        numberOfLines={4}
                        maxLength={140}
                        onChangeText={(text) => setDescription(text)}
                        value={description || ''}
                        style ={styles.textInput}
                    />
                </View>
               
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'flex-start',   
        backgroundColor: '#FFF8DA',
        width: '100%',
        paddingBottom: 20,
    }, 
    body: {
        flex: 1,
        backgroundColor: '#FFF8DA',
        padding: 10,
        
    },
    Title: {
        fontFamily: 'Work Sans',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#61646B',
        backgroundColor: 'FFF8DA',
        paddingBottom: 10,

    },
    textInput: {
        height: 150,
        padding: 10,
        backgroundColor: '#FFF',
        borderColor: '#D9D9D9',
        borderRadius: 7,
        borderWidth: 1,
    },
    textBox: {
        flex: 1,
        width: Platform.OS === 'ios' ? 380: 353,
        marginLeft: 10,

    }
});

export default Description;
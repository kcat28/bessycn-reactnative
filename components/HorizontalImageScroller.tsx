import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";

interface HorizontalImageScrollerProps {
    title: string;
    users?: { user_id: number, firstname: string, lastname: string }[];
    images?: any[];
    onUserPress?: (selectedIndices: number[]) => void;
    onImagePress?: (selectedIndices: number[]) => void;
    multiple?: boolean;
}

const HorizontalImageScroller: React.FC<HorizontalImageScrollerProps> = ({ title, users, images, onUserPress, onImagePress, multiple = true }) => {
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

    const handlePress = (index: number) => {
        setSelectedIndices((prev) => {
            let updated;
            if(multiple){
                updated = prev.includes(index) ? prev.filter((i) => i !== index) // deselect if already selected
                : [...prev, index]; // add new selection
            } else {
                updated = prev.includes(index) ? [] : [index]; // single selection logic
            }

            if (users && onUserPress) {
                onUserPress(updated); // Send updated indices to parent
            } else if (images && onImagePress) {
                onImagePress(updated); // Send updated indices to parent
            }
            return updated;
        });
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.leftSide}>
              
                <ScrollView horizontal={true} style={styles.scrollView} showsHorizontalScrollIndicator={false}>
                    {users && users.map((user, index) => (
                        <TouchableOpacity 
                            key={index} 
                            onPress={() => handlePress(index)} 
                            style={[
                                styles.userContainer,
                                selectedIndices.includes(index) && styles.selectedUserContainer, // Highlight selected
                            ]}>
                            <Text style={{color:"#61646B" }}>Hive member: {user.user_id}</Text>
                            <Text style={{color:"#61646B" }}>{user.firstname} {user.lastname}</Text>
                        </TouchableOpacity>
                    ))}
                    {images && images.map((image, index) => (
                        <TouchableOpacity 
                            key={index} 
                            onPress={() => handlePress(index)} 
                            style={[
                                styles.imageContainer,
                                selectedIndices.includes(index) && styles.selectedImageContainer, // Highlight selected
                            ]}>
                            <Image source={image} style={styles.image} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        width: "100%",
        backgroundColor: "#FFF8DA",
        padding: 10,
        height: 110,
        overflow: 'hidden', 
    },
    title: {
        fontSize: 16,
        color: "#61646B",
        fontWeight: "bold",
        marginBottom: 10,
    },
    leftSide: {
        flexDirection: 'row',
        alignItems: 'center', 
        width: '100%', 
    },
    scrollView: {
        flexDirection: "row",
        flexShrink: 1, 
    },
    scrollContent: {
        flexDirection: 'row', 
    },
    selectedUserContainer: {
        borderWidth: 3,
        borderColor: "#E7BE00", 
        borderRadius: 6, 
    },
    userContainer: {
        marginHorizontal: 8,
        padding: 10,
        backgroundColor: "#FFF",
        borderRadius: 6,
    },
    selectedImageContainer: {
        borderWidth: 3,
        borderColor: "#E7BE00", 
        borderRadius: 6, 
    },
    imageContainer: {
        marginHorizontal: 8,
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: "contain",
    }
});

export default HorizontalImageScroller;
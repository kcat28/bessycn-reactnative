import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";

const Add = require("../resources/Add.png");

interface HorizontalImageScrollerProps {
    title: string;
    images: { uri: string }[];
    onImagePress?: (selectedIndices: number[]) => void; // handles multiple selection
}

const HorizontalImageScroller: React.FC<HorizontalImageScrollerProps> = ({ title, images, onImagePress }) => {
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

    const handlePress = (index: number) => {
        setSelectedIndices((prev) => {
            const updated = prev.includes(index) ? prev.filter((i) => i !== index) // deselect if already selected
            : [...prev, index]; // add new selection

            if (onImagePress) {
                onImagePress(updated); // Send updated indices to parent
              }
              return updated;
        });
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.leftSide}>
                <TouchableOpacity style={styles.addButton}>
                    <Image source={Add} style={styles.addIcon} />
                </TouchableOpacity>

                <ScrollView horizontal={true} style={styles.scrollView} showsHorizontalScrollIndicator={false}>
                    {images.map((image, index) => (
                        <TouchableOpacity 
                            key={index} 
                            onPress={() => handlePress(index)} 
                            style={[
                                styles.imageContainer,
                                selectedIndices.includes(index) && styles.selectedImageContainer, // Highlight selected
                            ]}>
                            <Image source={image}/>
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
    addButton: {
        marginRight: 10, 
    },
    addIcon: {
        resizeMode: "contain",
    },
    selectedImageContainer: {
        borderWidth: 3,
        borderColor: "#E7BE00", 
        borderRadius: 6, 
    },
    imageContainer: {
        marginHorizontal: 8,
    }
});

export default HorizontalImageScroller;

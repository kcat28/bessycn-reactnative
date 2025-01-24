import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useState, useEffect } from "react";

interface HorizontalImageScrollerProps {
  title: string;
  users?: { user_id: number, img_path: string, firstname: string, lastname: string }[];
  images?: any[];
  onUserPress?: (selectedIndices: number[]) => void;
  onImagePress?: (selectedIndices: number[]) => void;
  multiple?: boolean;
}

const HorizontalImageScroller: React.FC<HorizontalImageScrollerProps> = ({ title, users, images, onUserPress, onImagePress, multiple = true }) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  useEffect(() => {
    if (users) {
      users.forEach(user => {
        const imageUrl = `http://192.168.0.101/uploads/${user.img_path.split('/').pop()}`;
        console.log(imageUrl); // Log the image URL once
      });
    }
  }, [users]);

  const handlePress = (index: number) => {
    setSelectedIndices((prev) => {
      let updated;
      if (multiple) {
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
          {users && users.map((user, index) => {
            const imageUrl = `http://192.168.0.101/uploads/${user.img_path.split('/').pop()}`;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handlePress(index)}
                style={styles.userContainer}>
                <Image
                  source={{ uri: imageUrl }}
                  style={[
                    styles.icon,
                    selectedIndices.includes(index) && styles.selectedIconForUser, 
                  ]}
                />
                <Text style={{ color: "#61646B", padding: 5 }}>{user.firstname}</Text>
              </TouchableOpacity>
            );
          })}
          {images && images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handlePress(index)}
              style={[
                styles.imageContainer,
                selectedIndices.includes(index) && styles.selectedImageContainer, 
              ]}>
              <Image
                source={image}
                style={styles.image}
              />
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
    height: 125,
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
    flexDirection: 'column', // Change to column to stack elements vertically
    marginHorizontal: 8,
    borderRadius: 6,
    alignItems: 'center', // Center align items horizontally
    justifyContent: 'center', // Center align items vertically
  },
  selectedImageContainer: {
    borderWidth: 3,
    borderColor: "#E7BE00",
    borderRadius: 8,
  },
  selectedIconForUser: {
    borderWidth: 3,
    borderColor: "#E7BE00",
    borderRadius: 30, // Ensure the border radius matches the icon's shape
  },
  imageContainer: {
    marginHorizontal: 8,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  icon: {
    width: 55,
    height: 55,
    borderRadius: 30,
    resizeMode: "contain",
  }
});

export default HorizontalImageScroller;
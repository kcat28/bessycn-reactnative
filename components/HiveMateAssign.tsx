import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import HorizontalImageScroller from "./HorizontalImageScroller";

interface User {
  user_id: number;
  firstname: string;
  lastname: string;
}

interface HiveMateAssignProps {
  selectedHiveMates: Array<{ user_id: number }>;
  setSelectedHiveMates: (hiveMates: Array<{ user_id: number }>) => void;
  isToggleEnabled: boolean;
}

const HiveMateAssign: React.FC<HiveMateAssignProps> = ({
  selectedHiveMates,
  setSelectedHiveMates,
  isToggleEnabled,
}) => {
  const [hiveMates, setHiveMates] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHiveMates = async () => {
      try {
        const response = await fetch("http://192.168.0.106:8080/HiveMembers/"); // Replace with your API endpoint
        const data = await response.json();
        const formattedData = data.map((user: any) => ({
          user_id: user.userId,
          firstname: user.firstname,
          lastname: user.lastname,
        }));
        setHiveMates(formattedData);
      } catch (error) {
        console.error("Failed to fetch hive mates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHiveMates();
  }, []);

  if (isToggleEnabled) {
    return null; // Don't render if toggled
  }

  const handleUserPress = (selectedIndices: number[]) => {
    const newHiveMates = selectedIndices.map((index) => ({ user_id: hiveMates[index].user_id }));
    setSelectedHiveMates(newHiveMates); // Update parent state
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <HorizontalImageScroller
        title="Assign to"
        users={hiveMates}
        onUserPress={handleUserPress}
      />
    </View>
  );
};

export default HiveMateAssign;
import React from "react";
import { View } from "react-native";
import HorizontalImageScroller from "./HorizontalImageScroller";

const HiveMateImages = [
  require("../resources/HiveMate/Group 146.png"),
  require("../resources/HiveMate/Group 147.png"),
  require("../resources/HiveMate/Group 148.png"),
  require("../resources/HiveMate/Group 149.png"),
  require("../resources/HiveMate/Group 150.png"),
  require("../resources/HiveMate/Group 151.png"),
  require("../resources/HiveMate/Group 152.png"),
  require("../resources/HiveMate/Group 153.png"),
];

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
  if (isToggleEnabled) {
    return null; // Don't render if toggled
  }

  const handleImagePress = (selectedIndices: number[]) => {
    const newHiveMates = selectedIndices.map((index) => ({ user_id: index + 1 }));
    setSelectedHiveMates(newHiveMates); // Update parent state
  };

  return (
    <View>
      <HorizontalImageScroller
        title="Assign to"
        images={HiveMateImages}
        onImagePress={handleImagePress}
      />
    </View>
  );
};

export default HiveMateAssign;

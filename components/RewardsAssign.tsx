import React from "react";
import { View } from "react-native";
import HorizontalImageScroller from "./HorizontalImageScroller";

const Rewards10 = require("../resources/Group 162.png");
const Rewards30 = require("../resources/Group 163.png");
const Rewards60 = require("../resources/Group 164.png");
const Rewards90 = require("../resources/Group 165.png");
const Rewards100 = require("../resources/Group 166.png");
const Rewards150 = require("../resources/Group 167.png");

interface RewardsAssignProps {
    setSelectedReward: (reward: number | null) => void;
}

const RewardsAssign: React.FC<RewardsAssignProps> = ({ setSelectedReward }) => {

    const rewards = [10, 30, 60, 90, 100, 150];
    const images = [Rewards10, Rewards30, Rewards60, Rewards90, Rewards100, Rewards150];

    const handleImagePress = (selectedIndices: number[]) => {
        if (selectedIndices.length > 0) {
            const rewardValue = rewards[selectedIndices[0]];
            setSelectedReward(rewardValue);
            console.log(`Image at index ${selectedIndices[0]} pressed`);
        } else {
            setSelectedReward(null);
        }
    };

    return (
        <View>
            <HorizontalImageScroller title="Rewards" images={images} onImagePress={handleImagePress} />
        </View>
    );
};

export default RewardsAssign;
import { Text, View, StyleSheet } from "react-native";
import FloatingButton from "./components/FloatingButton";


export default function Index() {
  return (
    <View style={style.container}>
      <Text style={style.backgroundText}>HomePage.</Text>
      <FloatingButton />
    </View>
    
  );

}

const style = StyleSheet.create(
{ 
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    },
    backgroundText: {
      position: "absolute",
      fontSize: 40,
      fontWeight: "bold",
      color: "rgba(0,0,0,0.1)",
      textAlign: "center",
  }
}
)

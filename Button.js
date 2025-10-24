import { Pressable, Text, StyleSheet } from "react-native";

export const ButtonTypes = {
  NUMBER: "NUMBER",
  OPERATOR: "OPERATOR",
};

const Button = ({ title, onPress, buttonType, buttonStyle }) => {
  const getButtonStyle = () => {
    switch (buttonType) {
      case ButtonTypes.OPERATOR:
        return styles.operatorButton;
      case ButtonTypes.NUMBER:
      default:
        return styles.numberButton;
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        getButtonStyle(),
        buttonStyle,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          buttonType === ButtonTypes.OPERATOR && styles.operatorText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.7,
    borderColor: "#333",
    borderRadius: 4,
    overflow: "hidden"
    
  },
  pressed: {
    opacity: 0.7,
  },
  numberButton: {
    backgroundColor: "#2c2c2c",
  },
  operatorButton: {
    backgroundColor: "#ff9500",
  },
  text: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "600",
  },
  operatorText: {
    color: "#fff",
    fontWeight: "700",
  },
});

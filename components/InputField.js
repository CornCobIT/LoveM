import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../theme/style";

function InputField({
  label,
  value,
  placeholder,
  keyboardType,
  isPasswordField,
  secureTextEntry,
  onFocus,
  onBlur,
  onChangeText,
  focused,
  icon,
  toggleVisibility,
}) {
  return (
    <View
      style={[
        styles.inputSection,
        focused ? styles.inputSectionFocused : styles.inputSectionBlurred,
      ]}
    >
      <View style={styles.borderText}>
        {icon && (
          <Icon
            name={icon}
            style={focused ? styles.iconFocused : styles.iconBlurred}
            size={20}
            color={focused ? COLORS.logo : COLORS.gray}
          />
        )}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray}
          keyboardType={keyboardType}
          autoCapitalize="none"
          style={styles.input}
          secureTextEntry={secureTextEntry}
          onFocus={onFocus}
          onBlur={onBlur}
          onChangeText={onChangeText}
        />

        {isPasswordField && (
          <TouchableOpacity onPress={toggleVisibility}>
            <View style={styles.passwordToggle}>
              <Icon
                name={secureTextEntry ? "eye-off" : "eye"}
                size={20}
                color={COLORS.gray}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputSection: {
    marginBottom: 20,
    borderWidth: 1.5,
    borderRadius: 20,
    flexDirection: "row",
    backgroundColor: COLORS.white
  },
  inputSectionFocused: {
    borderColor: COLORS.logo,
    color: COLORS.logo,
  },
  inputSectionBlurred: {
    borderColor: COLORS.gray,
    color: COLORS.gray,
  },
  iconFocused: {
    marginRight: 15,
  },
  iconBlurred: {
    marginRight: 15,
  },
  borderText: {
    flexDirection: "row",
    width: "100%",
    height: 57,
    borderRadius: 40,
    alignItems: "center",
    paddingLeft: 20,
  },
  passwordToggle: {
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});

export default InputField;

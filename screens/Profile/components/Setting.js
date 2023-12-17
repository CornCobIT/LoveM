import React, { useState, useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../../theme/style";

const iconColor = (icon) => {
  if (icon === 'trash') {
    return COLORS.red;
  } else {
    return '#616161';
  }
}

const Setting = ({ header, items }) => {
  const [form, setForm] = useState({
    language: "English",
    darkMode: true,
  });

  const handlePress = useCallback(() => {
    // handle onPress
  }, []);

  const formValue = useMemo(() => form, [form]);

  return (
    <View style={styles.section} key={header[0].id}>
      <View style={styles.sectionHeader}>
        <Icon
          name={header[0].iconName}
          size={22}
          style={{ paddingRight: 15 }}
        />
        <Text style={styles.sectionHeaderText}>{header[0].label}</Text>
      </View>
      <View style={styles.sectionBody}>
        {items.map(({ id, label, icon, type, value }, index) => {
          return (
            <View
              key={id} 
              style={[styles.rowWrapper, index === 0 && { borderTopWidth: 0 }]}
            >
              <TouchableOpacity onPress={handlePress}>
                <View style={styles.row}>
                  <Icon
                    color={iconColor(icon)}
                    name={icon}
                    style={styles.rowIcon}
                    size={22}
                  />

                  <Text style={styles.rowLabel}>{label}</Text>

                  <View style={styles.rowSpacer} />

                  {type === "select" && (
                    <Text style={styles.rowValue}>{formValue[id]}</Text>
                  )}

                  {type === "toggle" && (
                    <Switch
                      onChange={(val) => setForm({ ...formValue, [id]: val })}
                      value={formValue[id]}
                    />
                  )}

                  {(type === "select" || type === "link") && (
                    <Icon color="#ababab" name="chevron-forward" size={22} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Setting;

const styles = {
  section: {
    paddingTop: 12,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#a7a7a7",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  sectionBody: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 24,
    height: 50,
  },
  rowWrapper: {
    paddingLeft: 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#000",
  },
  rowValue: {
    fontSize: 17,
    color: "#616161",
    marginRight: 4,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
};

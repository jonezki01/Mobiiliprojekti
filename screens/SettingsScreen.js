
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';

export default function SettingsScreen({ navigation, toggleTheme, isDarkTheme }) {
  const theme = useTheme();


  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.toggleContainer}>
        <Text style={[styles.toggleText, { color: theme.colors.text }]}>Dark Mode</Text>
        <TouchableOpacity onPress={toggleTheme}>
          <Icon
            name={"dark-mode"}
            size={30}
            color={isDarkTheme ? "white" : theme.colors.toggleButtonColor}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={styles.settingsContainer}>
        <SettingItem
          icon="notifications"
          label="Notifications"
          onPress={() => navigation.navigate('Notifications')}
        />
      </View>
    </View>
  );
}

function SettingItem({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLabel}>
        <Icon name={icon} size={24} color="#000" />
        <Text style={styles.settingText}>{label}</Text>
      </View>
      <Icon name="chevron-right" size={24} color="#000" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  toggleText: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
  settingsContainer: {
    backgroundColor: '#e9e7f6',
    borderRadius: 8,
    paddingVertical: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 8,
  },
});

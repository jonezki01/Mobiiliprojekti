
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';

export default function SettingsScreen({ navigation, toggleTheme, isDarkTheme }) {
  const theme = useTheme();

  const SettingItem = ({ icon, label, onPress }) => {
    return (
      <TouchableOpacity style={styles.settingItem} onPress={onPress}>
        <View style={styles.settingLabel}>
          <Icon name={icon} size={24} style={{ color: theme.colors.onTertiaryContainer }} />
          <Text style={[styles.settingText,{color: theme.colors.onTertiaryContainer}]}>{label}</Text>
        </View>
        <Icon name="chevron-right" style={{ color: theme.colors.onTertiaryContainer }} />
      </TouchableOpacity>
    )
  }  
  

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.secondaryContainer }]}>
      <View style={styles.toggleContainer}>
        <Text style={[styles.toggleText, { color: theme.colors.onSecondaryContainer }]}>{isDarkTheme? "Dark Mode" : "Light Mode"}</Text>
        <TouchableOpacity onPress={toggleTheme}>
          <Icon
            name={isDarkTheme? "light-mode" : "dark-mode"}
            size={30}
            color={isDarkTheme ? "white" : theme.colors.toggleButtonColor}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={[styles.settingsContainer, { backgroundColor: theme.colors.tertiaryContainer }]}>
        <SettingItem
          icon="notifications"
          label="Notifications"
          onPress={() => navigation.navigate('Notifications')}
        />
      </View>
      <View style={[styles.settingsContainer, { backgroundColor: theme.colors.tertiaryContainer }]}>
          <SettingItem 
          icon="menu"
          label="Credits"
          onPress={() => navigation.navigate('Credits')}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
    borderRadius: 8,
    paddingVertical: 8,
    marginTop:4,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
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

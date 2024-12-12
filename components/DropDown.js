
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper'

const Dropdown = ({ items, selectedValue, onValueChange }) => {
    const [isVisible, setIsVisible] = useState(false);
    const theme = useTheme()

    const handleSelect = (item) => {
        onValueChange(item.value);
        setIsVisible(false);
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                <Text style={{ color: theme.colors.onTertiaryContainer}}>{selectedValue}</Text>
            </TouchableOpacity>

            {isVisible && (
                <Modal transparent={true} animationType="slide">
                    <TouchableOpacity style={styles.overlay} onPress={() => setIsVisible(false)}>
                        <View style={styles.dropdown}>
                            <FlatList style={[ styles.dropdownlist, { backgroundColor: theme.colors.tertiaryContainer }]}
                                data={items}
                                keyExtractor={(item) => item.value}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.dropdownItem}
                                        onPress={() => handleSelect(item)}
                                    >
                                        <Text style={{ color: theme.colors.onTertiaryContainer }}>{item.label}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
            )}
        </View>
    );
};



const styles = StyleSheet.create({
    dropdownText: {
        fontSize: 16,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdown: {
        width: '100%',
        borderRadius: 10,
        padding: 10,
        maxHeight: 400,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownlist: {
        borderRadius: 10,
        width: '80%',
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
});

export default Dropdown;


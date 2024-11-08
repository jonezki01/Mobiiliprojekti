
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, StyleSheet } from 'react-native';

const Dropdown = ({ items, selectedValue, onValueChange }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleSelect = (item) => {
        onValueChange(item.value);
        setIsVisible(false);
    };

    return (
        <View>
            <TouchableOpacity style={styles.dropdownButton} onPress={() => setIsVisible(!isVisible)}>
                <Text style={styles.dropdownText}>{selectedValue}</Text>
            </TouchableOpacity>

            {isVisible && (
                <Modal transparent={true} animationType="slide">
                    <TouchableOpacity style={styles.overlay} onPress={() => setIsVisible(false)}>
                        <View style={styles.dropdown}>
                            <FlatList
                                data={items}
                                keyExtractor={(item) => item.value}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.dropdownItem}
                                        onPress={() => handleSelect(item)}
                                    >
                                        <Text>{item.label}</Text>
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
    dropdownButton: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
        backgroundColor: '#f9f9f9',
    },
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
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        maxHeight: 200,
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
});

export default Dropdown;


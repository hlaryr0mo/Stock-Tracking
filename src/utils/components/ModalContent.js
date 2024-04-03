import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import OkButton from './OkButton';

/**
 * Renders the content of a modal.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the modal.
 * @param {string} props.newSymbol - The value of the new symbol input.
 * @param {function} props.setNewSymbol - The function to update the new symbol value.
 * @param {function} props.handleSubmit - The function to handle the submit action.
 * @returns {JSX.Element} The rendered modal content.
 */
const ModalContent = ({ title, newSymbol, setNewSymbol, handleSubmit }) => {
    return (
        <View style={styles.container}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>{title}</Text>
                <TextInput
                    value={newSymbol}
                    style={styles.input}
                    placeholder="Enter Stock Symbol"
                    onChangeText={setNewSymbol}
                />
                <OkButton title="Ok" onPress={handleSubmit} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: "#383535",
        borderRadius: 15,
        padding: 20,
        alignItems: "center",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: 300,
    },
    modalText: {
        marginBottom: 10,
        textAlign: "center",
        color: '#FEFEFE',
        fontSize: 20,
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#F0F1F1',
        color: '#2B3990',
        marginBottom: 60,
    },
});

export default ModalContent;
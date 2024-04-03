import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

/**
 * Renders a button component with an "Ok" label.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onPress - The function to be called when the button is pressed.
 * @param {string} props.title - The title of the button.
 * @returns {JSX.Element} The rendered OkButton component.
 */
const OkButton = ({ onPress, title }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#383535',
        borderColor: '#FEFEFE',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1.5,
        margin: 10,
        width: 100,
    },
    text: {
        color: '#FEFEFE',
        textAlign: 'center',
        fontWeight: 'normal',
        fontSize: 18,
    },
});

export default OkButton
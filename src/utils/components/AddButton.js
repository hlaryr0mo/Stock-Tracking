import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import Plus_sign_icon_3x from '../../resources/icons/Plus_sign_icon_3x.png'

/**
 * Renders an add button component.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onPress - The function to be called when the button is pressed.
 * @returns {JSX.Element} The rendered add button component.
 */
const AddButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image style={styles.image} source={Plus_sign_icon_3x} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#21201E',
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 40,
        height: 40,
    },
});

export default AddButton;
import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Up_arrow_icon_1x from '../../resources/icons/Up_arrow_icon_1x.png';
import Down_arrow_icon_1x from '../../resources/icons/Down_arrow_icon_1x.png';

/**
 * Represents a stock item component.
 *
 * @param {Object} props - The properties for the item component.
 * @param {string} props.symbol - The symbol of the stock.
 * @param {string} props.high - The high price of the stock.
 * @param {string} props.low - The low price of the stock.
 * @param {string} props.price - The current price of the stock.
 * @returns {JSX.Element} The stock item component.
 */

const Item = ({ symbol = '', high = '', low = '', price = '' }) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 15 }}>
        <View style={styles.item}>
            <Text style={styles.itemText}>{symbol}</Text>
            <Text style={styles.itemText}>{isNaN(price) ? 'N/A' : price}</Text> 
            <View style={styles.lastItem}>
                <Image source={Up_arrow_icon_1x} style={{ justifyContent: 'center', alignContent: 'center', marginVertical: 3 }} />
                <Text style={styles.itemText}>{isNaN(high) ? 'N/A' : high}</Text> 
                <Image source={Down_arrow_icon_1x} style={{ justifyContent: 'center', alignContent: 'center', marginLeft: 5, marginVertical: 3 }} />
                <Text style={styles.itemText}>{isNaN(low) ? 'N/A' : low}</Text> 
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: "#FEFEFE",
        padding: 10,
        width: "95%",
    },
    itemText: {
        color: '#FEFEFE',
        fontSize: 14,
        marginLeft: 5,
    },
    lastItem: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

export default Item;
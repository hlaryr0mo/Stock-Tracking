import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, Modal, View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import AddButton from './src/utils/components/AddButton';
import Item from './src/utils/components/Item';
import ModalContent from './src/utils/components/ModalContent';
import AsyncStorage from '@react-native-async-storage/async-storage'; // To store the symbols in the device
//import Bottleneck from 'bottleneck'; //To limit the number of requests to the API
import StocksData from './src/utils/data/StocksData';

/**
 * Main component for the Stock Tracking app.
 * @returns {JSX.Element} The rendered component.
 */
export default function App() {

  const [stocks, setStock] = useState([]); // The state to store the stock data
  const [error, setError] = useState(null); // The state to store the error message
  const [symbols, setSymbols] = useState(['QQQ', 'SPY', 'QCOM', 'AAPL', 'GOOG']); // The state to store the symbols
  const [newSymbol, setNewSymbol] = useState(''); // The state to store the new symbol
  const [modalVisible, setModalVisible] = useState(false); // The state to store the modal visibility
  const [isLoading, setIsLoading] = useState(true); // The state to store the loading state

  // Function to load the stock data from the API or from the local storage
  const loadStock = async (symbol) => {
    /* If the API is used, uncomment the following code and comment the local storage code...

    const limiter = new Bottleneck({
      minTime: 12000  // At least 12 seconds between each request
    });
    return limiter.schedule(async () => {
      // Fetch the stock data from the API 
      const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=0518ZWNPHPN5Y1MU`); 
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`); // Throw an error if the response is not ok
      }
      const data = await response.json(); // Parse the response to JSON
      if (!data["Global Quote"] || data["Information"]) {
        throw new Error(`API limit reached! status: ${response.status}`); // Throw an error if the API limit is reached 
      }
      
      // Return the stock data if it exists, otherwise return an object with the symbol
      return Object.keys(data["Global Quote"]).length === 0 ? { "Global Quote": { "01. symbol": symbol } } : data; 
    });*/
    
    // Find the stock data in the local storage
    let stock = StocksData.find(stock => stock["Global Quote"]["01. symbol"] === symbol); 
    if (!stock) {
      stock = {
        "Global Quote": {
          "01. symbol": symbol,
        } // Return an object with the symbol if the stock data does not exist
      };
      StocksData.push(stock); // Add the new stock data to the StocksData array
    }

    return stock; // Return the stock data
  };
 
 useEffect(() => {
  const loadSymbols = async () => {
    const storedSymbols = await AsyncStorage.getItem('symbols'); // Get the symbols from the local storage
    if (storedSymbols || symbols) { // If the symbols exist in the local storage or in the state
      const symbolsArray = JSON.parse(storedSymbols); // Parse the symbols to an array
      // Remove the duplicates from the symbols array and store the unique symbols
      const uniqueSymbols = symbols ? [...new Set([...symbols, ...symbolsArray])] : [...new Set([...symbolsArray])]; 
      setSymbols(uniqueSymbols); // Set the unique symbols to the symbols state

      setIsLoading(true); // Set the loading state to true 
      try {
        let stockDataArray = [];
        for (let symbol of uniqueSymbols) { // Loop through the unique symbols
          try {
            const stockData = await loadStock(symbol); // Fetch the stock data for each symbol
            stockDataArray.push(stockData); // Add the stock data to the stockDataArray
          } catch (error) {
            console.error(`Failed to load stock data for this symbol ${symbol}: ${error.message}`); // Log the error message
          }
        };
        setStock(prevStock => [...prevStock, ...stockDataArray]); // Add the stock data to the stocks state 
      } catch (error) {
        setError(error.message); // Set the error message to the error state
      } finally { 
        setIsLoading(false); // Set the loading state to false
      }
    }
  };
  
    loadSymbols(); // Call the loadSymbols function

  }, []);

  // Function to handle the submit of the new stock symbol
  const handleSubmit = async () => {
    if (!newSymbol) {
      throw new Error(`There is no symbol to add!`); // Throw an error if there is no symbol to add
    }
    const newSymbols = [...symbols, newSymbol]; // Add the new symbol to the symbols array
    setSymbols(newSymbols); // Set the new symbols to the symbols state
    await AsyncStorage.setItem('symbols', JSON.stringify(newSymbols)); // Store the new symbols in the local storage
    
    const newStockData = await loadStock(newSymbol); // Fetch the stock data for the new symbol
    setStock(prevStocks => [...prevStocks, newStockData]); // Add the new stock data to the stocks state

    setModalVisible(!modalVisible); // Set the modal visibility to false
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>My Stocks</Text>
        <View>
          <AddButton onPress={() => setModalVisible(true)} />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <ModalContent title='New Stock Symbol' newSymbol={newSymbol} setNewSymbol={setNewSymbol} handleSubmit={handleSubmit}/>
        </Modal>
      </View>

      <View>
        {isLoading ? ( // If the loading state is true, display the activity indicator
          <ActivityIndicator size="large" color="#0000ff" />
        ) : ( // Otherwise, display the stock data
          <View>
            <FlatList
              data={stocks}
              renderItem={({ item, index }) => (
                <Item
                  symbol={item["Global Quote"]["01. symbol"]}
                  high={parseFloat(item["Global Quote"]["03. high"]).toFixed(2)} // Parse the high value to a float and round it to 2 decimal places
                  low={parseFloat(item["Global Quote"]["04. low"]).toFixed(2)} // Parse the low value to a float and round it to 2 decimal places
                  price={parseFloat(item["Global Quote"]["05. price"]).toFixed(2)} // Parse the price value to a float and round it to 2 decimal places
                />
              )}
              keyExtractor={(item, index) => index.toString()} // Set the key extractor to the index because the stock data does not have an unique property 
            />
          </View>
        )}
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21201E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    margin: 30,
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 60,
  },
  mainTitle: {
    fontSize: 25,
    color: '#FEFEFE',
    alignContent: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});


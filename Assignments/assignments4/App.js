import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, Button, FlatList, TextInput, Platform, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Accelerometer } from 'expo-sensors';

/////////////////////////////////////
// 1. Context API
/////////////////////////////////////
const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const [jokes, setJokes] = useState([]);
  const [status, setStatus] = useState('');

  const RAPID_KEY = 'YOUR_RAPIDAPI_KEY_HERE';
  const BASE = 'https://jokeapi-v2.p.rapidapi.com';

  const fetchJokes = async () => {
    setStatus('Fetching...');
    try {
      const res = await fetch(`${BASE}/joke/Any?type=twopart&amount=3`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': RAPID_KEY,
          'X-RapidAPI-Host': 'jokeapi-v2.p.rapidapi.com',
        },
      });
      const json = await res.json();
      setJokes(json.jokes || []);
      setStatus('Fetched successfully.');
    } catch (e) {
      console.error(e);
      setStatus('Error fetching jokes');
    }
  };

  const addJoke = async (setup, delivery) => {
    setStatus('Submitting joke...');
    try {
      // Simulated POST (JokeAPI doesn’t support POST)
      console.log('POST joke:', { setup, delivery });
      setStatus('Joke submitted (simulated)');
    } catch (e) {
      console.error(e);
      setStatus('Failed to submit joke');
    }
  };

  const updateJoke = async (id, newDelivery) => {
    setStatus('Updating joke...');
    try {
      // Simulated PUT (JokeAPI doesn’t support PUT)
      console.log('PUT joke:', { id, newDelivery });
      setStatus('Joke updated (simulated)');
    } catch (e) {
      console.error(e);
      setStatus('Failed to update joke');
    }
  };

  return (
    <ApiContext.Provider value={{ jokes, fetchJokes, addJoke, updateJoke, status }}>
      {children}
    </ApiContext.Provider>
  );
};

const useApi = () => useContext(ApiContext);

/////////////////////////////////////
// 2. Screens
/////////////////////////////////////
function HomeScreen({ navigation }) {
  const { jokes, fetchJokes, status } = useApi();

  useEffect(() => {
    fetchJokes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fetched Jokes</Text>
      <FlatList
        data={jokes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.jokeBox}>
            <Text style={styles.setup}>{item.setup}</Text>
            <Text>{item.delivery}</Text>
          </View>
        )}
      />
      <Text>Status: {status}</Text>
      <Button title="Go to Joke Form" onPress={() => navigation.navigate('Form')} />
      <Button title="Go to Sensor Screen" onPress={() => navigation.navigate('Sensor')} />
    </View>
  );
}

function JokeFormScreen() {
  const { addJoke, updateJoke, status } = useApi();
  const [setup, setSetup] = useState('');
  const [delivery, setDelivery] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit a New Joke</Text>
      <TextInput
        style={styles.input}
        placeholder="Setup"
        value={setup}
        onChangeText={setSetup}
      />
      <TextInput
        style={styles.input}
        placeholder="Delivery"
        value={delivery}
        onChangeText={setDelivery}
      />
      <Button title="Submit Joke (POST)" onPress={() => addJoke(setup, delivery)} />
      <Button title="Update Joke (PUT)" onPress={() => updateJoke(1, delivery)} />
      <Text>Status: {status}</Text>
    </View>
  );
}

function SensorScreen() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);

  const subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelData => {
        setData(accelData);
      })
    );
    Accelerometer.setUpdateInterval(300);
  };

  const unsubscribe = () => {
    subscription?.remove();
    setSubscription(null);
  };

  useEffect(() => {
    if (Platform.OS !== 'web') subscribe();
    return () => unsubscribe();
  }, []);

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Text>Sensors are not supported on web. Try this on a real device.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accelerometer</Text>
      <Text>X: {data.x.toFixed(3)}</Text>
      <Text>Y: {data.y.toFixed(3)}</Text>
      <Text>Z: {data.z.toFixed(3)}</Text>
      <Button
        title={subscription ? 'Stop' : 'Start'}
        onPress={subscription ? unsubscribe : subscribe}
      />
    </View>
  );
}

/////////////////////////////////////
// 3. App Navigation
/////////////////////////////////////
const Stack = createStackNavigator();

export default function App() {
  return (
    <ApiProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Form" component={JokeFormScreen} />
          <Stack.Screen name="Sensor" component={SensorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApiProvider>
  );
}

/////////////////////////////////////
// 4. Styles
/////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  jokeBox: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  setup: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
});

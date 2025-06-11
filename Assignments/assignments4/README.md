📱 React Native App Summary with RapidAPI & Sensors:

🔗1. API Integration (via RapidAPI)

  Uses **JokeAPI** from RapidAPI
  Calls 3 types of API endpoints:

   ✅ `GET`: Fetch jokes from the API
   📨 `POST`: Simulated joke submission
   ✏️ `PUT`: Simulated joke update

---
🧠 2. Context API

  📦 Manages joke data and API status globally
  ♻️ Shared across all screens using `ApiContext`
Functions:

   `fetchJokes()`
   `addJoke()`
   `updateJoke()`

---
🏠 3. Screens

Home Screen 🏡

  Displays fetched jokes
  Buttons to navigate to form & sensor screen

Form Screen 📝

  Inputs to add a joke (simulated POST)
  Update button to simulate PUT

 Sensor Screen 📡

   Uses `expo-sensors` to show **accelerometer** data (`x`, `y`, `z`)
   🚫 Shows a warning if run on web (sensors not supported)

---
🔁 4. Navigation

Uses "React Navigation" to switch between:

 Home 🏠
 Joke Form ✍️
 Sensor Data 📊

---

🧪 5. Technologies Used**

🚀 Expo
📦 `expo-sensors`
🌐 RapidAPI
⚛️ React Context API
🧭 React Navigation

---

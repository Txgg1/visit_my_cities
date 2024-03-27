import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Dashboard from "./screens/Dashboard";
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ProfileScreen from './screens/ProfileScreen';
import { Provider } from 'react-redux';
import Store from './store/configStore';
import Camera from './screens/CameraScreen';
import Localisation from './screens/LocalisationScreen';
import FavoriteBuildingsScreen from './screens/FavoriteBuildingsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    
  }, []);

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Homescreen"
            component={HomeScreen}
          />
          <Stack.Screen name="Profile" component={ProfileScreen}  options={{ title: 'Profil' }} />
          <Stack.Screen name="Loginscreen" component={LoginScreen} options={{title: 'Connexion'}} />
          <Stack.Screen name="Registerscreen" component={RegisterScreen} options={{title: 'Inscription'}} />
          <Stack.Screen name="ForgotPasswordscreen" component={ForgotPasswordScreen} options={{title: 'Mot de passe'}} />
          <Stack.Screen name="Dashboard" component={Dashboard} options={{title: 'Dasboard'}} />
          <Stack.Screen name="Camera" component={Camera} />
          <Stack.Screen name="Localisation" component={Localisation} options={{title: 'Google Earth'}} />
          <Stack.Screen name="FavoriteBuildings" component={FavoriteBuildingsScreen} options={{title: 'Batiments favoris'}} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

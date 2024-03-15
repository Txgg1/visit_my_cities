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
import MenuBurger from './screens/menu';


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
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Loginscreen" component={LoginScreen} />
          <Stack.Screen name="Registerscreen" component={RegisterScreen} />
          <Stack.Screen name="ForgotPasswordscreen" component={ForgotPasswordScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Camera" component={Camera} />
          <Stack.Screen name="Localisation" component={Localisation}/>

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

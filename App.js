import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import AddProductScreen from './screens/AddProductScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import AuthenticatedScreens from './AuthenticatedScreens';
import { ProductProvider } from './contexts/ProductContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ProductProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Main" component={AuthenticatedScreens} options={{ headerShown: false }} />
          <Stack.Screen name="AddProduct" component={AddProductScreen} options={{ title: 'Dodaj Produkt' }} />
          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Szczegóły Produktu' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProductProvider>
  );
};

export default App;

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddProductScreen from './screens/AddProductScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import { ProductProvider } from './contexts/ProductContext';

const AuthenticatedStack = createNativeStackNavigator();

const AuthenticatedScreens = () => {
  return (
    <ProductProvider>
      <AuthenticatedStack.Navigator>
        <AuthenticatedStack.Screen name="Home" component={HomeScreen} options={{ title: 'Lista Zakupów' }} />
        <AuthenticatedStack.Screen name="AddProduct" component={AddProductScreen} options={{ title: 'Dodaj Produkt' }} />
        <AuthenticatedStack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Informacje o produkcie' }} />
      </AuthenticatedStack.Navigator>
    </ProductProvider>
  );
};

export default AuthenticatedScreens;

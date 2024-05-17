import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProductDetailsScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <Text>Cena: {product.price}</Text>
      <Text>Sklep: {product.store}</Text>
      <Text>Status zakupu: {product.purchased ? 'Kupiono' : 'Nie kupiono'}</Text>
      <Text>Opis: {product.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});

export default ProductDetailsScreen;

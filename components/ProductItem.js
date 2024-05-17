import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ProductItem = ({ product, onRemove, onTogglePurchased }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={[styles.text, product.purchased ? styles.purchased : null]}>
          {product.name} - {product.price} zł - {product.store}
        </Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => onTogglePurchased()} style={[styles.button, styles.toggleButton]}>
          <Text style={styles.buttonText}>{product.purchased ? 'Kupiono' : 'Wykreśl'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onRemove()} style={[styles.button, styles.removeButton]}>
          <Text style={styles.buttonText}>Usuń</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 12,
    color: '#666',
  },
  purchased: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  button: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  toggleButton: {
    backgroundColor: '#4caf50',
  },
  removeButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ProductItem;

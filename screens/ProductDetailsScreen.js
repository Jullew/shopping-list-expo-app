import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProductDetailsScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.name}</Text>
        <View style={styles.detailRow}>
          <Ionicons name="pricetag-outline" size={24} color="#6200ee" />
          <Text style={styles.detailText}>Cena: {product.price} zł</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="storefront-outline" size={24} color="#6200ee" />
          <Text style={styles.detailText}>Sklep: {product.store}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons
            name={
              product.purchased
                ? "checkmark-circle-outline"
                : "close-circle-outline"
            }
            size={24}
            color="#6200ee"
          />
          <Text style={styles.detailText}>
            Status zakupu: {product.purchased ? "Kupiono" : "Nie kupiono"}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color="#6200ee"
          />
          <Text style={styles.detailText}>Opis: {product.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
  detailsContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 18,
    marginLeft: 10,
    color: "#333",
  },
});

export default ProductDetailsScreen;

import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert, ScrollView } from 'react-native';
import ProductContext from "../contexts/ProductContext";
import { useNavigation, useRoute } from "@react-navigation/native";

const AddProductScreen = () => {
  const [newProductName, setNewProductName] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [customSection, setCustomSection] = useState("");
  const [price, setPrice] = useState("");
  const [store, setStore] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigation = useNavigation();
  const route = useRoute();
  const { addNewProduct, products } = useContext(ProductContext);

  useEffect(() => {
    if (route.params?.section) {
      setSelectedSection(route.params.section);
    }
  }, [route.params]);

  const handleAddProduct = () => {
    const finalSection = customSection || selectedSection;

    if (
      !newProductName ||
      !finalSection ||
      !price ||
      !store ||
      !description ||
      !imageUrl
    ) {
      Alert.alert("Błąd", "Wszystkie pola muszą być wypełnione.");
      return;
    }

    const productDetails = {
      newProductName,
      selectedSection: finalSection,
      price,
      store,
      description,
      imageUrl,
    };
    addNewProduct(productDetails);

    navigation.goBack();
    Alert.alert("Sukces", "Produkt został dodany.");
  };

  const sectionOptions = products.map((section) => section.title);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dodaj nowy produkt</Text>
      <TextInput
        style={styles.input}
        placeholder="Nazwa produktu"
        value={newProductName}
        onChangeText={setNewProductName}
      />
      <View style={styles.sectionContainer}>
        {sectionOptions.map((section, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.sectionButton,
              selectedSection === section && styles.selectedSectionButton,
            ]}
            onPress={() => setSelectedSection(section)}
          >
            <Text
              style={[
                styles.sectionButtonText,
                selectedSection === section && styles.selectedSectionButtonText,
              ]}
            >
              {section}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Lub wpisz nową sekcję"
        value={customSection}
        onChangeText={setCustomSection}
      />
      <TextInput
        style={styles.input}
        placeholder="Sklep"
        value={store}
        onChangeText={setStore}
      />
      <TextInput
        style={styles.input}
        placeholder="Cena"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Opis"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="URL obrazu"
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Dodaj produkt</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  sectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  sectionButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  selectedSectionButton: {
    backgroundColor: '#6200ee',
  },
  sectionButtonText: {
    color: '#000',
  },
  selectedSectionButtonText: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddProductScreen;

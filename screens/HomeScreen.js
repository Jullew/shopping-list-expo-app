import React, { useContext, useState, useEffect } from 'react';
import { SectionList, Text, View, StyleSheet, TextInput, Alert, TouchableOpacity, Modal } from 'react-native';
import ProductItem from '../components/ProductItem';
import ProductContext from '../contexts/ProductContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const {
    products,
    removeProduct,
    togglePurchased,
    filterProducts,
    sortProducts,
  } = useContext(ProductContext);
  const [filterPriceMin, setFilterPriceMin] = useState("");
  const [filterPriceMax, setFilterPriceMax] = useState("");
  const [filterStore, setFilterStore] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const navigation = useNavigation();

  const navigateToAddProduct = (section) => {
    navigation.navigate("AddProduct", { section });
  };

  const navigateToProductDetails = (product) => {
    navigation.navigate("ProductDetails", { product });
  };

  const handleFilter = () => {
    const minPrice = parseFloat(filterPriceMin) || 0;
    const maxPrice = parseFloat(filterPriceMax) || Infinity;
    const filtered = filterProducts(products, minPrice, maxPrice, filterStore);
    setFilteredProducts(filtered);
    setFilterModalVisible(false);
  };

  const handleLogout = () => {
    navigation.replace("Login");
  };

  useEffect(() => {
    const minPrice = parseFloat(filterPriceMin) || 0;
    const maxPrice = parseFloat(filterPriceMax) || Infinity;
    const filtered = filterProducts(products, minPrice, maxPrice, filterStore);
    setFilteredProducts(filtered);
  }, [products, filterPriceMin, filterPriceMax, filterStore]);

  const handleSortPurchased = () => {
    const sorted = sortProducts(filteredProducts);
    setFilteredProducts(sorted);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={24} color="#fff" />
      </TouchableOpacity>
      {products.length === 0 && (
        <TouchableOpacity
          onPress={() => navigateToAddProduct(null)}
          style={styles.addButton}
        >
          <Ionicons name="add-circle-outline" size={24} color="#fff" />
        </TouchableOpacity>
      )}
      <View style={styles.sectionContainer}>
        <SectionList
          sections={filteredProducts}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({ item, section }) => (
            <TouchableOpacity
              onPress={() => navigateToProductDetails(item)}
              style={styles.productItem}
            >
              <ProductItem
                product={item}
                onRemove={() => removeProduct(item.id, section.title)}
                onTogglePurchased={() =>
                  togglePurchased(item.id, section.title)
                }
              />
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.headerText}>{title}</Text>
              <TouchableOpacity onPress={() => navigateToAddProduct(title)}>
                <Ionicons name="add-circle-outline" size={24} color="#6200ee" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setFilterModalVisible(true)}
      >
        <Text style={styles.filterButtonText}>Filtry</Text>
      </TouchableOpacity>
      <Modal
        visible={isFilterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtry</Text>
            <TextInput
              style={styles.input}
              placeholder="Filtruj po cenie minimalnej (zł)"
              value={filterPriceMin}
              onChangeText={setFilterPriceMin}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Filtruj po cenie maksymalnej (zł)"
              value={filterPriceMax}
              onChangeText={setFilterPriceMax}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Filtruj po sklepie"
              value={filterStore}
              onChangeText={setFilterStore}
            />
            <TouchableOpacity style={styles.button} onPress={handleFilter}>
              <Text style={styles.buttonText}>Filtruj</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.clearButton]}
              onPress={() => {
                setFilterPriceMin("");
                setFilterPriceMax("");
                setFilterStore("");
                setFilteredProducts(products);
                setFilterModalVisible(false);
              }}
            >
              <Text style={styles.buttonText}>Wyczyść filtry</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.sortButton]}
              onPress={handleSortPurchased}
            >
              <Text style={styles.buttonText}>Sortuj po kupionych</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={() => setFilterModalVisible(false)}
            >
              <Text style={styles.buttonText}>Zamknij</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  sectionContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    borderRadius: 10,
    marginVertical: 5,
  },
  logoutButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#ff0000",
    padding: 10,
    borderRadius: 10,
    zIndex: 1,
  },
  addButton: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 10,
    zIndex: 1,
  },
  filterButton: {
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: [{ translateX: -50 }],
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 10,
  },
  filterButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  clearButton: {
    backgroundColor: "#ff9800",
  },
  closeButton: {
    backgroundColor: "#ff0000",
  },
  sortButton: {
    backgroundColor: "#4caf50",
  },
});

export default HomeScreen;

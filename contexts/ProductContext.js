import React, { createContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc, query, getDoc } from 'firebase/firestore';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'products'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      const groupedProducts = groupProductsBySection(productsData);
      setProducts(groupedProducts);
    });

    return () => unsubscribe();
  }, []);

  const groupProductsBySection = (products) => {
    const sections = {};
    products.forEach(product => {
      if (!sections[product.selectedSection]) {
        sections[product.selectedSection] = {
          title: product.selectedSection,
          data: []
        };
      }
      sections[product.selectedSection].data.push(product);
    });
    return Object.values(sections);
  };

  const addNewProduct = async (productDetails) => {
    const { newProductName, selectedSection, price, store, description, imageUrl } = productDetails;
    const newProduct = {
      name: newProductName,
      selectedSection,
      price,
      store,
      purchased: false,
      description,
      imageUrl
    };
    await addDoc(collection(db, 'products'), newProduct);
  };

  const removeProduct = async (productId) => {
    await deleteDoc(doc(db, 'products', productId));
  };

  const togglePurchased = async (productId) => {
    const productRef = doc(db, 'products', productId);
    const productSnap = await getDoc(productRef);
    if (productSnap.exists()) {
      const currentPurchasedStatus = productSnap.data().purchased;
      await updateDoc(productRef, { purchased: !currentPurchasedStatus });
    }
  };

  const filterProducts = (products, minPrice, maxPrice, store) => {
    if (!products) return [];
    return products.map(section => ({
      ...section,
      data: section.data.filter(product => {
        const price = parseFloat(product.price);
        const isPriceValid = (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
        const isStoreValid = !store || product.store.toLowerCase().includes(store.toLowerCase());
        return isPriceValid && isStoreValid;
      })
    }));
  };

  const sortProducts = (products) => {
    if (!products) return [];
    return products.map(section => {
      const sortedData = section.data.sort((a, b) => a.purchased === b.purchased ? 0 : a.purchased ? 1 : -1);
      return { ...section, data: sortedData };
    });
  };

  return (
    <ProductContext.Provider value={{
      products,
      setProducts,
      addNewProduct,
      removeProduct,
      togglePurchased,
      filterProducts,
      sortProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;

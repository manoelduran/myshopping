import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { styles } from './styles';
import { Product, ProductProps } from '../Product';

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([] as ProductProps[]);
  // useEffect(() => {
  //   firestore()
  //     .collection('products')
  //     .doc('XCMx5FtjVCYAD0rb4XIF')
  //     .get()
  //     .then(response => {
  //       console.log({
  //         id: response.id,
  //         ...response.data()
  //       })
  //     })
  // }, [])
  useEffect(() => {
    const subscribe = firestore()
      .collection('products')
      // .where('quantity', '<=', 12)
      .limit(5)
      .orderBy('description', 'asc')
      // .startAfter(1) intervalo da ordem de 1 a 5 , se for ordem por quantity
      // .endAt(5)
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as ProductProps[];
        setProducts(data);
      });
    return () => subscribe();
  }, []);
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}

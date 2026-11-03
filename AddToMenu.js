import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button, FlatList, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MenuContext } from './App';

export default function AddToMenuScreen({ navigation }) {
  const [dish, setDish] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('courses');
  const [price, setPrice] = useState('');
  const { menuList, setMenuList } = useContext(MenuContext);

  // Add new menu item 
  const handleAddItem = () => {
    if (!dish.trim() || !price.trim() || course === 'courses') {
      Alert.alert("Error", "Please complete all required fields.");
      return;
    }
    
    // Construct the item to perfectly match what MenuScreen expects
    const newItem = {
      id: Date.now().toString(),
      dish: dish.trim(),
      description: description.trim(),
      course: course, // This will now pass "Starter Course", "Main Course", or "Dessert Course" exactly
      price: price.trim(),
      image: null
    };

    // Update the global state context
    setMenuList([...menuList, newItem]);
    
    Alert.alert("Success", `${dish} added to Menu!`, [
      { text: "OK", onPress: () => navigation.navigate('Menu') }
    ]);
    
    handleClear();
  };

  // Clear all the fields
  const handleClear = () => {
    setDish('');
    setDescription('');
    setCourse('courses');
    setPrice('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={menuList}
        keyExtractor={(item) => item.id || Math.random().toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View style={styles.header}>
              <Image source={require('./assets/profile.png')} style={styles.profileImage} />
              <Image source={require('./assets/logo.png')} style={styles.logo} />
            </View>
            
            <Text style={styles.heading}>Add To Menu</Text>

            {/* Dish */}
            <Text style={styles.label}>Dish Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Dish"
              placeholderTextColor="#888"
              value={dish}
              onChangeText={setDish}
            />

            {/* Description */}
            <Text style={styles.label}>Description (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter description"
              placeholderTextColor="#888"
              value={description}
              onChangeText={setDescription}
            />

            {/* Course */}
            <Text style={styles.label}>Course *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={course}
                style={Platform.OS === 'ios' ? null : styles.picker}
                onValueChange={(itemValue) => setCourse(itemValue)}
              >
                <Picker.Item label="Select course" value="courses" />
                {/* Fixed: Explicitly set values to match the exact string format in MenuScreen */}
                <Picker.Item label="Starter" value="Starter Course" />
                <Picker.Item label="Main" value="Main Course" />
                <Picker.Item label="Dessert" value="Dessert Course" />
              </Picker>
            </View>

            {/* Price */}
            <Text style={styles.label}>Price (Rands) *</Text>
            <TextInput
              style={styles.input}
              placeholder="Price in Rands"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />

            {/* Buttons */}
            <View style={styles.buttonRow}>
              <View style={styles.button}>
                <Button title="Clear" color="black" onPress={handleClear} />
              </View>
              <View style={styles.button}>
                <Button title="Add Item" color="black" onPress={handleAddItem} />
              </View>
            </View>

            {/* Back button */}
            <View style={styles.backButton}>
              <Button title="Back" color="black" onPress={() => navigation.goBack()} />
            </View>

            {menuList && menuList.length > 0 && (
              <Text style={[styles.label, { marginTop: 20 }]}>
                Custom Added Items Preview:
              </Text>
            )}
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item?.dish || 'Unnamed Dish'}</Text>
            <Text style={styles.cardSub}>
              {item?.course || 'Unassigned Course'} — R{item?.price || '0.00'}
            </Text>
            {item?.description ? <Text style={styles.cardDesc}>{item.description}</Text> : null}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9D69E'
  },
  listContainer: {
    padding: 20,
    paddingBottom: 40
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#333'
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: 'black'
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: 'black'
  },
  profileImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain'
  },
  logo: {
    width: 100,
    height: 60,
    resizeMode: 'contain'
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center'
  },
  picker: {
    height: 50,
    color: 'black'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  button: {
    marginHorizontal: 10,
    minWidth: 100
  },
  backButton: {
    alignSelf: 'center',
    marginTop: 15,
    minWidth: 100
  },
  card: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    borderLeftWidth: 5,
    borderLeftColor: 'black'
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  cardSub: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 2
  },
  cardDesc: {
    fontSize: 13,
    color: '#555',
    fontStyle: 'italic'
  }
});

/*REFERENCES

GeeksforGeeks. 2025. React Native Picker Component. [online] Available at: <https://www.geeksforgeeks.org/react-native/react-native-picker-component/> [Accessed 07 September 2026]

Meta Platforms, Inc. 2026. TextInput[Online]. Available: https://reactnative.dev/docs/textinput [Accessed 06 September 2026].

W3Schools. 2026. JavaScript new Date [Online]. Available: https://www.w3schools.com/jsref/jsref_date_new.asp [Accessed 06 September 2026].

0 Degree Coder. 2024. [12] Handling Text Input in React Native | Learn How to Handle Text Input in React Native Part-12 [Video] [0:01:33]. YouTube. Available: https://youtu.be/9YBt2fDdyw4?si=ah0rzRZ_6yG7zEPF [Accessed 04 September 2026].

Makozi, M. 2020. Navigating between screens or activities using React Navigation Library [Blog]. Available: https://medium.com/@marizu_makozi/navigating-between-screens-or-activities-using-react-navigation-library-68d57657d81 [Accessed 06 September 2026].

Meta Platforms, Inc. 2026. Navigating Between Screens[Online]. Available: https://reactnative.dev/docs/next/navigation [Accessed 06 September 2026].
 
W3Schools. 2026. React useContext Hook [Online]. Available: w3schools.com [Accessed 7 September 2026].*/
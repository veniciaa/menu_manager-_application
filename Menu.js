import React, { useContext, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  FlatList,
  Alert,
  TouchableOpacity
} from 'react-native';

import { MenuContext } from './App';


export default function MenuScreen({ navigation }) {

  const { menuList, setMenuList } = useContext(MenuContext);

  // SEARCH
  const [searchQuery, setSearchQuery] = useState('');

  // FILTERING
  const [filter, setFilter] = useState('All');


  // FILTER ITEMS BY COURSE
  const filterItems = menuList.filter((items) => {

    if (filter === 'All') {
      return true;
    }

    return items.course === filter;

  });


  // SEARCH
  const filteredMenu = filterItems.filter((item) => {

    // This will safely check item properties to prevent crashes if fields are missing
    const dishName = item.dish ? item.dish.toLowerCase() : '';

    const courseName = item.course ? item.course.toLowerCase() : '';

    const search = searchQuery.toLowerCase();

    return dishName.includes(search) || courseName.includes(search);

  });


  // SORT ITEMS (LOWEST TO HIGHEST)
  const sortedItems = [...filteredMenu].sort(
    (firstItem, secondItem) =>
      firstItem.price - secondItem.price
  );


  // ITEM TYPE BUTTON
  const ItemsTypeButton = ({ title }) => {

    const selected = filter === title;

    return (
      <TouchableOpacity
        style={[
          styles.itemTypeButton,
          selected && styles.selectedItemType
        ]}
        onPress={() => setFilter(title)}
      >

        <Text style={[
          styles.itemTypeText,
          selected && styles.selectedButtonText
        ]}>
          {title === 'All' ? 'All' : title.replace(' Course', '')}
        </Text>

      </TouchableOpacity>
    );

  };


  // EDIT
  const handleEdit = (item) => {
    navigation.navigate('AddToMenu', { itemToEdit: item });
  };


  // DELETE
  // itemId is used to identify each dish and filter it out of the menuList state variable when the delete button is pressed
  const deleteItem = (id) => {

    setMenuList((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );

  };


  // CONFIRM DELETION
  const confirmDelete = (item) => {

    Alert.alert(
      "Delete Dish",
      `Are you sure you want to delete ${item.dish}?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },

        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteItem(item.id),
        },
      ]
    );

  };


  // AVERAGE
  const calculateAverage = (selectedCourse) => {

    const courseItems = menuList.filter(
      (item) => item.course === selectedCourse
    );

    if (courseItems.length === 0) {
      return 0;
    }

    const total = courseItems.reduce(
      (sum, item) => sum + Number(item.price),
      0
    );

    return total / courseItems.length;

  };


  // FORMAT PRICES - change to South African currency
  const formatPrice = (amount) => {

    return `R ${Number(amount).toLocaleString('en-ZA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;

  };

  //AVERAGE CARD 
  const AverageCard = ({ title, courseName }) => {
    return (
      <View style={styles.averageCard}>
        <Text style={styles.averageTitle}>{title}</Text>
        <Text style={styles.averageAmount}>{formatPrice(calculateAverage(courseName))}</Text>
      </View>
    );
  };


  // MAKES EACH CARD FUNCTION
  const renderMenuItem = ({ item }) => (

    <View style={styles.menuItem}>

      <Image
        source={
          typeof item.image === 'number'
            ? item.image
            : require('./assets/logo.png')
        }
        style={styles.foodImage}
      />

      <View style={styles.menuInfo}>

        <Text style={styles.dish}>
          {item.dish || 'Unnamed Dish'}
        </Text>

        <Text style={styles.course}>
          {item.course || 'Unassigned Course'}
        </Text>

        <Text style={styles.price}>
          {formatPrice(item.price)}
        </Text>


        {/* BUTTONS */}
        <View style={styles.buttonContainer}>

          {/* EDIT BUTTON */}
          <View style={styles.button}>
            <Button
              title="Edit"
              color="black"
              onPress={() => handleEdit(item)}
            />
          </View>

          {/* DELETE BUTTON */}
          <View style={styles.button}>
            <Button
              title="Delete"
              color="red"
              onPress={() => confirmDelete(item)}
            />
          </View>

        </View>

      </View>

    </View>

  );


  return (

    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        <Image
          source={require('./assets/profile.png')}
          style={styles.profileImage}
        />

        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
        />

      </View>


      {/* TITLE */}
      <Text style={styles.heading}>
        Menu ({sortedItems.length} items)
      </Text>


      {/* AVERAGE PRICES */}
      <Text style={styles.heading}>
        Average Starter Price: {formatPrice(calculateAverage('Starter Course'))}
      </Text>

      <Text style={styles.heading}>
        Average Main Price: {formatPrice(calculateAverage('Main Course'))}
      </Text>

      <Text style={styles.heading}>
        Average Dessert Price: {formatPrice(calculateAverage('Dessert Course'))}
      </Text>


      {/* SEARCH */}
      <TextInput
        style={styles.input}
        placeholder="Search menu..."
        value={searchQuery}
        placeholderTextColor="gray"
        onChangeText={setSearchQuery}
      />


      {/* COURSE FILTER BUTTONS */}
      <View style={styles.filterContainer}>

        <ItemsTypeButton title="All" />

        <ItemsTypeButton title="Starter Course" />

        <ItemsTypeButton title="Main Course" />

        <ItemsTypeButton title="Dessert Course" />

      </View>


      {/* FLATLIST */}
      <FlatList
        data={sortedItems}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={renderMenuItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No dishes match your search.
          </Text>
        }
      />


      {/* BUTTONS */}

      {/* BACK BUTTON */}
      <View style={styles.buttonContainer}>

        <View style={styles.button}>
          <Button
            title="Back"
            color="black"
            onPress={() => navigation.goBack()}
          />
        </View>


        {/* ADD BUTTON */}
        <View style={styles.button}>
          <Button
            title="Add to Menu"
            color="black"
            onPress={() => navigation.navigate('AddToMenu', {
              itemToEdit: null
            })}
          />
        </View>

      </View>

    </View>

  );

  }


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#E9D69E',
    padding: 20
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20
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

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
    color: '#333'
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    color: 'black'
  },

  // FILTER BUTTON STYLES
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10
  },

  itemTypeButton: {
    backgroundColor: 'white',
    padding: 10,
    margin: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray'
  },

  selectedItemType: {
    backgroundColor: 'green',
    borderColor: 'green'
  },

  itemTypeText: {
    color: 'black',
    fontWeight: 'bold'
  },

  selectedButtonText: {
    color: 'white'
  },

  menuItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    alignItems: 'center'
  },

  foodImage: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
    borderRadius: 8
  },

  menuInfo: {
    marginLeft: 15,
    flex: 1
  },

  dish: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5
  },

  course: {
    fontSize: 15,
    color: 'black',
    marginBottom: 5
  },

  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },

  emptyText: {
    textAlign: 'center',
    color: 'dimgray',
    marginTop: 20,
    fontSize: 16,
    fontStyle: 'italic'
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },

  button: {
    flex: 1,
    margin: 5
  }

});


/* REFERENCES

W3Schools. 2026. React useContext Hook [Online]. Available: w3schools.com [Accessed 8 September 2026]

Robinson, S. 2026. How to Align Images in React Native [Blog]. Available: https://stackabuse.com/how-to-align-images-in-react-native/ [Accessed 2 September 2026].

GeeksforGeeks, 2026. Adding a SearchBar in React Native. [online] GeeksforGeeks. Available at: https://www.geeksforgeeks.org/react-native/how-to-add-searchbar-in-react-native/ [Accessed 8 September 2026].

Stack Overflow, 2017. Search Filter with React Native on FlatList. Available at: https://stackoverflow.com/questions/45666762/search-filter-with-react-native-on-flatlist (Accessed: 8 September 2026)

Şahin, D., 2023. 'Build Powerful Search, Filter & Sort Implementation in React Native', Medium [Blog], 30 October. Available at: https://medium.com/@didemsahin1789/build-powerful-search-filter-sort-implementation-in-react-native-ad1156e2ccd4 (Accessed: 8 September 2026).

Meta Platforms, Inc., 2026. FlatList · React Native. Available at: https://reactnative.dev/docs/flatlist (Accessed: 7 September 2026).

Developer Express Inc., 2026. React Menu - items | React Documentation v26.1. Available at: https://js.devexpress.com/React/Documentation/ApiReference/UI_Components/dxMenu/Configuration/items/ (Accessed: 7 September 2026).

Stack Overflow, 2022. URL path with image variable in image source URI React Native. Available at: https://stackoverflow.com/questions/71049092/url-path-with-image-variable-in-image-source-uri-react-native (Accessed: 7 September 2026).


Stack Overflow, 2017. React Native Flatlist default data name. Available at: https://stackoverflow.com/questions/46618821/react-native-flatlist-default-data-name (Accessed: 8 September 2026).

GeeksforGeeks. 2026. React Native FlatList Component [Blog]. Available: https://www.geeksforgeeks.org/react-native/react-native-flatlist-component/ [Accessed 6 September 2026].

W3Schools. 2026. React useContext Hook [Online]. Available: w3schools.com [Accessed 7 September 2026].

*/

import React, { useContext, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
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


  // CLEAR SEARCH AND FILTER
  const clearSearchAndFilter = () => {

    setSearchQuery('');
    setFilter('All');

  };


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
      Number(firstItem.price) - Number(secondItem.price)
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

        <Text style={styles.itemTypeText}>
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

    setMenuList((currentItems) => {

      const updatedItems = currentItems.filter((item) => {
        return item.id.toString() !== id.toString();
      });

      return updatedItems;

    });

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


  // COUNT ITEMS IN EACH COURSE
  const countCourseItems = (selectedCourse) => {

    const courseItems = menuList.filter(
      (item) => item.course === selectedCourse
    );

    return courseItems.length;

  };


  // CALCULATE AVERAGE PRICE PER COURSE
  const calculateAverage = (selectedCourse) => {

    const courseItems = menuList.filter((item) => {
      return item.course === selectedCourse;
    });

    if (courseItems.length === 0) {
      return 0;
    }

    const total = courseItems.reduce((sum, item) => {
      return sum + Number(item.price);
    }, 0);

    return total / courseItems.length;

  };


  // CALCULATE OVERALL AVERAGE PRICE
  const calculateOverallAverage = () => {

    if (menuList.length === 0) {
      return 0;
    }

    const total = menuList.reduce(
      (sum, item) => sum + Number(item.price),
      0
    );

    return total / menuList.length;

  };


  // FORMAT PRICES - change to South African currency
  const formatPrice = (amount) => {

    return `R ${Number(amount).toLocaleString('en-ZA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;

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
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEdit(item)}
          >
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>

          {/* DELETE BUTTON */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => confirmDelete(item)}
          >
            <Text style={styles.actionButtonText}>Delete</Text>
          </TouchableOpacity>

        </View>

      </View>

    </View>

  );


  return (

    <View style={styles.container}>

      {/* FLATLIST - MAIN SCROLLING SECTION */}
      <FlatList
        data={sortedItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMenuItem}
        showsVerticalScrollIndicator={true}

        // HEADER - EVERYTHING ABOVE THE MENU ITEMS
        ListHeaderComponent={

          <View>

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
              Menu ({menuList.length} items)
            </Text>


            {/* AVERAGE STARTER PRICE */}
            <View style={styles.averageCard}>

              <Text style={styles.averageTitle}>
                Average Starter Price
              </Text>

              <Text style={styles.averagePrice}>
                {formatPrice(calculateAverage('Starter Course'))}
              </Text>

              <Text style={styles.courseCount}>
                {countCourseItems('Starter Course')} items available
              </Text>

            </View>


            {/* AVERAGE MAIN PRICE */}
            <View style={styles.averageCard}>

              <Text style={styles.averageTitle}>
                Average Main Price
              </Text>

              <Text style={styles.averagePrice}>
                {formatPrice(calculateAverage('Main Course'))}
              </Text>

              <Text style={styles.courseCount}>
                {countCourseItems('Main Course')} items available
              </Text>

            </View>


            {/* AVERAGE DESSERT PRICE */}
            <View style={styles.averageCard}>

              <Text style={styles.averageTitle}>
                Average Dessert Price
              </Text>

              <Text style={styles.averagePrice}>
                {formatPrice(calculateAverage('Dessert Course'))}
              </Text>

              <Text style={styles.courseCount}>
                {countCourseItems('Dessert Course')} items available
              </Text>

            </View>


            {/* OVERALL AVERAGE PRICE */}
            <View style={styles.averageCard}>

              <Text style={styles.averageTitle}>
                Overall Average Price
              </Text>

              <Text style={styles.averagePrice}>
                {formatPrice(calculateOverallAverage())}
              </Text>

            </View>


            {/* SEARCH */}
            <View style={styles.searchContainer}>

              <TextInput
                style={styles.searchInput}
                placeholder="Search menu..."
                value={searchQuery}
                placeholderTextColor="gray"
                onChangeText={setSearchQuery}
              />

            </View>


            {/* COURSE FILTER BUTTONS */}
            <View style={styles.filterContainer}>

              <ItemsTypeButton title="All" />

              <ItemsTypeButton title="Starter Course" />

              <ItemsTypeButton title="Main Course" />

              <ItemsTypeButton title="Dessert Course" />

            </View>


            {/* CLEAR SEARCH AND FILTER BUTTON */}
            <TouchableOpacity
              style={styles.clearButton}
              onPress={clearSearchAndFilter}
            >
              <Text style={styles.clearButtonText}>
                Clear Search and Filter
              </Text>
            </TouchableOpacity>

          </View>

        }


        // SHOW MESSAGE WHEN NO ITEMS ARE FOUND
        ListEmptyComponent={

          <Text style={styles.emptyText}>
            No dishes match your search.
          </Text>

        }


        // FOOTER - BUTTONS BELOW MENU ITEMS
        ListFooterComponent={

          <View style={styles.buttonContainer}>

            {/* BACK BUTTON */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.actionButtonText}>
                Back
              </Text>
            </TouchableOpacity>


            {/* ADD BUTTON */}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('AddToMenu', {
                itemToEdit: null
              })}
            >
              <Text style={styles.actionButtonText}>
                Add to Menu
              </Text>
            </TouchableOpacity>

          </View>

        }

      />

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

  // AVERAGE CARD STYLES
  averageCard: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 6,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray'
  },

  averageTitle: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold'
  },

  averagePrice: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 2
  },

  // COURSE COUNT STYLE
  courseCount: {
    color: 'gray',
    fontSize: 13,
    marginTop: 3
  },

  // SEARCH STYLES
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },

  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
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
    backgroundColor: 'lightgray',
    padding: 10,
    margin: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray'
  },

  selectedItemType: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2
  },

  itemTypeText: {
    color: 'black',
    fontWeight: 'bold'
  },

  menuItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 12,
    borderRadius: 12,
    alignItems: 'center'
  },

  foodImage: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
    borderRadius: 10
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

  // EDIT BUTTON STYLE
  editButton: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
    margin: 5,
    borderRadius: 20,
    alignItems: 'center'
  },

  // DELETE BUTTON STYLE
  deleteButton: {
    flex: 1,
    backgroundColor: 'red',
    padding: 10,
    margin: 5,
    borderRadius: 20,
    alignItems: 'center'
  },

  // BACK BUTTON STYLE
  backButton: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
    margin: 5,
    borderRadius: 20,
    alignItems: 'center'
  },

  // ADD BUTTON STYLE
  addButton: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
    margin: 5,
    borderRadius: 20,
    alignItems: 'center'
  },

  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  // CLEAR BUTTON STYLES
  clearButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10
  },

  clearButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },

});


/* REFERENCES

W3Schools (2026) React useContext Hook. Available at:
https://www.w3schools.com/react/react_usecontext.asp
(Accessed: 8 September 2026).

Robinson, S. (2026) How to Align Images in React Native. StackAbuse. Available at:
https://stackabuse.com/how-to-align-images-in-react-native/
(Accessed: 2 September 2026).

GeeksforGeeks (2026) Adding a SearchBar in React Native. Available at:
https://www.geeksforgeeks.org/react-native/how-to-add-searchbar-in-react-native/
(Accessed: 8 September 2026).

Stack Overflow (2017) Search Filter with React Native on FlatList. Available at:
https://stackoverflow.com/questions/45666762/search-filter-with-react-native-on-flatlist
(Accessed: 8 September 2026).

Şahin, D. (2025) Build Powerful Search: Filter & Sort Implementation in React Native. Medium. Available at:
https://medium.com/@didemsahin1789/build-powerful-search-filter-sort-implementation-in-react-native-ad1156e2ccd4
(Accessed: 8 September 2026).

Meta Platforms (2026) FlatList. React Native Documentation. Available at:
https://reactnative.dev/docs/flatlist
(Accessed: 7 September 2026).

Developer Express (2026) React Menu Items.
(Accessed: 7 September 2026).

Stack Overflow (2022) Image URI in React Native.
(Accessed: 7 September 2026).

Stack Overflow (2026) FlatList Default Data.
(Accessed: 8 September 2026).

GeeksforGeeks (2026) FlatList in React Native. Available at:
https://www.geeksforgeeks.org/react-native/react-native-flatlist/
(Accessed: 6 September 2026).

W3Schools (2026) React useContext Hook. Available at:
https://www.w3schools.com/react/react_usecontext.asp
(Accessed: 7 September 2026).

*/

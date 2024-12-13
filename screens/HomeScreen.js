import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet, Alert, FlatList, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Polyline } from "react-native-maps";

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [mapRegion, setMapRegion] = useState(null);
  const [travelPath, setTravelPath] = useState([]);
  const [placeType, setPlaceType] = useState("");

  const GOOGLE_API_KEY = 'AIzaSyCNlzkbIOWaelykgCbWOjkJHLkDOuV_OrA';

  useEffect(() => {
    let subscription;
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission Denied. Location access is required.");
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (loc) => {
          setLocation(loc.coords);
          if (!mapRegion) {
            setMapRegion({
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            });
          }
        }
      );
    })();

    return () => {
      if (subscription) subscription.remove();
    };
  }, [mapRegion]);

  const fetchPlaces = async (category) => {
    if (!location) {
      Alert.alert("Location not available", "Unable to fetch location.");
      return;
    }

    setLoading(true);
    try {
      const { latitude, longitude } = location;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=${category}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const newPlaces = data.results.map((item) => ({
          id: item.place_id,
          name: item.name,
          address: item.vicinity,
          latitude: item.geometry.location.lat,
          longitude: item.geometry.location.lng,
        }));

        setPlaces(newPlaces);

        setMapRegion({
          latitude: newPlaces[0].latitude,
          longitude: newPlaces[0].longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
        const travelCoordinates = newPlaces.map(place => ({
          latitude: place.latitude,
          longitude: place.longitude,
        }));

        setTravelPath([{ latitude: location.latitude, longitude: location.longitude }, ...travelCoordinates]);
      } else {
        Alert.alert("No Results", "No places found nearby.");
        setPlaces([]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong while fetching places.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySearch = (category) => {
    setPlaceType(category);
    fetchPlaces(category);
  };
const getLiveLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location access is required to fetch your live location.");
      return;
    }

    setLoading(true);
    try {
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(loc.coords);

      setMapRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch live location.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      Alert.alert("Input required", "Please enter a search term.");
      return;
    }

    setLoading(true);
    try {
      const { latitude, longitude } = location;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchQuery}&location=${latitude},${longitude}&radius=5000&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const newPlaces = data.results.map((item) => ({
          id: item.place_id,
          name: item.name,
          address: item.formatted_address,
          latitude: item.geometry.location.lat,
          longitude: item.geometry.location.lng,
        }));

        setPlaces(newPlaces);
        setMapRegion({
          latitude: newPlaces[0].latitude,
          longitude: newPlaces[0].longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });

        const travelCoordinates = newPlaces.map(place => ({
          latitude: place.latitude,
          longitude: place.longitude,
        }));

        setTravelPath([{ latitude: location.latitude, longitude: location.longitude }, ...travelCoordinates]);
      } else {
        Alert.alert("No Results", "No places found for the search query.");
        setPlaces([]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong while fetching search results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : location ? (
        <MapView
          style={styles.map}
          region={mapRegion}
          onRegionChangeComplete={(region) => setMapRegion(region)}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your Location"
            description="You are here"
            pinColor="blue"
          />
          {places.map((place) => (
            <Marker
              key={place.id}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
              title={place.name}
              description={place.address}
              pinColor="red"
            />
          ))}
          {travelPath.length > 1 && (
            <Polyline
              coordinates={travelPath}
              strokeColor="green"
              strokeWidth={3}
              lineDashPattern={[1]}
            />
          )}
        </MapView>
      ) : (
        <Text style={styles.loadingText}>Fetching location...</Text>
      )}

  <Button title="Get Live Location" onPress={getLiveLocation} color="#FF6F61" />


      {/* Search bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for places..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />

      <View style={styles.categoryButtons}>
        <Button title="Halal" onPress={() => handleCategorySearch("halal")} color="#FF6F61" />
        <Button title="Restaurants" onPress={() => handleCategorySearch("restaurant")} color="#FF6F61" />
        
        <Button title="FastFood" onPress={() => handleCategorySearch("fastfood")} color="#FF6F61" />
        <Button title="Deserts" onPress={() => handleCategorySearch("deserts")} color="#FF6F61" />
      </View>

      {loading && <ActivityIndicator size="large" color="#FF6F61" style={styles.loader} />}

      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.placeCard}>
            <Text style={styles.placeName}>{item.name}</Text>
            <Text style={styles.placeAddress}>{item.address}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f9",
  },
  error: {
    color: "red",
    marginBottom: 20,
    fontWeight: "bold",
  },
  map: {
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
  },
  categoryButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
    gap: 10, // Add space between buttons
  },
  
  buttonStyle: {
    width: 100, // Set width for consistent size
    margin: 5,
  },
  
  placeCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  placeName: {
    fontSize: 18,
    fontWeight: "600",
  },
  placeAddress: {
    fontSize: 14,
    color: "gray",
  },
  loader: {
    marginTop: 20,
  },
});

export default HomeScreen;

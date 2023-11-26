import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import Button from "../components//ui/Button";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../firebase";

function ViewAllRecommendationsScreen(){
    const [recommendations, setRecommendations] = useState([])
    const user = auth.currentUser.uid;
    const navigation = useNavigation();


    const getRecommendations =  async () =>{
        const userDocRef = db.collection("users").doc(user);
      
        // Use the get() method to fetch the user's document
        const userDocSnapshot = await userDocRef.get();
    
        if (userDocSnapshot.exists) {
          // Check if the document exists
          
          const userData = userDocSnapshot.data();
          const collection = userDocRef.collection("recommendedRemedies");

          const recommendationArray = []
          
          if (userData && collection)
          {
           
            const remediesSnapshot = await collection.get();

           

            // Iterate through the documents and log the 'UserCondition' property
            remediesSnapshot.forEach((doc) => {
            const remedyData = doc.data();
            if (remedyData && remedyData.UserCondition) {
                console.log("UserCondition:", remedyData.UserCondition);
                console.log("Id:", doc.id);
                recommendationArray.push({
                    id: doc.id,
                    userCondition: remedyData.UserCondition
                  });
            }
            });

            

          }

          setRecommendations(recommendationArray)
          console.log(recommendations)
    
        }
      }

      useEffect( () => {
          getRecommendations()
      },[])


      //when an item gets clicked
      function itemSelected(item)
      {
        navigation.navigate("ViewRecommendationDetailScreen", {
            recommendId: item.id
          });
      }

      function lol()
      {
        Alert.alert('Item',
        'CLicked button', [
         
         {text: 'OK', onPress: () => console.log('OK Pressed')},
       ]);
      }

      return(
        <>
    <View style={styles.rootContainer}>
    
      <View style={styles.container}>
        <View style={styles.bottomSection}>
        <FlatList
            data={recommendations}
            renderItem={({ item }) => (
                <TouchableOpacity
                onPress={() => itemSelected(item)}
                >
                <View style={listItemStyle.rootContainer}>
                    <Text style={listItemStyle.Text}>{item.userCondition}</Text>
                </View>
                </TouchableOpacity>
            )}
        />

        </View>

      </View>

      <TouchableOpacity
        onPress={() => lol()}>
        
        <Text style={styles.buttonText}> + </Text>
       
        </TouchableOpacity>

    </View>
        
        </>
      )

}

const listItemStyle = StyleSheet.create({
    rootContainer: {
      flex: 1,
      alignItems: "flex-start",
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 10,
      borderBottomWidth: 1, // Add a border width for the black line
      borderBottomColor: "grey",
     
    },
  
    Text:{
      fontSize: 20,
      color: "black",
      fontWeight: "500"
    }
    
  })
  
  const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "white"
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      backgroundColor: "#35D96F",
    },
    container: {
      flex: 1,
      width: "100%",
    },
    topSection: {
      backgroundColor: "#35D96F",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    bookmarksText: {
      textAlign: "center",
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
    bottomSection: {
      flex: 1,
      backgroundColor: "white",
    },
    bigButtonContainer: {
      alignItems: "center",
    },
    iconContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "white",
    },
    logoutText: {
      color: "white",
    },
    continueButton:{
        borderRadius: 10,
        borderWidth: 1.5,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderColor: "black"
      },
      buttonText: {
        fontWeight: "bold",
        fontSize: "90",
        textAlign: "center",
        color: 'green',
      },
  });

export default ViewAllRecommendationsScreen;
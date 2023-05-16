import { Text, TextInput, StyleSheet, View, Modal, Alert } from "react-native";
import firebase from "firebase/app";
import { useState, useEffect } from "react";
import "firebase/firestore";
import "firebase/auth";
import Button from "../ui/Button";
// import Toast from "react-native-easy-toast";

const Col = (props) => {
  return (
    <View>
      <Text> {props.colorName}</Text>
    </View>
  );
};

const Themes = (props) => {
  return (
    <View>
      <Text> {props.colTheme} </Text>
    </View>
  );
};

function UserProfile() {
  //var user = auth.currentUser;
  const [userData, setUserData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [newFirstName, setFirstName] = useState("");
  const [newLastName, setLastName] = useState("");
  const [newEmail, setEmail] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const firestore = firebase.firestore();
    const auth = firebase.auth();
    const authId = auth.currentUser.uid;
    const userRef = firestore.collection("users").doc(authId);
    userRef.get().then((doc) => {
      if (doc.exists) {
        setUserData(doc.data());
      }
    });
  }, []);

  const updateUser = async () => {
    const firestore = firebase.firestore();
    const auth = firebase.auth();
    const authId = auth.currentUser.uid;
    const userRef = firestore.collection("users").doc(authId);

    if (newFirstName != "") {
      updateFirst(newFirstName);
    }

    if (newLastName != "") {
      updateLast(newLastName);
    }

    if (newEmail != "") {
      updateEmail(newEmail);
    }

    function updateFirst(first) {
      userRef
        .set(
          {
            firstName: first,
          },
          { merge: true }
        )
        .catch((error) => {});
    }

    function updateLast(last) {
      userRef
        .set(
          {
            lastName: last,
          },
          { merge: true }
        )
        .catch((error) => {});
    }
    //updating email
    function updateEmail(email) {
      const user = firebase.auth().currentUser;

      user
        .updateEmail(email)
        .then(() => {
          user
            .reload()
            .then(() => {
              userRef
                .set(
                  {
                    email: email,
                  },
                  { merge: true }
                )
                .then(() => {
                  alert("Email has been updated");
                })
                .catch((error) => {});
            })
            .catch((error) => {});
        })
        .catch((error) => {});
    }
  };

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const user = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      oldPassword
    );
    user
      .reauthenticateWithCredential(credentials)
      .then(() => {
        user
          .updatePassword(newPassword)
          .then(() => {
            alert("Password updated successfully");
            setModalVisible(false);
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const showAlert = (text) => {
    Alert.alert(text, "Your Changes Have Been Updated", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

  return (
    <>
      {userData && (
        <>
          <View style={styles.textContainer}>
            <Text style={styles.text}>First Name: {userData.firstName}</Text>
            <TextInput
              style={styles.textInput}
              secureTextEntry={false}
              value={newFirstName}
              onChangeText={setFirstName}
              placeholder="Enter new first name"
            ></TextInput>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>Last Name: {userData.lastName}</Text>
            <TextInput
              style={styles.textInput}
              secureTextEntry={false}
              value={newLastName}
              onChangeText={setLastName}
              placeholder="Enter new last name"
            ></TextInput>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}> Email: {userData.email}</Text>
            <TextInput
              autoCapitalize="none"
              style={styles.textInput}
              secureTextEntry={false}
              value={newEmail}
              onChangeText={setEmail}
              placeholder="Enter new email"
            ></TextInput>
          </View>

          <Button onPress={updateUser}>Update</Button>

          <View>
            <Button onPress={() => setModalVisible(true)}>
              Change Password
            </Button>

            <Modal visible={modalVisible} animationType="slide">
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextInput
                  placeholder="Enter Old Password"
                  secureTextEntry
                  value={oldPassword}
                  onChangeText={setOldPassword}
                />
                <TextInput
                  placeholder="Enter New Password"
                  secureTextEntry
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                <TextInput
                  placeholder="Enter Confirm Password"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <Button title="Submit" onPress={handleChangePassword}>
                  {" "}
                  Submit
                </Button>
                <Button title="Cancel" onPress={() => setModalVisible(false)}>
                  {" "}
                  Cancel{" "}
                </Button>
              </View>
            </Modal>
          </View>
        </>
      )}
    </>
  );
}

export default UserProfile;

const styles = StyleSheet.create({
  textContainer: {
    marginHorizontal: 20,
    marginTop: 15,
  },
  text: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: "bold",
  },
  textInput: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: "50%",
    marginBottom: 15,
  },
});

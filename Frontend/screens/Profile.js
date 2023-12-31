import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card, Button } from 'react-native-paper'
import { MaterialIcons, Entypo } from '@expo/vector-icons'

const Profile = (props) => {

    const { _id, nome, picture, fone, email, creci, senha } = props.route.params.item
    const deleteEmploye = () => {
        fetch(`http://192.168.1.9:3000/corretores`, {
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: _id
            })
        })
            .then(res => res.json())
            .then(deletedEmp => {
                Alert.alert(`${deletedEmp.nome} foi deletado!`)
                props.navigation.navigate("Home")
            })
            .catch(err => {
                Alert.alert("alguma coisa deu errado")
            })
    }
    const openDial = () => {
        if (Platform.OS === "android") {
            Linking.openURL(`tel:${fone}`)
        } else {
            Linking.openURL(`telprompt:${fone}`)
        }
    }
    return (
        <View style={styles.root}>
            <LinearGradient
                colors={["#157076", "#157076"]}
                style={{ height: "20%" }}
            />
            <View style={{ alignItems: "center" }}>
                <Image
                    style={{ width: 140, height: 140, borderRadius: 140 / 2, marginTop: -50 }}
                    source={{ uri: picture }}
                    //source={{ uri: 'https://i.ibb.co/NV2tbsg/foto.jpg' }}
                />
            </View>
            <View style={{ alignItems: "center", margin: 15 }}>
                <Title>{nome}</Title>
            </View>
            
            <Card style={styles.mycard} onPress={() => {
                Linking.openURL(`mailto:${email}`)
            }}>
                <View style={styles.cardContent}>
                    <MaterialIcons name="email" size={32} color="#157076" />
                    <Text style={styles.mytext}>{email}</Text>
                </View>
            </Card>
            <Card style={styles.mycard} onPress={() => openDial()}>
                <View style={styles.cardContent}>
                    <Entypo name="phone" size={32} color="#157076" />
                    <Text style={styles.mytext}>{fone}</Text>
                </View>
            </Card>
           
            <View style={{ flexDirection: "row", justifyContent: "space-around", padding: 10 }}>
                <Button
                    icon="account-edit"
                    mode="contained"
                    theme={theme}
                    onPress={() => {
                        props.navigation.navigate("Create",
                            { _id, nome/*, picture*/, fone, email, creci, senha }
                        )
                    }}>
                    Editar
            </Button>
                <Button
                    icon="delete"
                    mode="contained"
                    theme={theme}
                    onPress={() => deleteEmploye()}>
                    Deletar
            </Button>
            </View>

        </View>
    )
}

const theme = {
    colors: {
        primary: "#157076"
    }
}


const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    mycard: {
        margin: 3
    },
    cardContent: {
        flexDirection: "row",
        padding: 8
    },
    mytext: {
        fontSize: 18,
        marginTop: 3,
        marginLeft: 5
    }
})
export default Profile

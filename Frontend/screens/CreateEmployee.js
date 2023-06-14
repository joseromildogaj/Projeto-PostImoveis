import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const CreateEmployee = ({ navigation, route }) => {
  const getDetails = (type) => {
    if (route.params) {
      switch (type) {
        case 'id':
          return route.params._id;
        case 'nome':
          return route.params.nome;
        case 'fone':
          return route.params.fone;
        case 'email':
          return route.params.email;
        case 'creci':
          return route.params.creci;
        case 'senha':
          return route.params.senha;
        case 'picture':
          return route.params.picture;
          
      }
    }
    return '';
  };
 
  const [nome, setNome] = useState(getDetails('nome'));
  const [fone, setFone] = useState(getDetails('fone'));
  const [email, setEmail] = useState(getDetails('email'));
  const [creci, setCreci] = useState(getDetails('creci'));
  const [senha, setSenha] = useState(getDetails('senha'));
  const [picture, setPicture] = useState(getDetails('picture'));
  const [modal, setModal] = useState(false);
  const [enableshift, setenableShift] = useState(false);

  const submitData = () => {
    fetch('http://192.168.1.9:3000/corretores', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome,
        email,
        fone,
        creci,
        picture,
        senha,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        Alert.alert(`${data.nome} foi cadastrado com sucesso!`);
        navigation.navigate('Home');
      })
      .catch((err) => {
        Alert.alert('alguma coisas deu errado' + err);
      });
  };

  const updateDetails = () => {
    fetch('http://192.168.1.9:3000/corretores', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: route.params._id,
        nome,
        email,
        fone,
        creci,
        picture,
        senha,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.nome} foi editado com sucesso!`);
        navigation.navigate('Home');
      })
      .catch((err) => {
        Alert.alert(`alguma coisa deu errado; ${err}`);
        console.log(err)
      });
  };

  const pickFromGallery = async () => {
    //const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(granted){
      console.log('access granted')
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect:[1,1],
        quality:0.5,
      })
      console.log(data)
  
      if (!data.cancelled){
        setPicture(data.assets[0].uri);
        setPickedImagePath(data.assets[0].uri);
        
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split('.')[1]}`,
          nome: `test.${data.uri.split('.')[1]}`,
        };
        handleUpload(newfile);
    }
    
    }else{
      Alert.alert('Permissions required to access camera roll.')
    }
    /*
    //const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split('.')[1]}`,
          nome: `test.${data.uri.split('.')[1]}`,
        };
        handleUpload(newfile);
        setPicture(result.assets[0].uri);
      }
    } else {
      Alert.alert('você precisa de permissão para isso');
    }
    */
  };

  const pickFromCamera = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        base64: false,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split('.')[1]}`,
          name: `test.${data.uri.split('.')[1]}`,
        };
        handleUpload(newfile);
      }
    }else {
      Alert.alert('você precisa de permissão para isso');
    }
    
  };
  /*
  const pickFromCamera = async () => {
    //const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status == "granted") {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split('.')[1]}`,
          name: `test.${data.uri.split('.')[1]}`,
        };
        handleUpload(newfile);
      }
    } else {
      Alert.alert('você precisa de permissão para isso');
    }
  };
*/

  const handleUpload = (image) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'employeeApp');
    data.append('cloud_nome', 'dxnoiuj66');

    fetch('https://api.cloudinary.com/v1_1/dxnoiuj66/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        //setPicture(data.url);
        setPicture(data.assets[0].uri);
        setModal(false);
      })
      .catch((err) => {
        Alert.alert('erro durante o upload');
      });
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={styles.root}
      enabled={enableshift}
    >
      <View>
        <TextInput
          label="Nome"
          style={styles.inputStyle}
          value={nome}
          onFocus={() => setenableShift(false)}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setNome(text)}
        />
        <TextInput
          label="Telefone"
          style={styles.inputStyle}
          value={fone}
          theme={theme}
          onFocus={() => setenableShift(false)}
          keyboardType="number-pad"
          mode="outlined"
          onChangeText={(text) => setFone(text)}
        />
        <TextInput
          label="E-mail"
          style={styles.inputStyle}
          value={email}
          theme={theme}
          //onFocus={() => setenableShift(false)}
          mode="outlined"
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          label="Creci"
          style={styles.inputStyle}
          value={creci}
          theme={theme}
          onFocus={() => setenableShift(true)}
          mode="outlined"
          onChangeText={(text) => setCreci(text)}
        />
        <TextInput
          label="Senha"
          style={styles.inputStyle}
          value={senha}
          theme={theme}
          onFocus={() => setenableShift(true)}
          mode="outlined"
          onChangeText={(text) => setSenha(text)}
        />
        
        <Button
          style={styles.inputStyle}
          icon={picture == '' ? 'upload' : 'check'}
          mode="contained"
          theme={theme}
          onPress={() => setModal(true)}
        >
          Upload de Imagem
        </Button>
        {route.params ? (
          <Button
            style={styles.inputStyle}
            icon="content-save"
            mode="contained"
            theme={theme}
            onPress={() => updateDetails()}
          >
            Atualizar Detalhes
          </Button>
        ) : (
          <Button
            style={styles.inputStyle}
            icon="content-save"
            mode="contained"
            theme={theme}
            onPress={() => submitData()}
          >
            Salvar
          </Button>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
          setModal(false);
          }}
        >
          <View style={styles.modalView}>
            <View style={styles.modalButtonView}>
              <Button
                icon="camera"
                theme={theme}
                mode="contained"
                onPress={() => pickFromCamera()}
              >
                Câmera
              </Button>
              <Button
                icon="image-area"
                mode="contained"
                theme={theme}
                onPress={() => pickFromGallery()}
              >
                Galeria
              </Button>
            </View>
            <Button theme={theme} onPress={() => setModal(false)}>
              Cancelar
            </Button>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

const theme = {
  colors: {
    //primary: '#006aff',
    primary: '#157076',
  },
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inputStyle: {
    margin: 5,
    borderColor: "#157076",
  },
  modalView: {
    position: 'absolute',
    bottom: 2,
    width: '100%',
    backgroundColor: 'white',
  },
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default CreateEmployee;

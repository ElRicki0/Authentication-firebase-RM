// Importación de bibliotecas y componentes necesarios
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, Alert } from 'react-native';
import Navigation from '../navigation/Navigation';
import { useNavigation } from '@react-navigation/native';

import app from '../config/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth(app)

// Definición del componente principal Home
export default function login() {

    // creamos la variable estado
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigation = useNavigation();

    const logueo = async (props) => {
        try {
            console.log('paso1');
            await signInWithEmailAndPassword(auth, email, password);
            console.log('paso2');
            Alert.alert('Iniciando sesión', 'Accediendo');
            console.log('paso3');
            navigation.navigate('Home');
            console.log('paso4');
        } catch (error) {
            console.log(error + ' Error en el método ')
        }
    }


    return (
        <View style={styles.padre}>
            <View style={styles.tarjeta}>

                <View style={styles.cajaTexto}>
                    <TextInput placeholder='correo@ejemplo.com' style={{ paddingHorizontal: 15 }} onChangeText={(text) => setEmail(text)} />
                </View>

                <View style={styles.cajaTexto}>
                    <TextInput placeholder='Password' style={{ paddingHorizontal: 15 }} secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
                </View>

                <View style={styles.PadreBoton}>
                    <TouchableOpacity style={styles.cajaBoton} onPress={logueo}>
                        <Text style={styles.textoBoton}>Sign in</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    padre: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey'
    },
    tarjeta: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    cajaTexto: {
        paddingHorizontal: 20,
        backgroundColor: '#cccccc40',
        borderRadius: 30,
        marginVertical: 10
    },
    PadreBoton: {
        alignItems: 'center'
    },
    cajaBoton: {
        backgroundColor: '525FE1',
        borderRadius: 30,
        paddingVertical: 20,
        width: 150,
        marginTop: 20
    },
    textoBoton: {
        textAlign: 'center',
        color: 'black'
    }
})
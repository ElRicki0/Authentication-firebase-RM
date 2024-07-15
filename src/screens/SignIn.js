import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { app } from '../config/firebase';

const SignInSc = ({ navigation }) => {

    // const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication, navigation }) => {
    // const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null); // Track user authentication state
    const [isLogin, setIsLogin] = useState(true);

    const Exito = () => {

    };

    const goToLogin = () => {
        navigation.navigate('Login');
    };

    const auth = getAuth(app);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, [auth]);


    const handleAuthentication = async () => {
        try {
            // comentado funcion no nesesaria
            // if (user) {
            //     // If user is already authenticated, log out
            //     console.log('Sesión cerrada con éxito!');
            //     await signOut(auth);
            // } else {

                // Sign up
                await createUserWithEmailAndPassword(auth, email, password);
                Alert.alert(
                    'Éxito',
                    'Creación de usuario exitosa.',
                    [
                        
                        { text: 'Aceptar', onPress: (goToLogin) }
                    ]
                );
                console.log('usuario creado con éxito!');
            // }

        } catch (error) {
            console.error('Authentication error:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.authContainer}>
                <Text style={styles.title}>Crear cuenta</Text>

                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry
                />
                <View style={styles.buttonContainer}>
                    <Button title={'Crear cuenta'} onPress={handleAuthentication} color="#3498db" />
                </View>

                <TouchableOpacity style={styles.bottomContainer} onPress={goToLogin} >
                    <Text style={styles.toggleText} >
                        Tienes una cuenta? Inicia sesión
                    </Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}

export default SignInSc;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        borderRadius: 4,
    },
    buttonContainer: {
        marginBottom: 16,
    },
    toggleText: {
        color: '#3498db',
        textAlign: 'center',
    },
    bottomContainer: {
        marginTop: 20,
    },
    emailText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
});
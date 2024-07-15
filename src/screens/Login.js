import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { app } from '../config/firebase';


const Login = ({ navigation }) => {
    // const Login = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication, navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null); // Track user authentication state
    const [isLogin, setIsLogin] = useState(true);

    // Función para navegar a la pantalla de inicio

    const goToSignIn = () => {
        navigation.navigate('SignInSc');
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
            // if (user) {
            //     // If user is already authenticated, log out
            //     console.log('Sesión cerrada con éxito!');
            //     await signOut(auth);
            // } else {
            // Sign in or sign up
            if (isLogin) {
                // Sign in
                await signInWithEmailAndPassword(auth, email, password);
                navigation.navigate('Home');
                console.log('Sesión iniciada con éxito!');
            } else {

                console.log('error al iniciar sesión!');
            }
            // }
        } catch (error) {
            console.error('Authentication error:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.authContainer}>
                <Text style={styles.title}>{isLogin ? 'Inicio sesión' : 'Crear cuenta'}</Text>

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
                    <Button title={isLogin ? 'Inicia sesión' : 'Crear cuenta'} onPress={handleAuthentication} color="#3498db" />
                </View>

                <TouchableOpacity style={styles.bottomContainer} onPress={goToSignIn} >
                    <Text style={styles.toggleText} >
                        Necesitas una cuenta? Créala!
                    </Text>
                </TouchableOpacity>

            </View>
        </View>

    );
}


export default Login;

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
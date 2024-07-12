import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { useNavigation } from '@react-navigation/native';


const firebaseConfig = {
    apiKey: "AIzaSyCx4ivMDFgx2MdQNUWhIZXpvn7mJE8VqGQ",
    authDomain: "practica-firebase-20220685.firebaseapp.com",
    projectId: "practica-firebase-20220685",
    storageBucket: "practica-firebase-20220685.appspot.com",
    messagingSenderId: "491238602732",
    appId: "1:491238602732:web:1135347716f48bc7b232c9"
};

const app = initializeApp(firebaseConfig);

const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
    return (
        <View style={styles.authContainer}>
            <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>

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
                <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
            </View>

            <View style={styles.bottomContainer}>
                <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
                </Text>
            </View>
        </View>
    );
}

const SignIn = async (props) => {
    try {
        
        navigation.navigate('Registrarse');
    } catch (error) {
        console.log(error + ' Error en el método ')
    }
}

const AuthenticatedScreen = ({ user, handleAuthentication }) => {
    return (
        <View style={styles.authContainer}>
            <Text style={styles.title}>Sus datos son</Text>
            <Text style={styles.emailText}>{user.email}</Text>
            <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
        </View>
    );
};

export default App = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null); // Track user authentication state
    const [isLogin, setIsLogin] = useState(true);

    const auth = getAuth(app);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, [auth]);


    const handleAuthentication = async () => {
        try {
            if (user) {
                // If user is already authenticated, log out
                console.log('User logged out successfully!');
                await signOut(auth);
            } else {
                // Sign in or sign up
                if (isLogin) {
                    // Sign in
                    await signInWithEmailAndPassword(auth, email, password);
                    navigation.navigate('Home');
                    console.log('User signed in successfully!');
                } else {
                    // Sign up
                    await createUserWithEmailAndPassword(auth, email, password);
                    console.log('User created successfully!');
                }
            }
        } catch (error) {
            console.error('Authentication error:', error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {user ? (
                // Show user's email if user is authenticated
                <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
            ) : (
                // Show sign-in or sign-up form if user is not authenticated
                <AuthScreen
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    isLogin={isLogin}
                    setIsLogin={setIsLogin}
                    handleAuthentication={handleAuthentication}
                />
            )}
        </ScrollView>
    );
}
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
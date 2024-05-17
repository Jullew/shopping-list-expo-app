import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase';
import { LinearGradient } from 'expo-linear-gradient';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '559391782854-j4bu97nibbkn8tvib2jf8mhcrl7m08qp.apps.googleusercontent.com',
        androidClientId: '1017425704010-llknn5k8o5ubs25nd9vmnre065v69sdu.apps.googleusercontent.com',
        webClientId: '559391782854-j4bu97nibbkn8tvib2jf8mhcrl7m08qp.apps.googleusercontent.com',
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential)
                .then(() => {
                    navigation.replace('Main');
                })
                .catch((error) => {
                    Alert.alert('Błąd logowania', error.message);
                });
        }
    }, [response]);

    const handleLogin = () => {
        if (email !== '' && password !== '') {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigation.replace('Main');
                })
                .catch((error) => {
                    Alert.alert('Błąd logowania', error.message);
                });
        } else {
            Alert.alert('Błąd logowania', 'Email i hasło nie mogą być puste.');
        }
    };

    const handleSignUp = () => {
        if (email !== '' && password !== '') {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    Alert.alert('Rejestracja zakończona sukcesem');
                    setIsRegistering(false);
                })
                .catch((error) => {
                    Alert.alert('Błąd rejestracji', error.message);
                });
        } else {
            Alert.alert('Błąd rejestracji', 'Email i hasło nie mogą być puste.');
        }
    };

    return (
        <LinearGradient
        colors={['#a18cd1', '#fbc2eb']}
        style={styles.gradient}
    >
        <View style={styles.container}>
            <Text style={styles.title}>Shopping List</Text>
            <Text style={styles.subtitle}>Julian Lewandowski</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Hasło"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            {isRegistering ? (
                <>
                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Zarejestruj się</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsRegistering(false)}>
                        <Text style={styles.switchText}>Masz już konto? Zaloguj się</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Zaloguj się</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsRegistering(true)}>
                        <Text style={styles.switchText}>Nie masz konta? Zarejestruj się</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.googleButton} onPress={() => promptAsync()} disabled={!request}>
                        <Text style={styles.googleButtonText}>Zaloguj się przez Google</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'linear-gradient(180deg, #a18cd1, #fbc2eb)', // Fioletowy gradient
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff',
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 20,
        color: '#fff',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        backgroundColor: 'white',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    button: {
        width: '100%',
        backgroundColor: '#6200ee',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    switchText: {
        color: '#6200ee',
        marginBottom: 20,
    },
    googleButton: {
        width: '100%',
        backgroundColor: '#db4437',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    googleButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default LoginScreen;
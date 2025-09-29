import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../src/styles/LoginStyles"; // Ajusta la ruta
import api from "../src/api/api";

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await api.post("/login", {
                email,
                password,
            });

            const { token } = res.data;
            console.log("Token recibido:", token);

            router.replace("/(tabs)");
        } catch (error) {
            console.error(error);
            alert("Credenciales inválidas");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>

            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <Text style={styles.registerText}>
                ¿No tienes cuenta?{" "}
                <Text style={styles.registerLink} onPress={() => router.push("/register")}>
                    Regístrate
                </Text>
            </Text>
        </View>
    );
}

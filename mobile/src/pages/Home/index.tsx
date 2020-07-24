import React, { useState, useEffect, ChangeEvent } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, ImageBackground, Text, Image, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import axios from 'axios';





interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

const Home = () => {

    const navigation = useNavigation();

    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');


    function handleNavigateToPoints() {
        setUf(selectedUf);
        setCity(selectedCity);

        if (uf === '' || uf === '0' || city === '' || city === '0') {
            console.log('Foi não...');
            

        } else {
            console.log('1', uf, city);
            navigation.navigate('Points', {
                uf,
                city,
            }
            );
        }

    }

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setUfs(ufInitials);
        })
    }, []);

    useEffect(() => {
        if (selectedUf === '0') {
            return;
        }

        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const cityNames = response.data.map(city => city.nome);
            setCities(cityNames);
        })
    }, [selectedUf]);

    function handleSelectUf(selectedUf: string) {
        const uf = selectedUf;
        setSelectedUf(uf);
    }

    function handleSelectCity(selectedUf: string) {
        const city = selectedUf;
        setSelectedCity(city);
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ImageBackground
                source={require('../../assets/home-background.png')}
                style={styles.container}
                imageStyle={{ width: 274, height: 368 }}
            >
                <View style={styles.main}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/logo.png')}
                    />
                    <View>
                        <Text style={styles.title}>Seu marketplace de coleta de resíduos.</Text>
                        <Text style={styles.description}>Ajudamos pessoas a encontrar pontos de coleta de forma eficiente.</Text>
                    </View>
                </View>

                <View style={styles.footer}>


                    <Picker
                        selectedValue={selectedUf}
                        style={styles.input}
                        onValueChange={(ItemValue) => handleSelectUf(ItemValue)}
                    >
                        <Picker.Item label="Selecione uma UF" value="0" />
                        {ufs.sort().map(uf => (
                            <Picker.Item key={uf} label={uf} value={uf} />
                        ))}
                    </Picker>

                    <Picker
                        selectedValue={selectedCity}
                        style={styles.input}
                        onValueChange={(ItemValue) => handleSelectCity(ItemValue)}
                    >
                        <Picker.Item label="Selecione uma Cidade" value="0" />
                        {cities.sort().map(city => (
                            <Picker.Item key={city} label={city} value={city} />
                        ))}
                    </Picker>



                    <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                        <View style={styles.buttonIcon}>
                            <Text>
                                <Icon name="arrow-right" color="#fff" size={24} />
                            </Text>

                        </View>
                        <Text style={styles.buttonText}>
                            Entrar
                        </Text>
                    </RectButton>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
    },

    logo: {
    },

    main: {
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        color: '#322153',
        fontSize: 32,
        fontFamily: 'Ubuntu_700Bold',
        maxWidth: 260,
        marginTop: 64,
    },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 16,
        fontFamily: 'Roboto_400Regular',
        maxWidth: 260,
        lineHeight: 24,
    },

    footer: {},

    select: {},

    input: {
        height: 60,
        width: '100%',
        color: '#6C6C80',
        backgroundColor: '#FFF',
        marginBottom: 8,

        fontSize: 20,
    },

    button: {
        backgroundColor: '#34CB79',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 20,
    }
});


export default Home;
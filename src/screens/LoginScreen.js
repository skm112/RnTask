import { StyleSheet, ScrollView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Surface, Button, Title, HelperText, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import { isSupported } from '../helpers/biometric';


let schema = yup.object().shape({
    email: yup.string().required('Email required.').email('Please enter valid email.'),
    password: yup.string().required('Password required.')
        .min(8, 'Password must be 8 characters long.')
        .matches(/^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,15}$/, 'Password atleast on small letter, capital letter and number and avoid space.')
});


const LoginScreen = () => {
    const { colors } = useTheme()
    const [ email, setEmail ] = useState('')
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const styles = LoginStyle(colors)
    const [ error, setError ] = useState({
        email: {
            error: false,
            message: ''
        },
        password: {
            error: false,
            message: ''
        },
    })
    const [ password, setPassword ] = useState('')


    const checkValidation = (pathToField, value) => {
        let newObject = { [ pathToField ]: value };
        schema
            .validateAt(pathToField, newObject, { stripUnknown: true })
            .then((val) => {
                console.log(val)
                setError({
                    ...error,
                    [ pathToField ]: {
                        error: false,
                    }
                })
            })
            .catch((reason) => {
                console.log(reason.message)

                setError({
                    ...error,
                    [ pathToField ]: {
                        error: true,
                        message: reason.message,
                    }
                })
            });
    }


    const onLogin = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        schema
            .validate({ email, password }, { abortEarly: false, stripUnknown: true })
            .then(async (validatedData) => {
                if (validatedData) {
                    console.log({ validatedData })
                    const signature = isSupported()
                    console.log({ signature })
                    await AsyncStorage.setItem('auth', JSON.stringify({ ...validatedData, signature }))

                }
                setIsSubmitting(false);
            })
            .catch((reason) => {
                const inner = reason.inner ? reason.inner : [];
                const Obj = {};
                inner.forEach((item, index) => {
                    Obj[ item.path ] = {
                        error: true,
                        message: item.message,
                    };
                });

                setIsSubmitting(false);
                setError({
                    ...error,
                    ...Obj
                })
            })

    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar animated={true} barStyle="default" backgroundColor={colors.background} />
            <Surface style={styles.surface}>
                <Title style={{ alignSelf: 'center', }}>Login To App</Title>
                <TextInput
                    label="Email"
                    mode='outlined'
                    dense={true}
                    defaultValue={email}
                    onChangeText={(text) => {
                        setEmail(text)
                        checkValidation('email', text)
                    }}
                />
                <HelperText
                    style={styles.marginBottom}
                    type="error" visible={error?.email?.error}>
                    {error?.email?.message ?? ''}
                </HelperText>

                <TextInput
                    label="Password"
                    mode='outlined'
                    dense={true}
                    secureTextEntry={true}
                    defaultValue={password}
                    onChangeText={(text) => {
                        setPassword(text)
                        checkValidation('password', text)
                    }}

                />
                <HelperText
                    style={styles.marginBottom}
                    type="error"
                    visible={error?.password?.error}>
                    {error?.password?.message ?? ''}
                </HelperText>
                <Button
                    loading={isSubmitting}
                    style={styles.marginBottom}
                    mode="contained" onPress={onLogin}>
                    Sign In
                </Button>
            </Surface>

        </ScrollView>
    )
}

export default LoginScreen

const LoginStyle = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 16,
        backgroundColor: colors.background
    },
    surface: {
        padding: 16
    },
    marginBottom: {
        marginBottom: 20
    }

})
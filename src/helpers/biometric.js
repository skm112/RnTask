import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'

const rnBiometrics = new ReactNativeBiometrics()

export const isSupported = async () => {
    const { available, biometryType } = await rnBiometrics.isSensorAvailable()
    if (available && biometryType === BiometryTypes.TouchID) {
        console.log('TouchID is supported')
        return await biometricKeysExist();
    } else if (available && biometryType === BiometryTypes.FaceID) {
        console.log('FaceID is supported')
        return await biometricKeysExist();
    } else if (available && biometryType === BiometryTypes.Biometrics) {
        const signature = await biometricKeysExist();
        console.log('Biometrics is supported', signature)

        return signature
    } else {
        console.log('Biometrics not supported')
        return null;
    }
}

const createKey = async () => {
    const { publicKey } = await rnBiometrics.createKeys()
    if (publicKey) {
        const signature = await createSignature();
        return signature
    }
    return null

}

const biometricKeysExist = async () => {
    const { keysExist } = await rnBiometrics.biometricKeysExist();
    if (keysExist) {
        console.log('Keys exist')
        const signature = await createSignature();
        return signature
    } else {
        const signature = await createKey();
        return signature
    }
}

const createSignature = async () => {
    let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
    let payload = epochTimeSeconds + 'some message'
    const { success, signature } = await rnBiometrics.createSignature({
        promptMessage: 'Verify finger print',
        payload: payload
    })
    if (success) {
        console.log(signature)
        return signature
    }
    return null;
}

export const simplePrompt = async () => {
    return rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
        .then((resultObject) => {
            const { success } = resultObject
            return success
        })
        .catch(() => {
            console.log('biometrics failed')
            return false
        })
}
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'

const rnBiometrics = new ReactNativeBiometrics()

export const isSupported = async () => {
    return rnBiometrics.isSensorAvailable()
        .then(async (resultObject) => {
            const { available, biometryType } = resultObject

            if (available && biometryType === BiometryTypes.TouchID) {
                console.log('TouchID is supported')
                return await biometricKeysExist();
            } else if (available && biometryType === BiometryTypes.FaceID) {
                console.log('FaceID is supported')
                return await biometricKeysExist();

            } else if (available && biometryType === BiometryTypes.Biometrics) {
                console.log('Biometrics is supported')
                return await biometricKeysExist();
            } else {
                console.log('Biometrics not supported')
                return null;
            }
        })
}

const createKey = async () => {
    return rnBiometrics.createKeys()
        .then(async (resultObject) => {
            const { publicKey } = resultObject
            console.log(publicKey)
            const signature = await createSignature();
            return signature
        })
}

const biometricKeysExist = async () => {
    rnBiometrics.biometricKeysExist()
        .then(async (resultObject) => {
            const { keysExist } = resultObject

            if (keysExist) {
                console.log('Keys exist')
                const signature = await createSignature();
                return signature
            } else {
                const signature = await createKey();
                return signature
            }
        })
}

const createSignature = async () => {
    let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
    let payload = epochTimeSeconds + 'some message'
    return rnBiometrics.createSignature({
        promptMessage: 'Verify finger print',
        payload: payload
    })
        .then((resultObject) => {
            const { success, signature } = resultObject

            if (success) {
                console.log(signature)
                return signature
            }
            return null;
        })
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
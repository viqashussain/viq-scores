import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeDataInStorage = async (value: Object, key: string) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        // saving error
    }
}

export const getDataFromStorage = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
}

export const storageKeys = {
    favouriteCompetitions: 'favourite-competitions',
    favouriteTeams: 'favourite-teams',
    favouritesSelectedFilter: 'favourites-selected-filter'
}
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://restcountries.com/v3.1/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Conetent-Type': 'application/json',
    },
});

export default {
    getAll() {
        if (localStorage.getItem('allCountries') === null) {
            return apiClient.get('all').then((res) => {
                // saving to local storage
                localStorage.setItem('allCountries', JSON.stringify(res.data));
                return res.data;
            });
        } else {
            let data = JSON.parse(localStorage.getItem('allCountries'));
            return data;
        }
    },
    getCountryByCode(code) {
        return apiClient.get('alpha/' + code).then((res) => {
            return res.data;
        });
    },
    getCountryByName(name) {
        return apiClient.get('name/' + name).then((res) => {
            return res.data;
        });
    },
    getContriesByRegion(region) {
        if (localStorage.getItem(region) === null) {
            return apiClient.get('region/' + region).then((res) => {
                localStorage.setItem(region, JSON.stringify(res.data));
                return res.data;
            });
        } else return JSON.parse(localStorage.getItem(region));
    },
};

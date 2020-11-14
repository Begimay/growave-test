import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState({storage: window.sessionStorage})],
    modules: {},
    state: {
        countriesList: [],
        selectedCountry: 'kyrgyzstan',
        countryInfo: [],
        bestDay: {},
        newCase: 0
    },
    mutations: {
        SET_COUNTRIES(state, countries) {
            state.countriesList = countries
        },
        SET_SELECTED_COUNTRY(state, country) {
            state.selectedCountry = country
        },
        SET_COUNTRY_INFO(state, countryINFO) {
            state.countryInfo = countryINFO
        },
        SET_BEST_DAY(state, bestDay) {
            state.bestDay = bestDay
        },
        SET_NEW_CASE(state, caseNew) {
            state.newCase = caseNew
        },
    },
    actions: {
        getCountriesList({commit}) {
            return this._vm.$http.get('countries')
                .then(res => {
                    commit('SET_COUNTRIES', res.data)
                })
                .catch(e => console.log(e))
        },
        getSelectedCountry({commit}, payload) {
            if (payload) {
                commit('SET_SELECTED_COUNTRY', payload)
            }
        },
        getCountryInfo({commit}, countryName) {
            return this._vm.$http.get(`/total/dayone/country/${countryName}`)
                .then(res => {
                    if (res.data.length) {
                        commit('SET_COUNTRY_INFO', res.data.slice(Math.max(res.data.length - 5, 0)))
                        // let newArr = state.countryInfo
                        // for (let i = 0; i < newArr.length; i++) {
                        //     newArr[i+1].Active = newArr[i+1].Active - newArr[i].Active;
                        //     newArr[i+1].Confirmed = newArr[i+1].Confirmed - newArr[i].Confirmed;
                        //     newArr[i+1].Deaths = newArr[i+1].Deaths - newArr[i].Deaths;
                        //     newArr[i+1].Recovered = newArr[i+1].Recovered - newArr[i].Recovered;
                        // }
                        // commit('SET_COUNTRY_INFO', newArr)
                    }
                })
                .catch(e => console.log(e))
        },
        getBestDay({commit}, countryName) {
            return this._vm.$http.get(`/total/dayone/country/${countryName}/status/recovered`)
                .then(res => {
                    if (res.data.length) {
                        let max = 0
                        let bestDay = {}
                        Object.keys(res.data).forEach( key => {
                            if (res.data[key].Cases > max) {
                                max = res.data[key].Cases
                                bestDay = res.data[key]
                            }
                        })
                        commit('SET_BEST_DAY', bestDay)

                    }
                })
                .catch(e => console.log(e))
        }
    },
    getters: {
        countries: state => state.countriesList,
        country: state => state.selectedCountry,
        infoAboutCountry: state => state.countryInfo,
        bestDayOfCountry: state => state.bestDay,
        newCaseByDay: state => state.newCase
    }
})

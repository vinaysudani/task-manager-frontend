import axios from 'axios'

const state = {
    token: null,
    userName: null
}

const mutations = {
    'SET_AUTH_DATA' (state, authData) {
        state.token = authData.token
        state.userName = authData.userName
    }
}

const actions = {
    setAuthData({ commit }, authData) {
        if (authData.token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + authData.token
        } else {
            delete axios.defaults.headers.common['Authorization']
        }
        commit('SET_AUTH_DATA', authData)
    }
}

const getters = {
    isAuthenticated(state) {
        return state.token ? true : false
    },
    userName(state) {
        return state.userName
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
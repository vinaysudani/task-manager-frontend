const state = {
    jwt: null
}

const mutations = {
    'SET_AUTH_DATA' (state, jwt) {
        state.jwt = jwt
    }
}

const actions = {
    setAuthData({ commit }, jwt) {
        commit('SET_AUTH_DATA', jwt)
    }
}

const getters = {
    isAuthenticated(state) {
        return state.jwt ? true : false
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
const state = {
    token: null,
    userName: null
}

const mutations = {
    'SET_AUTH_DATA' (state, authData) {
        state.token = authData.token
        state.userName = authData.userName
    },
    'SET_USER_NAME' (state, userName) {
        state.userName = userName
    }
}

const actions = {
    setAuthData({ commit }, authData) {
        commit('SET_AUTH_DATA', authData)
    },
    setUserName({ commit }, userName) {
        commit('SET_USER_NAME', userName)
    }
}

const getters = {
    isAuthenticated(state) {
        return state.token ? true : false
    },
    userName(state) {
        return state.userName
    },
    authToken(state) {
        return state.token;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
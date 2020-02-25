import cities from '../mockData/data'


export const state = () => ({
    cities: [],
    paginationLimit: 2,
    paginatedCities: [],
    paginationPages: 0,
    CitiesCount: 0
})


export const mutations = {
    SET_CITIES: (state, payload) => {
        state.cities = payload;
    },
    DELETE_CITY: (state, payload) => {
        state.cities = state.cities.filter(item => item.id !== payload)
    },
    PAGINATION_PAGES: (state) => {
        state.paginationPages = Math.round(state.cities.length / state.paginationLimit)
    },
    ADD_CITY: (state, payload) => {
        state.cities.push(payload)
    }
}

// Изначально все эти действия не правильные, так как должен был передаваться параметр на API, page и номер, из бекенда приходить
// данные соответствующие пагинации
export const actions = {
    getCities({commit}) {
        commit('SET_CITIES', cities);
        commit('PAGINATION_PAGES')
    },
    changePage({commit}){
        commit('PAGINATION_PAGES')
    },
    deleteCity({commit}, id) {
        commit('DELETE_CITY', id);
    },
    addItem({commit}, body) {
        commit('ADD_CITY', body)
    }
}

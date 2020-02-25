<template>
    <div>
        <Header/>
        <div class="container">
            <div class="row">
                <div class="col-12 text-center mt-5">
                    <h2>Количество городо в списке: {{ this.cities.length }}</h2>
                </div>
            </div>
            <form class="form-group" @submit.prevent="addItem">
                <input type="text" placeholder="Имя" v-model="body.name">
                <input type="text" placeholder="Температура" v-model="body.temperature">
                <input type="text" placeholder="Скорость ветра" v-model="body.wind">
                <input type="text" placeholder="Давление" v-model="body.pressure">
                <button type="button" class="btn btn-primary" @click="addItem()">Создать</button>
            </form>
            <table class="table table-striped mt-5">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Температура воздуха</th>
                    <th scope="col">Скорости и направлении ветра</th>
                    <th scope="col">Давление</th>
                    <th scope="col">Удалить</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in citiesPaginate" :key="item.id">
                    <th scope="row">{{item.id}}</th>
                    <td>{{ item.name}}</td>
                    <td>{{ item.temperature}}</td>
                    <td>{{ item.wind}}</td>
                    <td>{{ item.pressure}}</td>
                    <td @click.prevent="deleteItem(item.id)">delete</td>
                </tr>
                </tbody>
            </table>
            <nav aria-label="Page navigation text-center">
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" href="#" @click.prevent="prevPage">Previous</a></li>
                    <li class="page-item" v-for="index in paginationPages">
                        <a class="page-link" href="#" @click.prevent="changePage(index)">{{ index}}</a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#" @click.prevent="nextPage">Next</a></li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>

    import Header from "../components/global/Header";
    import {mapActions, mapState} from 'vuex'

    export default {
        name: 'HomePage',

        components: {
            Header
        },
        created() {
            this.getCities();
            this.$router.push({query: {page: '1'}});
        },
        data() {
            return {
                body: {
                    id: 10,
                    name: '',
                    temperature: '',
                    wind: '',
                    pressure: '',
                }
            }
        },
        methods: {
            ...mapActions('cities', ['getCities']),
            deleteItem(id) {
                this.$store.dispatch('cities/deleteCity', id);
                this.$store.commit('cities/PAGINATION_PAGES');
            },
            changePage(index) {
                this.$router.push({query: {page: index}});
            },
            addItem() {
                if (Object.values(this.body).filter(item => item.length === 0).length === 0) {
                    this.$store.dispatch('cities/addItem', {...this.body, ...{id: this.cities.length + 1}});
                    this.$store.commit('cities/PAGINATION_PAGES');
                } else {
                    alert('fill all inputs');
                }
            },
            prevPage() {
                let page = parseInt(this.$route.query.page);
                page === 1 ? alert('first page') : this.$router.push({query: {page: `${--page}`}});
            },
            nextPage() {
                let page = parseInt(this.$route.query.page);
                page === this.paginationPages ? alert('last page') : this.$router.push({query: {page: `${++page}`}});
            }
        },
        computed: {
            ...mapState('cities', ['cities']),
            ...mapState('cities', ['paginationPages']),
            ...mapState('cities', ['CitiesCount']),
            citiesPaginate() {
                let page = parseInt(this.$route.query.page);
                page += page;
                return this.cities.slice(page - 2, page)
            }
        }
    }
</script>

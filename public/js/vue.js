new Vue({
    el: '#app',
    data() {
        return {
            categories: []
        };
    },
    mounted() {
        this.fetchCategories();
    },
    methods: {
        fetchCategories() {
            axios.get('/api/categories')
                .then(response => {
                    this.categories = response.data.data;
                    this.categories.forEach(category => {
                        axios.get(`/api/category/${category.id}`)
                            .then(response => {
                                // Добавляем только первые 3 продукта категории
                                this.$set(category, 'products', response.data.data.slice(0, 3));
                            })
                            .catch(error => {
                                console.error('Error fetching products:', error);
                            });
                    });
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                });
        }
    }
});

// Компоненты
const Card = {
    template: `
        <div class="card" style="width: 250px">
            <div class="card-header">Товар 1</div>
            <div class="card-body">Тут типо фото</div>
            <div class="card-footer">Цена: тебе не по карману</div>
        </div>
    `
}
const SpisokFu = {
    template: `
        <ul> Список двоечников
            <li>Кинсфатор Дмитрий</li>
            <li>Огинский Иван</li>
        </ul>
    `
}

// Конфигурация приложения
let app = {
    // Раздел с переменными
    data() {
        return {
            message: 'Привет, ку',
            page: 'main',
            categories: [],
            products: [],
        }
    },
    // Компоненты
    components: {
        Card,       // <card></card>
        SpisokFu,   // <spisok-fu></spisok-fu>
    },
    // Методы
    methods: {
        linkpage(link) {
            this.page = link;
        },
        getCategoriesAndProducts() {
            fetch('/api/categories', {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Полученные данные:', data); // Отладочный вывод
                    this.categories = data.data; // Обращаемся к массиву категорий в объекте data
                    // Для каждой категории получаем первые 3 продукта
                    this.categories.forEach(category => {
                        fetch(`/api/category/${category.id}`, {
                            method: 'GET',
                        })
                            .then(response => response.json())
                            .then(productsData => {
                                // Добавляем только первые 3 продукта категории
                                category.products = productsData.data.slice(0, 3);
                            })
                            .catch(error => {
                                console.error('Error fetching products:', error);
                            });
                    });
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                });
        },
        // Добавляем метод для отправки формы авторизации
        login() {
            // Получаем данные из формы
            let login = document.getElementById('login').value;
            let password = document.getElementById('password').value;

            // Отправляем запрос на сервер
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login: login, password: password }),
            })
                .then(response => {
                    if (response.ok) {
                        // Редирект на главную страницу
                        window.location.href = '/';
                    } else {
                        // Обработка ошибки
                        console.error('Ошибка аутентификации');
                    }
                })
                .catch(error => {
                    console.error('Ошибка сети:', error);
                });
        },




    }
}
let VueApp = Vue.createApp(app).mount('#app');

VueApp.getCategoriesAndProducts();




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

function formatDate(input) {
    // Получаем введенную дату
    let date = new Date(input.value);

    // Преобразуем дату в формат "ГГГГ-ММ-ДД"
    let formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

    // Устанавливаем новое значение в поле ввода
    input.value = formattedDate;
}

// Функция для получения значения куки по имени


// Конфигурация приложения
let app = {
    // Раздел с переменными
    data() {
        return {
            message: 'Привет, ку',
            page: 'main',
            categories: [],
            products: [],
            user: [],
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
            let login = document.getElementById('loginAuth').value;
            let password = document.getElementById('passwordAuth').value;

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
                        // Получаем токен из ответа
                        return response.json();
                    } else {
                        throw new Error('Ошибка аутентификации');
                    }
                })
                .then(data => {
                    // Устанавливаем токен в куки
                    document.cookie = `api_token=${data.data.user_token}; expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;

                    // Редирект на главную страницу
                    window.location.href = '/';
                })
                .catch(error => {
                    // Обработка ошибки
                    console.error('Ошибка:', error);
                });
        },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        },
        register() {
            // Получаем данные из формы
            let surname = document.getElementById('surname').value;
            let name = document.getElementById('name').value;
            let patronymic = document.getElementById('patronymic').value;
            let login = document.getElementById('login').value;
            let password = document.getElementById('password').value;
            let birth = document.getElementById('birth').value;
            let email = document.getElementById('email').value;
            let telephone = document.getElementById('telephone').value;

            // Отправляем запрос на сервер
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    surname: surname,
                    name: name,
                    patronymic: patronymic,
                    login: login,
                    password: password,
                    birth: birth,
                    email: email,
                    telephone: telephone
                }),
            })
                .then(response => {
                    if (response.ok) {
                        // Редирект на главную страницу
                        window.location.href = '/';
                    } else {
                        // Отображаем сообщение об ошибке на странице
                        response.json().then(data => {
                            document.getElementById('error-message').innerText = data.error;
                        });
                    }
                })
                .catch(error => {
                    console.error('Ошибка сети:', error);
                });
        },
        // Загрузка данных пользователя
        loadUserData() {
            // Получаем все cookie
            const cookies = document.cookie.split(';').map(cookie => cookie.trim());
            // Находим cookie с именем 'api_token'
            const apiTokenCookie = cookies.find(cookie => cookie.startsWith('api_token='));

            // Если cookie с токеном найден
            if (apiTokenCookie) {
                // Извлекаем значение токена из cookie
                const token = apiTokenCookie.split('=')[1];

                // Опции запроса
                const options = {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                };

                // Отправка запроса на сервер
                fetch('/api/profile', options)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Ошибка при загрузке данных пользователя');
                        }
                        return response.json();
                    })
                    .then(data => {
                        // Записываем данные пользователя в переменную user
                        this.user = data.data;
                    })
                    .catch(error => {
                        console.error('Ошибка при загрузке данных пользователя:', error);
                    });
            } else {
                console.error('Cookie с токеном отсутствует');
            }
        }
    }

}
let VueApp = Vue.createApp(app).mount('#app');
VueApp.loadUserData();
VueApp.getCategoriesAndProducts();




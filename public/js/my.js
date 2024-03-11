const VueHeader = {
    template: `
        <header>
    <nav class="nav" style="display: flex;align-items: center; gap: 30px; justify-content: space-around">
        <a class="li" href="/" ><img src="/public/images/logo.png" style="width: 120px; height: 120px;" alt="Логотип"></a>
        <input style="background: #F7F7F7;border-radius: 10px; border: black; color: #808080; width: 500px; height: 50px;" placeholder="Поиск" >
        <a class="li" href="/profile"><img src="/public/images/user.png" alt="profile" style="height: 30px; width: 30px"></a>
        <a class="li" href="/cart"><img src="/public/images/cart.png" alt="cart" style="height: 30px; width: 30px"></a>
    </nav>
</header>
    `
}
const VueFooter = {
    template: `
    <footer style="height: 300px; padding-top: 100px">
    <div style="display: flex; justify-content: space-between">
        <div style="display: flex; flex-direction: column; justify-content: space-between">
            <div style="display: flex; justify-content: flex-start">
                <div style="display: flex; flex-direction: column">
                    <a class="line-height" style="color: #333333; text-decoration: none;" href="#">Контакты</a>
                    <a class="line-height" style="color: #333333; text-decoration: none;" href="#">Доставка и оплата</a>
                    <a class="line-height" style="color: #333333; text-decoration: none;" href="#">Профиль</a>
                </div>
                <div style="display: flex; flex-direction: column">
                    <a class="line-height" style="color: #333333; text-decoration: none;" href="#">Политика конфиденциальности и оферта</a>
                    <a class="line-height" style="color: #333333; text-decoration: none;" href="#">Пользовательское соглашение</a>
                    <a class="line-height" style="color: #333333; text-decoration: none;" href="#">Обратная связь</a>
                </div>
            </div>
            <div>
                <p style="color: #333333; margin: 10px 10px 0 0;">&copy; 2024 Любое использование контента без письменного разрешения запрещено</p>
            </div>
        </div>
        <div>
            <div>
                <p style="font-weight: 700">Мы в соц. сетях</p>
                <div style="display: flex; gap: 10px;">
                    <a href="#"><img src="/public/images/TT.png" alt="ТикТок"></a>
                    <a href="#"><img src="/public/images/VK.png" alt="ВК"></a>
                </div>
            </div>
                <div style="margin-top: 40px;">
                    <p style="font-weight: bold; font-size: 21px;">+7 (953) 801-50-82</p>
                    <p style="margin-top: -15px;">Филиал Новосибирск (с 11:00 до 20:00)</p>
                    <p style="font-weight: bold; font-size: 21px;">+7 (923) 181-74-43</p>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 35px;">
                    <img style="width: 39px; height: 24px;" src="/public/images/MasterCard.png" alt="MasterCard">
                    <img style="width: 56px; height: 18px; margin-top: 3px;" src="/public/images/Visa.png" alt="Visa">
                    <img style="width: 61px; height: 18px; margin-top: 3px;" src="/public/images/Mir.png" alt="Мир">
                </div>
        </div>
    </div>
</footer>
    `
}


// Функция изменения формата даты
function formatDate(input) {
    // Получаем введенную дату
    let date = new Date(input.value);

    // Преобразуем дату в формат "ГГГГ-ММ-ДД"
    let formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

    // Устанавливаем новое значение в поле ввода
    input.value = formattedDate;
}

// Функция для получения значения куки по имени
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

//Конфигурация body (footer и header)
let body = {
    data() {
        return {
        }
    },
    components: {
        VueHeader,
        VueFooter,
    },
    methods: {
    }
}
let BodyApp =Vue.createApp(body).mount('#body')


//Конфигурация profile
let profile = {
    data() {
        return {
            user: [],
        }
    },
    methods: {
        // Функция для получения значения куки по имени
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        },
        // Добавляем метод для отправки формы авторизации
        login() {
            let login = document.getElementById('loginAuth').value;
            let password = document.getElementById('passwordAuth').value;

            // Пример отправки запроса на сервер
            console.log('Отправка запроса на сервер:', login, password);
        },
        //Метод регистрации
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
            // Получаем значение токена из куки
            const token = this.getCookie('api_token');

            // Если токен найден
            if (token) {
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
        },
    }
}
let VueProfile = Vue.createApp(profile).mount('#profile')


//Конфигурация cart
let cart = {
    data() {
        return {
            cartItems: [],
        };
    },
    methods: {
        loadCart() {
            fetch('/api/cart', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.getCookie('api_token')
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.cartItems = data.cart_items;
                })
                .catch(error => {
                    console.error('Error fetching cart:', error);
                });
        },

    }
};

let VueCart = Vue.createApp(cart).mount('#cart');
//VueCart.loadCart();

/*
// Конфигурация приложения
//let app = {
    // Раздел с переменными
    data() {
        return {
            message: 'Привет, ку',
            page: 'main',
            categories: [],
            products: [],
            user: [],
            cartItems: [],
        }
    },
    // Компоненты
    components: {
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
        // Функция для добавления товара в корзину
        addToCart(productId) {
            // Опции запроса
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.getCookie('api_token')
                }
            };

            // Отправляем запрос на сервер
            fetch(`/api/product/${productId}`, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка при добавлении товара в корзину');
                    }
                    return response.json();
                })
                .then(data => {
                    // Выводим сообщение об успешном добавлении товара в корзину
                    console.log('Товар успешно добавлен в корзину:', data);
                    alert('Товар успешно добавлен в корзину');
                    // Дополнительные действия, если необходимо
                })
                .catch(error => {
                    console.error('Ошибка при добавлении товара в корзину:', error);
                });
        },





    }

}
//let VueApp = Vue.createApp(app).mount('#app');
//VueApp.loadUserData();
//VueApp.loadCart();
//VueApp.getCategoriesAndProducts();

*/


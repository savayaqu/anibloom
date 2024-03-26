function formatDate(input) {
    // Получаем введенную дату
    let date = new Date(input.value);

    // Преобразуем дату в формат "ГГГГ-ММ-ДД"
    let formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

    // Устанавливаем новое значение в поле ввода
    input.value = formattedDate;
}
let AddCategory = false;
let AddProduct = false;
// Конфигурация приложения
let app = {
    // Раздел с переменными
    data() {
        return {
            page: 'main',
            categories: [],
            products: [],
            user: [],
            cartItems: [],
            categoryProducts: [], // Массив для хранения товаров выбранной категории
            selectedCategory: {}, // Выбранная категория
            totalPrice: {},
            payments: [],
            payment_id: {},
            product: {},
            ocp: [], //массив с продуктами, заказами и compound
            reviews: [],
            isAdmin: false,
            AddCategory: false,
            AddProduct: false,
            searchTerm: '',
            foundProducts: [],

        }
    },
    // Методы
    methods: {
        linkpage(link) {
            if (link === 'admin') {
                this.page = link;
            } else if (link === 'cart') {
                this.loadCart();
                this.page = link;
            } else if (link === 'profile') {
                this.loadUserData();
                this.loadOrder();
                this.page = link;
            } else if (link === 'product') {
                this.page = link;
            } else if (link === 'updateProfile') {
                this.page = link;
            } else {
                this.page = 'main';
            }

        },
        //Поиск
        searchProducts: function() {
            // Очищаем список найденных товаров перед выполнением нового поиска
            this.searchResults = [];

            // Проверяем, есть ли введенный поисковый запрос
            if (this.searchTerm.trim() !== '') {
                // Проходим по всем товарам и ищем те, у которых название или описание содержат введенный поисковый запрос
                for (let i = 0; i < this.products.length; i++) {
                    let product = this.products[i];
                    // Проверяем, что значения name и description существуют и не равны null
                    if (product.name && product.description) {
                        let searchTermLower = this.searchTerm.toLowerCase();
                        let productNameLower = product.name.toLowerCase();
                        let productDescriptionLower = product.description.toLowerCase();
                        if (productNameLower.includes(searchTermLower) || productDescriptionLower.includes(searchTermLower)) {
                            this.searchResults.push(product);
                        }
                    }
                }
            }
        },


        //Просмотр конкретного товара
        getProduct(product_id) {
            fetch(`/api/product/${product_id}`, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {
                    this.product = data.data;
                    this.linkpage('product');
                })
        },
        //Получение первых 3 товаров определенной категории
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
                                category.items = productsData.data;
                                this.products = productsData.data;
                            })

                    });
                })
                .catch(error => {
                    alert('Произошла ошибка: ' + error.message);
                });

        },
        //Загрузка всех товаров определенной категории
        loadCategoryProducts(categoryId, categoryName) {
            // Выполняем запрос к API для получения товаров определенной категории
            fetch(`/api/category/${categoryId}`)
                .then(response => response.json())
                .then(data => {
                    this.categoryProducts = data.data; // Присваиваем полученные товары переменной categoryProducts
                    this.selectedCategory = categoryName;
                    this.page = 'products';
                })
                .catch(error => {
                    alert('Произошла ошибка: ' + error.message);
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
                body: JSON.stringify({login: login, password: password}),
            })
                .then(response => {
                    if (response.ok) {
                        // Получаем токен из ответа
                        return response.json();
                    } else {
                        return response.json().then(data => {
                            throw new Error(data.message);
                        });
                    }
                })
                .then(data => {
                    // Устанавливаем токен в куки
                    document.cookie = `api_token=${data.data.user_token}; expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;

                    // Редирект на главную страницу
                    window.location.href = '/';
                })
                .catch(error => {
                    alert('Произошла ошибка: ' + error.message);
                });

        },
        // Метод выхода
        logout() {
            fetch('/api/logout', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.getCookie('api_token'),
                },
            })
                .then(response => {
                    if (response.ok) {
                        // Удалить токен из куки
                        document.cookie = "api_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        this.linkpage('profile');
                        window.location.reload();
                    } else {
                        return response.json().then(data => {
                            throw new Error(data.message);
                        });
                    }
                })
                .catch(error => {
                    alert('Произошла ошибка: ' + error.message);
                });
        },

        // Получение куки
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) {
                const token = parts.pop().split(';').shift();
                return token;
            }
        },
        //Регистрация
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
                        return response.json().then(data => {
                            throw new Error(data.message);
                        });
                    }
                })
                .catch(error => {
                    alert('Произошла ошибка: ' + error.message);
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
                        if (data.data.role_id === 2) {
                            // Пользователь является администратором
                            //this.linkpage('admin');
                            this.isAdmin = true;
                        } else {
                            // Пользователь не является администратором
                            // Записываем данные пользователя в переменную user
                            this.user = data.data;
                        }
                    })

            }
        },
        updateProfile() {
            const surname = document.getElementById('surnameP').value;
            const name = document.getElementById('nameP').value;
            const patronymic = document.getElementById('patronymicP').value;
            const login = document.getElementById('loginP').value;
            const password = document.getElementById('passwordP').value;
            const birth = document.getElementById('birthP').value;
            const email = document.getElementById('emailP').value;
            const telephone = document.getElementById('telephoneP').value;

            const updatedData = {
                surname: surname,
                name: name,
                patronymic: patronymic,
                login: login,
                password: password,
                birth: birth,
                email: email,
                telephone: telephone
            };

            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.getCookie('api_token')
                },
                body: JSON.stringify(updatedData)
            };

            // Отправляем запрос на сервер
            fetch('/api/profile', options)
                .then(response => {
                    if (!response.ok) {
                        // Проверяем статус ответа сервера
                        if (response.status === 422) {
                            // Если статус 422 (Unprocessable Content), выводим сообщение с ошибками валидации
                            return response.json().then(data => {
                                let errorMessage = "Произошла ошибка при обновлении профиля:\n";
                                for (const [key, value] of Object.entries(data.errors)) {
                                    errorMessage += `${key}: ${value}\n`;
                                }
                                throw new Error(errorMessage);
                            });
                        } else {
                            // В остальных случаях бросаем общее сообщение об ошибке
                            throw new Error('Ошибка при обновлении профиля');
                        }
                    }
                    return response.json();
                })
                .then(data => {
                    // Выводим сообщение об успешном обновлении профиля
                    alert('Профиль успешно обновлен');
                    this.page = 'profile';
                })
                .catch(error => {
                    alert('Произошла ошибка: ' + error.message);
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
                        return response.json().then(data => {
                            throw new Error(data.message);
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    // Выводим сообщение об успешном добавлении товара в корзину
                    alert('Товар успешно добавлен в корзину');
                })
                .catch(error => {
                    alert('Произошла ошибка: ' + error.message);
                });
        },
        //Загрузка корзины
        loadCart() {
            this.getPayment();
            fetch('/api/cart', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.getCookie('api_token')
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.cartItems = data.cart_items;
                    this.totalPrice = data.total;
                    // Обработка каждого элемента корзины
                    this.cartItems.forEach(cartItem => {
                        fetch(`/api/product/${cartItem.product_id}`)
                            .then(response => response.json())
                            .then(productData => {
                                // Добавляем данные о продукте в объект корзины
                                cartItem.product = productData.data;

                            })
                    });
                })
                .catch(error => {
                    alert('Произошла ошибка: ' + error.message);
                });
        },
        //Обновление количества товаров в корзине
        updateQuantity(item) {
            const productId = item.product_id;
            const newQuantity = item.quantity;

            // Отправляем запрос на сервер для обновления количества товара в корзине
            fetch('/api/cart', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.getCookie('api_token')
                },
                body: JSON.stringify({
                    product_id: productId,
                    quantity: newQuantity
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка при обновлении количества товара в корзине');
                    }
                    return response.json();
                })
                .then(data => {
                    // Обработка успешного обновления количества товара в корзине
                    alert('Количество товара в корзине успешно обновлено');
                    this.loadCart();
                })
                .catch(error => {
                    alert('Произошла ошибка: ' + error.message);
                });

        },
        //Узнаем текущее количество товара и выводим массивом чисел
        availableQuantities(item) {
            // Проверяем, доступен ли объект товара в элементе корзины
            if (item.product) {
                // Получаем количество товара из объекта товара
                const productQuantity = item.product.quantity;
                // Создаем массив чисел от 1 до доступного количества товара
                return Array.from({length: productQuantity}, (_, index) => index + 1);
            } else {
                return [];
            }
        },
        //Удаление товара в корзине
        deleteCartItem(itemId) {
            // Отправляем запрос на удаление товара из корзины
            fetch(`/api/cart/product/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + this.getCookie('api_token')
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка при удалении товара из корзины');
                    }
                    // Обновляем список товаров в корзине
                    this.loadCart();
                })
                .catch(error => {
                    alert('Произошла ошибка: ' + error.message);
                });
        },
        //Получение способов оплаты
        getPayment() {
            fetch('/api/payment', {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {
                    this.payments = data.data;
                })
                .catch(error => {
                    alert('Произошла ошибка: ' + error.message);
                });
        },
        //Получение payment_id
        getPaymentId(payment_id) {
            this.payment_id = payment_id;
        },
        //Оформление заказа
        checkout() {
            // Получаем данные из формы
            let address = document.getElementById('address').value;
            // Отправляем запрос на сервер
            fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.getCookie('api_token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address: address,
                    payment_id: this.payment_id
                }),
            })
                .then(response => {
                    if (response.ok) {
                        this.loadCart();
                        alert("Заказ принят");
                    } else {
                        return response.json().then(data => {
                            throw new Error(data.message);
                        });
                    }

                })
                .catch(error => {
                    alert('Произошла ошибка: ' + error.message);
                });
            //Сразу вывод заказа, чтобы не обновлять страницу
            this.loadOrder();
        },
        //Просмотр заказов текущего пользователя
        loadOrder() {
            // Отправляем запрос на сервер
            fetch('/api/compound', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.getCookie('api_token'),
                },
            })
                .then(response => response.json())
                .then(data => {
                    this.ocp = data;
                })
        },
        //оставление отзыва о товаре
        addReview(productId) {
            // Получаем данные из формы
            let rating = document.getElementById('rating').value;
            let textReview = document.getElementById('textReview').value;

            // Отправляем запрос на сервер
            // Отправляем запрос на сервер
            fetch(`/api/product/${productId}/review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.getCookie('api_token'),
                },
                body: JSON.stringify({
                    textReview: textReview,
                    rating: rating,
                }),
            })
                .then(response => {
                    if (response.ok) {
                        window.location.reload();
                        this.linkpage('product');
                    } else {
                        return response.json().then(data => {
                            throw new Error(data.message);
                        });
                    }
                })
                .catch(error => {
                    alert('Произошла ошибка: ' + error.message);
                });
        },
        // Получение отзывов о товаре
        getReviews(productId) {
            // Отправляем запрос на сервер для получения отзывов
            fetch(`/api/product/${productId}/review`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка при получении отзывов');
                    }
                    return response.json();
                })
                .then(data => {
                    // Обработка полученных отзывов
                    this.reviews = data;
                })
                .catch(error => {
                    // Если произошла ошибка, устанавливаем reviews как пустой массив
                    this.reviews = [];
                });
        },
        //Добавление категории
        createCategory() {
            const categoryName = document.getElementById('CatName').value; // Получаем название категории из поля ввода
            fetch('/api/admin/category/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.getCookie('api_token')
                },
                body: JSON.stringify({
                    name: categoryName
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка при создании категории');
                    }
                    return response.json();
                })
                .then(data => {
                    // После успешного создания категории обновляем данные на фронтенде
                    this.categories.push(data);
                    this.AddCategory = false; // Скрываем форму добавления категории
                    alert('Категория успешно добавлена');
                    this.getCategoriesAndProducts(); // Обновляем категории и товары
                })
                .catch(error => {
                    alert('Произошла ошибка: ' + error.message);
                });
        },
        // Редактирование категории
        editCategory(category) {
            const newName = category.name; // Получаем новое название категории
            fetch(`/api/admin/category/${category.id}/edit`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.getCookie('api_token')
                },
                body: JSON.stringify({
                    name: newName
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка при редактировании категории');
                    }
                    return response.json();
                })
                .then(data => {
                    // После успешного редактирования категории обновляем данные на фронтенде
                    category.name = data.name;
                    alert('Категория успешно отредактирована');
                    this.getCategoriesAndProducts(); // Обновляем категории и товары
                })
                .catch(error => {
                    alert('Произошла ошибка: ' + error.message);
                });
        },
        // Удаление категории
        deleteCategory(category) {
            fetch(`/api/admin/category/${category.id}/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + this.getCookie('api_token')
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка при удалении категории');
                    }
                    alert('Категория успешно удалена');
                    this.getCategoriesAndProducts(); // Обновляем категории и товары
                })
                .catch(error => {
                    alert('Произошла ошибка: ' + error.message);
                });
        },
        // Удаление товара
        deleteProduct(item) {
            fetch(`/api/admin/product/${item.id}/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + this.getCookie('api_token')
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка при удалении товара');
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Товар успешно удален');
                    this.getCategoriesAndProducts();
                })
                .catch(error => {
                    alert('Произошла ошибка: ' + error.message);
                });
        },
        // Метод для добавления нового товара
        createProduct() {
            const formData = new FormData();
            const productName = document.getElementById('PrName').value.trim();
            const productDesc = document.getElementById('PrDesc').value.trim();
            const productPrice = document.getElementById('PrPrice').value.trim();
            const productQuan = document.getElementById('PrQuan').value.trim();
            const categoryId = document.getElementById('PrCategoryId').value;

            formData.append('name', productName);
            formData.append('description', productDesc);
            formData.append('price', productPrice);
            formData.append('quantity', productQuan);
            formData.append('category_id', categoryId);

            const photoFile = document.getElementById('PrPhoto').files[0];
            if (photoFile) {
                formData.append('photo', photoFile);
            }

            fetch('/api/admin/product/create', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.getCookie('api_token')
                },
                body: formData
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка при добавлении товара');
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Товар успешно добавлен');
                    this.getCategoriesAndProducts(); // Обновляем категории и товары
                })
                .catch(error => {
                    alert('Произошла ошибка: ' + error.message);
                });
        },






        // Метод для добавления нового товара
        editProduct(item) {
            const formData = new FormData();
            const eName = document.getElementById('eName').value;
            const eDesc = document.getElementById('eDesc').value;
            const ePrice = document.getElementById('ePrice').value;
            const eQuan = document.getElementById('eQuan').value;
            const eCat = document.getElementById('eCat').value;

            if (eName !== item.name) {
                formData.append('name', eName);
            }
            if (eDesc !== item.description) {
                formData.append('description', eDesc);
            }
            if (ePrice !== item.price) {
                formData.append('price', ePrice);
            }
            if (eQuan !== item.quantity) {
                formData.append('quantity', eQuan);
            }
            formData.append('category_id', eCat);

            const eFile = document.getElementById('eFile').files[0];
            if (eFile) {
                formData.append('photo', eFile);
            }

            fetch(`/api/admin/product/${item.id}/edit`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.getCookie('api_token')
                },
                body: formData
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка при изменении товара');
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Товар успешно изменен');
                    this.getCategoriesAndProducts(); // Обновляем категории и товары
                })
                .catch(error => {
                    alert('Произошла ошибка: ' + error.message);
                });
        },



    }
    }
let VueApp = Vue.createApp(app).mount('#app');
VueApp.loadUserData();
VueApp.getCategoriesAndProducts();




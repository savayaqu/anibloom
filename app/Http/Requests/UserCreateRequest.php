<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserCreateRequest extends ApiRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'          => 'required|string|max:64',
            'surname'       => 'required|string|max:64',
            'patronymic'    =>          'string|max:64',
            'login'         => 'required|string|min:5|max:64|unique:user',
            'password'      => 'required|string|min:8|max:64|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/',
            'birth'         => 'required|date|date_format:Y-m-d|before_or_equal:2010-01-01',
            'email'         => 'required|email|max:64|unique:user',
            'telephone'     => 'required|integer|digits_between:1,20|unique:user',
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'Поле "Имя" обязательно для заполнения.',
            'name.max' => 'Поле "Имя" должно содержать не более :max символов.',

            'surname.required' => 'Поле "Фамилия" обязательно для заполнения.',
            'surname.max' => 'Поле "Фамилия" должно содержать не более :max символов.',

            'patronymic.max' => 'Поле "Отчество" должно содержать не более :max символов.',

            'login.required' => 'Поле "Логин" обязательно для заполнения.',
            'login.min' => 'Поле "Логин" должно содержать не менее :min символов.',
            'login.max' => 'Поле "Логин" должно содержать не более :max символов.',
            'login.unique' => 'Такой "Логин" уже существует.',

            'password.required' => 'Поле "Пароль" обязательно для заполнения.',
            'password.min' => 'Поле "Пароль" должно содержать не менее :min символов.',
            'password.max' => 'Поле "Пароль" должно содержать не более :max символов.',
            'password.regex' => 'Пароль должен содержать как минимум одну цифру, одну заглавную букву, одну малую букву и один специальный символ.',

            'birth.required' => 'Поле "Дата рождения" обязательно для заполнения.',
            'birth.date' => 'Поле "Дата рождения" должно быть датой.',
            'birth.date_format' => 'Неверный формат поля "Дата рождения". Используйте формат ГГГГ-ММ-ДД.',
            'birth.before_or_equal' => 'Дата рождения должна быть до или равна :date.',

            'email.required' => 'Поле "Электронная почта" обязательно для заполнения.',
            'email.email' => 'Поле "Электронная почта" должно быть действительным адресом электронной почты.',
            'email.max' => 'Поле "Электронная почта" должно содержать не более :max символов.',
            'email.unique' => 'Такая "Электронная почта" уже существует.',

            'telephone.required' => 'Поле "Телефон" обязательно для заполнения.',
            'telephone.integer' => 'Поле "Телефон" должно быть целым числом.',
            'telephone.digits_between' => 'Поле "Телефон" должно содержать от :min до :max цифр.',
            'telephone.unique' => 'Такой "Телефон" уже существует.',
        ];
    }

}

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
            'name'          => 'required|string|min:1|max:64',
            'surname'       =>          'string|min:1|max:64',
            'patronymic'    =>          'string|min:1|max:64',
            'login'         => 'required|string|min:1|max:64|unique:user',
            'password'      => 'required|string|min:1|max:64',
            'birth'         => 'required|date|date_format:Y-m-d|before_or_equal:2010-01-01',
            'email'         => 'required|string|min:1|max:64',
            'telephone'     => 'required|integer|digits_between:1,20',
        ];
    }
}

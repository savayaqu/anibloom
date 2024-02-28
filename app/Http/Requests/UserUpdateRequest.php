<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends ApiRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name'          => 'string|min:1|max:64',
            'surname'       => 'string|min:1|max:64',
            'patronymic'    => 'string|min:1|max:64',
            'login'         => 'string|min:1|max:64|unique:user',
            'password'      => 'string|min:1|max:64',
            'birth'         => 'date|date_format:Y-m-d|before_or_equal:2010-01-01',
            'email'         => 'string|min:1|max:64|unique:user',
            'telephone'     => 'integer|digits_between:1,20|unique:user',
        ];
    }
}

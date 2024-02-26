<?php

namespace App\Http\Requests;

use App\Exceptions\ApiException;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;

class ApiRequest extends FormRequest
{
    public function failedAuthorization()
    {
        throw new ApiException(401, 'Validation error');
    }

    public function failedValidation(Validator $validator)
    {
        throw new ApiException(422, 'Validation error', $validator->errors());
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductUpdateRequest extends ApiRequest
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
            'name'        => 'string|min:1|max:64',
            'description' => 'nullable|string',
            'price'        => ['numeric', 'min:0', 'regex:/^\d{1,8}(\.\d{1,2})?$/'], // Формат decimal(10,2)
            'quantity'    => 'integer|min:1',
            'photo'       => 'nullable|file|mimes:jpeg,jpg,png,webp|max:4096', //до 4мб
            'category_id' => 'integer|min:1',
        ];
    }
}

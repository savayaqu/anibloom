<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderCreateRequest extends ApiRequest
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
            'address'    => 'required|string|max:255',
            'payment_id' => 'required|integer|min:1|max:20'
        ];
    }
    public function messages()
    {
        return [
            'address.required'    => 'Поле "Address" обязательно для заполнения.',
            'address.max'         => 'Поле "Address" должно содержать не более :max символов.',
            'payment_id.required' => 'Поле "Payment ID" обязательно для заполнения.',
            'payment_id.integer'  => 'Поле "Payment ID" должно быть целым числом.',
            'payment_id.min'      => 'Поле "Payment ID" должно быть не менее :min.',
            'payment_id.max'      => 'Поле "Payment ID" должно быть не более :max.',
        ];
    }
}

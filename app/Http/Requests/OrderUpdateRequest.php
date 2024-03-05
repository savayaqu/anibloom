<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderUpdateRequest extends FormRequest
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
            'address'    => 'string|max:255',
            'payment_id' => 'integer|min:1|max:20',
            'status_id' => 'integer|min:1|max:3',
        ];
    }
    public function messages()
    {
        return [
            'address.max'         => 'Поле "Address" должно содержать не более :max символов.',
            'payment_id.integer'  => 'Поле "Payment ID" должно быть целым числом.',
            'payment_id.min'      => 'Поле "Payment ID" должно быть не менее :min.',
            'payment_id.max'      => 'Поле "Payment ID" должно быть не более :max.',
            'status_id.integer'   => 'Поле "Status ID" должно быть целым числом.',
            'status_id.min'       => 'Поле "Status ID" должно быть не менее :min.',
            'status_id.max'       => 'Поле "Status ID" должно быть не более :max.',
        ];
    }
}

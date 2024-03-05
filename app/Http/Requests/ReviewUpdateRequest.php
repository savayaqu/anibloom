<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReviewUpdateRequest extends ApiRequest
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
            'rating'     => 'integer|min:1|max:5',
            'textReview' => 'string',
        ];
    }
    public function messages()
    {
        return [
            'rating.integer'  => 'Поле "Rating" должно быть целым числом.',
            'rating.min'      => 'Поле "Rating" должно быть не менее :min.',
            'rating.max'      => 'Поле "Rating" должно быть не более :max.',
        ];
    }
}

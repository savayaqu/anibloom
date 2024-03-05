<?php

namespace App\Exceptions;

use Exception;

class ApiException extends Exception
{
    public function __construct($code, $message, $errors = [])
    {
        $data = [
            'success' => false,
            'code' => $code,
        ];
        if (!empty($message)) {
            $data['message'] = $message;
        }
        if (count($errors) > 0) {
            $data['message'] = $errors;
        }
        parent::__construct( response()->json($data)->setStatusCode($code));
    }
}

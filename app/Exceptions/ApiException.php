<?php

namespace App\Exceptions;

use Exception;

class ApiException extends Exception
{
    public function __construct($code, $message, $errors = [])
    {
        $res = [
            'error' => [
                'code'    => $code,
                'message' => $message,
            ]
        ];
        if($errors) $res['error']['errors'] = $errors;

        parent::__construct(response($res, $code));
    }
}

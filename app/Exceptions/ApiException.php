<?php

namespace App\Exceptions;

use Exception;

class ApiException extends Exception
{
    protected $statusCode;
    protected $data;

    public function __construct($statusCode, $message = null, $errors = [])
    {
        $this->statusCode = $statusCode;
        $this->data = [
            'success' => false,
            'code' => $statusCode,
        ];

        if ($message !== null) {
            $this->data['message'] = $message;
        }

        if (!empty($errors)) {
            $this->data['errors'] = $errors;
        }

        parent::__construct();
    }

    public function render($request)
    {
        return response()->json($this->data, $this->statusCode);
    }
}

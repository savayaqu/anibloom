<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compound extends Model
{
    use HasFactory;
    protected $table = 'Compound';
    protected $fillable = ['order_id', 'product_id', 'quantity', 'total'];

    public function order()
    {
        return $this->belongsTo(Order::class); // Отношение многие-к-одному к модели Order
    }

    public function product()
    {
        return $this->belongsTo(Product::class); // Отношение многие-к-одному к модели Product
    }
}

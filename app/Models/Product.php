<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'price', 'quantity', 'photo', 'category_id'];
    protected $table = 'Product';
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function cart()
    {
        return $this->hasMany(Cart::class);
    }
    public function review()
    {
        return $this->hasMany(Review::class);
    }

    public function order()
    {
        return $this->belongsToMany(Order::class, 'compound');
    }
}

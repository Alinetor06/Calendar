<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visite extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'email',
        'visit_day',
        'description',
        'priority',
        'tel',
        'user_id',
    ];

    protected $dates = [
        'visit_day',
    ];
}

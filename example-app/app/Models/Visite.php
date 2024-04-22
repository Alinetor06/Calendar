<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visite extends Model
{
    use HasFactory;

    protected $fillable = [
        'userId',
        'name',
        'età',
        'note',
        'giorno della visita',
        'importanza'
    ];
}
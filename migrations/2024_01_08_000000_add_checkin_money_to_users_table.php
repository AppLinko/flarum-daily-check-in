<?php

use Flarum\Database\Migration;

return Migration::addColumns('users', [
    'last_checkin_money' => ['integer','default' => 0],
]);

<?php

use Flarum\Extend;
use Flarum\User\Event\Saving;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Api\Serializer\ForumSerializer;
use Ziven\checkin\AddAttribute\AddUserCheckinAttributes;
use Ziven\checkin\Listeners\doCheckin;
use Ziven\checkin\Access\UserPolicy;

$extend = [
    (new Extend\Frontend('admin'))->js(__DIR__.'/js/dist/admin.js'),
    (new Extend\Frontend('forum'))->js(__DIR__ . '/js/dist/forum.js')->css(__DIR__.'/less/forum.less'),

    (new Extend\Locales(__DIR__ . '/locale')),

    (new Extend\Policy())->modelPolicy(User::class, UserPolicy::class),

    (new Extend\Event())->listen(Saving::class, [doCheckin::class, 'checkinSaved']),
    (new Extend\ApiSerializer(UserSerializer::class))->attributes(AddUserCheckinAttributes::class),
    (new Extend\Settings())
        ->serializeToForum('forumCheckinRewarMoney', 'shentx-forum-checkin.checkinRewardMoney',function ($raw) {
            return (float)$raw;
        })
        ->serializeToForum('forumAutoCheckin', 'shentx-forum-checkin.autoCheckIn', 'intval', 0)
        ->serializeToForum('forumAutoCheckinDelay', 'shentx-forum-checkin.autoCheckInDelay', 'intval', 0)
        ->serializeToForum('forumCheckinTimeZone', 'shentx-forum-checkin.checkinTimeZone', 'intval', 0)
        ->serializeToForum('forumCheckinSuccessPromptType', 'shentx-forum-checkin.checkinSuccessPromptType', 'intval', 0)
        ->serializeToForum('forumCheckinSuccessPromptText', 'shentx-forum-checkin.checkinSuccessPromptText', 'strval')
        ->serializeToForum('forumCheckinSuccessPromptRewardText', 'shentx-forum-checkin.checkinSuccessPromptRewardText', 'strval'),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->attribute('allowCheckIn', function (ForumSerializer $serializer) {
            return $serializer->getActor()->hasPermission("checkin.allowCheckIn");
        }),
];

return $extend;
var webPush = require('web-push');

var pushSubscription = {
    "endpoint": "https://android.googleapis.com/gcm/send/e1DdaMG6Ymo:APA91bEba3NrfwNJmWvgq63LMVUqihdktzb8ejJQV4Nw1SJS-xcTNbRs4S8xQ-Tcpn7ok4DjPwiT9ha2IGFKvPC8qSUqvWsgll_3Yr3g-iCyw-AQ5UaKzlGq13cr-2jlEfi7IZZduorZ",
    "keys": {
        "p256dh": "BH0YEl0MZu2RCv2aLnRRJsWLv5DkhssMWOtRvnwOK73MxCURetP7nwUa3ePtOUCdWOofUXyAA9Rv7ZjRViy26kI=",
        "auth": "PtlI88Fi0YQmhhrvPxm8FQ=="
    }
};

var payload = 'Here is a payload!';

var options = {
    gcmAPIKey: 'AAAALQFKLqM:APA91bGP5tplF1g87qOik1pd4BVCdw_jnDs1PdqIN74rV7zzCCUjfvEg0VD9Qyy6sEzu3Lcz5YpUhQejHpjy1xSn2Pewmspz352NDYlWjsMV3Nmb5_ZSqfd2quXqfj8jOFbhK1yCymq5',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
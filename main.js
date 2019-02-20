var webPush = require('web-push');

var pushSubscription = {
    "endpoint": "https://android.googleapis.com/gcm/send/cBotu23VVuU:APA91bGwWAP_nRZue7WaDh-SO0o5cUSPwvD98TpqGC9SYdaZBD_qorlfqjqJ8qr2xXS0NuVIn_30z1xQsJUzU7BqUf-DHtNByn5GrOlaWlkAho2gZo6THxn1uGWvbdKPclKR3M0pseu1",
    "keys": {
        "p256dh": "BJ2Y7Dk8f9ER1kPIY2gP6b3lvtwftEIwVOS22ubSeDAeXzcvaFCaz4cyYxOVVjpEJG5TMv5Xnr2Y4wx7sKSym+8=",
        "auth": "v2MwvxMHpvrTBIShfEcZog=="
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
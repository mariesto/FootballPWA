var webPush = require('web-push');

var pushSubscription = {
    "endpoint": "https://android.googleapis.com/gcm/send/e1ak582Ppkc:APA91bFVgu8xL3aTH6Huo-tO5i_boGs6wg-rICHxBmeZyWlQUB-7IIacHRE7ckurojtTuwx5mwUPygg1Pstqev372eQOmJKLMjoo2lVXlx3cNgmG2m4gDzTfIBG7aIllNH1dl1P-94to",
    "keys": {
        "p256dh": "BPIhJfwi3MoDmehjIwTiAf9JCBLwyv2skwUfsOvZlB3zWul8ZuvybdXvRiF4Q0/jPMpaBIIpJuJ+Hp1iKNurCFc=",
        "auth": "hvmCxv/LCJFLTW+RRY9OOQ=="
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
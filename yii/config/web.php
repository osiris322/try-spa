<?php

$params = require __DIR__ . '/params.php';
$db = require __DIR__ . '/db.php';

$config = [
    'id' => 'basic',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    //'defaultRoute' => 'auth',
    'components' => [
        'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'cookieValidationKey' => 'LsaW__o0fbzqWf6YKFsBZVOWVtk7Av-B',
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ]
        ],
        'response' => [
            'class' => 'yii\web\Response',
            'on beforeSend' => function ($event) {
                $response = $event->sender;
                $responseData = $response->data;
                if (isset($responseData['message']) && json_decode($responseData['message'])) {
                    $responseData['message'] = json_decode($responseData['message']);
                }

                if ($response->statusCode === 401) {
                    return $response;
                }
                if ($response->data !== null) {
                    $response->data = [
                        'success' => $response->isSuccessful,
                        'data' => $responseData,
                    ];
                    $response->statusCode = 200;
                }
            },
            'format' => 'json',
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'user' => [
            'identityClass' => 'app\models\staff\User',
            'enableAutoLogin' => true,
            'enableSession' => false,
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            // send all mails to a file by default. You have to set
            // 'useFileTransport' to false and configure a transport
            // for the mailer to send real emails.
            'useFileTransport' => true,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db' => $db,
        'urlManager' => [
            'enablePrettyUrl' => true,
            'enableStrictParsing' => true,
            'showScriptName' => false,
            'rules' => [
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'auth',
                    'pluralize' => false,
                    'extraPatterns' => [
                        'POST,OPTIONS login' => 'login',
                        'POST,OPTIONS logout' => 'logout',
                        'POST,OPTIONS refresh' => 'refresh',
                    ]
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'site',
                    'pluralize' => false,
                    'extraPatterns' => [
                        'GET index' => 'index',
                    ]
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'admin/filial',
                    'pluralize' => true,
                    'extraPatterns' => [
                    ]
                ],
            ],
        ],
    ],
    'params' => $params,
];

if (YII_ENV_DEV) {
    // configuration adjustments for 'dev' environment
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
            // uncomment the following to add your IP if you are not connecting from localhost.
            //'allowedIPs' => ['127.0.0.1', '::1'],
    ];

    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
            // uncomment the following to add your IP if you are not connecting from localhost.
            //'allowedIPs' => ['127.0.0.1', '::1'],
    ];
}

return $config;

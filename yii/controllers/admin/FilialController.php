<?php

namespace app\controllers\admin;

use app\models\organization\Filial;


/**
 * FilialController implements the CRUD actions for Filial model.
 */

class FilialController extends \yii\rest\ActiveController
{
    public $modelClass = 'app\models\organization\Filial';
    public $serializer = [
        'class' => 'yii\rest\Serializer',
        'collectionEnvelope' => 'items',
    ];
    
    /*public function behaviors() {
        $behaviors = parent::behaviors();
        unset($behaviors['authenticator']);
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::className(),
            'cors' => [
                'Origin' => ['*'],
                'Access-Control-Allow-Headers' => ['*'],
                'Access-Control-Request-Method' => ['GET', 'POST', 'OPTIONS'],
                
                ],
        ];
        
        $behaviors['authenticator'] = [
            'class' => \yii\filters\auth\HttpBearerAuth::className(),
            'except' => [
                
            ]
        ];
        
        return $behaviors;
    }*/
    
}

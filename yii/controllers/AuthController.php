<?php
namespace app\controllers;

use Yii;

/**
 * Description of AuthController
 *
 * @author osiris
 */

class AuthController extends \yii\rest\Controller {    

    public function behaviors() {
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
                'login', 'refresh', 'logout'
            ]
        ];
        
        return $behaviors;
    }
    
    protected function verbs() {
        $verbs = parent::verbs();
        $verbs = [
                'random' => ['get', 'options'],
                'login' => ['post', 'options'],
                'refresh' => ['post', 'options'],
                'logout' => ['post', 'options'],
        ];
        return $verbs;
    }
    /**
     * curl -d '{"username":"admin", "password":"admin"}' -H "Content-Type: application/json" -X POST http://localhost/dsspa/auth/login
     * 
     * curl -H "Authorization:Bearer access_token" -X GET http://localhost/dsspa/....

     * @return type
     * @throws \yii\web\HttpException
     * 
     */
    public function actionLogin() {
        $model = new \app\models\staff\LoginForm();
        if ($model->load(\Yii::$app->getRequest()->getBodyParams(), '') && $model->login()) {
            $user = $model->getUser();
            $jwt = $user->getUserJWT();

            return [
                'jwt' => $jwt,
                'refreshToken' => $user->getRefreshToken(),
            ];
        } else {
            throw new \yii\web\HttpException(422, json_encode($model->errors));
        }
    }
    
    public function actionRefresh() {
        $params = \Yii::$app->getRequest()->getBodyParams();
        $user = \app\models\staff\User::findOne(['access_token' => $params['refreshToken']]);

        if ($user !== null ) {
            $jwt = $user->getUserJWT();
            return [
                'jwt' => $jwt,
            ];
        } else {
            throw new \yii\web\HttpException(422, 'Ops!');
        }
        
    }
    
    public function actionLogout() {
        $params = \Yii::$app->getRequest()->getBodyParams();
        $user = \app\models\staff\User::findOne(['access_token' => $params['refreshToken']]);
        if ($user !== null ) {
            $user->refreshToken = null;
            return $user->save(false);
        } else {
            throw new \yii\web\HttpException(422, 'Ops!');
        }
        
    }
    
    
}

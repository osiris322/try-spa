<?php

namespace app\models\staff;

use Yii;
use yii\base\NotSupportedException;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;
use Firebase\JWT\JWT;
use yii\web\UnauthorizedHttpException;

/**
 * User model
 *
 * @property integer $id
 * @property string $username
 * @property string $access_token
 * @property string $expire_at
 * @property string $password_hash
 * @property string $password_reset_token
 * @property string $auth_key
 * @property integer $status
 * @property integer $created_at
 * @property integer $updated_at
 * @property integer $login_at
 * @property string $group
 * @property string $password write-only password
 */
class User extends ActiveRecord implements IdentityInterface
{
    const STATUS_DELETED = 0;
    const STATUS_ACTIVE = 10;
    const STATUS_NEW = 1;
    
    const EXPIRE_TIME = 10800; //секунды
    
    public $refreshToken;


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%user}}';
    }

    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            TimestampBehavior::className(),
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            ['status', 'default', 'value' => self::STATUS_NEW],
            ['status', 'in', 'range' => [self::STATUS_ACTIVE, self::STATUS_DELETED]],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public static function findIdentity($id)
    {
        return static::findOne(['id' => $id, 'status' => self::STATUS_ACTIVE]);
    }

    /**
     * {@inheritdoc}
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        //JWT::$leeway = 60;
        try {
            $decode = JWT::decode($token, self::getJWTSecretKey(), [self::getAlgoritmJWT()]);
        } catch (\Exception $e) {
            throw new UnauthorizedHttpException();
        }
        $user = static::find()->where(['id' => $decode->data->id , 'status' => self::STATUS_ACTIVE])->one();
        return $user;
        
    }

    /**
     * Finds user by username
     *
     * @param string $username
     * @return static|null
     */
    public static function findByUsername($username)
    {
        return static::findOne(['username' => $username, 'status' => self::STATUS_ACTIVE]);
    }

    /**
     * {@inheritdoc}
     */
    public function getId()
    {
        return $this->getPrimaryKey();
    }

    /**
     * {@inheritdoc}
     */
    public function getAuthKey()
    {
        return $this->auth_key;
    }
    

    /**
     * {@inheritdoc}
     */
    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }
    
    /**
     * {@inheritdoc}
     */
    public function validateRefresh()
    {
        return $this->getRefreshToken() === $this->refreshToken;
    }

    /**
     * Validates password
     *
     * @param string $password password to validate
     * @return bool if password provided is valid for current user
     */
    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password_hash);
    }

    /**
     * Generates password hash from password and sets it to the model
     *
     * @param string $password
     */
    public function setPassword($password)
    {
        $this->password_hash = Yii::$app->security->generatePasswordHash($password);
    }

    /**
     * Generates "remember me" authentication key
     */
    public function generateAuthKey()
    {
        $this->auth_key = Yii::$app->security->generateRandomString();
    }
    
    public function generateAccessToken() {
        $this->access_token = Yii::$app->security->generateRandomString();
        return $this->access_token;
    }
    
    
    public function getUserJWT() {
        $token = [
            'iat' => time(),
            'exp' => time() + self::EXPIRE_TIME,
            'data' => [
                'id' => $this->getId(),
                'username' => $this->username,
                ],
        ];
        $jwt = JWT::encode($token, static::getJWTSecretKey(), static::getAlgoritmJWT());
        return $jwt; 
    }
    
    protected static function getJWTSecretKey() {
        return Yii::$app->params['jwtSecretKey'];
    }
    
    protected static function getAlgoritmJWT() {
        return 'HS256';
    }
    
    public function getRefreshToken()
    {
        return $this->access_token;
    }
    
    public function setRefreshToken()
    {
        $refreshToken = Yii::$app->security->generateRandomString();
        $this->access_token = $refreshToken;
        $this->save(false);
    }
    
    public function removeRefreshToken()
    {
        
        $this->access_token = null;
        
        return $this->save(false);
    }
    
    
    
    
    
    
    
    
    
    
    
    
    /**
     * Finds user by password reset token
     *
     * @param string $token password reset token
     * @return static|null
     */
    public static function findByPasswordResetToken($token)
    {
        if (!static::isPasswordResetTokenValid($token)) {
            return null;
        }

        return static::findOne([
            'password_reset_token' => $token,
            'status' => self::STATUS_ACTIVE,
        ]);
    }

    /**
     * Finds out if password reset token is valid
     *
     * @param string $token password reset token
     * @return bool
     */
    public static function isPasswordResetTokenValid($token)
    {
        if (empty($token)) {
            return false;
        }

        $timestamp = (int) substr($token, strrpos($token, '_') + 1);
        $expire = Yii::$app->params['user.passwordResetTokenExpire'];
        return $timestamp + $expire >= time();
    }

    

    /**
     * Generates new password reset token
     */
    public function generatePasswordResetToken()
    {
        $this->password_reset_token = Yii::$app->security->generateRandomString() . '_' . time();
    }

    /**
     * Removes password reset token
     */
    public function removePasswordResetToken()
    {
        $this->password_reset_token = null;
    }
    
   
}
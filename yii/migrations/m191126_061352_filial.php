<?php

use yii\db\Migration;

/**
 * Class m191126_061352_filial
 */
class m191126_061352_filial extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%filial}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(128)->notNull(),
            'short_name' => $this->string(20)->notNull(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%filial}}');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m191126_061352_filial cannot be reverted.\n";

        return false;
    }
    */
}

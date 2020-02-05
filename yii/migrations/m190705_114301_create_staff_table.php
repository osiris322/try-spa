<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%staff}}`.
 */
class m190705_114301_create_staff_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%staff}}', [
            'id' => $this->primaryKey(),
            'id_user' => $this->integer()->notNull(),
            'surname' => $this->string(50)->notNull(),
            'name' => $this->string(50)->notNull(),
            'mid_name' => $this->string(50)->notNull(),
            'birthday' => $this->date()->notNull(),
            'fired' => $this->date()->notNull(),
            'id_service' => $this->integer()->notNull(),
            'id_post' => $this->integer()->notNull(),
            'id_filial' => $this->integer()->notNull(),
        ]);
        
        $this->createIndex('idx-staff-id_user', 'staff', 'id_user');
        $this->addForeignKey('fk-staff-id_user', 'staff', 'id_user', 'user', 'id', 'CASCADE');
        $this->createIndex('surname-name-mid_name', 'staff', ['surname', 'name', 'mid_name'], $unique=true);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('fk-staff-id_user', 'staff');
        $this->dropIndex('idx-staff-id_user', 'staff');
        $this->dropTable('{{%staff}}');
    }
}

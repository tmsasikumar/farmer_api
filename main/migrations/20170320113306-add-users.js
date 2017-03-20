'use strict';

exports.up = function(db) {
    return db.createTable('users', {
        id: {type: 'int', primaryKey: true, autoIncrement: true, notNull: true, unsigned: true},
        name: { type: "string", notNull: true },
        role: { type: "string", notNull: true },
        password: { type: "string", notNull: true },
        emailId: { type: "string", notNull: true , unique: true},
        phoneNumber: { type: "string", notNull: true, unique: true },
        address: { type: "string", notNull: true },
        createdAt: { type: "timestamp", notNull: true },
        updatedAt: { type: "timestamp", notNull: true }
    });
};

exports.down = function(db) {
    return db.dropTable('users');
};

exports._meta = {
  "version": 1
};

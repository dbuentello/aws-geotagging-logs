/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var util=require('./util.js')
var base=require('./base')

module.exports=class table extends base {
    constructor(){
        super()
        this.create_template=util.template('table_create')
        this.delete_template=util.template('table_delete')
    }
}


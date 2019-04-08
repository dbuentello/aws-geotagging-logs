/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
*/

var fs=require('fs')
var query=function(name){
    return {
        "Type": "Custom::AthenaQuery",
        "DependsOn":"Policy",
        "Properties": {
            "ServiceToken":{"Fn::GetAtt":["Lambda","Arn"]},
            "Name":name.split('.')[0],
            "Database":{"Fn::GetAtt":["Database","Name"]},
            "QueryString":{"Fn::Sub":[
                fs.readFileSync(__dirname+'/'+name,'utf8'),
                {database:{"Fn::GetAtt":["Database","Name"]}}
            ]}
        }
    }
}
var out={}
fs.readdirSync(__dirname)
    .filter(x=>x.match(/.*\.sql/))
    .forEach(function(file){
        name=file.split('.')[0]
        out[name.replace(/-/g,'')]=query(file)
    })

module.exports=out

/*
* @Author: Sukanin
* @Date:   2017-06-16
* @Last Modified by:   Sukanin
* @Last Modified time: 2017-06-16
*/

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var IncidentsSchema = new Schema({
 title: String,
 descr: String
});

module.exports = mongoose.model('Incident', IncidentsSchema);
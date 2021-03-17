import React from "react";
import ReactDOM from "react-dom";
import {DWKitFormViewer} from "./build/optimajet-builder";

function getQueryString() {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      // If first entry with this name
      if (typeof query_string[pair[0]] === "undefined") {
          query_string[pair[0]] = pair[1];
          // If second entry with this name
      } else if (typeof query_string[pair[0]] === "string") {
          var arr = [query_string[pair[0]], pair[1]];
          query_string[pair[0]] = arr;
          // If third or later entry with this name
      } else {
          query_string[pair[0]].push(pair[1]);
      }
  }
  return query_string;
}

function getform(formname)
{
  var formurl = formname + ".json";
  var source = $.ajax({
    url: formurl,
    async: false,
  }).responseJSON;
  return source;
}

function eventProcess(obj, p)
{
  console.log("Event from form:", obj, p);
}

function eventErrProcess(obj, message){
  alert("Error from the form: " + message);
}

var formurl = "./application-form.json";
var dataurl = "./application-form-data.json";

var props = {
  eventFunc: eventProcess,
  eventErrFunc: eventErrProcess,
  getFormFunc: getform,
  dataurl: dataurl,
  downloadUrl: "download.html?file=",
  uploadUrl: "upload.html?file=",
  ref: (viewer) => { window.DWKitFormViewer = viewer; }
}

var query = getQueryString();
if(query != undefined && query.model != undefined){
  try{
    props.model = JSON.parse(decodeURIComponent(query.model));
  }
  catch(ex){
    props.modelurl = formurl;
  }  
}
else{
  props.modelurl = formurl;
}

ReactDOM.render( <DWKitFormViewer {...props} />, document.getElementById('container'));

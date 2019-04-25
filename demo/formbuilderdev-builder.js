import React from "react";
import ReactDOM from "react-dom";
import {DWKitFormBuider} from "./build/optimajet-builder";

function getform(formname)
{
  var formurl = formname + ".json";
  var source = $.ajax({
    url: formurl,
    async: false,
  }).responseJSON;
  return source;
}

function getAdditionalDataForControl(control,
    {startIndex, pageSize, filters, sort, model},
    callback)
  {
    var me = this;
    if(control.props["data-buildertype"] == "dictionary"){
      if(model == undefined){
        model = "item";
      }  
      var items = [];
        for(var i = 0 ; i < 3; i++){
          var obj = {};
          obj.key = model + "_" + i;
          obj.text = model + "_" + i;
          obj.value = i;
          items.push(obj);
        }
        callback({items});
    }
    else{
      var rowsCount = 5;
      var items = [];
      for(var i = 0 ; i < pageSize; i++){
        var obj = {};
        control.props.columns.forEach(function(c){
          obj[c.key] = c.key + "_" + (Number(startIndex) + Number(i));
        });
        items.push(obj);
      }
      callback({startIndex, pageSize, rowsCount, items});
    }
  }

function eventProcess(obj, p)
{  
  console.log("Event from form:", obj, p);
}

function eventErrProcess(obj, message){
  alert("Error from the form: " + message);
}

var actions= ["validate", 
  'refresh', 
  'save', 
  'saveandexit', 
  'cancel', 
  'recalc',
  'add',
  'edit',
  'delete',
  'gridEdit',
  'gridDelete',
  'gridCopy',
  'gridAdd'];

var openViewer = function(){
  var model = formbuilder.getData();

  var url = window.DWKitFormViewerUrl == undefined ? "viewer.html?model=" : window.DWKitFormViewerUrl;
  window.open(url + encodeURIComponent(JSON.stringify(model)));
}

var templates = ["contactform", "toolbarbuttons"];
var buttons = [
  { name: "viever", className: "buttontype1", onClick: openViewer, text: "Open in Viewer"}
]
var formbuilder;
ReactDOM.render(
    <DWKitFormBuider 
      showHeader={true}
      actions={actions} 
      getFormFunc={getform} 
      getAdditionalDataForControl={getAdditionalDataForControl}
      ref={(builder) => { formbuilder = builder; }}
      downloadUrl="download.html?file=" 
      uploadUrl="upload.html?file="
      templates={templates}
      extraHeaderButtons={buttons}
      />,
    document.getElementById('container')
);


formbuilder.load('applicationform');

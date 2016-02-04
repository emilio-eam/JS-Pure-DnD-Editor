
function getPropertiesOfObject(obj) {
    var properties = [];
    for(var key in obj) {
        if(obj.hasOwnProperty(key) && typeof obj[key] !== 'function') {
            properties.push(key);
        }
    }
    return properties;
}

function copyPropertiesToObject(obj, target) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key) && typeof obj[key] !== 'function' && !(key in target)) {
            target[key] = obj[key];
        }
    }
    return target;
}

function getFunctionsOfObject(obj) {
    var functions = [];
    for(var key in obj) {
        if(obj.hasOwnProperty(key) && typeof obj[key] === 'function') {
            functions.push(key);
        }
    }
    return functions;
}

var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
     result = [];
  return result;
}

function getParamNamesAndDefaultValues(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
     result = [];
  return result;
}

function parseDefaults(args, paramsAndDefaults) {
  var result = new Object();
  for(var key in paramsAndDefaults) {
    if(args.hasOwnProperty(key)) {
      result[key] = args[key];
    } else {
      result[key] = paramsAndDefaults[key];
    }
  }
  return result;
}

function parseComponentFunctions(component, target) {
  for (var i = 0; i < component.functions.length; i++) {
    var cur = component.functions[i];
    target[cur] = new Function(component[cur][0], component[cur][1]);
  }
  target['draw'] = new Function('id', 'container', 'location', 'params', component.draw);
  return target;
}

function parseComponentUrl(components, type) {
  return 'components/' + components[type];
}

function getUrl(targetUrl) {
  var Httpreq = new XMLHttpRequest();
  Httpreq.open("GET", targetUrl, false);
  Httpreq.send(null);
  return Httpreq.responseText;
}

function loadJson(targetUrl) {
  return JSON.parse(getUrl(targetUrl));
}

function loadComponentJson(type, components, url) {
  return loadJson(!!url ? url : parseComponentUrl(components, type)).component;
}

function loadComponent(type, components, container, id, args) {
  var compUrl = parseComponentUrl(components, type);
  var curComp = loadComponentJson(type, components, compUrl);
  parseComponentFunctions(curComp, curComp);
  curComp.draw(id, container, compUrl, parseDefaults(args, curComp.fields));
}


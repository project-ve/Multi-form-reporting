(function(myApp){
    var LIB = myApp.lib;

    LIB.isEmpty = function(id){
        return !document.querySelector(id).value;
    };

    LIB.getValue = function(id){
        return document.querySelector(id).value;
    };

    LIB.setStyle = function(id, attr, val){
        document.querySelector(id).style[attr] = val;
    };

    var createNode = function(type, txt){
        var elem = document.createElement(type);
        elem.className = "per-data";
        var text = document.createTextNode(txt);
        elem.appendChild(text);
        return elem;
    };
    
    LIB.createReport = function(form, report){
        var dstNode;
        var f = form.self;
        var r = report.self;

        for(var i=0; i<f.length; i++){
            var element = f.elements[i];
            var textRes = '-NA-';
            if ((element.type == 'text' || element.type == 'textarea')){
                dstNode = r.querySelector('#' + element.id + '_r').parentElement;
                textRes = element.value ? element.value : textRes;
                dstNode.appendChild(createNode('td', textRes));
            } else if (element.type == 'checkbox'){
                dstNode = r.querySelector('#' + element.name + '_r').parentElement;
                var eName = element.name;
                var res = [];
                while ((element.type == 'checkbox' || element.type == 'select-one') && element.name == eName){
                    if (element.checked){
                        res.push(element.value);
                    }
                    if (element.type == 'select-one'){
                        res.pop();
                        res.push(element.value);
                    }
                    element = f.elements[++i];
                }
                i--;
                textRes = res.length ? res.join(', ') : textRes;
                dstNode.appendChild(createNode('td', textRes));
            } else if (element.type == 'radio'){
                dstNode = r.querySelector('#' + element.name + '_r').parentElement;
                var eName = element.name;
                while (element.type == 'radio' && element.name == eName){
                    if (element.checked)
                        textRes = element.value;
                    element = f.elements[++i];
                }
                i--;
                dstNode.appendChild(createNode('td', textRes));
            }
        }
    };
    
    LIB.clearReport = function(selector){
        var delNodes = document.querySelectorAll(selector);
        for(var i=delNodes.length-1; i>=0; i--){
            delNodes[i].remove();
        }
    };
})(VE.app1);
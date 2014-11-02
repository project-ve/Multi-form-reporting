(function(myApp){
    var LIB = myApp.lib;

    LIB.isEmpty = function(id){
        return !document.querySelector(id).value;
    };

    LIB.setStyle = function(id, attr, val){
        document.querySelector(id).style[attr] = val;
    };

    var createNode = function(txt){
        var span = document.createElement('td');
        span.className = "per-data";
        var text = document.createTextNode(txt);
        span.appendChild(text);
        return span;
    };
    
    LIB.createReport = function(form, report){
        var dstNode;
        var f = form.self;
        var r = report.self;

        for(var i=0; i<f.length; i++){
            var element = f.elements[i];
            if ((element.type == 'text' || element.type == 'textarea') && element.value){
                dstNode = r.querySelector('#' + element.id + '_r').parentElement;
                dstNode.appendChild(createNode(element.value));
            } else if (element.type == 'checkbox'){
                dstNode = r.querySelector('#' + element.name + '_r').parentElement;
                var eName = element.name;
                var res = '';
                while (element.type == 'checkbox' && element.name == eName){
                    if (element.checked)
                        res = res + element.value + ', ';
                    element = f.elements[++i];
                }
                i--;
                dstNode.appendChild(createNode(res));
            } else if (element.type == 'radio'){
                dstNode = r.querySelector('#' + element.name + '_r').parentElement;
                var eName = element.name;
                var res = '';
                while (element.type == 'radio' && element.name == eName){
                    if (element.checked)
                        res = element.value;
                    element = f.elements[++i];
                }
                i--;
                dstNode.appendChild(createNode(res));
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
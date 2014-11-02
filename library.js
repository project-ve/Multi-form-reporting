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
            if ((element.type == 'text' || element.type == 'textarea')){
                var val;
                dstNode = r.querySelector('#' + element.id + '_r').parentElement;
                if (!element.value)
                    val = '-NA-';
                else
                    val = element.value;
                dstNode.appendChild(createNode(val));
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
                dstNode.appendChild(createNode(res.join(', ')));
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
(function(myApp){
    var LIB = myApp.lib;

    LIB.isEmpty = function(id){
        return !document.querySelector(id).value;
    };

    LIB.setStyle = function(id, attr, val){
        document.querySelector(id).style[attr] = val;
    };

    var createNode = function(txt){
        var span = document.createElement('span');
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
            if (element.type == 'text' && element.value){
                dstNode = r.querySelector('#' + element.id + '_r');
                dstNode.appendChild(createNode(element.value));
            } else if (element.type == 'checkbox'){
                dstNode = r.querySelector('#' + element.name + '_r');
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
                dstNode = r.querySelector('#' + element.name + '_r');
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
    
    LIB.clearReport = function(form, report){
        var dstNode;
        var f = form.self;
        var r = report.self;

        for(var i=0; i<f.length; i++){
            var element = f.elements[i];
            if (element.type == 'text'){
                dstNode = r.querySelector('#' + element.id + '_r');
            } else if (element.type == 'checkbox'){
                dstNode = r.querySelector('#' + element.name + '_r');
            } else if (element.type == 'radio'){
                dstNode = r.querySelector('#' + element.name + '_r');
            }
            if (dstNode.firstElementChild)
                dstNode.firstElementChild.remove();
        }
    };
})(VE.app1);
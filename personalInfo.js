(function(myApp){
    // library
    var LIB = myApp.lib;
    // personal info form
    var PIF = myApp.perInfo.form;
    // personal info report
    var PIR = myApp.perInfo.report;
    // validate
    var V = myApp.validate;

    // shared data
    PIF.id = '#pers-info';
    PIR.id = '#pers-info-report';
    PIF.self = document.querySelector(PIF.id);
    PIR.self = document.querySelector(PIR.id);
    PIF.langContainer = PIF.self.querySelector('#lang');
    PIF.regLangListContainer = PIF.langContainer.querySelector('#reg-lang-container');
    PIF.forLangListContainer = PIF.langContainer.querySelector('#foreign-lang-container');

    var addSelectList = function(){
        if (this.dstNode.innerHTML) {
            this.dstNode.innerHTML = '';
            return;
        }
        var sel = document.createElement('select');
        sel.name = "lang";
        // sel.multiple = true;
        this.optList.forEach(function(lan){
            var opt = document.createElement('option');
            opt.appendChild(document.createTextNode(lan));
            sel.appendChild(opt);
        });
        this.dstNode.appendChild(sel);
    };

    var data = { 'optList': ['telugu', 'kannada', 'tamil', 'punjabi', 'marathi'],
                 'regLangCheckbox': PIF.langContainer.querySelector('input[value="Regional"]'),
                 'dstNode': PIF.regLangListContainer };
    data.regLangCheckbox.addEventListener('change', addSelectList.bind(data));

    data = { 'optList': ['spanish', 'french', 'italian', 'mandalin', 'japanese'],
             'foreignLangCheckbox': PIF.langContainer.querySelector('input[value="Foreign"]'),
             'dstNode': PIF.forLangListContainer };
    data.foreignLangCheckbox.addEventListener('change', addSelectList.bind(data));

    // personal info form submit button event handler
    var perInfoNextButton = PIF.self.querySelector('#next');
    perInfoNextButton.addEventListener('click', function(){
        if(V.isValidForm()){
            // hide form
            LIB.setStyle(PIF.id, 'display', 'none');
            LIB.createReport(PIF, PIR);
            // show report
            LIB.setStyle(PIR.id, 'display', 'block');
        }
    });

    // reset button event handler
    var perInfoResetButton = PIF.self.querySelector('input[type="reset"]');
    perInfoResetButton.addEventListener('click', function(){
        PIF.regLangListContainer.innerHTML = "";
        PIF.forLangListContainer.innerHTML = "";
        V.requiredFieldsMsg(false);
        V.invalidPhoneMsg(false);
    });
    
    // personal info form submit button event handler
    var perInfoRepNextButton = PIR.self.querySelector('#edit');
    perInfoRepNextButton.addEventListener('click', function(){
        if(V.isValidForm()){
            // hide report
            LIB.setStyle(PIR.id, 'display', 'none');
             LIB.clearReport('.per-data');
            // show form
            LIB.setStyle(PIF.id, 'display', 'block');
        }
    });
})(VE.app1);
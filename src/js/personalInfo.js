(function(myApp){
    /*-------- EXTERNALS ----------*/
    // library
    var LIB = myApp.lib;
    // validate
    var V = myApp.validate;


    /*--------- PERSONAL INFO FORM AND REPORT -----------*/
    myApp.perInfo = {};
    myApp.perInfo.form = {};
    myApp.perInfo.report = {};
    // personal info form
    var PIF = myApp.perInfo.form;
    // personal info report
    var PIR = myApp.perInfo.report;
    PIF.id = '#pers-info';
    PIR.id = '#pers-info-report';
    PIF.self = document.querySelector(PIF.id);
    PIR.self = document.querySelector(PIR.id);
    PIF.langContainer = PIF.self.querySelector('#lang');
    PIF.regLangListContainer = PIF.langContainer.querySelector('#reg-lang-container');
    PIF.forLangListContainer = PIF.langContainer.querySelector('#foreign-lang-container');


    /*------- Form next button event handler -----------------------------------*/
    var perInfoNextButton = PIF.self.querySelector('#next');
    perInfoNextButton.addEventListener('click', function(){
        if(V.validateForm()){
            // hide form
            LIB.setStyle(PIF.id, 'display', 'none');
            LIB.createReport(PIF, PIR);
            // show report
            LIB.setStyle(PIR.id, 'display', 'block');
        }
    });


    /*------- Form reset button event handler -----------------------------------*/
    var perInfoResetButton = PIF.self.querySelector('input[type="reset"]');
    perInfoResetButton.addEventListener('click', function(){
        PIF.regLangListContainer.innerHTML = "";
        PIF.forLangListContainer.innerHTML = "";
        // clear field validation messages
        V.clearForm();
    });

    /*------- Report edit button event handler -----------------------------------*/
    var perInfoRepEditButton = PIR.self.querySelector('#edit');
    perInfoRepEditButton.addEventListener('click', function(){
        // hide report
        LIB.setStyle(PIR.id, 'display', 'none');
        LIB.clearReport('.per-data');
        // show form
        LIB.setStyle(PIF.id, 'display', 'block');
    });


    /*------- Report confirm button event handler -----------------------------------*/
    var perInfoRepConfirmButton = PIR.self.querySelector('#confirm');
    perInfoRepConfirmButton.addEventListener('click', function(){
        // hide report
        LIB.setStyle(PIR.id, 'display', 'none');
        // show edu form
        LIB.setStyle(EIF.id, 'display', 'block');
    });


    /*------- Form Regional/Foreign language event handler -----------------------------------*/
    var data = { 'optList': ['Telugu', 'Kannada', 'Tamil', 'Punjabi', 'Marathi'],
                 'regLangCheckbox': PIF.langContainer.querySelector('input[value="Regional"]'),
                 'dstNode': PIF.regLangListContainer };
    data.regLangCheckbox.addEventListener('change', addSelectList.bind(data));

    data = { 'optList': ['Spanish', 'French', 'Italian', 'Mandalin', 'Japanese'],
             'foreignLangCheckbox': PIF.langContainer.querySelector('input[value="Foreign"]'),
             'dstNode': PIF.forLangListContainer };
    data.foreignLangCheckbox.addEventListener('change', addSelectList.bind(data));

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
})(VE.app1);
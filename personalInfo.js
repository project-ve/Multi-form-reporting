(function(myApp){
    // library
    var LIB = myApp.lib;
    // personal info form
    var PIF = myApp.perInfo.form;
    // personal info report
    var PIR = myApp.perInfo.report;
    // education info form
    var EIF = myApp.eduInfo.form;
    // education info report
    var EIR = myApp.eduInfo.report;
    // validate
    var V = myApp.validate;

    // shared data
    PIF.id = '#pers-info';
    PIR.id = '#pers-info-report';
    EIF.id = '#edu-info';
    PIF.self = document.querySelector(PIF.id);
    PIR.self = document.querySelector(PIR.id);
    EIF.self = document.querySelector(EIF.id);
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

    var data = { 'optList': ['Telugu', 'Kannada', 'Tamil', 'Punjabi', 'Marathi'],
                 'regLangCheckbox': PIF.langContainer.querySelector('input[value="Regional"]'),
                 'dstNode': PIF.regLangListContainer };
    data.regLangCheckbox.addEventListener('change', addSelectList.bind(data));

    data = { 'optList': ['Spanish', 'French', 'Italian', 'Mandalin', 'Japanese'],
             'foreignLangCheckbox': PIF.langContainer.querySelector('input[value="Foreign"]'),
             'dstNode': PIF.forLangListContainer };
    data.foreignLangCheckbox.addEventListener('change', addSelectList.bind(data));

    // personal info form submit button event handler
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

    // reset button event handler
    var perInfoResetButton = PIF.self.querySelector('input[type="reset"]');
    perInfoResetButton.addEventListener('click', function(){
        PIF.regLangListContainer.innerHTML = "";
        PIF.forLangListContainer.innerHTML = "";
        // clear field validation messages
        V.clearForm();
    });
    
    // personal info report edit button event handler
    var perInfoRepEditButton = PIR.self.querySelector('#edit');
    perInfoRepEditButton.addEventListener('click', function(){
        // hide report
        LIB.setStyle(PIR.id, 'display', 'none');
        LIB.clearReport('.per-data');
        // show form
        LIB.setStyle(PIF.id, 'display', 'block');
    });

    // personal info report confirm button event handler
    var perInfoRepConfirmButton = PIR.self.querySelector('#confirm');
    perInfoRepConfirmButton.addEventListener('click', function(){
        // hide report
        LIB.setStyle(PIR.id, 'display', 'none');
        // show edu form
        LIB.setStyle(EIF.id, 'display', 'block');
    });

    var eduCounter = (function(){
        var counter = 1;
        return function(){
            return ++counter;
        }
    })();

    var addEducation = function(){
        if(eduCounter() <= 4){
            var list = document.createElement('ul');
            list.className = "edu-item";
            
            var listItem1 = document.createElement('li');
            // univ name
            var univName = document.createElement('input');
            univName.placeholder = "*University/School";
            univName.className = "univ";
            listItem1.appendChild(univName);
            // degree select list
            var degree = document.createElement('select');
            degree.className = 'degree';
            ['Doctorate', 'Masters', 'Bachelors', 'High School'].forEach(function(optName){
                var opt = document.createElement('option');
                opt.appendChild(document.createTextNode(optName));
                degree.appendChild(opt);
            });
            listItem1.appendChild(degree);
            list.appendChild(listItem1);

            var listItem2 = document.createElement('li');
            // start date
            var startDate = document.createElement('input');
            startDate.placeholder = "Start date";
            startDate.className = "start-date";
            listItem2.appendChild(startDate);
            // end date
            var endDate = document.createElement('input');
            endDate.placeholder = "End date";
            endDate.className = "end-date";
            listItem2.appendChild(endDate);
            list.appendChild(listItem2);

            EIF.self.querySelector('div').appendChild(list);
            // var hr = document.createElement('hr');
            EIF.self.querySelector('div').appendChild(hr);
        } else {
            LIB.setStyle(EIF.id + ' #add-edu-warning', 'display', 'inline');
        }
    };

    // reset button event handler
    var eduInfoAddButton = EIF.self.querySelector('#add-edu');
    eduInfoAddButton.addEventListener('click', addEducation);
})(VE.app1);
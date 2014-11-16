(function(myApp){
    /*-------- EXTERNALS ----------*/
    // library
    var LIB = myApp.lib;
    // validate
    var V = myApp.validate;
    // personal info report
    var PIR = myApp.perInfo.report;

    /*--------- EDUCATION FORM AND REPORT -----------*/
    // education info form
    var EIF = myApp.eduInfo.form;
    // education info report
    var EIR = myApp.eduInfo.report;
    EIF.id = '#edu-info';
    EIF.self = document.querySelector(EIF.id);
    EIR.id = '#edu-info-report';
    EIR.self = document.querySelector(EIR.id);


    /*------- Add edu-item button event handler ----------------------------------*/
    var eduInfoAddButton = EIF.self.querySelector('#add-edu');
    eduInfoAddButton.addEventListener('click', addEducation);

    var addEducation = function(){
        var id = eduCounter.increment();
        if(eduCounter.count <= 4){
            var fs = document.createElement('fieldset');
            fs.id = "edu-item-" + id;
            var ld = document.createElement('legend');
            ld.innerHTML = "Education History";
            fs.appendChild(ld);
            var list = document.createElement('ul');
            
            var listItem1 = document.createElement('li');
            // univ name
            var univName = document.createElement('input');
            univName.placeholder = "*University/School";
            univName.className = "univ";
            univName.id = "univ" + "-" + id;
            listItem1.appendChild(univName);
            // degree select list
            var degree = document.createElement('select');
            degree.className = 'degree';
            degree.id = "degree" + "-" + id;
            ['Doctorate', 'Masters', 'Bachelors', 'High School'].forEach(function(optName){
                var opt = document.createElement('option');
                opt.appendChild(document.createTextNode(optName));
                degree.appendChild(opt);
            });
            listItem1.appendChild(degree);
            // delete education button
            var delEduButton = document.createElement('input');
            delEduButton.type = 'button';
            delEduButton.id = 'del-edu';
            delEduButton.value = '-';
            delEduButton.toBeRemovedId = fs.id;
            listItem1.appendChild(delEduButton);
            delEduButton.addEventListener('click', removeEduItem);
            list.appendChild(listItem1);

            var listItem2 = document.createElement('li');
            // start date
            var startDate = document.createElement('input');
            startDate.placeholder = "Start date";
            startDate.className = "start-date";
            startDate.id = "start-date" + "-" + id;
            listItem2.appendChild(startDate);
            // end date
            var endDate = document.createElement('input');
            endDate.placeholder = "End date";
            endDate.className = "end-date";
            endDate.id = "end-date" + "-" + id;
            listItem2.appendChild(endDate);
            list.appendChild(listItem2);
            fs.appendChild(list);
            EIF.self.querySelector('div').appendChild(fs);
            
            // Also add place holder in the report for this item
            var fieldSet = document.createElement('fieldset');
            fieldSet.id = 'edu-item-' + id + '_r';
            var legend = document.createElement('legend');
            legend.innerHTML = "Education History";
            fieldSet.appendChild(legend);
            var table = document.createElement('table');
            var items = {'univ': 'University', 
                'degree': 'Degree',
                'start-date': 'Start date',
                'end-date': 'End date'}
            for(each in items){
                (function(){
                    var tr = document.createElement('tr');
                    var th = document.createElement('th');
                    th.id = each + "-" + id + "_r";
                    th.innerHTML = items[each];
                    tr.appendChild(th);
                    table.appendChild(tr);
                })();
            }
            fieldSet.appendChild(table);
            var dst = document.querySelector(EIR.id + ' #edu-items');
            dst.appendChild(fieldSet);
        } else {
            eduCounter.decrement();
            LIB.setStyle(EIF.id + ' #add-edu-warning', 'display', 'inline');
        }
    };

    var eduCounter = {
        id: 1,
        count: 1,
        increment: function(){
            this.count++;
            return ++this.id;
        },
        decrement: function(){
            this.count--;
        }
    };

    var removeEduItem = function(){
        eduCounter.decrement();
        document.querySelector('#' + this.toBeRemovedId).remove();
        document.querySelector('#' + this.toBeRemovedId + '_r').remove();
        LIB.setStyle(EIF.id + ' #add-edu-warning', 'display', 'none');
    };


    /*------------ Form reset button event handler ---------------*/
    var eduInfoAddButton = EIF.self.querySelector('#add-edu');
    eduInfoAddButton.addEventListener('click', addEducation);

    /*------- Form next button event handler -----------------------------------*/
    var eduInfoNextButton = EIF.self.querySelector('#edu-next');
    eduInfoNextButton.addEventListener('click', function(){
        // if(V.validateForm()){
            // hide form
            LIB.setStyle(EIF.id, 'display', 'none');
            LIB.createReport(EIF, EIR);
            // show report
            LIB.setStyle(EIR.id, 'display', 'block');
        // }
    });

    /*------- Report edit button event handler -----------------------------------*/
    var eduInfoRepEditButton = EIR.self.querySelector('#edu-edit');
    eduInfoRepEditButton.addEventListener('click', function(){
        // hide report
        LIB.setStyle(EIR.id, 'display', 'none');
        LIB.clearReport('.per-data');
        // show form
        LIB.setStyle(EIF.id, 'display', 'block');
    });

    /*------- Report confirm button event handler -----------------------------------*/
    var eduInfoRepConfirmButton = EIR.self.querySelector('#edu-confirm');
    eduInfoRepConfirmButton.addEventListener('click', function(){
        // hide report
        LIB.setStyle(EIR.id, 'display', 'none');
        // show final report
        // LIB.setStyle(PIR.id, 'display', 'block');
        document.querySelector('#final-report').style.display = 'block';
    });
})(VE.app1);
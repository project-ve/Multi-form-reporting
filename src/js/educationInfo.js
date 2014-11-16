(function(myApp){
    /*-------- EXTERNALS ----------*/
    // library
    var LIB = myApp.lib;
    // validate
    var V = myApp.validate;


    /*--------- EDUCATION FORM AND REPORT -----------*/
    // education info form
    var EIF = myApp.eduInfo.form;
    // education info report
    var EIR = myApp.eduInfo.report;
    EIF.id = '#edu-info';
    EIF.self = document.querySelector(EIF.id);


    /*------- Add edu-item button event handler ----------------------------------*/
    var eduInfoAddButton = EIF.self.querySelector('#add-edu');
    eduInfoAddButton.addEventListener('click', addEducation);

    var addEducation = function(){
        var id = eduCounter.increment();
        if(eduCounter.count <= 4){
            var list = document.createElement('ul');
            list.className = "edu-item";
            list.id = "edu-item-" + id;
            
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
            // delete education button
            var delEduButton = document.createElement('input');
            delEduButton.type = 'button';
            delEduButton.id = 'del-edu';
            delEduButton.value = '-';
            delEduButton.toBeRemovedId = list.id;
            listItem1.appendChild(delEduButton);
            delEduButton.addEventListener('click', removeEduItem);
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
        LIB.setStyle(EIF.id + ' #add-edu-warning', 'display', 'none');
    };


    /*------------ Form reset button event handler ---------------*/
    var eduInfoAddButton = EIF.self.querySelector('#add-edu');
    eduInfoAddButton.addEventListener('click', addEducation);
})(VE.app1);
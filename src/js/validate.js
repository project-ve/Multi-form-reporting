(function(myApp){
    /*-------- EXTERNALS ----------*/
    // personal info form
    var PIF = myApp.perInfo.form;
    // library
    var LIB = myApp.lib;


    /*--------- FORM VALIDATION -----------*/
    var V = myApp.validate;

    V.validateForm = function(){
        var valid = true;
        if (!V.validateRequiredFields(PIF))
            valid = false;
        if (!V.validateChars())
            valid = false;
        if (!V.validatePhone())
            valid = false;
        if (!V.validateDob())
            valid = false;
        return valid;
    };

    /*--------- Required fields Validation-----------*/
    V.validateRequiredFields = function(form){
        // verify if required fields are not empty
        var valid = true;
        var reqFields = form.reqFields;
        for(f in reqFields){
            if(LIB.isEmpty(form.id + f)) {
                LIB.setStyle(form.id + reqFields[f], 'display', 'inline');
                valid = false;
            } else {
                LIB.setStyle(form.id + reqFields[f], 'display', 'none');
            }
        }
        return valid;
    }

    /*--------- Name validation -----------*/
    V.validateChars = function(){
        // verify if data entered has invalid chars like ;,$,% etc
        var valid = true;
        var address = /[*|\":<>[\]{}`\\()';@&$]/; // only special chars
        var name = /[\d+*|\":<>[\]{}`\\()';@&$]/;  // special chars plus numbers
        var fields = {
                            ' #fname': ' #invalid-fname',
                            ' #mname': ' #invalid-mname',
                            ' #lname': ' #invalid-lname',
                            ' #addr': ' #invalid-addr',
                        };
        for(f in fields){
            var regEx = (f === ' #addr') ? address : name;    
            if(regEx.test(LIB.getValue(PIF.id + f))) {
                LIB.setStyle(PIF.id + fields[f], 'display', 'inline');
                valid = false;
            } else {
                LIB.setStyle(PIF.id + fields[f], 'display', 'none');
            }
        }
        return valid;
    }

    /*--------- Phone validation -----------*/
    V.validatePhone = function(){
        // verify if phone number is valid
        var valid = true;
        var phone = PIF.self.querySelector('#phone').value;
        if (phone){
            var list = phone.split('-');
            if (phone.length != 12 || list.length != 3 || list[0].length != 3 ||
                list[1].length != 3 || list[2].length != 4)
                valid = false;
            else {
                list.forEach(function(e){
                    if (Number(e) != Number(e))
                        valid = false;
                });
            }
        }
        // show message if invalid
        if (!valid)
            LIB.setStyle(PIF.id + ' #invalid-phone', 'display', 'inline');
        else
            LIB.setStyle(PIF.id + ' #invalid-phone', 'display', 'none');

        return valid;
    };

    /*--------- Dob validation -----------*/
    V.validateDob = function(){
        // verify if date is valid
        var valid = false;
        var date = PIF.self.querySelector('#dob').value;
        if (date.trim()){
            var dateList = date.split('/');
            if (dateList.length == 3 && dateList[0].length < 3 && dateList[1].length < 3 && 
                dateList[2].length < 5 ){

                var month = Number(dateList[0]);
                var date = Number(dateList[1]);
                var year = Number(dateList[2]);
                var monthRange = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                var today = new Date();
                var currYear = today.getFullYear();
                var givenDate = new Date(year, month-1, date);
                // handle leap year
                monthRange[1] = (year % 4 === 0) ? 29 : monthRange[1];

                if (!(month != month || date != date || year != year || // verify if Number
                     month < 1 || month > 12 ||  // verify range
                     date < 1 || date > 31 || 
                     year < currYear-150 || givenDate > today ||
                     date > monthRange[month-1]))
                    valid = true;
            }
        } else
            valid = true;
        // show message if invalid
        if (!valid)
            LIB.setStyle(PIF.id + ' #invalid-date', 'display', 'inline');
        else
            LIB.setStyle(PIF.id + ' #invalid-date', 'display', 'none');
        return valid;
    };

    /*--------- Clear validatable warnings -----------*/
    V.clearValidatables = function(){
        var validatables = document.querySelectorAll('.warning');
        [].forEach.call(validatables, function(f){
            f.style.display = 'none';
        });
    };
})(VE.app1);
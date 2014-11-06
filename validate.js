(function(myApp){
    var V = myApp.validate;
    // personal info form
    var PIF = myApp.perInfo.form;
    // library
    var LIB = myApp.lib;

    V.isValidForm = function(){
        var valid = true;
        if (!V.invalidPhoneMsg(true))
            valid = false;
        if (!V.requiredFieldsMsg(true))
            valid = false;
        if (!V.invalidDobMsg(true))
            valid = false;
        return valid;
    };
    
    V.requiredFieldsMsg = function(show){
        // verify if required fields are not empty
        var display = show ? 'inline' : 'none';
        if (!show){
            // hide message and return;
            LIB.setStyle(PIF.id + ' #fname-req', 'display', display);
            LIB.setStyle(PIF.id + ' #lname-req', 'display', display);
            LIB.setStyle(PIF.id + ' #dob-req', 'display', display);
            return;
        }
        var valid = true;
        // first name
        if(LIB.isEmpty(PIF.id + ' #fname')) {
            LIB.setStyle(PIF.id + ' #fname-req', 'display', display);
            valid = false;
        }
        // last name
        if(LIB.isEmpty(PIF.id + ' #lname')) {
            LIB.setStyle(PIF.id + ' #lname-req', 'display', display);
            valid = false;
        }
        // DOB
        if(LIB.isEmpty(PIF.id + ' #dob')) {
            LIB.setStyle(PIF.id + ' #dob-req', 'display', display);
            valid = false;
        }
        return valid;
    }

    V.invalidPhoneMsg = function(show){
        if (!show){
            // hide message and return;
            LIB.setStyle(PIF.id + ' #invalid-phone', 'display', 'none');
            return;
        }
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
        return valid;
    };
    
    V.invalidDobMsg = function(show){
        if (!show){
            // hide message and return;
            LIB.setStyle(PIF.id + ' #invalid-date', 'display', 'none');
            return;
        }
        // verify if date number is valid
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
        }
        // show message if invalid
        if (!valid)
            LIB.setStyle(PIF.id + ' #invalid-date', 'display', 'inline');
        return valid;
    };

})(VE.app1);
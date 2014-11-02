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
        return valid;
    };
    
    V.requiredFieldsMsg = function(show){
        // verify if required fields are not empty
        var display = show ? 'inline' : 'none';
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
})(VE.app1);
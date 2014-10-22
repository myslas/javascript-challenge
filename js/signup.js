/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict";

document.addEventListener('DOMContentLoaded', function() {
   var signup = document.getElementById('signup');
   var statesList = signup.elements['state'];
   var cancel = document.getElementById('cancelButton');
   var idx;

   for (idx = 0; idx < usStates.length; ++idx) {
       var state = document.createElement('option');
       state.innerHTML = usStates[idx].name;
       state.value = usStates[idx].code;
       statesList.appendChild(state);
   }

   var occupation = document.getElementById('occupation');
   occupation.addEventListener('change', function() {
       var value = occupation.value;
       if(value == 'other') {
           signup.elements['occupationOther'].style.display = 'block';
       } else {
           signup.elements['occupationOther'].style.display = 'none';
       }
   });

   cancel.addEventListener('click', function() {
       var answer = confirm("Are you sure you want to cancel?");
       if (answer) {
           window.location.href = "http://google.com";
       }
   });

   signup.addEventListener('submit', onSubmit);

});

function onSubmit(evt) {
    evt.returnValue = validateForm(this);
    if (!evt.returnValue && evt.preventDefault) {
        evt.preventDefault();
    }
    return evt.returnValue;
}

function validateForm(form) {
    var required = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    if(document.getElementById('signup').elements['occupationOther'].style.display == 'block') {
        required.push('occupationOther');
    }
    var idx;
    var formValid = true;

    for (idx = 0; idx < required.length; ++idx) {
        formValid &= validateRequiredField(form.elements[required[idx]]);
    }
    return formValid;
}

function validateRequiredField(field) {
    var valid;
    if (field.name == 'zip') {
        var zipRegExp = new RegExp('^\\d{5}$');
        valid = zipRegExp.test(field.value);
    }
    if (field.name == 'birthdate') {
        var message = document.getElementById('birthdateMessage');
        var date = new Date(field.value);
        var d = new Date();
        valid = d.getFullYear() - date.getFullYear() > 13;
        if (!valid) {
            message.innerHTML = 'You must be 13 years or older to sign up.';
        } else {
            message.innerHTML = '';
        }
    }
    else {
        var value = field.value.trim();
        valid = value.length > 0;
    }
    if(valid) {
        field.className = 'form-control';
    }
    else {
        field.className = 'form-control invalid-field';
    }
    return valid;
}

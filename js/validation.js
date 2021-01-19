var mailPattern = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$");
var phonePattern = /^[1-9]\d{9}$/;

function validateForm() {
    valid = validateName();
    valid = validateEmail() && valid;
    valid = validatePhone() && valid;
    return valid;
}

function validateName() {
    var modal = $("#formModal");
    var fname = modal.find(".first-name").val();
    var lname = modal.find(".last-name").val();
    if (fname.length == 0) {
        alert("Please enter first name");
        return false;
    } else {
        if (lname.length == 0) {
            alert("Please enter last name");
            return false;
        } else {
            return true;
        }
    }
}

function validateEmail() {
    var mail = $("#formModal").find('.email').val();
    if (mail.length == 0) {
        alert("Email is required");
        return false;
    } else if (mailPattern.test(mail)) {
        return true;
    } else {
        alert("Incorrect mail id");
        return false;
    }
}

function validatePhone() {
    var phone = $("#formModal").find('.phone').val();
    if (phone.length == 0) {
        alert("Phone number is required");
        return false;
    } else if (phonePattern.test(phone)) {
        return true;
    } else {
        alert("Please enter valid phone number");
        return false;
    }
}
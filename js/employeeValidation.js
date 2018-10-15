$(document).ready(function() {
    $(document).on("click",'#cancelBtn' ,function(event){
        $("#fname").val("");
        $("#lname").val("");
        $("#visa").val("");
        $("#error_fname").hide();
        $("#error_lname").hide();
        $("#error_visa").hide();
        $("#submitBtn").attr('disabled', true);
    });
    $("#submitBtn").attr('disabled', true);

    $(window).unload(function() {
        $("#fname").val("");
        $("#lname").val("");
        $("#visa").val("");
        $("#error_fname").hide();
        $("#error_lname").hide();
        $("#error_visa").hide();
    });

    $(function() {
        var error_fname = false;
        var error_lname = false;
        var error_visa = false;

        $('#fname').focusout(function() {
            check_fname();
        });
        
        $('#lname').focusout(function() {
            check_lname();
        });

        $('#visa').focusout(function() {
            check_visa();
            enableDisableSubmitBtn();
        });
        
        
        function check_fname() {
            var fname_length = $("#fname").val().length;
            var fname_string = $("#fname").val().substring(0,1);
            var fname_specialChar = new RegExp(/[`~=+-[!@#$%^&*(),.?\]\\\\'":{}|<>]/g);
           
            if(fname_length == 0) {
                $("#error_fname").html("First name cannot be empty");
                $("#error_fname").show();
                error_fname = true; 
            }

            else if(fname_string.match(' ')) {
                $("#error_fname").html("First name cannot have spaces at the start");
                $("#error_fname").show();
                error_fname = true;
            }

            else if($("#fname").val().match(/\d+/g)) {
                $("#error_fname").html("First name cannot contain numbers");
                $("#error_fname").show();
                error_fname = true;
            }

            else if(fname_specialChar.test($("#fname").val())) {
                $("#error_fname").html("First name cannot contain  special characters");
                $("#error_fname").show();
                error_fname = true;
            }

            else {
                $("#error_fname").hide();
                error_fname = false;
            }
        }

        function check_lname() {
            var lname_length = $("#lname").val().length;
            var lname_string = $("#lname").val().substring(0,1);
            var lname_specialChar = new RegExp(/[`~=+-[!@#$%^&*(),.?\]\\\\'":{}|<>]/g);
           
            if(lname_length == 0) {
                $("#error_lname").html("Last name cannot be empty");
                $("#error_lname").show();
                error_lname = true; 
            }

            else if(lname_string.match(' ')) {
                $("#error_lname").html("Last name cannot have spaces at the start");
                $("#error_lname").show();
                error_lname = true;
            }

            else if($("#lname").val().match(/\d+/g)) {
                $("#error_lname").html("Last name cannot contain numbers");
                $("#error_lname").show();
                error_lname = true;
            }

            else if(lname_specialChar.test($("#lname").val())) {
                $("#error_lname").html("Last name cannot contain  special characters");
                $("#error_lname").show();
                error_fname = true;
            }

            else {
                $("#error_lname").hide();
                error_lname = false;
            }
        }

        function check_visa() {
            var visa_length = $("#visa").val().length;
            var visa_string = $("#visa").val().substring(0,3);
            var visa_specialChar = new RegExp(/[`~=+-[!@#$%^&*(),.?\]\\\\'":{}|<>]/g);

            if(visa_length == 0) {
                $("#error_visa").html("Visa cannot be empty");
                $("#error_visa").show();
                error_visa = true; 
            }

            else if(visa_length!=3 || $("#visa").val().match(/\d+/g) || visa_specialChar.test($("#visa").val()) || visa_string.match(' ')) {
                $("#error_visa").html("Visa should contain 3 letters, no numbers, no space and no special characters");
                $("#error_visa").show();
                error_visa = true;
            }

            else {
                $("#error_visa").hide();
                error_visa = false;
            }
        }

        function enableDisableSubmitBtn() {
                if(error_fname == false && error_lname == false && error_visa == false) {
                    alert(error_fname +""+ error_lname +""+ error_visa)
                    $('#submitBtn').attr('disabled', false);
                }
                else {
                    $('#submitBtn').attr('disabled', true);
                } 
            }
    });  
});
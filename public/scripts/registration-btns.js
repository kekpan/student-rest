// Switch to employee registration
$(document).ready( _ => {
    $('#emp-btn').on('click', _ => {
        $("#form-user").show();
        $("#label-idNumber-std").hide();
        $("#label-idNumber-emp").show();
        $("#label-year-std").hide();
        $("#label-year-emp").show();
        $("#userType").attr("placeholder", "Εργαζόμενος");
        $("#userType").attr("value", "Εργαζόμενος");
        $("#department-std").hide();
        $("#department-emp").show();
    });
});

// Switch to student registration
$(document).ready( _ => {
    $('#std-btn').on('click', _ => {
        $("#form-user").show();
        $("#label-idNumber-emp").hide();
        $("#label-idNumber-std").show();
        $("#label-year-emp").hide();
        $("#label-year-std").show();
        $("#userType").attr("placeholder", "Φοιτητής");
        $("#userType").attr("value", "Φοιτητής");
        $("#department-emp").hide();
        $("#department-std").show();
    });
});

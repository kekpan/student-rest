// Trigger edit
$(document).ready( _ => {
    $('#emp-btn').on('click', _ => {
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

$(document).ready( _ => {
    $('#std-btn').on('click', _ => {
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
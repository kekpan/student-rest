// Get anncmnt's url
if (document.querySelector('#id')) {
    
const id = document.querySelector('#id').innerHTML;
var url = '/anncmnts/' + id;
}


// Trigger edit
$(document).ready( _ => {
    $('#trigger-edit').on('click', _ => {
        $("article").hide();
        $("#basic-btns-container").hide();
        $("form").show();
        $("#edit-btns").show();
    });
});

// Trigger edit cancellation
$(document).ready( _ => {
    $('#trigger-editCan').on('click', _ => {
        $("#edit-btns").hide();
        $("#editCan-btns").show();
    });
});

// Confirm edit cancellation
$(document).ready( _ => {
    $('#editCan-confirm').on('click', _ => {
        window.location.href = url;
    });
});

// Decline edit cancellation
$(document).ready( _ => {
    $('#editCan-cancel').on('click', _ => {
        $("#editCan-btns").hide();
        $("#edit-btns").show();
    });
});

// Trigger add cancellation
$(document).ready( _ => {
    $('#trigger-addCan').on('click', _ => {
        $("#add-btns").hide();
        $("#addCan-btns").show();
    });
});

// Confirm add cancellation
$(document).ready( _ => {
    $('#addCan-confirm').on('click', _ => {
        window.location.href = '/anncmnts';
    });
});

// Decline add cancellation
$(document).ready( _ => {
    $('#addCan-cancel').on('click', _ => {
        $("#addCan-btns").hide();
        $("#add-btns").show();
    });
});

// Trigger delete
$(document).ready( _ => {
    $('#trigger-del').on('click', _ => {
        $("#basic-btns").hide();
        $("#del-btns").show();
    });
});

// Confirm delete
$(document).ready( _ => {
    $('#del-confirm').on('click', _ => {
        $.ajax({
            type:'DELETE',
            url: url,
            success: _ => {
                window.location.href = '/anncmnts';
            },
            error: (err) => {
                if (err.status == 500) err.statusText = 'Σφάλμα κατά την διαγραφή της ανακοίνωσης από τη βάση δεδομένων.\
                Αν το πρόβλημα επιμένει, επικοινωνείστε με κάποιον υπεύθυνο.'
                if (err.status == 503) err.statusText = "Δεν μπορείτε να διαγράψετε ανακοίνωση αν δεν είστε συνδεδεμένος."
                if (err.status == 511) err.statusText = "Δεν μπορείτε να διαγράψετε ανακοίνωση κάποιου άλλου χρήστη."
                $("#alert").show();
                $("#alert").text(err.statusText);
            }
        });
    });
});

// Decline delete
$(document).ready( _ => {
    $('#del-cancel').on('click', _ => {
        $("#del-btns").hide();
        $("#basic-btns").show();
    });
});

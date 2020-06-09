// $(document).ready( _ => {
//     $('#accept-btn').on('click', _ => {
//         $("article").hide();
//         $("#basic-btns").hide();
//         $("form").show();
//         $("#edit-btns").show();
//     });
// });

acceptButton = document.getElementById("accept-btn");
declineButton = document.getElementById("decline-btn");

photo = document.getElementById("photo");
tax = document.getElementById("tax");
idCard = document.getElementById("idCard");

textarea = document.querySelector("textarea");

photo.addEventListener("change", check);
tax.addEventListener("change", check);
idCard.addEventListener("change", check);

function check(){
    if ( photo.value === '1' && tax.value === '1' && idCard.value === '1'){
        acceptButton.disabled = false;
        declineButton.disabled = true;
        textarea.disabled = true;
    }
    else {
        acceptButton.disabled = true;
        declineButton.disabled = false;
        textarea.disabled = false;
    }
}
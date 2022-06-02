// $('#p_logo').change(function(){
//     tmpval = $(this).val();
//     if(tmpval !== '') {
//         console.log("dsfsd")
//         $('#preview_i').attr("src", tmpval);
//     }
// });

console.log("dsfsd1")
var input = $('#p_logo');
$('#p_logo').on('change', function(){
    if(input.val().length) {
        console.log("dsfsd2")
        $('#preview_i').attr("src", input.val());
    } else {
        console.log("dsfsd3")
    }
});

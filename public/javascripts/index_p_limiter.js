// $(function(){
//     const maxLength = 250
//     console.log($(".description"))
//     let txt = $(".description").text().trim();
//     if(txt.length > maxLength){
//         $(".description").text( txt.substring(0,maxLength) + '...');
//     }
// });

const maxLength = 250
$(".description").each(function (index, el) {
    // console.log(el)
    // let txt = el.text().trim();
    // console.log($(".description")[index].textContent)
    let txt = el.innerText;
    if (txt.length > maxLength) {
        // el.text(txt.substring(0, maxLength) + '...');
        el.innerText = txt.substring(0, maxLength) + '...'
    }
    // let v = $(el).val();
    // if (v) personsIdsArray.push(v);
});

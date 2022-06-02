// $(function(){
//     const maxLength = 250
//     // console.log($(".db_description")[0])
//     for (let i = 0; i < $(".db_description").length; i++) {
//         let element = $(".db_description")[i]
//         console.log(element)
//         let txt = element.text().trim();
//         if(txt.length > maxLength){
//             element.text( txt.substring(0,maxLength) + '...');
//         }
//     }
//     // $(".db_description").forEach(element => {
//     //     let txt = element.text().trim();
//     //     if(txt.length > maxLength){
//     //         element.text( txt.substring(0,maxLength) + '...');
//     //     }
//     // });
// });

const maxLength = 250
$(".db_description").each(function (index, el) {
    let txt = el.innerText;
    if (txt.length > maxLength) {
        // el.text(txt.substring(0, maxLength) + '...');
        el.innerText = txt.substring(0, maxLength) + '...'
    }
    // console.log(el)
    // let txt = el.text().trim();
    // if (txt.length > maxLength) {
    //     el.text(txt.substring(0, maxLength) + '...');
    // }
    // let v = $(el).val();
    // if (v) personsIdsArray.push(v);
});

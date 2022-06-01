$(function(){
    const maxLength = 250
    let txt = $(".description").text().trim();
    if(txt.length > maxLength){
        $(".description").text( txt.substring(0,maxLength) + '...');
    }
});

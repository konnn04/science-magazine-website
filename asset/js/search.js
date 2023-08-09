$(document).ready(function () {
    createFilter();
});

function createFilter(){
    $('.filter-box').hide();
    $('.filter').click(()=>{
        $('.filter-box').slideDown();
    })
}
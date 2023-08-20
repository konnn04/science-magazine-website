$(document).ready(async function(){
    await fetch()
    // initUser()
    // initHeaderEvent()
    checkCurPlan()
    toSub()
})

function checkCurPlan(){
   $('.bought').eq(0).addClass('active')
   $('.notBuy').click(function(){
    $('.bought').removeClass('active')
    $(this).siblings().addClass('active')
   })
}

function toSub(){
    $('.joinBtn').on('click', function() {
        $('html, body').animate({
            scrollTop: $('#c').offset().top
        }, 800); 
    });
}
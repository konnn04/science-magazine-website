$(document).ready(async function(){
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
            scrollTop: $('#c').offset().top - 100
        }, 800); 
    });

    $(window).scroll(function(){
        if ($(window).scrollTop() > $(".choose").offset().top - $(window).height() + 200 ) {
            $(".choose").addClass("show")
        }else{
            $(".choose").removeClass("show")
        }

        if ($(window).scrollTop() > $(".packs").offset().top - $(window).height() + 400 ) {
            $(".packs").addClass("show")
        }else{
            $(".packs").removeClass("show")
        }
    })
}
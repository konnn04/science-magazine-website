$(document).ready(async()=>{
    await initHeader()
    // initKeyWordsHeader()
    initUser()
    initHeaderEvent()
    $(window).scroll(function () { 
        console.log($(this).scrollTop());
        if($(this).scrollTop()>70){
            $('.ads').css({
                'position':'fixed',
                'top':'120px',
            });
        }
        // else if($(this).scrollTop()>$(this).scrollTop()-$('footer').height()){
        //     $('.ads').css({
        //         'position':'abslute',
        //         'bottom': '2rem'
        //     })
        // }
        else{
            $('.ads').css({
                'position':'absolute',
                'top':'2rem'
            });
        }
    });
})


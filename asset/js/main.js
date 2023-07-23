//to top btn
$(window).scroll(function(){
    if($(this).scrollTop() > 100){
        $(".to-top").fadeIn();
    }
    else{
        $(".to-top").fadeOut();
   }
})

$(".to-top").click(function(){
   $("html,body").animate({scrollTop:0},'slow');
});

//Hàm trả về string được cắt + "..."
function cutString(s,length) {
    return (s.indexOf(' ',length) ==-1)?s:s.slice(0,s.indexOf(' ',length)+1)+"..."
}

function initUser() {
    if (getCookie("username")) {
        $(".user-check").html(`<div class="user-info">
                       <h2>${getCookie("username")}</h2>
                       <i class="fa-solid fa-user" style="color: #ffffff;"></i>
                       <div class="menu-user-box">
                           <ul class="menu-user">
                               <li>
                                   <i class="fa-solid fa-right-from-bracket"></i>
                                   <h2>Log out</h2>
                               </li>                                
                           </ul>
                       </div>
       `)
   }else{
       $(".user-check").html(`<a class="nav_btn" href="./login.html" id="loginBtn"><button class="btnLogin-popup">Login</button></a>`)
   }
}

function initHeaderEvent() {
    $(".menu-btn i").click(()=>{
        $(".menu-box").show()
        setTimeout(()=>{
            $(".menu-box").toggleClass("active")
        },100)
    })

    $(".menu").eq(0).click(()=>{
        $(".menu-box").show()
        setTimeout(()=>{
            $(".menu-box").toggleClass("active")
        },100)
    })

    $(".close-icon i").click(()=>{
        $(".menu-box").removeClass("active")
        setTimeout(()=>{
            $(".menu-box").hide()
        },100)
    })

    $(window).scroll(function () { 
        if ( $(window).scrollTop()>80) {
            $("header").addClass("fixed")
        }else{
            $("header").removeClass("fixed")
        }
    });
    // user 
    $(".user-info").click(()=>{
        $(".menu-user-box").toggleClass("show");
    })
    $(".menu-user li").click(()=>{
        document.cookie="username=;expires=Thu, 01 Jan 1970 00:00:00 UTC"
        document.cookie="email=;expires=Thu, 01 Jan 1970 00:00:00 UTC"
        setTimeout(()=>{
            initUser()
        },500)
    })
}

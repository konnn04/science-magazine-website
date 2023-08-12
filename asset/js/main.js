var Types = ["SCIENTIFIC COMMUNITY","PEOPLE & EVENTS","HEALTH","EARTH","PLANTS & ANIMALS"]

//to top btn
$(window).scroll(function(){
    if($(this).scrollTop() > 100){
        $(".to-top").fadeIn();
    }
    else{
        $(".to-top").fadeOut();
   }
})



async function initHeader() {
    await fetch("./asset/htm/header.htm").then(async (res)=>{
        let text = await res.text()
        $("header").html(text)
    })
}

function err404HTML() {
    return `<section id="err404">
           <div>
            <img src="./img/err/err404.gif" alt="">
           </div>
           <div>
                <h1>404 NOT FOUND!</h1>
                <div><a href="./home.html">Return homepage</a></div>
           </div>
        </section>`
}

function getStringUnixTime(milisecond) {
    return new Date(milisecond).toLocaleString()
}

function getStringUnixFullDay(milisecond) {
    return ((new Date(milisecond).getMonth()+1)+" " +new Date(milisecond).toDateString().slice(4,7)+" "+ new Date(milisecond).getFullYear())
}

function getStringUnixDate(milisecond) {
    return new Date(milisecond).toLocaleDateString()
}

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
//Làm mượt chuyển động + Bù phần khuyết
    // $(window).scroll(function () { 
    //     if ( $(window).scrollTop()>80) {
    //         $("header").addClass("fixed")
    //         $(".body-container").css({
    //             "marginTop":`${$("header").height()}px`
    //         })
    //     }else{
    //         $("header").removeClass("fixed")
    //         $(".body-container").css({
    //             "marginTop":`0`
    //         })
    //     }
    // });
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

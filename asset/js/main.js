var Types = ["SCIENTIFIC COMMUNITY","PEOPLE & EVENTS","HEALTH","EARTH","PLANTS & ANIMALS"]
const KeyWord = ["COVID","HEALTH","EARTH","LGBT"]

const darkContainer = `
--bg:linear-gradient(-90deg, rgba(3637,38,0.9) 40%, rgba(23,24,25,0)),  no-repeat center;
--body:linear-gradient(315deg, #262626 0%, #121212 74%) no-repeat center center fixed;
--theme:#232425;
--theme2:#252525;
font-size: 10px;
--text: #dddddd;
--textOP: #171717;
--text2:#d7d7d7;
--w-cover-maga:350px;  `

const lightContainer = `
--bg:linear-gradient(-90deg, rgba(180, 180, 180, 0.9) 40%, rgb(234, 234, 234)),  no-repeat center;
--body:linear-gradient(315deg, #e8e8e8 0%, #ffffff 74%) no-repeat center center fixed;
--theme:#ffffff;
--theme2:#efefef;
font-size: 10px;
--text: #131313;
--textOP: #ffffff;
--text2:#3c3c3c;
--w-cover-maga:350px;  `

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
        let k=""
        KeyWord.forEach((e,i)=>{
            k+=`<div>${e}</div>`
        })
        $(".kw-box").html(k)
        // Tao darkmode
        
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
        $("#close").fadeIn(500)
        setTimeout(()=>{
            $(".menu-box").toggleClass("active")
        },100)
    })

    //Bị xóa
    // $(".menu").eq(0).click(()=>{
    //     $(".menu-box").show()
    //     setTimeout(()=>{
    //         $(".menu-box").toggleClass("active")
    //     },100)
    // })

    $(".close-icon i").click(()=>{
        $(".menu-box").removeClass("active")
        $("#close").fadeOut(500)
        setTimeout(()=>{
            $(".menu-box").hide()
        },100)
    })

    $("#right .search-icon").click(function(){
        $("#search-box").toggleClass("show")
        $("#right .search-icon").toggleClass("on")
        if($("#search-box").hasClass("show")) {
            $(".search-form input").focus()
        }
    })

    $("#close").click(()=>{
        $("#close").fadeOut(500)
        $("#search-box").removeClass("show")
        $(".menu-box").removeClass("active")
    })

    if (darkCheck) $(".switch-darkmode").addClass("on")
    $(".switch-darkmode").click(()=>{
        $(".switch-darkmode").toggleClass("on")
        if ($(".switch-darkmode").hasClass("on")) {
            localStorage.setItem("theme","dark")
            document.documentElement.style = darkContainer
        }else{
            localStorage.setItem("theme","light")
            document.documentElement.style = lightContainer
        }
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

$(document).ready(function () {
    if (darkCheck) document.documentElement.style = darkContainer
});

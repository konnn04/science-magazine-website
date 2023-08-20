var Types = ["SCIENTIFIC COMMUNITY","PEOPLE & EVENTS","HEALTH","EARTH","BIOLOGY"]
const KeyWord = ["COVID","HEALTH","EARTH","LGBT"]

const darkContainer = `
--bg:linear-gradient(-90deg, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0)),  no-repeat center;
--body:linear-gradient(315deg, #262626 0%, #121212 74%) no-repeat center center fixed;
--theme:#111;
--theme2:#252525;
--theme3:#303030;
font-size: 10px;
--text: #fcfcfc;
--textOP: #171717;
--text2:#d7d7d7;
--w-cover-maga:350px;  `

const lightContainer = `
--bg:linear-gradient(-90deg, rgba(255, 255, 255, 0.9) 40%, rgb(234, 234, 234)),  no-repeat center;
--body:linear-gradient(315deg, #e8e8e8 0%, #ffffff 74%) no-repeat center center fixed;
--theme:#f4f4f4;
--theme2:#fff;
--theme3:#efefef;
font-size: 10px;
--text: #131313;
--textOP: #ffffff;
--text2:#3c3c3c;
--w-cover-maga:350px;  `





async function initHeader(data) {
    await fetch("./asset/htm/header.htm").then(async (res)=>{
        let text = await res.text()
        $("header").html(text)
        let k=""
        KeyWord.forEach((e,i)=>{
            k+=`<div> <a href="./search.html?kw=${e}">${e}</a> </div>`
        })
        $(".kw-box").html(k)
        // Tao List Journals
        k=""
        data.forEach((e,i)=>{
            k+=`<div class="pad-item" title="${e.name}">
            <div class="item-journal">
                <img src="${e.imgCover}" alt="" srcset="">
                <div class="overplay">
                    <a href="./table_of_contents.html?issue=${e.id}">See more</a>
                </div>
            </div>
        </div> `
        })
        $(".subMenuJournal").html($(".subMenuJournal").html()+k)
    })
}

function err404HTML() {
    return `<section id="err404">
           <div>
            <img src="./img/err/err404.gif" alt="">
           </div>
           <div>
                <h1>404 NOT FOUND!</h1>
                <div><a href="./">Return homepage</a></div>
           </div>
        </section>`
}

function getStringUnixTime(milisecond) {
    return new Date(milisecond).toLocaleString()
}

function getStringUnixFullDay(milisecond) {
    return ((new Date(milisecond).getMonth()+1)+" " +new Date(milisecond).toDateString().slice(4,7)+" "+ new Date(milisecond).getFullYear())
}

async function DATA() {
    return await fetch("./asset/data/data.json").then((res)=> res.json())
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

    $(".showJournals").click(()=>{
        $(".sub1").toggleClass("active")
    })
    $("#backOverplay").click(()=>{
        $(".sub1").removeClass("active")
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
    $(".search>button").click(()=>{
        let kw = $(".search-form>.input>input").val().trim()
        if (kw) {
            location.href = "search.html?kw=" + kw
        }
    })
    $(".search-box2>.search-icon").click(()=>{
        let kw = $(".search-box2>input").val().trim()
        if (kw) {
            location.href = "search.html?kw=" + kw
        }
    })
    //Sự kiện enter tìm kiếm
    $(".search-box2 input").on("keydown",(e)=>{
        if (e.keyCode === 13) {
            $(".search-box2>.search-icon").click()
        }
    })

    $(".search-form .input input").on("keydown",(e)=>{
        if (e.keyCode === 13) {
            $(".search>button").click()
        }
    })

    $(".search-bar input").on("keydown",(e)=>{
        if (e.keyCode === 13) {
            $(".searchBtn>button").click()
        }
    })

}

function includesObj(arr,b) {
    let keys = Object.keys(b) 
    for (let i of arr) {
        let k=0
        for (let key of keys) {
            if (i[key] == b[key]) k++;
        }
        if (k == keys.length) return true
    }
    return false
}


//News
function setMeta(data,issue,id,type) {
    $("head").append(`    
  <meta property="og:title" content="${data[issue][type][id].title}">
  <meta property="og:description" content="${data[issue][type][id].subTitle}">
  <meta property="og:image" content="${data[issue][type][id].cover}">
  <meta name="title" content="${data[issue][type][id].title}">
  <meta name="description" content="${data[issue][type][id].subTitle}">
  <meta rel="image_src" href="${data[issue][type][id].cover}">
  <meta property="og:url" content="${location.href}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="SicenceJournal®">`)
}

function symbolToHexHref(text) {
    return text.replace(/[?&=]/g, function(match) {
        if (match === '?') return '%3F';
        if (match === '&') return '%26';
        if (match === '=') return '%3D';
    });
}
//LỆNH DÙNG CHUNG CHO TOÀN TRANG WEB 
$(document).ready(async function () {
    //Khởi tạo header
    await initHeader(await DATA())
    initUser()
    initHeaderEvent()
    //Kiểm tra và gắn bảng màu sáng tối
    if (darkCheck) document.documentElement.style = darkContainer
});

//to top btn
$(window).scroll(function(){
    if($(this).scrollTop() > 100){
        $(".to-top").fadeIn();
    }
    else{
        $(".to-top").fadeOut();
   }
})
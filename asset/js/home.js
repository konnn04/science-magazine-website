var currentRFrame=0
var MagaCover = 0
var setIntervalFrame


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

function initBasicEvent() {
    $(".menu-btn i").click(()=>{
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
}


function initEvent() {
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

function tramformMagaCover(x) {
    let n=$(".maga-cover-box").length
    let f = MagaCover
    MagaCover+=x
    MagaCover=(MagaCover<0)?MagaCover+n:MagaCover;
    MagaCover=(MagaCover>n-1)?MagaCover-n:MagaCover;
    for (let i=0;i<n;i++)   {
        let j = MagaCover+i+1;
        j=(j<1)?j+n:j;
        j=(j>5)?j-n:j;
        $(".maga-cover-box").eq(i).addClass(`active${j}`)
        j = f+i+1;
        j=(j<1)?j+n:j;
        j=(j>5)?j-n:j;        
        $(".maga-cover-box").eq(i).removeClass(`active${j}`)
        
    }
}

function initMagaList() {
    $(".maga-l-arrow").click(()=>{
        tramformMagaCover(1)
    })

    $(".maga-r-arrow").click(()=>{
        tramformMagaCover(-1)        
    })
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

function runFrame(i) {
    //Xóa Interval trước đó nếu có
    clearInterval(setIntervalFrame)
    //Khởi tạo lại thuộc tính của r-frame
    $(".control button").removeClass("active")
    $(".recommended .r-frame").removeClass("show")    
    $(".recommended .r-frame").removeClass("hide")
    currentRFrame=i
    //Gắn class chuyển động cho class đầu tiên
    $(".control button").eq(currentRFrame).addClass("active")
    $(".recommended .r-frame").eq(currentRFrame).removeClass("hide")
    $(".recommended .r-frame").eq(currentRFrame).addClass("show") 
    //Bắt đầu vòng lặp   
    setIntervalFrame= setInterval(()=>{
        //Kiểm tra next nó có lớn hơn length không, có thì gán về 0
        let next=(currentRFrame+1 >= $(".recommended .r-frame").length)?0:currentRFrame+1;
        //tạo hiệu ứng chuyển frame
        //tắt tại current
        $(".control button").eq(currentRFrame).removeClass("active")
        $(".recommended .r-frame").eq(currentRFrame).removeClass("show")
        $(".recommended .r-frame").eq(currentRFrame).addClass("hide")
        //bật tại next
        $(".control button").eq(next).addClass("active")
        $(".recommended .r-frame").eq(next).removeClass("hide")
        $(".recommended .r-frame").eq(next).addClass("show")
        //gán curr = next
        currentRFrame=next
    },5000)
}
//Hàm truyền vào data trả về r-frame tương ứng
function rFrame(data) {
    return `
    <div class="r-frame">
        <div class="info">
            <p class="r-type">${data["type"]}</p>
            <p class="r-title">${data["title"]}</p>
            <P class="r-summary">${cutString(data["summary"],300)}</P>
            <div class="readMore-btn">
                <a href="#"><button type="submit">Read more <i class="fa-solid fa-angles-right"></i></button></a>
            </div>
        </div>
    </div>
    `
}

function initRFrame(data) {
    //tạo chuỗi rỗng chứa html r-frame
    let f=""
    for (let i of data) {
        f+=rFrame(i)
    }
    $(".recommended").html(f+$(".recommended").html())
    //tạo chuỗi rỗng chứa html button
    f=""
    for (let i=0;i<$(".recommended .r-frame").length;i++) {
        $(".r-frame").eq(i).css({
            "background": `linear-gradient(-90deg, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0)), url('${data[i]["img"]}') no-repeat center`,
            "backgroundSize": "cover"
        })
        f+=`<button></button>`
    }
    $(".control").html(f)
    //Tạo hàm chạy r-frame bắt đầu từ currentRFrame
    runFrame(currentRFrame)
    //Gắn sự kiện cho các button khi nhấn vào
    for (let i =0;i<$(".control button").length;i++) {
        $(".control button").eq(i).click(()=>{
            runFrame(i)
        })
    }
}

$(document).ready(async()=>{
    initBasicEvent()

    initUser()

    initEvent()

    initMagaList()

    await fetch("/asset/data/recommend.json")
    .then(async (res)=>{
        let data = await res.json()
        //Khởi tạo r-frame
        initRFrame(data)
    })
})
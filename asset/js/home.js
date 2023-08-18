var currentRFrame=0
var MagaCover = 0
var setIntervalFrame
var cdType = false

function checkTypeEvent(i,temp) {
    if (temp<= -1*( $(".all-news-items").eq(i).width() - $(document).width())) {
        $(".r-arrow").eq(i).css({"opacity":"0"})
    }else{
        $(".r-arrow").eq(i).css({"opacity":"1"})
    }
    if (temp>=-50) {
        $(".l-arrow").eq(i).css({"opacity":"0"})
    }else{
        $(".l-arrow").eq(i).css({"opacity":"1"})
    }
}

function initTypeEvent() {
    $(".l-arrow").css({"opacity":"0"})
    for (let i=0;i<$(".all-news-items").length;i++) {
        $(".r-arrow").eq(i).click(()=>{
            if (cdType) return
            let temp = parseInt($('.all-news-items').eq(i).css('transform').split(',')[4])
            if (temp<= -1*( $(".all-news-items").eq(i).width() - $(document).width())) return
            temp=temp - $(".news").width()
            $(".all-news-items").eq(i).css({
                "transform":`translateX(${temp}px)`
            })
            //Kiem tra lai
            checkTypeEvent(i,temp)
            //Cooldown
            cdType=true
            setTimeout(()=>{
                cdType=false
            },300)
        })
        $(".l-arrow").eq(i).click(()=>{  
            if (cdType) return
            let temp = parseInt($('.all-news-items').eq(i).css('transform').split(',')[4])
            if (temp>=-50) return
            temp=temp + $(".news").width()
            $(".all-news-items").eq(i).css({
                "transform":`translateX(${temp}px)`
            })
            //Kiem tra lai
            checkTypeEvent(i,temp)
            //Cooldown
            cdType=true
            setTimeout(()=>{
                cdType=false
            },300)
        })
    }
    
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
        j=(j>n)?j-n:j;
        $(".maga-cover-box").eq(i).addClass(`active${j}`)
        j = f+i+1;
        j=(j<1)?j+n:j;
        j=(j>n)?j-n:j;        
        $(".maga-cover-box").eq(i).removeClass(`active${j}`)        
    }


}

function initMagaEvent() {
    $(".maga-l-arrow").click(()=>{
        tramformMagaCover(1)
        $(".maga-box .overplay>a").attr("href","./table_of_contents.html?issue=" + $(".maga-cover-box.active3").attr("content"))
    })

    $(".maga-r-arrow").click(()=>{
        tramformMagaCover(-1)       
        $(".maga-box .overplay>a").attr("href","./table_of_contents.html?issue=" + $(".maga-cover-box.active3").attr("content")) 
    })

    $(".maga-box .overplay>a").attr("href","./table_of_contents.html?issue=" + $(".maga-cover-box.active3").attr("content"))
}

function runFrame(i) {
    //Xóa Interval trước đó nếu có
    clearInterval(setIntervalFrame)
    //Khởi tạo lại thuộc tính của r-frame
    $(".control button").removeClass("active")
    $(".recommended .r-frame").removeClass("show")    
    $(".recommended .r-frame").addClass("hide")
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
function rFrame(data,issueString,id) {
    return `
    <div class="r-frame" img="${data["cover"]}">
        <div class="info">
            <p class="r-type">${data["type"]}</p>
            <p class="r-title">${cutString(data["title"],60)}</p>
            <P class="r-summary">${cutString(data["content"][0]["text"],300)}</P>
            <div class="readMore-btn">
                <a href="./news.html?issue=${issueString}&id=${id}"><button type="submit">Read more <i class="fa-solid fa-angles-right"></i></button></a>
            </div>
        </div>
    </div>
    `
}

function initRFrame(data) {
    let f=""
    for (let i=data[data.length-1]["news"].length-1;i>=0;i--) {
        f+=rFrame(data[data.length-1]["news"][i],data[data.length-1]["id"],i)
    }
    //tạo chuỗi rỗng chứa html r-frame
    $(".recommended").html(f+$(".recommended").html())
    //tạo chuỗi rỗng chứa html button
    f=""
    for (let i=0;i<$(".recommended .r-frame").length;i++) {
        $(".r-frame").eq(i).css({
            "background": `linear-gradient(-90deg, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0)), url('${$(".r-frame").eq(i).attr("img")}') no-repeat center`,
            "backgroundSize": "cover"
        })
        f+=`<button></button>`
    }
    $(".control").html(f)
    //Tạo hàm chạy r-frame bắt đầu từ currentRFrame
    
}

let startXRFrame = 0
let deltaXRFrame=0
function initEventRFrame() {
    runFrame(currentRFrame)
    //Gắn sự kiện cho các button khi nhấn vào
    for (let i =0;i<$(".control button").length;i++) {
        $(".control button").eq(i).click(()=>{
            runFrame(i)
        })
    }
    let recommended = document.querySelector(".recommended")
    recommended.addEventListener("touchstart", function(event) {
        startXRFrame = event.touches[0].clientX;
    });
    recommended.addEventListener("touchmove", function(event) {
        if (!startXRFrame) {
            return;
        }
        deltaXRFrame = event.touches[0].clientX - startXRFrame;
                
    })
    recommended.addEventListener("touchend", function(event){
        let max = $(".recommended .r-frame").length
        if (Math.abs(deltaXRFrame) >= 100) {
            if (deltaXRFrame > 0) {
                // Vuốt phải
                currentRFrame=(currentRFrame-1<0)?max-1:currentRFrame-1
                runFrame(currentRFrame)
            } else {
                // Vuốt trái
                currentRFrame=(currentRFrame+1>=max)?0:currentRFrame+1
                runFrame(currentRFrame)
            }
        }   
    })
}
//Tạo các bìa Magaa

function initMagaList(data) {
    let n = data.length
    let h = ""
    for (let i=0;i<n;i++) {
        h+=`
        <div class="maga-cover-box active${i+1}" content="${data[i].id}">
            <div class="maga-cover">
                <img src="${data[i].imgCover}" alt="">
            </div>
        </div>`
    }
    h+=`<div class="overplay">
            <a href="#">
                <div>See more!</div>
            </a>
        </div>`
    $(".maga-box").html(h)
}

//Tạo các boxbar
function initBoxType(data) {
    let typeBoxContent ={}
    for (let type of Types) {
        typeBoxContent[type]=""
    }
    for (let i=data.length-1;i>=0;i--) {
        for (let j=data[i]["news"].length-1;j>=0;j--) { 
            for (let type of Types) {
                if (data[i]["news"][j]["type"]==type) {
                    typeBoxContent[type]+=
                    `<div class="news">
                            <div class="news-wrapper">
                                <div class="news-img">
                                    <a href="./news.html?issue=${data[i]["id"]}&id=${j}">
                                    <img src="${data[i]["news"][j]["cover"]}" alt="" srcset=""></a>
                                </div>
                                <span>${getStringUnixDate(data[i]["news"][j]["time"])}</span>
                                <h4>
                                    <a href="./news.html?issue=${data[i]["id"]}&id=${j}">
                                    ${data[i]["news"][j]["title"]}
                                    </a>
                                </h4>
                                <span>By ${data[i]["news"][j]["author"][0]["name"]}</span>
                            </div>                            
                    </div>`
                }
            }
        }
    }
    //?issue== & id
    for (let type of Types) {
        $(".category").html($(".category").html()+
        `<div class="t-container">
        <h3 class="type">${type}</h3>
        <div class="t-wrapper">
            <div class="r-arrow"></div>
            <div class="l-arrow"></div>
            <div class="all-news-items">
                ${typeBoxContent[type]}                   
            </div>
        </div>
    </div>`)
    }   
}

function fixedRFrame() {
    //chinh font chu
    $(".recommended").css({
        "fontSize":`${($(".r-frame").width()/960)*10}px`
    })
    $(window).resize(()=>{
        $(".recommended").css({
            "fontSize":`${($(".r-frame").width()/960)*10}px`
        })
    })
}

function initResearchItems(data) {
    let h =""
    let n = 6
    for (let i = data.length-1;i>=0;i--) {
        for (let j=data[i]["researchs"].length-1;j>=0;j--) {
            if (n<=0) {
                $(".researchs").html(h)
                return
            }else{
                n--
                h+=`
            <div class="item-research">
                <span>SCIENCE</span>
                <span>${getStringUnixDate(data[i]["researchs"][j]["time"])}</span>
                <h4>
                    <a href="./research.html?issue=${data[i].id}&id=${j}">
                        ${data[i]["researchs"][j]["title"]}
                    </a>
                </h4>
                <span>${data[i]["researchs"][j]["authors"][0]["name"]}</span>
            </div>`
            }
            
            
        }
    }
    
}


$(document).ready(async()=>{
    //init header
    await initHeader()
    //
    initUser()
    initHeaderEvent()    
    await fetch("./asset/data/data.json")
    .then(async (res)=>{
        let data = await res.json()
        //Khởi tạo r-frame
        initMagaList(data)
        initRFrame(data)
        // initNewsMain(data)
        initBoxType(data)
        initResearchItems(data)
        //Meta
    })
    fixedRFrame()
    initEventRFrame() 
    initMagaEvent()
    initTypeEvent()
})
var currentRFrame=0
var MagaCover = 0
var setIntervalFrame
var cdType = false

function initTypeEvent() {
    for (let i=0;i<$(".all-new-items").length;i++) {
        $(".r-arrow").eq(i).click(()=>{
            if (cdType) return
            let temp = parseInt($('.all-new-items').eq(i).css('transform').split(',')[4])
            if (temp<= -1*( $(".all-new-items").eq(i).width() - $(document).width())) return
            $(".all-new-items").eq(i).css({
                "transform":`translateX(${temp - $(".new").width()}px)`
            })
            cdType=true
            setTimeout(()=>{
                cdType=false
            },300)
        })
        $(".l-arrow").eq(i).click(()=>{  
            if (cdType) return
            let temp = parseInt($('.all-new-items').eq(i).css('transform').split(',')[4])
            if (temp>=-50) return
            $(".all-new-items").eq(i).css({
                "transform":`translateX(${temp + $(".new").width()}px)`
            })
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
    initUser()
    initHeaderEvent()
    
    initMagaList()
    initTypeEvent()
    await fetch("/asset/data/recommend.json")
    .then(async (res)=>{
        let data = await res.json()
        //Khởi tạo r-frame
        initRFrame(data)
    })
})
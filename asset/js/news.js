let popupTemp = []

function initPath(data,issue,id) {
    $(".n-path-box").html(`
    <span> <a href="./">HOME</a> </span>
    <span>></span>
    <span> <a href="./table_of_contents.html?issue=${data[issue].id}">${data[issue].name.toUpperCase()}</a></span>
    <span>></span>
    <span> <a href="./search.html?type=news">NEWS</a> </span>
    <span>></span>
    <span>${data[issue]["news"][id]["title"].toUpperCase()}`)
}

function initNewsHeaderBox(data,issue,id) {
    $(".n-header-box").html($(".n-header-box").html() + `
    <h6><a href="./search.html?kw=${data[issue]["news"][id]["type"]}">
        ${data[issue]["news"][id]["type"]}
    </a></h6>
    <h1>${data[issue]["news"][id]["title"]}</h1>
    <h5>${data[issue]["news"][id]["subTitle"]}</h5>
    <hr>
    <span> ${getStringUnixTime(data[issue]["news"][id]["time"])} • <a href="./search.html?kw=${data[issue]["news"][id]["author"][0]["name"]}">${data[issue]["news"][id]["author"][0]["name"].toUpperCase()}</a></span>
    <div class="n-img-box">
        <img src="${data[issue]["news"][id]["cover"]}" alt="" srcset="">
        <span>${data[issue]["news"][id]["desCover"]}</span>
    </div>
    `)
}

function initNewsIssueDetailBox(data,issue,id) {
    $(".n-issue-detail-box").html(`
    <div class="n-cover-issue-img">
        <img src="${data[issue]["imgCover"]}" alt="" srcset="">
        <div class="n-issue-detail-overplay">
            <a href="./table_of_contents.html?issue=${data[issue].id}">
                <div class="n-issue-detail-see-detail">
                    See more!
                </div>
            </a>
        </div>
    </div>
    <div class="n-cover-issue-info">
        <div>
        A version of this story appeared in Sicence Journal, issue ${data[issue]["id"]}.
        </div>
        <a href="#">
            <div class="icon-pdf">                                
                <i class="fa-solid fa-file-pdf"></i>
            </div>
        </a>
    </div>
    `)
}

function HTMLContent(type,dataHTML) {
    switch (type) {
        case "p":{
            return `<p>${dataHTML["text"]}</p> <br>`
        }
        case "h1":{
            return `<h1>${dataHTML["text"]}</h1> <br>`
        }
        case "h2":{
            return `<h2>${dataHTML["text"]}</h2> <br>`
        }
        case "h3":{
            return `<h3>${dataHTML["text"]}</h3> <br>`
        }
        case "h4":{
            return `<h4>${dataHTML["text"]}</h4> <br>`
        }
        case "h5":{
            return `<h5>${dataHTML["text"]}</h5> <br>`
        }
        case "h6":{
            return `<h6>${dataHTML["text"]}</h6> <br>`
        }
        case "tus":{
            return `
            <h1 style="text-align: center;color:#ffcc00;font-size:10rem;height:6rem">‘‘</h1>
            <h2 style="text-align: center;font-family: 'Montserrat', sans-serif;
            ">‘‘${dataHTML["text"]}’’</h2> <br>
            <h6 style="text-align: center;color:#444;width:70%;margin-left:auto">${dataHTML["author"]}</h6>`
        }
        case "img":{
            return `<div class="n-img-box">
                <img src="${dataHTML["src"]}" alt="" srcset="">
                <span>${dataHTML["desp"]}</span>
            </div>
            <br>`
        }
        case "video":{
            return `<div class="n-video-box">
                <video src="${dataHTML["src"]}" controls></video>
                <span>${dataHTML["desp"]}</span>
            </div>
            <br>`
        }
        default:{
            return `<h1>ERROR CONTENT</h1>`
        }
    }
}

function initNewsContent(data,issue,id) {
    let HTML = "<br>"
    for (let i of data[issue]["news"][id]["content"]) {
        HTML+=HTMLContent(i["type"],i)
    }
    $(".n-content-box").html(HTML)
}

function initNewsTagBox(data,issue,id) {
    for (let i of data[issue]["news"][id]["tags"]) {
        $(".tag-box").html(  $(".tag-box").html() +`<a href="./search.html?kw=${i}"> <span>${i.toUpperCase()}</span> </a>`)
    }
}

function initNewsAuthorBox(data,issue,id) {
    let HTML = ``
    for (let i of data[issue]["news"][id]["author"]) {
        let social=""
        if (i["social"][0]) {
            social+=`<a href="${i["social"][0]}"><i class="fa-solid fa-envelope"></i></a>`
        }
        if (i["social"][0]) {
            social+=`<a target="_blank" href="${i["social"][1]}"> <i class="fa-brands fa-twitter"></i> </a>`
        }
        
        HTML +=`<div class="info-item-box">
                    <div class="info-avt">
                        <img src="${i["avt"] || "https://img.freepik.com/free-icon/user_318-180888.jpg"}" alt="" srcset="">
                    </div>
                    <div class="info-text">
                        <h5> <a href="./search.html?kw=${i["name"]}">${i["name"]} ${social}</a></h5>
                        <span>${i["job"]}</span>
                        <p>${i["bio"]}</p>
                    </div>
                </div>`
    }
    $(".info-box").html($(".info-box").html() + HTML)
}

function initNextNews(data,issue,id) {
    let count = 3
    let i=issue
    let j=id+1
    for (i;i<data.length;i++) {
        for (j;(j<data[i]["news"].length && count>0);j++) {
            if (popupTemp.length<1 && !includesObj(popupTemp,{"i":i,"id":j})) popupTemp.push({"i":i,"id":j}) //NEXT POPUP
            count--
                $(".n-rside-item-box").eq(1).html(
                    $(".n-rside-item-box").eq(1).html()+
                    `<div class="n-rside-item">
                            <div class="n-rside-item-img">
                                <a href="./news.html?issue=${data[i]["id"]}&id=${j}">
                                    <img src="${data[i]["news"][j]["cover"]}" alt="" srcset="">
                                </a>
                            </div>
                            <div class="n-rside-item-text">
                                <span>${getStringUnixDate(data[i]["news"][j]["time"])}</span>
                                <span>${data[i]["news"][j]["author"][0]["name"]}</span>
                                <a href="./news.html?issue=${data[i]["id"]}&id=${j}">
                                    <h3>${cutString(data[i]["news"][j]["title"],60)}</h3>
                                </a>
                            </div>
                        </div>`
                )           
        }
        j=0
    }    
    if (count==3) {$(".n-next-box").css({"display":"none"})}

}

function initMoreNews(data,issue,id) {
    let count=3
    for (let j=0;(j<data[issue]["news"].length && count>0);j++) {
        if (id != j) {
            count--
            $(".n-more-items-box").html(
                $(".n-more-items-box").html()+
                `<div class="n-more-items">
                <div class="more-img">
                    <a href="./news.html?issue=${data[issue]["id"]}&id=${j}">
                        <img src="${data[issue]["news"][j]["cover"]}" alt="" srcset="">
                    </a>
                </div>
                <div class="more-text">
                    <span>${getStringUnixDate(data[issue]["news"][j]["time"])}</span>
                    <a href="./news.html?issue=${data[issue]["id"]}&id=${j}">
                        <h6>${cutString(data[issue]["news"][j]["title"],60)}</h6>
                    </a>
                    <span>BY ${data[issue]["news"][j]["author"][0]["name"]}</span>   
                </div>                       
            </div>`
            )
        }
    }
    
}

function initSameTopic(data,issue,id) {
    let topic = data[issue]["news"][id]["type"].toUpperCase()
    let count = 3
    for (let i=0;i<data.length;i++) {
        for (let j=0;(j<data[i]["news"].length && count>0);j++) {
            if (data[i]["news"][j]["type"].toUpperCase() === topic && !(issue==i && j==id)) {
                count--
                if (popupTemp.length<2&& !includesObj(popupTemp,{"i":i,"id":j})) popupTemp.push({"i":i,"id":j}) //NEXT POPUP
                $(".n-rside-item-box").eq(0).html(
                    $(".n-rside-item-box").eq(0).html()+
                    `<div class="n-rside-item">
                            <div class="n-rside-item-img">
                                <a href="./news.html?issue=${data[i]["id"]}&id=${j}">
                                    <img src="${data[i]["news"][j]["cover"]}" alt="" srcset="">
                                </a>
                            </div>
                            <div class="n-rside-item-text">
                                <span>${getStringUnixDate(data[i]["news"][j]["time"])}</span>
                                <span>${data[i]["news"][j]["author"][0]["name"]}</span>
                                <a href="./news.html?issue=${data[i]["id"]}&id=${j}">
                                    <h3>${cutString(data[i]["news"][j]["title"],60)}</h3>
                                </a>
                            </div>
                        </div>`
                )
            }
        }
    }
    if (count==3) {$(".n-topic-box").css({"display":"none"})}
}

function initRecommend(data,issue,id) {
    let rand = []
    // let j=3
    while (rand.length<3){
        let ok=true
        let randIssue = Math.floor(Math.random() * (data.length))
        let randID = Math.floor(Math.random() * (data[randIssue]["news"].length))
        for (let i of rand) {
            if ((i["issue"] == randIssue && i["id"] == randID)) {
                ok=false
                break
            }
        }
        if (ok) {
            if (popupTemp.length<3 && !includesObj(popupTemp,{"i":randIssue,"id":randID})) popupTemp.push({"i":randIssue,"id":randID}) //NEXT POPUP
            rand.push({
                "issue":randIssue,
                "id":randID
            })
            $(".n-rside-item-box").eq(2).html(
                $(".n-rside-item-box").eq(2).html()+
                `<div class="n-rside-item">
                        <div class="n-rside-item-img">
                            <a href="./news.html?issue=${data[randIssue]["id"]}&id=${randID}">
                                <img src="${data[randIssue]["news"][randID]["cover"]}" alt="" srcset="">
                            </a>
                        </div>
                        <div class="n-rside-item-text">
                            <span>${getStringUnixDate(data[randIssue]["news"][randID]["time"])}</span>
                            <span>${data[randIssue]["news"][randID]["author"][0]["name"]}</span>
                            <a href="./news.html?issue=${data[randIssue]["id"]}&id=${randID}">
                                <h3>${cutString(data[randIssue]["news"][randID]["title"],60)}</h3>
                            </a>
                        </div>
                    </div>`
            )
        }
    }
}

//Tạo link share
function initNewsShare(data,issue,id) { 
    $(".n-share-box a").eq(0).attr("href",`https://www.facebook.com/sharer/sharer.php?u=`+symbolToHexHref(location.href))
    $(".n-share-box a").eq(1).attr("href",`https://twitter.com/intent/tweet?url=`+symbolToHexHref(location.href))
    $(".n-share-box a").eq(2).attr("href",`https://www.linkedin.com/sharing/share-offsite/?url=`+symbolToHexHref(location.href))
    $(".n-share-box a").eq(3).attr("href",`https://www.reddit.com/submit?url=`+symbolToHexHref(location.href))
    $(".n-share-box a").eq(4).attr("href",`mailto:?subject=Chia%20s%E1%BA%BB%20trang%20web&body=Xin%20ch%C3%A0o,%20m%C3%B4i%20b%E1%BA%A1n%20h%C3%A3y%20ki%E1%BB%83m%20tra%20trang%20web%20n%C3%A0y:%20$`+symbolToHexHref(location.href))
}

function initNextPopUp(data,issue,id) {
    popupTemp.forEach((e,i)=>{
        $(".pop-up-listbox").html(
            $(".pop-up-listbox").html()+
            `<div class="pop-up-item">
                    <div class="pop-up-item-img">
                        <a href="./news.html?issue=${data[e.i]["id"]}&id=${e.id}">
                            <img src="${data[e.i]["news"][e.id]["cover"]}" alt="" srcset="">
                        </a>
                    </div>
                    <div class="pop-up-item-text">
                        <span>${getStringUnixDate(data[e.i]["news"][e.id]["time"])}</span>
                        <span>${data[e.i]["news"][e.id]["author"][0]["name"]}</span>
                        <a href="./news.html?issue=${data[e.i]["id"]}&id=${e.id}">
                            <h3>${cutString(data[e.i]["news"][e.id]["title"],60)}</h3>
                        </a>
                    </div>
                </div>`
        )
    })
}

function initScrollRecommend(){
    $(window).scroll(function(){
        let top = $(this).scrollTop() 
        if (top > $(".tag-box").offset().top - $(window).height() -100 && top < $("footer").offset().top - $(window).height()) {
            $(".pop-up-recomend").fadeIn(200)
        }else{
            $(".pop-up-recomend").fadeOut(200)
        }
    })
}

async function getNews(obj) {
    
    let id=obj.id
    let issue = 0
    await fetch("./asset/data/data.json").then(async (res)=>{
        let check = false
        let data = await res.json()
        //Tao header
        await initHeader(data)
        //Chay cac thanh phan khac
        for (let i=0;i<data.length;i++) {
            if (data[i]["id"]===obj.issue && id >=0 && id<data[i]["news"].length) {
                issue=i
                check=true
                $("title").text(data[issue]["news"][id]["title"])
                initPath(data,issue,id)
                initNewsHeaderBox(data,issue,id)
                initNewsIssueDetailBox(data,issue,id)
                initNewsShare(data,issue,id)
                initNewsContent(data,issue,id)
                initNewsTagBox(data,issue,id)
                initNewsAuthorBox(data,issue,id)

                initMoreNews(data,issue,id)   //Mới nhất (hoặc chưa đọc)

                initNextNews(data,issue,id)
                initSameTopic(data,issue,id) //Cùng chủ đề (Type)
                initRecommend(data,issue,id)//Random

                initNextPopUp(data,issue,id)

                initScrollRecommend()
                //Meta
                setMeta(data,issue,id,"news")
            }
        }
        if (!check) {
            $(".body-container").html(err404HTML())
        }
        
    }).catch(err =>{
        console.log(err)
        alert("Lỗi tải trang!")
    })
}

$(document).ready(async()=> {
    // initKeyWordsHeader()
    const urlParams = new URLSearchParams(window.location.search);
    const newsPath = {
        "issue":urlParams.get('issue'),
        "id":parseInt(urlParams.get('id')),        
    }
    
    await getNews(newsPath)
    initUser()
    initHeaderEvent()
});
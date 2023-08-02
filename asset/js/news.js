function initPath(data,issue,id) {
    $(".n-path-box").html(`
    <span>Home</span>
    <span>></span>
    <span>Issue ${data[issue]["id"]}</span>
    <span>></span>
    <span>News</span>
    <span>></span>
    <span>${data[issue]["news"][id]["title"]}`)
}

function initNewsHeaderBox(data,issue,id) {
    $(".n-header-box").html($(".n-header-box").html() + `
    <h6>${data[issue]["news"][id]["type"]}</h6>
    <h1>${data[issue]["news"][id]["title"]}</h1>
    <h5>${data[issue]["news"][id]["subTitle"]}</h5>
    <hr>
    <span> ${getStringUnixTime(data[issue]["news"][id]["time"])} • ${data[issue]["news"][id]["author"][0]["name"].toUpperCase()}</span>
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
            <div class="n-issue-detail-see-detail">
                See more!
            </div>
        </div>
    </div>
    <div class="n-cover-issue-info">
        <div>
        A version of this story appeared in Sicence Journal, issue ${data[issue]["id"]}.
        </div>
        <a href="#${""}">
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
        $(".tag-box").html(  $(".tag-box").html() +`<a href="#"> <span>${i.toUpperCase()}</span> </a>`)
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
                        <h5> ${i["name"]} ${social}</h5>
                        <span>${i["job"]}</span>
                        <p>${i["bio"]}</p>
                    </div>
                </div>`
    }
    $(".info-box").html($(".info-box").html() + HTML)
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
}

function initRecommend(data,issue,id) {
    let rand = []
    let j=3
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
            rand.push({
                "issue":randIssue,
                "id":randID
            })
            $(".n-rside-item-box").eq(1).html(
                $(".n-rside-item-box").eq(1).html()+
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


async function getNews(obj) {
    let id=obj.id
    let issue = 0
    await fetch("/asset/data/data.json").then(async (res)=>{
        let check = false
        let data = await res.json()
        for (let i=0;i<data.length;i++) {
            if (data[i]["id"]===obj.issue && id >=0 && id<data[i]["news"].length) {
                issue=i
                check=true
                initPath(data,issue,id)
                initNewsHeaderBox(data,issue,id)
                initNewsIssueDetailBox(data,issue,id)
                initNewsContent(data,issue,id)
                initNewsTagBox(data,issue,id)
                initNewsAuthorBox(data,issue,id)
                initMoreNews(data,issue,id)   //Mới nhất (hoặc chưa đọc)
                initSameTopic(data,issue,id) //Cùng chủ đề (Type)
                initRecommend(data,issue,id)//Random
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
    const urlParams = new URLSearchParams(window.location.search);
    const newsPath = {
        "issue":urlParams.get('issue'),
        "id":parseInt(urlParams.get('id')),        
    }
    initUser()
    initHeaderEvent()
    await getNews(newsPath)
});
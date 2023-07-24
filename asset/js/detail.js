function initPath(data,issue,type,id) {
    $(".n-path-box").html(`
    <span>Home</span>
    <span>></span>
    <span>Issue ${data[issue]["id"]}</span>
    <span>></span>
    <span>News</span>
    <span>></span>
    <span>${data[issue]["news"][id]["title"]}`)
}

function initNewsHeaderBox(data,issue,type,id) {
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

function initNewsIssueDetailBox(data,issue,type,id) {
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

function initNewsContent(data,issue,type,id) {
    let HTML = "<br>"
    for (let i of data[issue]["news"][id]["content"]) {
        HTML+=HTMLContent(i["type"],i)
    }
    $(".n-content-box").html(HTML)
}

function initNewsTagBox(data,issue,type,id) {
    for (let i of data[issue][type][id]["tags"]) {
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


async function getNews(issue,type,id) {
    await fetch("/asset/data/data.json").then(async (res)=>{
        let data = await res.json()
        initPath(data,issue,type,id)
        initNewsHeaderBox(data,issue,type,id)
        initNewsIssueDetailBox(data,issue,type,id)
        initNewsContent(data,issue,type,id)
        initNewsTagBox(data,issue,type,id)
        initNewsAuthorBox(data,issue,id)
    }).catch(err =>{
        console.log(err)
        alert("Lỗi tải trang!")
    })
}

$(document).ready(async()=> {
    initUser()
    initHeaderEvent()
    await getNews(0,"news",2)
});
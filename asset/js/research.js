function initPath(data,issue,id) {
    $(".r-path-box").html(`
    <span> <a href="./">HOME</a> </span>
    <span>></span>
    <span> <a href="./table_of_contents.html?issue=${data[issue].id}">${data[issue].name.toUpperCase()}</a></span>
    <span>></span>
    <span> <a href="./search.html?type=research">RESEARCH</a> </span>
    <span>></span>
    <span>${data[issue]["researchs"][id]["title"].toUpperCase()}`)
}

function initHeaderContent(data,issue,id) {
    //Chủ đề 1
    $(".sub-header").html(`
    <span class="type">
        <a href="./search.html?type=research">RESEARCH ARTICLE</a>
    </span>
    <span class="type">
        <a href="./search.html?kw=${data[issue]["researchs"][id]["type"]}" >${data[issue]["researchs"][id]["type"]}</a>
    </span>
    `)
    //Tiêu đề 2
    $(".r-header h1").html(`<h1>${data[issue]["researchs"][id]["title"]}</h1>`)
    //Các tác giả 3
    let h=""
    for (let i=0; i<6;i++) {
        let name =data[issue]["researchs"][id]["authors"][i]["name"]
        h+=`
        <div class="author-items">
            <a href="./search.html?kw=${name}">${name}</a> 
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/ORCID_iD.svg/768px-ORCID_iD.svg.png" alt="" srcset="">,
        </div>`
    }
    $(".r-author-box").html(`${h} + <button id="showmore-author">+${data[issue]["researchs"][id]["authors"].length - 6} Authors</button>`)
    $(".r-author-box button").click(()=>{
        for (let i=0; i<data[issue]["researchs"][id]["authors"].length; i++) {
            let name =data[issue]["researchs"][id]["authors"][i]["name"]
            h+=`
            <div class="author-items">
                <a href="./search.html?kw=${name}">${name}</a> 
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/ORCID_iD.svg/768px-ORCID_iD.svg.png" alt="" srcset="">,
            </div>`
        }
        $(".r-author-box").html(`${h} <button id="showmore-author">Show fewer</button>`)
        $(".r-author-box button").click(()=>{
            initHeaderContent(data,issue,id)
        })
    })
    //Hiển thị mục bìa và ngày ra mắt (thiếu ngày nên để tạm ngày của tạp chí)
    $(".r-release-date").html(`
    <span>${getStringUnixTime(data[issue]["publicationDate"])}</span>
    <span> • </span>
    <span>ISSUE ${data[issue]["id"]}</span>
    `)
    //Tạo sự kiện menu
    $(".r-menu>.btn").click(()=>{
        $(".r-menu").toggleClass("active");
    })
    //Sửa lỗi Header che tiêu đề
    $(".menu-read a").click(()=>{
       setTimeout(()=>{
        $("html,body").animate({scrollTop:$(window).scrollTop() - 120},'slow');
       },100)

    })
}
//Tạo Summary và Abstract
function initNewsContent(data,issue,id) {
    //Tạo đoạn tóm tắt
    $("#summary p").text(data[issue]["researchs"][id]["summary"])
    //Tạo đề abstract
    $("#abstract p").text(data[issue]["researchs"][id]["abstract"])
    //
    
}

//Tạo Box xem trước pdf?
function initPDFView(data,issue,id) {
    if (getCookie("email") && getCookie("username")) {
        $(".pdf-view-box").html(`

        <h2>You have permission to view this document!</h2>
        <div><button>OPEN NOW?</button></div>`)

        $(".pdf-view-box>div>button").click(()=>{
            $(".pdf-view-box").html(`
            <iframe src="https://drive.google.com/file/d/1yG32aZGfCOl1W80vxJj74SB0l5v4Ll8I/preview" width="100%" allow="autoplay"></iframe>`)
        })

    }else{
        $(".pdf-view-box").html(`
        <h1><i class="fa-solid fa-lock"></i></h1>
        <h2>You do not have access!</h2>
        <p>You need permission from the author to view it in full. To gain access, please login!</p>
        <div class="login">
            <a href="./login.html" id="loginBtn"><button>Login</button></a>
        </d`)
    }
}
//Tạo phần tải tài liệu
function initDownloadDoc(data,issue,id) {
    if (getCookie("email") && getCookie("username")) {
        let item ="<h4>This PDF file includes:</h4>"
        for (let i of data[issue]["researchs"][id]["file"]) {
            if (i["type"] == "pdf") {
                let k=""
                for (let j of i["info"]) {
                    k+=`<p>${j}</p>`
                }
                k+=`<a href="${i["src"]}" target="_blank" rel="noopener noreferrer"> <button>DOWNLOAD</button> </a>
                <span> ${i["size"]} </span>`
                item+=`<div class="doc-item-box">${k}</div>`
            }
        }        
        $(".doc-box-download").html(`
        <h2>Supplementary Materials</h2>
        ${item}`)

    }else{
        $(".doc-box-download").html(`
        <h2>Supplementary Materials</h2>
        <h4><i class="fa-solid fa-lock"></i> Please login to see this content!</h4>`)
    }
}

//Refs and Notse
function initRefsAndNotes(data,issue,id) {
    let RaN = data[issue]["researchs"][id]["RaN"]
    for (let i=0;i<RaN.length;i++) {
        let content =""
        for (let j of RaN[i]["text"]) {
            if (j.includes("http://") || j.includes("https://")) {
                content+=` <a href="${j}" target="_blank" rel="noopener noreferrer">${j}</a>`
            }else{
                content+=(j+" ")
            }
        }
        $(".ref-and-note-box").html($(".ref-and-note-box").html() + 
        `<div class="ref-item">
            <p>${i+1}</p>
            <p>${content}</p>
        </div>`)
    }
    $(".ref-and-note-box").html($(".ref-and-note-box").html() +
    `<div class="showmore-overlay">
        <button>SHOW MORE</button>
    </div>
    <div class="hide-overlay">
        <button>SHOW FEWER</button>
    </div>`)
    //
    $(".showmore-overlay").click(()=>{
        $(".ref-and-note-box").removeClass("lite")
    })
    //
    $(".hide-overlay").click(()=>{
        $(".ref-and-note-box").addClass("lite")
    })
    
}

//tạo Thanh rmenu
function initDataRMenu(data,issue,id) {
    $(".r-menu>.tool>.count-download").html(`
    <i class="fa-solid fa-download"></i>
    <span>${data[issue]["researchs"][id]["downloaded"]}</span>`)
    $(".r-menu>.tool>a").click(()=>{
        setTimeout(()=>{
            $("html,body").animate({scrollTop:$(window).scrollTop() - 100},'slow');
           },100)
    })
    
}
//Tạo các mục ở rside
function initRSide(data,issue,id) {
    //Tao CURRENT ISSUE
    $(".current-issue-box > .cover-box ").html(`<img src="${data[issue]["imgCover"]}" alt="" srcset="">`)
    let k=0
    for (let i=0;i<3+k;i++) {
        if (i==id) {
            k++
            continue
        }
        $(".other-research-box").html(
            $(".other-research-box").html() + `
            <div class="other-research-item">
                <h6>
                    <a href="./research.html?issue=${data[issue]["id"]}&id=${i}">
                    ${data[issue]["researchs"][i]["title"]}
                    </a>
                </h6>
                <span>BY ${data[issue]["researchs"][i]["authors"][0]["name"].toUpperCase()} ET AL.</span>
            </d`
        )
    }
    $(".other-research-box").html(
        $(".other-research-box").html() + `
        <button>
        <a href="./table_of_contents.html?issue=${data[issue].id}">
            TABLE OF CONTENTS
            <i class="fa-solid fa-chevron-right"></i>
        </a>
        </button>`)
    //tạo lastest news
    for (let i=0;i<3;i++) {
        $(".last-news-list").html($(".last-news-list").html() + `
        <div class="items">
        <span>NEWS</span>
        <span>${getStringUnixDate(data[issue]["news"][i]["time"])}</span>
        <h6>
            <a href="./news.html?issue=${data[issue]["id"]}&id=${i}">
                ${data[issue]["news"][i]["title"]}
            </a>
        </h6>
        </div>
        `)
    }
}
    


//Làm mượt chuyển động + Bù phần khuyết
$(window).scroll(function () { 
    if ($(window).scrollTop() -  $(".content-box").eq(0).offset().top > -140) {
        $(".r-menu").addClass("fixed")
        $(".content-box").eq(0).css({
        })
    }else{
        $(".r-menu").removeClass("fixed")
        $(".content-box").eq(0).css({
        })
    }
});

function initResearchShare() {
    $(".share-box a").eq(0).attr("href",`https://www.facebook.com/sharer/sharer.php?u=`+symbolToHexHref(location.href))
    $(".share-box a").eq(1).attr("href",`https://twitter.com/intent/tweet?url=`+symbolToHexHref(location.href))
    $(".share-box a").eq(2).attr("href",`https://www.linkedin.com/sharing/share-offsite/?url=`+symbolToHexHref(location.href))
    $(".share-box a").eq(3).attr("href",`https://www.reddit.com/submit?url=`+symbolToHexHref(location.href))
    $(".share-box a").eq(4).attr("href",`mailto:?subject=Chia%20s%E1%BA%BB%20trang%20web&body=Xin%20ch%C3%A0o,%20m%C3%B4i%20b%E1%BA%A1n%20h%C3%A3y%20ki%E1%BB%83m%20tra%20trang%20web%20n%C3%A0y:%20$`+symbolToHexHref(location.href))
}

async function getResearch(obj) {
    let id=obj.id
    let issue = 0
    let data = await DATA() //Lấy data file.json
    let check = false
    //Kiểm tra xem issue và id có hợp lệ không?
    for (let i=0;i<data.length;i++) {
        if (data[i]["id"]===obj.issue && id >=0 && id<data[i]["researchs"].length) {
            //Nếu có
            issue=i
            check=true
            $("title").text(data[issue]["researchs"][id]["title"])
            initPath(data,issue,id)
            initResearchShare()
            initHeaderContent(data,issue,id)
            initNewsContent(data,issue,id)
            initPDFView(data,issue,id)
            initDownloadDoc(data,issue,id)
            initRefsAndNotes(data,issue,id)
            initDataRMenu(data,issue,id)
            initRSide(data,issue,id)
        }
    }
    if (!check) {
        //Nếu không có
        $(".body-container").html(err404HTML())    
    }
}

$(document).ready(async()=> {
    const urlParams = new URLSearchParams(window.location.search);
    const newsPath = {
        "issue":urlParams.get('issue'),
        "id":parseInt(urlParams.get('id')),        
    }    
    //Khởi tạo trang web 
    await getResearch(newsPath)
});
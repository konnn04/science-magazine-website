$(document).ready(function () {
    init_toc(0);
});

function initPath(data, issue){
    $('.toc-path-box').html(`
    <span><a href="./home.html">Home</a></span>
    <span>&gt;</span>
    <span><a href="">${data[issue].name}</a></span>
    `)
}

function initInfo(data,issue){
    $('.issue-info-box').html(`
    <div class="book-cover-wrapper">
                <img src="${data[issue].imgCover}" alt="">
            </div>
            <div class="issue-detail">
                <div class="issue-title">SicenceJournal®</div>
                <div class="issue-release-date">${getStringUnixDate(data[issue].publicationDate)}</div>
                <div class="issue-summary-box">
                    <p>${data[issue].news[0]["content"][0].text}</p>
                </div>
            </div>
    `)
}

function initNews(data,issue){
    let countNews = data[issue].news.length;
    let newsList=""
    for(let i=0;i<countNews;i++){
        newsList+= `        
        <div class="article">
          <div class="a-title"><a href="./news.html?issue=${data[issue].id}&id=${i}">${data[issue].news[i].title}</a></div>
          <div class="a-info">
            <p class="author">${data[issue].news[i].author[0].name}</p>
            <p> | </p>
            <p class="release">${getStringUnixDate(data[issue].news[i].time)}</p>
          </div>
          <div class="a-summary">
            <p>${cutString(data[issue].news[i]["content"][0].text,100)}</p>
          </div>
        </div>
    `    
    }
    $('.article-box').eq(0).html(newsList)
}

function initResearchs(){
    let countResearchs = data[issue].researchs.length;
    let researchsList=""
    for(let i=0;i<countResearchs;i++){
        researchsListList+= `        
        <div class="article">
          <div class="a-title"><a href="./news.html?issue=${data[issue].id}&id=${i}">${data[issue].researchs[i].title}</a></div>
          <div class="a-info">
            <p class="author">${data[issue].researchs[i].author[0].name}</p>
            <p> | </p>
            <p class="release">${getStringUnixDate(data[issue].news[i].time)}</p>
          </div>
          <div class="a-summary">
            <p>${cutString(data[issue].news[i]["content"][0].text,100)}</p>
          </div>
        </div>
    `    
    }
    $('.article-box').eq(1).html(researchsListList)
}
function init_toc(issue){
    fetch("./asset/data/data.json")
    .then((res)=>res.json())
    .then(data=>{
        initPath(data,issue)
        initInfo(data,issue)
        initNews(data,issue)
    })
}
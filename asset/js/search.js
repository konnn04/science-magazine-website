$(document).ready(async function () {
    const urlParams = new URLSearchParams(window.location.search);
    let kw = urlParams.get('kw')
    $(".search-bar #kw").val(kw)
    await initHeader();
    createFilter();
    initUser()
    initHeaderEvent()
    if (kw) {
        await search(kw)
    }
});

$('.searchBtn button').click(()=>{
    if ($(".search-bar #kw").val().trim()) {
        window.location.search="?kw="+$(".search-bar #kw").val()
    }
})

function createFilter(){
    $('.filter').click(()=>{
        $('.filter-box').toggleClass("active");
    })
}

let maxItem = 10
let curPage = 0
let maxPage=0

 async function search(kw){
         $(".filter-box").removeClass("active");
         let result=[];
         await fetch("./asset/data/data.json")
        .then((res)=>res.json())
        .then(data=>{
            for(let i =0; i < data.length; i++){
                for(let j =0; j< data[i].news.length; j++){
                    let check =false;
                    //tim theo ten tac gia
                    for(let k = 0; k < data[i].news[j].author.length;k++){
                        if(data[i].news[j].author[k].name.toLowerCase().includes(kw.toLowerCase())){
                            check=true
                        }
                    }
                    //tim theo noi dung
                    for(let k = 0; k < data[i].news[j].content.length;k++){
                        if(data[i].news[j].content[k].text && data[i].news[j].content[k].text.toLowerCase().includes(kw.toLowerCase())){
                            check = true    
                        }
                    }
                    //tim theo subtitle
                    if(data[i].news[j].subTitle.toLowerCase().includes(kw.toLowerCase())){
                        check = true
                    }
                    //tim theo tags
                    for(let k = 0; k < data[i].news[j].tags.length;k++){
                        if(data[i].news[j].tags[k].toLowerCase().includes(kw.toLowerCase())){
                            check = true
                        }
                    }
                    //tim theo title
                    if(data[i].news[j].title.toLowerCase().includes(kw.toLowerCase())){
                        check = true
                    }
                    //neu thoa man 1 trong cac dieu kien thi them vao mang
                    if(check){
                        result.push({
                            issue:i,
                            id:j,
                            type:"News",
                            time:data[i].news[j].time,
                            cate:data[i].news[j].type
                        })
                    }
                }
                
                
                for(let j=0; j< data[i].researchs.length; j++){
                    let check = false;
                    //tim theo title
                    if(data[i].researchs[j].title.toLowerCase().includes(kw.toLowerCase())){
                        check = true
                    }
                    //tim theo type
                    if(data[i].researchs[j].type.toLowerCase().includes(kw.toLowerCase())){
                        check = true
                    }
                    //tim theo author
                    for(let k=0;k<data[i].researchs[j].authors.length;k++){
                        if(data[i].researchs[j].authors[k].name.toLowerCase().includes(kw.toLowerCase())){
                            check=true;
                        }
                    }
                    //tim theo summary
                    if(data[i].researchs[j].summary.toLowerCase().includes(kw.toLowerCase())){
                        check = true
                    }
                    //neu thoa man 1 trong cac dieu kien thi them vao mang
                    if(check){
                        result.push({
                            issue:i,
                            id:j,
                            type:"Research",
                            time:data[i].researchs[j].time,
                            cate:""
                        })
                    }
                }
            }
        let html = initResults(data,result)
        //Tinh maxPage
        if(html.length%maxItem==0){
            maxPage=parseInt(html.length/maxItem);
        }
        else maxPage=parseInt(html.length/maxItem) + 1;
        //tao html cua nut
        curPage=1
        initNumPage(html)        
            
        })
        //in so luong tim kiem
        $('.result h1 span').html(result.length)
        //khoi tao ket qua tim kiem
        
     
 }

 function dividePage(html) {
    let h=""
    for (let i = (curPage-1) * maxItem;i<(curPage) * maxItem;i++){
        h+=html[i]
    }
    $(".article-box").html(h)
 }

function initNumPage(html) {
    let pageNum = ""
    if (maxPage==0) {
        $(".article-box").html("")
        $(".page-ctrl").html("")
        return
    } 
    if(maxPage!=1){
        for (let i=1;i<=maxPage;i++) {
            pageNum+=`<button class="midPage">${i}</button>`
        }
        if (curPage == 1) {
            pageNum+=`<button class="nextPage">&rarr;</button>`
        }else if (curPage==maxPage) {
            pageNum=`<button class="prevPage">&larr;</button>`+pageNum
        }else{
            pageNum=`<button class="prevPage">&larr;</button>` + pageNum+`<button class="nextPage">&rarr;</button>`
        }
        $(".page-ctrl").html(pageNum)
    } 
    $(".page-ctrl .nextPage").click(()=>{
        curPage++
        initNumPage(html)
    })
    $(".page-ctrl .prevPage").click(()=>{
        curPage--
        initNumPage(html)
    })
    for (let i=0;i<$(".midPage").length;i++) {
        $(".midPage").eq(i).click(()=>{
            curPage=i+1
            initNumPage(html)
        })
    }
    $(".midPage").eq(curPage-1).addClass("active")
    dividePage(html)

}

 function initResults(data,result) {
    let h=[]
    result.forEach((e,i) => {
        if (e.type == "News") {
            h.push(`<div class="article">
            <div class="a-type">News</div>
            <div class="a-cate">${data[e.issue].news[e.id]["type"]}</div>
            <div class="a-title"><a href="./news.html?issue=${data[e.issue].id}&id=${e.id}">${data[e.issue].news[e.id]["title"]}</a></div>
            <div class="a-info">
              <p class="author">${data[e.issue].news[e.id].author[0].name}</p>
              <p> | </p>
              <p class="release">${getStringUnixFullDay(data[e.issue].news[e.id].time).toUpperCase()}</p>
            </div>
            <div class="a-summary">
              <p>${cutString(data[e.issue].news[e.id]["content"][0].text,200)}</p>
            </div>
          </div>`)
        }else{
            h.push(`<div class="article">
            <div class="a-type">Research</div>
            <div class="a-cate">${data[e.issue].researchs[e.id]["type"]}</div>
            <div class="a-title"><a href="./research.html?issue=${data[e.issue].id}&id=${e.id}">${data[e.issue].researchs[e.id]["title"]}</a></div>
            <div class="a-info">
              <p class="author">${data[e.issue].researchs[e.id].authors[0].name}</p>
              <p> | </p>
              <p class="release">${getStringUnixFullDay(data[e.issue].researchs[e.id].time).toUpperCase()}</p>
            </div>
            <div class="a-summary">
              <p>${cutString(data[e.issue].researchs[e.id].summary,200)}</p>
            </div>
          </div>`)
        }
    });
    return h
 }
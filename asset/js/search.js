

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
let ban=""
let noBan=""


 async function search(kw){
         let result=[];
         await fetch("./asset/data/data.json")
        .then((res)=>res.json())
        .then(data=>{
            for(let i =0; i < data.length; i++){
                for(let j =0; j< data[i].news.length; j++){
                    //tim theo ten tac gia, noi dung,subtitle,tags,title
                    let text =data[i].news[j].subTitle.toLowerCase()+" "+data[i].news[j].title.toLowerCase()+" "+data[i].news[j].content[0].text.toLowerCase()+" "
                    
                    data[i].news[j].author.forEach((e,i)=>{
                        if(e.name) text+=e.name.toLowerCase()+" "                        
                    })
                    data[i].news[j].tags.forEach((e,i)=>{
                        if(e) text+=e.toLowerCase()+" "                         
                    })
                    if (text.includes(kw.toLowerCase())) {
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
                    //tim theo title, type, author,abstract
                    let text = data[i].researchs[j].title.toLowerCase()+" "+data[i].researchs[j].type.toLowerCase()+" "+data[i].researchs[j].summary.toLowerCase()+" "+data[i].researchs[j].abstract.toLowerCase()+" "
                    data[i].researchs[j].authors.forEach((e,i)=>{
                        text+=e.name.toLowerCase()+" "
                    })
                    //tim theo summary
                    if(text.includes(kw.toLowerCase())){
                        result.push({
                            issue:i,
                            id:j,
                            type:"Research",
                            time:data[i].researchs[j].time,
                            cate:data[i].researchs[j].type
                        })
                    }
                }
            }
            let html
        function next() {
            html = initResults(data,result)
            //Tinh maxPage
            if(html.length%maxItem==0){
                maxPage=parseInt(html.length/maxItem);
            }
            else maxPage=parseInt(html.length/maxItem) + 1;
            //tao html cua nut
            curPage=1
            initNumPage(html)        
            $('.result h1 span').html(html.length)
        }

            next()
            initCateFilter()
            $(".filBtn").click(()=>{
                initCateFilter()
                next()
            })
        })
        //in so luong tim kiem
        //khoi tao ket qua tim kiem
        
     
 }

 function initCateFilter() {
    ban = ""
    noBan = ""
    if ($("#cate-filter #c-scientific-community").is(':checked')) {
        noBan+= "Scientific Community "
    }else{
        ban+= "Scientific Community "
    }
    if ($("#cate-filter #c-peopleevent").is(':checked')) {
        noBan+= "People & Events "
    }else{
        ban+= "People & Events "
    }
    if ($("#cate-filter #c-health").is(':checked')) {
        noBan+= "Health "
    }else{
        ban+= "Health "
    }
    if ($("#cate-filter #c-earth").is(':checked')) {
        noBan+= "Earth "
    }else{
        ban+= "Earth "
    }
    if ($("#cate-filter #c-plantsanimals").is(':checked')) {
        noBan+= "Plants & Animals "
    }else{
        ban+= "Plants & Animals "
    }
 }

 function dividePage(html) {
    let h=""
    let length = (curPage * maxItem - html.length < 0)?(curPage * maxItem):html.length;
    for (let i = (curPage-1) * maxItem;i<length;i++){
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

function filterCate(e) {
    if ($("#c-all").is(':checked')) return true
    let cate = e.cate.toUpperCase().trim()
    
    if ($("#cate-filter #c-other").is(':checked')) {
        if (!ban.toUpperCase().includes(cate)) return true
    }else{
        if (noBan.toUpperCase().includes(cate)) return true
    }
    console.log(cate)
    return false
}

 function initResults(data,result) {
    let filterType = {
        "news":($("#t-all").is(':checked') || $("#t-news").is(':checked')),
        "research":($("#t-all").is(':checked') || $("#t-research").is(':checked')),
    }
    let h=[]
    result.forEach((e,i) => {
        if (e.type == "News"&& filterCate(e) && filterType.news) {
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
        }
        if (e.type == "Research"&& filterCate(e) && filterType.research){
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

 function initEventFilter() {
    $("#category input#c-all").click(()=>{
        if ($("#category #c-all").is(":checked")) {
            $("#category input:not('#c-all')").prop('checked', false)
        }
    })
    $("#category input:not('#c-all')").click(()=>{
        if ($("#category #c-all").is(":checked")) {
            $("#category #c-all").prop('checked', false)
        }
    })
    $(".revBtn").click(()=>{
        $("#t-all").click()
        if (!$("#c-all").is(":checked")) {
            $("#c-all").click()
        }
    })
 }

//Kiểm tra xem location.search có type không
//Nếu có thì chỉnh bộ lọc
function startedFilter(type) {
    if (type) {
        $(".filter-box").addClass("active")

        if (type.toUpperCase()=="NEWS") {
            $("#t-news").prop('checked',true)
            $("#type-filter input:not('#t-news')").prop('checked',false)
        }
        if (type.toUpperCase()=="RESEARCH") {
            $("#t-research").prop('checked',true)
            $("#type-filter input:not('#t-research')").prop('checked',false)
        }
    }
}

 $(document).ready(async function () {
    const urlParams = new URLSearchParams(window.location.search);
    let kw = urlParams.get('kw')
    let type = urlParams.get('type')
    startedFilter(type)

    initEventFilter(type)

    $(".search-bar #kw").val(kw)
    await initHeader();
    createFilter();
    initUser()
    initHeaderEvent()
    if (kw || type.toUpperCase()=="NEWS"|| type.toUpperCase()=="RESEARCH") {
        await search(kw||"")
    }
    


});


$('.searchBtn button').click(()=>{
    if ($(".search-bar #kw").val().trim()) {
        //window.location.search="?kw="+$(".search-bar #kw").val()
        window.history.replaceState( null, null, "?kw="+$(".search-bar #kw").val());
        search($(".search-bar #kw").val())
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
            initCateFilter()
            for(let i =0; i < data.length; i++){
                for(let j =0; j< data[i].news.length; j++){
                    //tim theo ten tac gia, noi dung,subtitle,tags,title
                    let text =data[i].news[j].subTitle.toLowerCase()+" "+data[i].news[j].title.toLowerCase()+" "
                    data[i].news[j].content.forEach((e,i)=>{
                        if(e.text) text+=e.text.toLowerCase()+" "                        
                    })
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
            
        })
        //in so luong tim kiem
        //khoi tao ket qua tim kiem
        
     
 }

 //Tạo các bộ lọc
 //ban: là không có tick
 //noBan: là có tick
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
//Chia mảng HTML kết quả và in ra dựa vào trang hiện tại
 function dividePage(html) {
    let h=""
    //Kiểm tra rằng có í hơn maxTiem không tránh chạy tràn
    let length = (curPage * maxItem - html.length < 0)?(curPage * maxItem):html.length;
    
    for (let i = (curPage-1) * maxItem;i<length;i++){
        h+=html[i]
    }
    $(".article-box").html(h)
 }

//Hàm tạo đánh số trang và tính số trang đối đa
function initNumPage(html) {
    let pageNum = ""
    if (maxPage==0) {
        $(".article-box").html("")
        $(".page-ctrl").html("")
        return
    } 
    //Nếu có nhiều hơn 1 trang
    //Thì in ra bộ nút
    if(maxPage!=1){
        for (let i=1;i<=maxPage;i++) {
            pageNum+=`<button class="midPage">${i}</button>`
        }
        //Nếu đang ở trang đầu thì k in ra <--
        if (curPage == 1) {
            pageNum+=`<button class="nextPage">&rarr;</button>`
        //Nếu đang ở trang cuối thì k in ra -->
        }else if (curPage==maxPage) {
            pageNum=`<button class="prevPage">&larr;</button>`+pageNum
        }else{
            //Nằm khoảng giữa thì in cả <-- và -->
            pageNum=`<button class="prevPage">&larr;</button>` + pageNum+`<button class="nextPage">&rarr;</button>`
        }
        $(".page-ctrl").html(pageNum)
    } 
        //Tạo sự kiện các nút đã tạo
    //Trang kế
    $(".page-ctrl .nextPage").click(()=>{
        curPage++
        initNumPage(html)
    })
    //Trang lùi
    $(".page-ctrl .prevPage").click(()=>{
        curPage--
        initNumPage(html)
    })
    //Các số trang
    for (let i=0;i<$(".midPage").length;i++) {
        $(".midPage").eq(i).click(()=>{
            curPage=i+1
            initNumPage(html)
        })
    }
    $(".midPage").eq(curPage-1).addClass("active")
    //Tiến hành chia số trang in ra dựa vào trang hiện tại
    dividePage(html)

}

//Hàm lọc Cate
//Tác dụng: so sánh bộ lọc hiện tại để hiển thị kết quả hay không
function filterCate(e) {
    //Nếu tick all thì mọi thể loại đều được in ra
    if ($("#c-all").is(':checked')) return true
    let cate = e.cate.toUpperCase().trim()
    //c-other là trường hợp đặc biệt
    if ($("#cate-filter #c-other").is(':checked')) {
        //Nếu lấy cả other thì mình lọc bỏ những thứ chưa được tick trên filter
        if (!ban.toUpperCase().includes(cate)) return true
    }else{
        //Nếu không lấy other thì mình chỉ lấy những thứ đã tick
        if (noBan.toUpperCase().includes(cate)) return true
    }
    return false
}

//Tạo mảng các thành phần HTML kết quả tìm kiếm
//Mục đích: Chia trang tránh làm trang dài
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

 //Hàm khởi tạo QUY TẮC Category 
 function initEventFilter() {
    //Nếu tick cate-all thì bỏ tất cả tick còn lại
    $("#category input#c-all").click(()=>{
        if ($("#category #c-all").is(":checked")) {
            $("#category input:not('#c-all')").prop('checked', false)
        }
    })
    //Ngược lại tick k phải cate-all thì bỏ tick chỗ cate-all
    $("#category input:not('#c-all')").click(()=>{
        if ($("#category #c-all").is(":checked")) {
            $("#category #c-all").prop('checked', false)
        }
    })
    //Xóa về mặc định cho cate-all
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
        //Nếu là news thì bỏ 2 tick research và all
        if (type.toUpperCase()=="NEWS") {
            $("#t-news").prop('checked',true)
            $("#type-filter input:not('#t-news')").prop('checked',false)
        }
        //ngược lại
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
    //Tick sẵn loại type qua ?type
    startedFilter(type)
    //Tạo quy tắc cho filter (all và ..v..v..)
    initEventFilter(type)
    //Lấy keyword từ href về cho vào input
    $(".search-bar #kw").val(kw)
    //Khởi tạo header
    await fetch("./asset/data/data.json")
        .then((res)=>res.json())
        .then(async data=>{
            await initHeader(data);
        })    
    // Tạo sự kiện nhấn nút Filter
    createFilter();
    //Tạo người dùng header
    initUser()
    //Tạo sự kiện cần thiết cho header (Menu, tìm kiếm,...)
    initHeaderEvent()
    //Kiểm tra 1 trong 3 trường hợp xảy ra để thực hiện tìm kiếm
    //TH1: có keyword để tìm kiếm qua ?kw
    //TH2,3: có type để in ra theo loại như news và research
    if (kw || type.toUpperCase()=="NEWS"|| type.toUpperCase()=="RESEARCH") {
        await search(kw||"")
    }
});
function initNewsMain(data) {
    let c=-6
    let html=""
    for (let i = data.length-1;i>=0;i--) {
        for (let j = data[i]["news"].length-1;j>=0;j--) {
            c++
            if (c==0 || c==1) {
                html+=`<div class="news-box-${c}">
                <div class="img-news">
                    <a href="./news.html?issue=${data[i].id}&id=${j}">
                        <img src="${data[i]["news"][j]["cover"]}" alt="" srcset="">
                    </a>
                </div>
                <div class="info-news">
                    <span>${data[i]["news"][j]["type"]}</span>
                    <span>${getStringUnixDate(data[i]["news"][j]["time"])}</span>
                    <h2>
                        <a href="./news.html?issue=${data[i].id}&id=${j}">
                            ${data[i]["news"][j]["title"]}
                        </a>
                    </h2>
                    <h4>${data[i]["news"][j]["author"][0]["name"]}</h4>
                </div>
            </div>`
            }else if(c>1 && c<5) {
                html+=`
                <div class="news-box-${c}">
                <div class="info-news">
                    <span>${data[i]["news"][j]["type"]}</span>
                    <span>${getStringUnixDate(data[i]["news"][j]["time"])}</span>
                    <h2>
                        <a href="./news.html?issue=${data[i].id}&id=${j}">${data[i]["news"][j]["title"]}</a>
                    </h2>
                    <h4>${data[i]["news"][j]["author"][0]["name"]}</h4>
                </div>
            </div>`
            }else if (c>=5){
                $(".body-container .grid").html($(".body-container .grid").html() + html)
                return
            }
        }
    }
}
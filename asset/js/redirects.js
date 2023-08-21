let darkCheck = (localStorage.getItem("theme") == "dark")?true:false
let nextPage = (sessionStorage.getItem("next")||"./")

let arrBookmark = JSON.parse(localStorage.getItem("bookmark"))
if (arrBookmark == null) {
    localStorage.setItem("bookmark","[]")
    arrBookmark =[]
}

function getCookie(key) {
    var name = key + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

if (location.pathname.includes('/login.html')) {
    if (getCookie("username")!="" && getCookie("email")!="" ) {
        location.href = "./"
    }
}else{
    if (!(getCookie("username")!="" || getCookie("email")!="" )) {
        sessionStorage.setItem("next",window.location.href)
    }else{
        sessionStorage.setItem("next","./")
    }
}

async function DATA() {
    return await fetch("./asset/data/data.json").then((res)=> res.json()).catch(err=>{
        alert("Vui lòng khởi chạy Live Server hoặc truy cập tại https://github.com/konnn04/TKW22_Phu_Trieu")
        console.log(err)
    })
}



function initMeta() { //Bỏ
    document.head.innerHTML+=(`    
  <meta property="og:title" content="Sicence Journal®">
  <meta property="og:description" content="Welcome to Science Journal®, a premier online platform dedicated to nurturing a deep-seated passion for science and facilitating the widespread dissemination of knowledge across diverse scientific realms.">
  <meta property="og:image" content="https://img.freepik.com/free-vector/science-word-theme_23-2148540555.jpg">
  <meta property="og:url" content="${location.href}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="SicenceJournal®">
  <meta property="title" content="Sicence Journal®">
  <meta property="description" content="Welcome to Science Journal®, a premier online platform dedicated to nurturing a deep-seated passion for science and facilitating the widespread dissemination of knowledge across diverse scientific realms.">
  <meta name="keywords" content="Sicence Journal">
  <meta name="author" content="Konnn04 and Horyzonn">
  <meta name="robots" content="index, follow">`)//Lập chỉ mục
}

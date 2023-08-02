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

switch (location.pathname) {
    case '/login.html':{
        if (getCookie("username")!="" && getCookie("email")!="" ) {
            location.href = "./home.html"
            console.log("ok")
        }
        break;
    }
}
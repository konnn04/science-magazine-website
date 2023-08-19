$(document).ready(async()=>{
    await fetch("./asset/data/data.json")
    .then((res)=>res.json())
    .then(async data=>{
        await initHeader(data)
    })
    // initKeyWordsHeader()
    initUser()
    initHeaderEvent()
    
})


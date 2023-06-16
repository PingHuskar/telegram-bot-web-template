const searchParam = new URLSearchParams(location.search)

let TOKEN = searchParam.get(`token`) || localStorage.getItem(`token`) || ``

while (/^\d+:[\w\-]+$/.exec(TOKEN) === null ) {
    TOKEN = prompt(`Enter Your Bot TOKEN`)
}

let BOTNAME = searchParam.get(`botname`) || localStorage.getItem(`botname`) || ``
while (BOTNAME === ``) {
    BOTNAME = prompt(`Enter Your Bot Name`)
}
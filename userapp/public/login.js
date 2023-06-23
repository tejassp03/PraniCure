let query =window.location.search
let url =new URLSearchParams(query)
let val=url.get('mode')
alert(val)
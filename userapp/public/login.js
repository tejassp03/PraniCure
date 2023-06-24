let query =window.location.search
let url =new URLSearchParams(query)
let val=url.get('mode')
$("#create").on("click",function(){
    window.location.href=`signup.html?mode=${val}`
})


$("#login").on("click",function(){

    var name=$("#name").val();
    var pass=$("#pass").val();
    if(val==null){
        alert("select the type of user");
        setTimeout(function(){
        window.location.href='welcome.html'


    
    },1000)
    return;
    }
    if(name==''|| name==' '){
       alert("Invalid Mail")
        // toastr.warning("Please Enter a valid Mail", "Mail  Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
        return;
        
           
        }
        if(pass=='' ){
        
        alert("pass");
        // toastr.warning("Please Enter valid Paaword having more that 5 characters", "Password  Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
        return;
        
        
        }
        $.ajax({
            url:"http://localhost:9000/login",
            type:"post",
            dataType: "json",
            data: { user:name,Pass:pass
            },
            success: function(res){
                console.log(res.response)
                if(res.status==200){
                    swal("Logged In Successfully")
                    setTimeout(function(){
                        window.location.href='index.html'
                        localStorage.setItem('prani',`${res.response[0].user_id}-${val}`)

                    
                    },2000)
                }
                else if(res.status==500){
                    swal("Failed", "No user exist with given Credentials ", "error");

                }
                else{
                    alert("No user exist")
                }

            }
        })




})
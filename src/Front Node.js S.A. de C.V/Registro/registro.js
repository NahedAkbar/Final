window.onload = init;
headers ={}

function init (){
    if(localStorage.getItem("token")){
        headers ={
            headers:{
               'Authorization': "bearer " + localStorage.getItem("token") 
            }
        }

        document.querySelector('.btn-secondary').addEventListener('click', function(){
            window.location.href ="../Tabla/index.html";
        });
    
        document.querySelector('.btn-primary').addEventListener('click' , register);
    }
    else{
        window.location.href="./login.html"
    }
    
    
}

function register(){
    var name = document.getElementById('input_name').value;
    var lastName = document.getElementById('input_lastName').value;
    var mail = document.getElementById('input_mail').value;
    var phone = document.getElementById('input_phone').value;
    var position = document.getElementById('input_position').value;
    var password = document.getElementById('input_password').value;

    axios.post('http://localhost:3000/user/' , {
        user_name: name,
        user_lastName: lastName,    
        user_mail: mail,
        user_phone: phone,
        user_position: position,
        user_password: password
        
    },headers).then(function(res){
        console.log(res);
        alert("Usuario registrado exitosamente")
        window.location.href= "../Tabla/index.html"
    }).catch(function(err){
        console.log(err);
    });

}
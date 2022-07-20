const loginForm = document.getElementById('loginForm')
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let form_validation = true;
    if (form_validation){
        let formdata = new FormData(loginForm)
        let data = {
            username: formdata.get('username'),
            password: formdata.get('passwd'), 
        }
        // console.log(data);
        fetch('http://localhost:8080/login', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json())
        .then(info => {
            if (info.authenticated === true){
                location.replace('/dashboard')
            } else {
                location.replace('/failLogin')
            }
        });
    }

});

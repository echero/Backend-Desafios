const signupForm = document.getElementById('signupForm')
signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let form_validation = true;

    if (form_validation){
        let formdata = new FormData(signupForm)
        let data = {
            name: formdata.get('name'),
            username: formdata.get('username'),
            password: formdata.get('passwd'), 
        }

        fetch('http://localhost:8080/signup', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json())
        .then(info => {
            if (info.registered === true){
                location.replace('/dashboard')
            } else {
                location.replace('/failSignup')
            }
        });
    }

});
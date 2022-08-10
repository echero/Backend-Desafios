const signupForm = document.getElementById('signupForm')
signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let form_validation = true;

    if (form_validation){
        let formdata = new FormData(signupForm)
        let data = {
            name: formdata.get('name'),
            edad: formdata.get('edad'),
            direccion: formdata.get('direccion'),
            telefono: `+54${formdata.get('telefono')}`,
            username: formdata.get('username'),
            password: formdata.get('passwd')
        }
        fetch('/signup', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json())
        .then(info => {
            if (info.registered === true){
                sessionStorage.setItem('userId',info.userId);
                let formData = new FormData();
                const imagen = document.getElementById('imagen');
                formData.append("imagen", imagen.files[0]);
                return fetch('/ImageUpload', {
                  method: 'POST',
                  body: formData
                });
            }
        })
        .then(response => response.json())
        .then(imagen => {
            if (imagen.uploaded === true){
                location.replace('/dashboard')
            } else {
                location.replace('/failSignup')
            }
        });
    }

});
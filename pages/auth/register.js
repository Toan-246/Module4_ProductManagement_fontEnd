function register(){
    let username = $('#username').val()
    let password = $('#password').val()
    let user = {
        username: username,
        password: password
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/register',
        data: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (){
            showSuccessMessage('Đăng ký thành công')
            location.href = '/ProductAjax/pages/auth/login.html'
        },
        error: function (){
            showErrorMessage('Đăng ký lỗi')
        }
    })
}
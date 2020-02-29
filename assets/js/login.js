$(function () {
    var form = layui.form
    var leyer = layui.leyer
    $('.link-log').on('click', function () {
        $('.login-box').hide()
        $('.Reg-box').show()
    })
    $('.link-reg').on('click', function () {
        $('.Reg-box').hide()
        $('.login-box').show()

    })
    form.verify({
        pws: [/^[\S]{6,12}$/, '密码必须6到12位'],
        sampas: function (value) {
            var pwd = $('.Reg-box [name=password]').val()
            if (value !== pwd) {
                return '两次密码不一样'
            }
        }
    })
    $('#form-reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录')
                $('.link-reg').click()
            }
        })
    })
    $('#form-login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = "/index.html"
            }
        })
    })



})
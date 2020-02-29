$(function () {
    var layer = layui.layer

    // 调用这个函数，获取用户的信息
    getUserInfo()

    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出登录吗?', { icon: 3, title: '提示' }, function (index) {
            // 1. 清 token
            localStorage.removeItem('token')
            // 2. 跳页面
            location.href = '/login.html'
            layer.close(index)
        });
    })
})

function getUserInfo() {
    // 发起 ajax 请求，获取用户信息
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }

            renderAvatar(res.data)
        }
    })
}


// 渲染用户头像和欢迎文本
function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username
    // 1. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 2. 按需渲染头像
    if (user.user_pic) {
        // 渲染图片的头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本的头像
        $('.layui-nav-img').hide()
        // 获取用户名的第一个字符串
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}

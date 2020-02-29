$(function () {
    var layer = layui.layer
    var form = layui.form
    initUserinfo()
    // 获取表单用户信息
    function initUserinfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户失败')
                }
                form.val('f1', res.data)
            }
        })

    }
    form.verify({
        // 昵称的验证规则
        nickname: [
            /^[\S]{2,6}$/
            , '昵称必须2到6位，且不能出现空格'
        ]
    })
    // 提交事件
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        // 重新渲染表单
        initUserinfo()
    })
    $('#form1').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户失败')
                }
                layer.msg('更新用户成功')
                window.parent.getUserInfo()
            }
        })


    })



})
$(function () {
    var layer = layui.layer

    var $image = $('#image')

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    // 上传事件
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })

    $('#file').on('change', function (e) {
        // e.target.files 是用户选择的文件列表
        var files = e.target.files
        if (files.length === 0) {
            return layer.msg('请选择图片！')
        }

        // 1. 将文件转成文件的路径，设置给 img 标签的 src 属性
        var newImgURL = URL.createObjectURL(files[0])

        // 2. 重新初始化裁剪区域
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    $('#upload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        $.post('/my/update/avatar', { avatar: dataURL }, function (res) {
            if (res.status !== 0) {
                return layer.msg('头像上传失败')
            }
            layer.msg('头像上传成功')
            window.parent.getUserInfo()
        })
    })


})






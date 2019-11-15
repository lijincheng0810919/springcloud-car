$(function () {
    initCityList();
})
function initCityList() {
    $.ajax({
        url:'../zyf/findCityList',
        type:'post',
        success:function (data) {
            $("#cityId").html(data);
        }
    })
}
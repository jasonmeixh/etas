/**
 * Created by Administrator on 2017/1/7.
 */

// .apply_status  .t_report_check_detail_btn   .t_report_modify_btn
// #report_btn   #cancel_report_btn
var adminReviewThesisUrl = "/home/admin/thesis/review";
var adminCancelReviewThesisUrl = "/home/admin/thesis/cancelReview";

$(document).ready(function () {
    select_all();
    no_select_all();
    review();
    cancel_review();
    basicInfoEditBtn();
    basicInfoViewBtn();
    tjbEditBtn();
    tjbViewBtn();
});

//全选按钮事件
function select_all(){
    //select_all_btn
    $("#select_all_btn").click(function () {
        // name="checkboxStatus"
        $("input[name='checkboxStatus']").prop("checked",true);
    })
}

//反选按钮事件
function no_select_all(){
    //no_select_all_btn
    $("#no_select_all_btn").click(function () {
        // name="checkboxStatus"
        var checkbox = $("input[name='checkboxStatus']");
        checkbox.each(function () {
            $(this).prop("checked", !$(this).prop("checked"));
        })
    })
}

//审核按钮事件
function review(){
    //report_btn
    $("#review_btn").click(function () {
        //检查是否选中
        var checked = $("input[name='checkboxStatus']:checked");
        var checked_length = checked.length;

        if(checked_length <= 0){ //如果没有选中申请
            model_tip_show('model_tip1','model_tip_content1','未选择申请');
            return;
        }
        //如果选中了

        //1.检查选中的申请的状态是否有不可审核状态
        if(checkBeforeReport()==false){
            model_tip_show('model_tip1','model_tip_content1','只能上报状态为【待学校审核】, 请重新选择');
            return;
        }
        //确认是否审核通过
        model_ok_show("model_ok","model_ok_content","确认是否审核通过","model_ok_btn",review1);

    }) //click
} //function


function review1(){
    var checked = $("input[name='checkboxStatus']:checked");
    var xh_array = new Array();
    //2.如果选中的是正确，准备将数据发往服务器
    checked.each(function(){ //将选中的学号放到xh_array数组中
        var value = $(this).parent().parent().children("td.userId").text();
        xh_array.push(value);
    })
    $.ajax({
        type: "POST",
        url: adminReviewThesisUrl,
        contentType: "application/json",
        data: JSON.stringify({
            "userIds":xh_array,
        }),

        beforeSend: function(XMLHttpRequest){
        },

        success: function(data){
            // 200 成功    300 重复申请  500 失败
            closeModal("model_ok");
            var status = data.code;
            var msg = data.msg;
            if(status == "200")  //200 成功
                model_tip_show('model_tip1','model_tip_content1','审核成功',refreshToAdminSearchThesisPage);
            else if(status == "500")  //服务器繁忙
                model_tip_show('model_tip','model_tip_content','服务器繁忙，请稍后再试');
            else
                model_tip_show('model_tip','model_tip_content','服务器开小差了, 请稍后再试');
        },

        error: function(XMLHttpRequest, textStatus) {
        },

        complete: function(XMLHttpRequest, textStatus){
        }

    }); //ajax
} //function review1


//取消审核按钮事件
function cancel_review(){
    //cancel_report_btn
    $("#cancel_review_btn").click(function () {
        //1.检查是否有选中
        var checked = $("input[name='checkboxStatus']:checked");
        var checked_length = checked.length;
        if(checked_length <= 0){ //如果没有选中申请
            model_tip_show('model_tip1','model_tip_content1','未选择申请');
            return;
        }
        //2.检查选中的状态是否正确
        if(checkBeforeCancelReport()==false){
            model_tip_show('model_tip1','model_tip_content1','只能取消状态为【通过审核】, 请重新选择');
            return;
        }
        //确认是否取消审核
        model_ok_show("model_ok","model_ok_content","确认是否取消审核通过","model_ok_btn",cancelReview1);

    }) //click
}


function cancelReview1(){
    var checked = $("input[name='checkboxStatus']:checked");
    var xh_array = new Array();
    //3.组装数据发给后台服务器处理
    checked.each(function(){ //将选中的学号放到xh_array数组中
        var value = $(this).parent().parent().children("td.userId").text();
        xh_array.push(value);
    })
    $.ajax({
        type: "POST",
        url: adminCancelReviewThesisUrl,
        contentType: "application/json",
        data: JSON.stringify({
            "userIds":xh_array,
        }),

        beforeSend: function(XMLHttpRequest){
        },

        success: function(data){
            // 200 成功    300 重复申请  500 失败
            closeModal("model_ok");
            var status = data.code;
            var msg = data.msg;
            if(status == "200")  //200 成功
                model_tip_show('model_tip1','model_tip_content1','取消审核成功',refreshToAdminSearchThesisPage);
            else if(status == "500")  //服务器繁忙
                model_tip_show('model_tip','model_tip_content','服务器繁忙，请稍后再试');
            else
                model_tip_show('model_tip','model_tip_content','服务器开小差了, 请稍后再试');
        },

        error: function(XMLHttpRequest, textStatus) {
        },

        complete: function(XMLHttpRequest, textStatus){
        }

    }); //ajax
}

//上报前检查--状态是否可以上报
function checkBeforeReport(){
    var _checked = $("input[name='checkboxStatus']:checked");
    var _status =  _checked.parent().parent().children("td.apply_status");
    var inspectV = 1;
    _status.each(function(){
        if($(this).text() !='待学校审核'){
            inspectV = 0;
            return;
        }
    });
    if(inspectV==1)
        return true;
    else
        return false;
}

//取消上报前检查--状态是否可以取消上报
function checkBeforeCancelReport(){
    var _checked = $("input[name='checkboxStatus']:checked");
    var _status =  _checked.parent().parent().children("td.apply_status");
    var inspectV = 1;
    _status.each(function(){
        if($(this).text() !='通过审核'){
            inspectV = 0;
            return;
        }
    });
    if(inspectV==1)
        return true;
    else
        return false;
}


//查看和编辑按钮

function basicInfoViewBtn(){
    $(".basicInfoViewBtn").click(function () {
        var userId = $(this).parent().parent().children("td.userId").text();
        refreshToBasicInfoViewPage(userId);
    })
}

function basicInfoEditBtn(){
    $(".basicInfoEditBtn").click(function () {
        var userId = $(this).parent().parent().children("td.userId").text();
        var applyStatus = $(this).parent().parent().children("td.apply_status").text();
        if(applyStatus == "待学校审核")
            refreshToBasicInfoEditPage(userId);
        else if(applyStatus == "通过审核")
            model_tip_show('model_tip1','model_tip_content1','该申请已经通过，不能修改');
        else
            paramErrorAlert("applyStatus",applyStatus);
    })
}

function tjbViewBtn(){
    $(".tjbViewBtn").click(function () {
        var userId = $(this).parent().parent().children("td.userId").text();
        refreshToTjbViewPage(userId);
    })
}

function tjbEditBtn(){
    $(".tjbEditBtn").click(function () {
        var userId = $(this).parent().parent().children("td.userId").text();
        var applyStatus = $(this).parent().parent().children("td.apply_status").text();
        if(applyStatus == "待学校审核")
            refreshToTjbEditPage(userId);
        else if(applyStatus == "通过审核")
            model_tip_show('model_tip1','model_tip_content1','该申请已经通过，不能修改');
        else
            paramErrorAlert("applyStatus",applyStatus);
    })
}

function refreshToAdminSearchThesisPage(){
    $.ajax({
        type: "POST",
        url: "/home/admin/thesis/search",
        contentType: "application/json",
        data: JSON.stringify({
            "department":$("#department").val(),
            "applyYear":$("#year").val(),
            "applyStatus":$("#apply_status").val(),
            "studentType":$("#student_type").val(),
            "zzxm":$("#realName").val(),
        }),

        beforeSend: function(XMLHttpRequest){
            $("#talbe_wrap").empty();
        },

        success: function(data){
            $("#talbe_wrap").html(data);
        },

        error: function(XMLHttpRequest, textStatus) {
        },

        complete: function(XMLHttpRequest, textStatus){
        }

    }); //ajax
}
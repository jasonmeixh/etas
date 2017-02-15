/**
 * Created by Administrator on 2017/1/5.
 */

//select_all_btn  no_select_all_btn  report_btn  cancel_report_btn
// .apply_status  .t_report_check_detail_btn   .t_report_modify_btn
// #report_btn   #cancel_report_btn
$(document).ready(function () {
    checkDetail();
    modifyInfo();
    select_all();
    no_select_all();
    report();
    cancel_report();
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

//上报按钮事件
function report(){
    //report_btn
    $("#report_btn").click(function () {
        //检查是否选中
        var checked = $("input[name='checkboxStatus']:checked");
        var checked_length = checked.length;
        if(checked_length <= 0){ //如果没有选中申请
            model_tip_show('model_tip1','model_tip_content1','未选择申请');
            return;
        }
        //如果选中了

        //1.检查选中的申请的状态是否有不可上报状态
        if(checkBeforeReport()==false){
            model_tip_show('model_tip1','model_tip_content1','只能上报状态为【待学院上报】, 请重新选择');
            return;
        }
        //2.如果选中的是正确，准备将数据发往服务器
        //3.确认是否上报
        model_ok_show("model_ok","model_ok_content","确认是否上报申请","model_ok_btn",report1);


    }) //click
} //function

function report1(){
    var checked = $("input[name='checkboxStatus']:checked");
    var xh_array = new Array();
    checked.each(function(){ //将选中的学号放到xh_array数组中
        var value = $(this).parent().next().next().html();
        xh_array.push(value);
    });
    $.ajax({
        type: "POST",
        url: "/home/teacher/thesis/report",
        contentType: "application/json",
        data: JSON.stringify({
            "userIds":xh_array,
        }),

        beforeSend: function(XMLHttpRequest){
        },

        success: function(data){
            closeModal("model_ok");
            // 200 成功    300 重复申请  500 失败
            var status = data.code;
            var msg = data.msg;
            if(status == "200")  //200 成功
                model_tip_show('model_tip1','model_tip_content1','上报成功, 待学校审核');
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

//取消上报按钮事件
function cancel_report(){
    //cancel_report_btn
    $("#cancel_report_btn").click(function () {
        //1.检查是否有选中
        var checked = $("input[name='checkboxStatus']:checked");
        var checked_length = checked.length;
        var xh_array = new Array();
        if(checked_length <= 0){ //如果没有选中申请
            model_tip_show('model_tip1','model_tip_content1','未选择申请');
            return;
        }
        //2.检查选中的状态是否正确
        if(checkBeforeCancelReport()==false){
            model_tip_show('model_tip1','model_tip_content1','只能取消状态为【待学校审核】, 请重新选择');
            return;
        }
        //提示是否取消上报
        model_ok_show("model_ok","model_ok_content","确认是否取消上报","model_ok_btn",cancelReoprt1);

    }) //click
}


function cancelReoprt1(){
    var checked = $("input[name='checkboxStatus']:checked");
    var xh_array = new Array();
    //3.组装数据发给后台服务器处理
    checked.each(function(){ //将选中的学号放到xh_array数组中
        var value = $(this).parent().next().next().html();
        xh_array.push(value);
    });
    $.ajax({
        type: "POST",
        url: "/home/teacher/thesis/cancelReport",
        contentType: "application/json",
        data: JSON.stringify({
            "userIds":xh_array,
        }),

        beforeSend: function(XMLHttpRequest){
        },

        success: function(data){
            closeModal("model_ok");
            // 200 成功    300 重复申请  500 失败
            var status = data.code;
            var msg = data.msg;
            if(status == "200")  //200 成功
                model_tip_show('model_tip1','model_tip_content1','取消上报成功');
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
        if($(this).text() !='待学院上报'){
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

//表格里面每行记录的  查看详情 按钮事件
function checkDetail(){
    $(".t_report_check_detail_btn").click(function () {
        var userId = $(this).parent().parent().children("td.userId").text();
        refreshToApplyThesisPage(userId,'2');
    })
};

//表格里面每行记录的  修改 按钮事件
function modifyInfo(){
    $(".t_report_modify_btn").click(function () {
        var applyStatus = $(this).parent().parent().children("td.apply_status").text();
        var userId = $(this).parent().parent().children("td.userId").text();
        if(applyStatus == "待学院上报")
            refreshToApplyThesisPage(userId,'1');
        else
            model_tip_show('model_tip1','model_tip_content1','该申请已提交，不能修改');
    })
};


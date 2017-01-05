/**
 * Created by Administrator on 2017/1/5.
 */
    $(document).ready(function () {
        applyThesis();
        checkDetail();
        modifyApply();
        deleteApply();
    });

function applyThesis(){
    //applyThesis_btn   name="checkboxStatus"
    $("#applyThesis_btn").click(function () {
        var length = $("input[name='checkboxStatus']:checked").length;
        if(length>1){//选中了多个
            model_tip_show('model_tip','model_tip_content','一次只能提交一个申请');
        }else if(length<=0){//未选中
            model_tip_show('model_tip','model_tip_content','请选择要提交的申请');
        }else{ //选中了1个
            //1.确定是否提交申请
            model_ok_show("model_ok","model_ok_content","确认是否提交申请","model_ok_btn",applyThesis1);

        } //else

    }) //click
}

function applyThesis1(){
    $("#model_ok").modal("hide");
    $.ajax({
        type: "POST",
        url: "/home/student/thesis/manage/submit",
        contentType: "application/json",
        data: JSON.stringify({

        }),

        beforeSend: function(XMLHttpRequest){
        },

        success: function(data){
            // 200 成功    300 重复申请  500 失败
            var status = data.code;
            var msg = data.msg;
            if(status == "200"){//200 成功
                model_tip_show('model_tip','model_tip_content','提交申请成功',refreshToStudentQueryStatus);
            }
            else if(status == "300")  //300 重复申请
                model_tip_show('model_tip','model_tip_content','您已提交申请, 请关注申请状态');
            else if(status == "500")  //服务器繁忙
                model_tip_show('model_tip','model_tip_content','服务器繁忙，请稍后再试');
            else
                var empty = "";
        },

        error: function(XMLHttpRequest, textStatus) {
        },

        complete: function(XMLHttpRequest, textStatus){
        }

    });
}




//删除申请按钮事件
function deleteApply(){
    //delete_btn
    $("#delete_btn").click(function(){
        //确定是否删除
        model_ok_show("model_ok","model_ok_content","确认是否要删除申请","model_ok_btn",deleteApply1);

    });//click
}

function deleteApply1(){
    $("#model_ok").modal("hide");
    //1.删除该申请
    // url: /home/student/thesis/manage/delete
    //删除论文申请    200 成功    300 学院教务员已审核通过, 不能删除     500 失败
    $.ajax({
        type: "POST",
        url: "/home/student/thesis/manage/delete",
        contentType: "application/json",
        data: JSON.stringify({

        }),

        beforeSend: function(XMLHttpRequest){
        },

        success: function(data){
            // 200 成功    300 学院教务员已审核通过, 不能删除     500 失败
            var status = data.code;
            var msg = data.msg;
            if(status == "200"){//200 成功
                model_tip_show('model_tip','model_tip_content','删除申请成功',refreshToStudentQueryStatus);
            }
            else if(status == "300")  //300 学院教务员已审核通过, 不能删除
                model_tip_show('model_tip','model_tip_content','学院教务员已审核通过, 不能删除');
            else if(status == "500")  //服务器繁忙
                model_tip_show('model_tip','model_tip_content','服务器繁忙，请稍后再试');
            else
                var empty = "";
        },
        error: function(XMLHttpRequest, textStatus) {

        },
        complete: function(XMLHttpRequest, textStatus){
        }
    }); // end ajax

    //2.页面重新刷新
    refreshToStudentQueryStatus();
}



//查看详情按钮事件
function checkDetail(){
    //checke_btn
    $("#checke_btn").click(function(){
        refreshToStudentApplyThesis();
    });//click
}

//修改申请按钮事件
function modifyApply(){
    //modify_btn
    $("#modify_btn").click(function(){
        refreshToStudentApplyThesis();
    });//click
}


function refreshToStudentQueryStatus(){
    $.ajax({
        type: "POST",
        url: "/home/student/thesis/manage/index",
        contentType: "application/json",
        data: JSON.stringify({

        }),

        beforeSend: function(XMLHttpRequest){
        },

        success: function(data){
            $("#home_right_wrap").html(data);
        },
        error: function(XMLHttpRequest, textStatus) {
            if (XMLHttpRequest.status == 401) {
                $("#home_right_wrap").html("您没有访问权限 ~");
            } else {
                $("#home_right_wrap").html("服务器繁忙, 请稍后再试 ~");
            }
        },
        complete: function(XMLHttpRequest, textStatus){
        }
    }); // end ajax
}

function refreshToStudentApplyThesis(){
    $.ajax({
        type: "POST",
        url: "/home/student/apply/index",
        contentType: "application/json",
        data: JSON.stringify({

        }),

        beforeSend: function(XMLHttpRequest){
        },

        success: function(data){
            $(".mid_body").html(data);
        },
        error: function(XMLHttpRequest, textStatus) {
            if (XMLHttpRequest.status == 401) {
                $("#home_right_wrap").html("您没有访问权限 ~");
            } else {
                $("#home_right_wrap").html("服务器繁忙, 请稍后再试 ~");
            }
        },
        complete: function(XMLHttpRequest, textStatus){
        }
    }); // end ajax
}
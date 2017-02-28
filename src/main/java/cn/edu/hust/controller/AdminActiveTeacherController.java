package cn.edu.hust.controller;

import cn.edu.hust.model.User;
import cn.edu.hust.model.request.AdminActiveTeacherSearchRequest;
import cn.edu.hust.service.UserService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by jason on 2017/2/27.
 */
@Controller
@RequestMapping(value = "/home/admin/activeTeacher")
public class AdminActiveTeacherController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/index")
    public String index(Model model, HttpSession session){
        return "admin_active_teacher_account";
    }

    @RequestMapping(value = "/search")
    public String search(@RequestBody AdminActiveTeacherSearchRequest searchRequest, Model model) {
        List<User> userList = userService.adminActiveTeacherSearch(searchRequest);
        model.addAttribute("userList", userList);
        return "admin_active_teacher_account_table";
    }

}

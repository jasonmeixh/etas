package cn.edu.hust.controller;

import cn.edu.hust.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by xiaolei03 on 16/12/2.
 */
@Controller
@RequestMapping(value = "/register")
public class RegisterController {
    @Autowired
    private RegisterService registerService;

    /**
     * 检查用户名是否存在
     * @return
     */
    @RequestMapping(value = "/checkUsername")
    @ResponseBody
    public boolean checkUsernameExists(@RequestParam String username) {
        System.out.println("username=" + username);
        return !registerService.checkUsernameExists(username);
    }

    /**
     * 提交注册
     * @return
     */
    @RequestMapping(value = "/submit")
    public String registerSubmit() {
        return "redirect:/index.html";
    }
}

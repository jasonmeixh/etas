package cn.edu.hust.dao;

import cn.edu.hust.model.User;
import cn.edu.hust.model.request.AdminActiveTeacherSearchRequest;
import cn.edu.hust.model.request.UserProfileRequest;
import cn.edu.hust.model.response.CommonResponse;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * Created by xiaolei03 on 16/12/4.
 */
@Mapper
public interface UserDao {

    @Select("SELECT user_id, password, department, real_name, " +
            " phone_number, email, role, active, update_time, login_time, student_type ," +
            " remark FROM user WHERE user_id = #{username} OR email = #{username}")
    User getUserInfo(@Param("username") String username);

    @Update(" update user set password = #{newPassword} WHERE user_id = #{username} OR email = #{username} ")
    int updateUserPassword(@Param("newPassword") String newPassword,
                           @Param("username") String username);

    @Update(" update user set department = #{user.department}, real_name = #{user.realName}, " +
            " phone_number = #{user.phoneNumber}, email = #{user.email}, student_type =  #{user.studentType} " +
            " where user_id = #{user.userId}")
    int updateUserProfile(@Param("user") UserProfileRequest user);

    //created by jason
    @Select(" SELECT student_type FROM user WHERE user_id = #{userId} ")
    String getStudentType(@Param("userId") String userId);

    @Select("<script>SELECT user_id, student_type FROM user where user_id in <foreach collection='userIdList' item='item' open='(' separator=',' close=')'>#{item}</foreach></script>")
    List<User> getBatchStudentType(@Param("userIdList") List<String> userIdList);

    @Insert(" INSERT INTO user(role, user_id, password, real_name, department, phone_number, email, active, student_type) " +
            " VALUES (#{user.role}, #{user.userId}, #{user.password}, " +
            " #{user.realName}, #{user.department}, #{user.phoneNumber}, " +
            " #{user.email}, #{user.active}, #{user.studentType}) ")
    int insertUserInfo(@Param("user") UserProfileRequest user);

    @Select(" SELECT count(*) FROM user WHERE user_id = #{userId}")
    int checkUserIdExists(@Param("userId") String userId);

    @Select("<script>SELECT department, user_id, real_name, phone_number, email, active FROM user " +
            " where role = '学院教务员' " +
            "<if test=\"searchRequest.department != '' \">and department = #{searchRequest.department}</if>" +
            "<if test=\"searchRequest.active != null \">and active = #{searchRequest.active}</if>" +
            "<if test=\"searchRequest.realName != '' \">and real_name = #{searchRequest.realName}</if>" +
            "<if test=\"searchRequest.userId != '' \">and user_id = #{searchRequest.userId}</if></script>")
    List<User> adminActiveTeacherSearch(@Param("searchRequest") AdminActiveTeacherSearchRequest searchRequest);

    @Update("<script>UPDATE user SET active = #{active} WHERE user_id IN <foreach collection='userIdList' item='item' open='(' separator=',' close=')'>#{item}</foreach></script>")
    int updateActiveStatus(@Param("active") Integer active,
                          @Param("userIdList") List<String> userIdList);

}



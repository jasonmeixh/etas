package cn.edu.hust.service;

import cn.edu.hust.dao.TeacherThesisManageDao;
import cn.edu.hust.model.ThesisBasicInfo;
import cn.edu.hust.model.request.TeacherReportRequest;
import cn.edu.hust.model.request.TeacherSearchRequest;
import cn.edu.hust.utils.SqlUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Map;

/**
 * Created by xiaolei03 on 17/1/5.
 */
@Service
public class TeacherThesisManageService {
    @Autowired
    private TeacherThesisManageDao teacherThesisManageDao;

    public List<ThesisBasicInfo> search(TeacherSearchRequest teacherSearchRequest) {
        return teacherThesisManageDao.getThesisBasicInfoList(teacherSearchRequest);
    }

    public String getTeacherSearchSql(TeacherSearchRequest teacherSearchRequest) {
        String querySql = " SELECT apply_year, zzxh, zzxm, student_type, dsxm, lwtm, apply_status FROM thesis_basic_info ";

        String department = teacherSearchRequest.getDepartment();
        String applyYear = teacherSearchRequest.getApplyYear();
        String applyStatus = teacherSearchRequest.getApplyStatus();
        String studentType = teacherSearchRequest.getStudentType();
        String zzxm = teacherSearchRequest.getZzxm();

        if (StringUtils.isEmpty(department)) {
            return null;
        }

        querySql += " WHERE department = '" + department + "' ";

        if (!StringUtils.isEmpty(applyYear)) {
            querySql += " AND apply_year = '" + applyYear + "' ";
        }

        if (!StringUtils.isEmpty(applyStatus)) {
            // 勾选 申请状态
            querySql += " AND apply_status = '" + applyStatus + "' ";
        } else {
            // 注意: 若未勾选申请状态 --> 学生未提交的申请是不能查出来的
            querySql += " AND apply_status IN ('待学院上报', '待学校审核', '通过审核') ";
        }

        if (!StringUtils.isEmpty(studentType)) {
            querySql += " AND student_type = '" + studentType + "' ";
        }

        if (!StringUtils.isEmpty(zzxm)) {
            querySql += " AND zzxm = '" + zzxm + "' ";
        }

        return querySql;
    }

    public boolean report(TeacherReportRequest teacherReportRequest) {
        String[] userIds = teacherReportRequest.getUserIds();
        if (null == userIds || userIds.length == 0) {
            return false;
        }

        return teacherThesisManageDao.updateApplyStatus("待学校审核", SqlUtil.arrayToSql(userIds)) > 0;
    }

    public boolean cancelReport(TeacherReportRequest teacherReportRequest) {
        String[] userIds = teacherReportRequest.getUserIds();
        if (null == userIds || userIds.length == 0) {
            return false;
        }

        return teacherThesisManageDao.updateApplyStatus("待学院上报", SqlUtil.arrayToSql(userIds)) > 0;
    }

    /**
     * 生成sql
     * @param param
     * @return
     */
    public String getUpdateSql(Map<String, String> param) {
        String updateSql = "UPDATE thesis_basic_info SET apply_status = '";
        updateSql += param.get("applyStatus") + "' WHERE zzxh IN (";
        updateSql += param.get("whereInSql") + ")";

        return updateSql;
    }

}

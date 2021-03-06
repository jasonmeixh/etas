use etas;
-- 硕士学位论文推荐表
DROP TABLE IF EXISTS master_thesis_apply;

create table master_thesis_apply(
id int not null primary key auto_increment,

zzxh varchar(50) DEFAULT '' COMMENT '作者学号',
zzxm varchar(30) NOT NULL DEFAULT '' COMMENT '作者姓名',
xb varchar(10) NOT NULL DEFAULT '' COMMENT '性别',
csny varchar(20) NOT NULL DEFAULT '' COMMENT '出生年月',
mz varchar(30) NOT NULL DEFAULT '' COMMENT '名族',
lwtm varchar(256) NOT NULL DEFAULT '' COMMENT '论文题目',
lwywtm varchar(512) NOT NULL DEFAULT '' COMMENT '论文英文题目',
rxny varchar(512) NOT NULL DEFAULT '' COMMENT '入学年月',
dbrq varchar(512) NOT NULL DEFAULT '' COMMENT '论文答辩日期',
hdxwrq varchar(512) NOT NULL DEFAULT '' COMMENT '获得学位日期',
yjxkdm varchar(20) NOT NULL DEFAULT '' COMMENT '一级学科代码',
yjxkmc varchar(128) NOT NULL DEFAULT '' COMMENT '一级学科名称',
ejxkdm varchar(20) NOT NULL DEFAULT '' COMMENT '二级学科代码',
ejxkmc varchar(128) NOT NULL DEFAULT '' COMMENT '二级学科名称',
lwsjdyjfx varchar(1024) NOT NULL DEFAULT '' COMMENT '论文涉及的研究方向',

dyzz int(3) NOT NULL DEFAULT 0 COMMENT '发表学术论文数(第一作者)',
dezz int(3) NOT NULL DEFAULT 0 COMMENT '发表学术论文数(第二作者)',
sci int(3) NOT NULL DEFAULT 0 COMMENT '论文被检索数(SCI)',
ei int(3) NOT NULL DEFAULT 0 COMMENT '论文被检索数(EI)',
ssci int(3) NOT NULL DEFAULT 0 COMMENT '论文被检索数(SSCI)',
istp int(3) NOT NULL DEFAULT 0 COMMENT '论文被检索数(ISTP)',
zls int(3) NOT NULL DEFAULT 0 COMMENT '获发明或实用新型专利数',
cgjx text COMMENT '出国进修的时间 国名 内容',

gdxwfs varchar(50) NOT NULL DEFAULT '' COMMENT '攻读硕士学位方式',
bkjdxx varchar(50) NOT NULL DEFAULT '' COMMENT '本科就读学校',
gdssxwdw varchar(50) NOT NULL DEFAULT '' COMMENT '攻读硕士学位单位',
zzdw varchar(128) NOT NULL DEFAULT '' COMMENT '作者单位',
zzyb varchar(20) NOT NULL DEFAULT '' COMMENT '作者邮编',
zzdz varchar(256) NOT NULL DEFAULT '' COMMENT '作者地址',
zzdh varchar(30) NOT NULL DEFAULT '' COMMENT '作者电话',
zc varchar(128) NOT NULL DEFAULT '' COMMENT '职称',
zw varchar(128) NOT NULL DEFAULT '' COMMENT '职务',
zdjsxm varchar(64) NOT NULL DEFAULT '' COMMENT '指导教师姓名',
zdjsyjfx varchar(64) NOT NULL DEFAULT '' COMMENT '指导教师研究方向',

fbxslw text COMMENT '发表学术论文',
cbzz text COMMENT '出版专著',
hjxm text COMMENT '获奖项目',
lwdzycxd text COMMENT '论文的主要创新点',
dwtjyj varchar(256) DEFAULT '同意推荐' COMMENT '单位推荐意见',
tbrq varchar(20) DEFAULT '' COMMENT '填表日期',
review_date varchar(20) DEFAULT '' COMMENT '审核通过日期',

dwdm varchar(20) DEFAULT '10487' COMMENT '单位代码',
dwmc varchar(50) DEFAULT '华中科技大学' COMMENT '单位名称',
student_type varchar(20) NOT NULL DEFAULT '' COMMENT '学生类型',

part1 int(1) NOT NULL DEFAULT 0 COMMENT '第1部分是否填写',
part2 int(1) NOT NULL DEFAULT 0 COMMENT '第2部分是否填写',
part3 int(1) NOT NULL DEFAULT 0 COMMENT '第3部分是否填写',
part4 int(1) NOT NULL DEFAULT 0 COMMENT '第4部分是否填写'

)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='硕士学位论文推荐表';





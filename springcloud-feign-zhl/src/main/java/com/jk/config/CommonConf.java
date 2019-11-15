/** 
 * <pre>项目名称:ssm-demo 
 * 文件名称:CommonConf.java 
 * 包名:com.jk.zyf.utils 
 * 创建日期:2019年9月9日下午7:11:11 
 * Copyright (c) 2019, yuxy123@gmail.com All Rights Reserved.</pre> 
 */  
package com.jk.config;

/** 
 * <pre>项目名称：ssm-demo    
 * 类名称：CommonConf    
 * 类描述：    
 * 创建人：Zhangyf   
 * 励志语录: 业精于勤荒于嬉 行成于思而毁于随
 * 创建时间：2019年9月9日 下午7:11:11    
 * 修改人：Zhangyf 
 * 修改时间：2019年9月9日 下午7:11:11    
 * 修改备注：       
 * @version </pre>    
 */
public class CommonConf {
	
	//短信验证码
	public static final String MEG_CODE = "meg_code";
	
	public static final String APP_KEY = "4ce18f37405d1ee23ea0df9a7a1a7cac";
	
	public static final String APP_SECRET = "2b77f6bac8f2";


    /**
     * 网易短信平台接口地址
     */
    public static final String WANG_YI_SMS="https://api.netease.im/sms/sendcode.action";

    /**
     * 网易appkey
     */
    public static final String WANG_YI_APP_KEY="0696f0fe8da60857f8d1c1f3111c2895";

    /**
     * 网易app
     */
    public static final String WANG_YI_APP_SECRET="5ed66e591225";


    /**
     * 网易短信模板id
     */
    public static final String WANG_YI_TEMPLATEID="14813365";

    /**
     *
     * 短信验证码缓存key
     */
    public static final String SMS_CODE_CACHE="smscode";

    /**
     * 一分钟内不能重复获取短信锁
     */
    public static final String SMS_CODE_LOCK="smscodelock";

}

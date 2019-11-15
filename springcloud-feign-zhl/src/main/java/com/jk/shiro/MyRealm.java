package com.jk.shiro;



import com.jk.model.UserBean;
import com.jk.service.ZhlService;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

import java.util.ArrayList;
import java.util.List;

/**
 * author：wdd
 * create time:2019/10/12
 * email：
 * tel：
 */
public class MyRealm extends AuthorizingRealm {



    //授权
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        //从数据库获取当前用户所拥有的权限：权限表、角色权限关联表、用户角色关联表
        /*UserBean user = (UserBean) principalCollection.getPrimaryPrincipal();
        UserService userService = SpringBeanFactoryUtils.getBean("userService", UserService.class);
        Integer id = user.getId();
        List<String> powerList = userService.findPowerByUserid(id);
        SimpleAuthorizationInfo sai = new SimpleAuthorizationInfo();
        sai.addStringPermissions(powerList);
        return sai;*/
        return null;
    }

    //认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        //获取用户登录的用户名
        String username = (String) authenticationToken.getPrincipal();
        //通过工具类获取bookService
        ZhlService userService = SpringBeanFactoryUtils.getBean("zhlService", ZhlService.class);
        //从数据库获取用户信息
        UserBean user = userService.findUserByName(username);
        if(user==null){
            return null;
        }
        //用户名(存入session)、密码、当前类名
        SimpleAuthenticationInfo sai = new SimpleAuthenticationInfo(user,user.getPassword(),this.getName());
        return sai;
    }
}

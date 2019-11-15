package com.jk.shiro;

import at.pollux.thymeleaf.shiro.dialect.ShiroDialect;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.mgt.SecurityManager;
import org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Properties;

/**
 * author：wdd
 * create time:2019/10/12
 * email：
 * tel：
 */
@Configuration
public class ShiroConfig {

    @Bean
    public ShiroFilterFactoryBean shiroFilter(SecurityManager securityManager){
        ShiroFilterFactoryBean sfb = new ShiroFilterFactoryBean();
        sfb.setSecurityManager(securityManager);//添加securityManager，要不然没法认证
        sfb.setLoginUrl("/user/toLogin");//设置登录页面的地址，默认login页面

        //拦截的规则 K:路径 v:拦截还是不拦截
        //- anon:所有url都都可以匿名访问
        //- authc: 需要认证才能进行访问
        //logout :注销
        Map<String , String> map = new LinkedHashMap<>();
        //map.put("/logout","logout");//注销
        map.put("/zhl/toLogin","anon");
        map.put("/zhl/login","anon");
        map.put("/zhl/kjlogin","anon");
        map.put("/zhl/yanZhengMa","anon");
        map.put("/zhl/kuaiJielogin","anon");
        map.put("/zhl/yanZHKaHao","anon");
        map.put("/zhl/zhuce","anon");
        map.put("/zhl/send","anon");
        //放开静态资源
        map.put("/js/**","anon");
        map.put("/css/**","anon");
        //其他的都拦截
        map.put("/**","authc");
        sfb.setFilterChainDefinitionMap(map);
        return sfb;
    }

    @Bean
    public SecurityManager securityManager(MyRealm myRealm){
        DefaultWebSecurityManager dwsm = new DefaultWebSecurityManager();
        dwsm.setRealm(myRealm);
        return dwsm;
    }

    @Bean
    public MyRealm test(){
        return new MyRealm();
    }

    /**
     *  开启Shiro的注解(如@RequiresRoles,@RequiresPermissions),需借助SpringAOP扫描使用Shiro注解的类,并在必要时进行安全逻辑验证
     * 配置以下两个bean(DefaultAdvisorAutoProxyCreator和AuthorizationAttributeSourceAdvisor)即可实现此功能
     * @return
     */
    @Bean
    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(SecurityManager securityManager) {
        AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor = new AuthorizationAttributeSourceAdvisor();
        authorizationAttributeSourceAdvisor.setSecurityManager(securityManager);
        return authorizationAttributeSourceAdvisor;
    }

    /**
     * 开启AOP注解支持
     * @return
     */
    @Bean
    public DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator() {
        DefaultAdvisorAutoProxyCreator defaultAAP = new DefaultAdvisorAutoProxyCreator();
        defaultAAP.setProxyTargetClass(true);
        return defaultAAP;
    }

    //没有权限跳转到403页面
    @Bean
    public SimpleMappingExceptionResolver exceptionResolver(){
        SimpleMappingExceptionResolver smer = new SimpleMappingExceptionResolver();
        Properties p = new Properties();
        p.setProperty("org.apache.shiro.authz.UnauthorizedException","/page/403");
        smer.setExceptionMappings(p);
        return smer;
    }

    @Bean
    public ShiroDialect shiroDialect(){
        return new ShiroDialect();
    }
}

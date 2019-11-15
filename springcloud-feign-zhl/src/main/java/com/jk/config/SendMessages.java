package com.jk.config;
import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;

public class SendMessages {
    /*public static void Send(String tittle,String value) throws MessagingException{
        Properties properties = new Properties();
        properties.put("mail.transport.protocol", "smtp");// 连接协议
        properties.put("mail.smtp.host", "smtp.qq.com");// 主机名
        properties.put("mail.smtp.port", 465);// 端口号
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.ssl.enable", "true");//设置是否使用ssl安全连接 ---一般都使用
        properties.put("mail.debug", "true");//设置是否显示debug信息 true 会在控制台显示相关信息
        //得到回话对象
        Session session = Session.getInstance(properties);
        // 获取邮件对象
        Message message = new MimeMessage(session);
        //设置发件人邮箱地址
        message.setFrom(new InternetAddress("1027337842@qq.com"));
        //设置收件人地址
        message.setRecipients(MimeMessage.RecipientType.TO, new InternetAddress[]{new InternetAddress("3288584242@qq.com")});
        //设置邮件标题
        message.setSubject(tittle);
        //设置邮件内容
        message.setText(value);
        //得到邮差对象
        Transport transport = session.getTransport();
        //连接自己的邮箱账户
        transport.connect("1027337842@qq.com", "uyxnmzcqcwsubegf");//密码为刚才得到的授权码
        transport.sendMessage(message, message.getAllRecipients());
    }*/

    public static void sendMail(String email, String emailMsg, String aaa) throws AddressException, MessagingException {
        // 1.创建一个程序与邮件服务器会话对象 Session

        Properties props = new Properties();
        props.setProperty("mail.transport.protocol", "SMTP");

        // 163邮箱设置
        // props.setProperty("mail.host", "smtp.163.com");

        // qq邮箱设置
        props.setProperty("mail.host", "smtp.qq.com");

        props.setProperty("mail.smtp.auth", "true");// 指定验证为true

        // 创建验证器
        Authenticator auth = new Authenticator() {
            public PasswordAuthentication getPasswordAuthentication() {
                // 自己的邮箱账号和密码（发送者）{qq邮箱开启登录授权码时会给你一个授权码此授权码就是你登 入邮箱的密码}

                return new PasswordAuthentication("1027337842@qq.com", "uyxnmzcqcwsubegf");// 授权码
            }
        };

        Session session = Session.getInstance(props, auth);

        // 2.创建一个Message，它相当于是邮件内容
        Message message = new MimeMessage(session);

        message.setFrom(new InternetAddress("1027337842@qq.com")); // 设置发送者（自己的邮箱账号）

        message.setRecipient(RecipientType.TO, new InternetAddress(email)); // 设置发送方式与接收者

        message.setSubject(aaa);
        // message.setText("这是一封激活邮件，请<a href='#'>点击</a>");

        message.setContent(emailMsg, "text/html;charset=utf-8");

        // 3.创建 Transport用于将邮件发送

        Transport.send(message);
    }
}

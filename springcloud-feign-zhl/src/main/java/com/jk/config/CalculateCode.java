package com.jk.config;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Date;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class ImgServlet
 */
@WebServlet(name="VerificationCode",urlPatterns="/verificationCode")
public class CalculateCode extends HttpServlet{
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.getWriter().append("Served at: ").append(request.getContextPath());
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int width = 80;  
        int height = 40;  
        int lines = 25;  
        int lines2 = 15;  
        BufferedImage img = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);  
  
        Graphics g = img.getGraphics();  
  
        // 设置背景色  
        g.setColor(Color.WHITE);  
        g.fillRect(0, 0, width, height);  
  
        // 设置字体  
        g.setFont(new Font("宋体", Font.BOLD, 20));  
  
        // 随机数字  
        Random r = new Random(new Date().getTime());  
        String code = "";
        Color c = new Color(r.nextInt(255), r.nextInt(255), r.nextInt(255));  
        g.setColor(c);
        int[] arr = {0,1,2,3,4,5,6,7,8,9,10};
        int first = (int) Math.floor(Math.random()*10);
        int second = (int) Math.floor(Math.random()*10);
        String[] arr2 = {"+","-"};
        int round = (int) Math.round(Math.random());
        if (arr[first] < arr[second]) {
        	g.drawString(arr[second]+arr2[round]+arr[first]+"=?", lines2, lines);  
        }else {
        	g.drawString(arr[first]+arr2[round]+arr[second]+"=?", lines2, lines);  
		}
        HttpSession session = request.getSession(true);
        if (arr2[round].equals("+")) {
        	int sum = arr[first]+arr[second];
        	session.setAttribute("imgcode", sum);
		}else {
			if (arr[first] < arr[second]) {
				int sum = arr[second] - arr[first];
				session.setAttribute("imgcode", sum);
			}
		}
        // 干扰线  
        for (int i = 0; i < 3; i++) {  
            Color c1 = new Color(r.nextInt(255), r.nextInt(255), r.nextInt(255));  
            g.setColor(c1);  
            g.drawLine(r.nextInt(width), r.nextInt(height), r.nextInt(width), r.nextInt(height));  
        }  
  
        g.dispose();// 类似于流中的close()带动flush()---把数据刷到img对象当中  
        // 告诉客户端，输出的格式  
        response.setContentType("image/jpeg");  
        response.reset();
        // 告诉客户端，输出的格式  
        response.setContentType("image/jpeg");  
        ImageIO.write(img, "jpg", response.getOutputStream());  
    }  

}

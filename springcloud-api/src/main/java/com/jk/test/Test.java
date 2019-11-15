package com.jk.test;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;

public class Test {

    public static void main(String[] args) {
        // 具体的金额（单位元）
        String value = "11000";
        BigDecimal bigDecimal = new BigDecimal(value);
         // 转换为万元（除以10000）
        BigDecimal decimal = bigDecimal.divide(new BigDecimal("10000"));
        // 保留两位小数
        DecimalFormat formater = new DecimalFormat("0");
        // 四舍五入
         formater.setRoundingMode(RoundingMode.HALF_UP);

        // 格式化完成之后得出结果
        String formatNum = formater.format(decimal);
        //System.out.println(formatNum);

        double num = 10;
        double val = num /10000;
        String s = Double.toString(val);
        String substring = s.substring(0,s.lastIndexOf(".")+3);
        System.out.println(substring);
    }
}

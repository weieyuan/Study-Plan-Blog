package com.wei.global;

public class PropertiesUtils
{
    public static String getValue(String key)
    {
        return ApplicationContextHelper
                        .getBean(PropertiesAttachment.class).getValue(key);
    }

}

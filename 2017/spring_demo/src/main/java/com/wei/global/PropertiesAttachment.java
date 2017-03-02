package com.wei.global;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class PropertiesAttachment
{
    @Autowired
    private Environment env;
    
    public String getValue(String key)
    {
        return this.env.getProperty(key);
    }
    
}

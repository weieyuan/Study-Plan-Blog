package com.wei.file;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
public class FileUploadController
{
    
    @Autowired
    private FileUploadService fileUploadService;

    @RequestMapping(value="/uploadFile")
    public void uploadFile(MultipartHttpServletRequest request)
    {
        fileUploadService.uploadFile(request);
    }
    
}

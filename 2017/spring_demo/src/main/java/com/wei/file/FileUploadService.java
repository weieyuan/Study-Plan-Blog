package com.wei.file;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.wei.global.PropertiesUtils;

@Service
public class FileUploadService
{

    private static final Logger logger = Logger.getLogger(FileUploadService.class);
    
    public void uploadFile(MultipartHttpServletRequest request)
    {
        Map<String, MultipartFile> files = request.getFileMap();
        for(Map.Entry<String, MultipartFile> oItem : files.entrySet())
        {
            MultipartFile oMultipartFile = oItem.getValue();
            String fileName = PropertiesUtils.getValue("rootFilePath");
            File oFile = new File(fileName + File.separator + oMultipartFile.getOriginalFilename());
            try
            {
                oMultipartFile.transferTo(oFile);
            }
            catch (IllegalStateException e)
            {
                logger.error(e.getMessage());
            }
            catch (IOException e)
            {
                logger.error(e.getMessage());
            }
        }        
    }

}

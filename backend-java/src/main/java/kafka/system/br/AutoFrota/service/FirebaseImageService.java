package kafka.system.br.AutoFrota.service;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

import org.checkerframework.checker.units.qual.s;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.firebase.cloud.StorageClient;

import java.io.IOException;

@Service
public class FirebaseImageService {

    @Value("${firebase.url-bucket}")
    private String urlBucket;

    public String uploadImageToStorage(MultipartFile file, String companyId, String path){

        try{
            String fileName = generateFileName(file.getOriginalFilename(), companyId, path);
            Storage storage = StorageClient.getInstance().bucket().getStorage();
            BlobId blobId = BlobId.of(urlBucket, fileName);
            BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(file.getContentType()).build();
            storage.create(blobInfo, file.getBytes());
            
            String DOWNLOAD_URL = "https://firebasestorage.googleapis.com/v0/b/" + storage.get(blobId).getBucket() + "/o/%s?alt=media";

            return String.format(DOWNLOAD_URL, URLEncoder.encode(fileName, StandardCharsets.UTF_8));

            
            //return fileName;
        }catch(Exception e){
            throw new RuntimeException("Error uploading file");
        }
    }
    
    private String generateFileName(String originalFileName, String companyId, String path) {
        return path + companyId + "/" + UUID.randomUUID().toString() + "-" + originalFileName;
    }
}

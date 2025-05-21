package kafka.system.br.AutoFrota.service;

import java.io.IOException;
import java.net.URLDecoder;
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
import com.google.cloud.storage.StorageOptions;
import com.google.firebase.cloud.StorageClient;

import java.io.IOException;

@Service
public class FirebaseImageService {

    @Value("${firebase.url-bucket}")
    private String urlBucket;

    public String uploadImageToStorage(MultipartFile file, String companyId, String path){

        try{
            String fileName = generateFileName(file.getOriginalFilename(), companyId, path);

            System.out.println("File name: " + fileName);
            System.out.println("File content type: " + file.getContentType());
            System.out.println("File size: " + file.getSize());
            System.out.println("File bytes: " + file.getBytes());
            System.out.println("File original name: " + file.getOriginalFilename());
            System.out.println("File name: " + file.getName());
            System.out.println("File path: " + file);

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

    public Boolean deleteImage(String imageUrl){
        
        String decodedPath = decodedPath(imageUrl);

        Storage storage = StorageClient.getInstance().bucket().getStorage();
        BlobId blobId = BlobId.of(urlBucket, decodedPath);
        Boolean deleted = storage.delete(blobId);

        return deleted;
    }
    
    private String generateFileName(String originalFileName, String companyId, String path) {
        return path + companyId + "/" + UUID.randomUUID().toString() + "-" + originalFileName;
    }

    private String decodedPath(String url){

        int startIndex = url.indexOf("/o/") + 3;
        int endIndex = url.contains("?") ? url.indexOf("?", startIndex) : url.length();
        String encodedPath = url.substring(startIndex, endIndex);

        // Decodifica o caminho
        String decodedPath = URLDecoder.decode(encodedPath, StandardCharsets.UTF_8);

        return decodedPath;
    }
}

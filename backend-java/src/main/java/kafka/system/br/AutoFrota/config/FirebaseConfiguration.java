package kafka.system.br.AutoFrota.config;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import com.google.api.client.util.Value;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import jakarta.annotation.PostConstruct;

@Configuration
@ConfigurationProperties(prefix = "firebase")
public class FirebaseConfiguration {
    
    private String urlBucket;

    public void setUrlBucket(String urlBucket) {
        this.urlBucket = urlBucket;
    }

    @PostConstruct
    public void initialize() {
        System.out.println("Url: " + urlBucket);
        try {
            InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream("softpizza-3602d-firebase-adminsdk-workk-462443c175.json");
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setStorageBucket(urlBucket)
                    .build();
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

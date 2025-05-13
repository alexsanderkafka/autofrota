package kafka.system.br.AutoFrota.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kafka.system.br.AutoFrota.service.FirebaseImageService;
import kafka.system.br.AutoFrota.service.ProfileImageService;

@RestController
@RequestMapping("/profile")
public class ProfileImageController {

    @Autowired
    private ProfileImageService profileImageService;

    @Autowired
    private FirebaseImageService firebaseImageService;
    
    @PutMapping(value = "/company/{companyId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateProfileImageByCompany(
        @PathVariable(value = "companyId") String companyId,
        @RequestParam(value = "file") MultipartFile file 
    ){

        String path = "autofrota/profileImage/";
        var url = firebaseImageService.uploadImageToStorage(file, companyId, path);

        profileImageService.updateProfileImageByCompany(companyId, url);

        //Posso voltar o item que foi atualizado
        return ResponseEntity.noContent().build();
    }
}

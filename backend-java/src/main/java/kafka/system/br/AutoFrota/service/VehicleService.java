package kafka.system.br.AutoFrota.service;

import kafka.system.br.AutoFrota.config.FileStorageConfiguration;
import kafka.system.br.AutoFrota.dto.FuelDTO;
import kafka.system.br.AutoFrota.dto.MaintenanceDTO;
import kafka.system.br.AutoFrota.dto.UpdateVehicleDTO;
import kafka.system.br.AutoFrota.dto.VehicleDTO;
import kafka.system.br.AutoFrota.dto.VehicleStatusDTO;
import kafka.system.br.AutoFrota.exception.VehicleNotFoundException;
import kafka.system.br.AutoFrota.model.Company;
import kafka.system.br.AutoFrota.model.Fuel;
import kafka.system.br.AutoFrota.model.Maintenance;
import kafka.system.br.AutoFrota.model.Vehicle;
import kafka.system.br.AutoFrota.model.VehicleImage;
import kafka.system.br.AutoFrota.model.VehicleStatus;
import kafka.system.br.AutoFrota.repository.CompanyRepository;
import kafka.system.br.AutoFrota.repository.FuelRepository;
import kafka.system.br.AutoFrota.repository.MaintenanceRepository;
import kafka.system.br.AutoFrota.repository.VehicleImageRepository;
import kafka.system.br.AutoFrota.repository.VehicleRepository;
import kafka.system.br.AutoFrota.repository.VehicleStatusRepository;
import kafka.system.br.AutoFrota.utils.TypeVehicleStatusEnum;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Valid;

import org.springframework.util.StringUtils;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private MaintenanceRepository maintenanceRepository;

    @Autowired
    private VehicleImageRepository vehicleImageRepository;

    @Autowired
    private PagedResourcesAssembler<VehicleDTO> pagedResourcesAssembler;

    @Autowired
    private FuelRepository fuelRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired 
    VehicleStatusRepository vehicleStatusRepository;

    @Autowired
    private FirebaseImageService firebaseImageService;

    private final Path fileStorageLocation;

    @Autowired
    public VehicleService(FileStorageConfiguration fileStorageConfiguration) {

        Path path = Paths.get(fileStorageConfiguration.getUploadDir()).toAbsolutePath().normalize();

        this.fileStorageLocation = path;

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception e) {
            //throw new FileStorageException("Could not create the directiry where the upload files will be stored!!!", e);
            throw new RuntimeException("Could not create the directiry where the upload files will be stored!!!");
        }

    }

    public Stream<VehicleDTO> searchRecentVehiclesByCompany(String userId){

        //Verificar se realmenter esse id existe

        Stream<VehicleDTO> currentVehicles = vehicleRepository.findRecentVehiclesByCompany(userId).stream().<VehicleDTO>map(VehicleDTO::new);

        return currentVehicles;
    }

    public VehicleStatusDTO countByStatus(String userId) {

        //Verificar se realmenter esse id existe

        VehicleStatusDTO result = vehicleRepository.findVehicleCountByStatus(userId);

        return result;
    }

    public PagedModel<EntityModel<VehicleDTO>> searchAllVehiclesByCompany(Pageable pageable, String userId, String status) {

        //Verificar se realmenter esse id existe
        //Verificar o status válido

        Page<VehicleDTO> result = vehicleRepository.findAllVehiclesByCompany(userId, status, pageable).map(VehicleDTO::new);


        return pagedResourcesAssembler.toModel(result);
    }

    public VehicleDTO getInfoVehicle(String externalId, Long vehicleId) {
        
        //Verificar se realmenter esse id existe
        //Precisa verificar o null

        Vehicle result = vehicleRepository.findInfosByVehicleIdAndCompany(externalId, vehicleId);//.orsElseThrow(() -> new RuntimeException("Vehicle not found"));

        VehicleDTO vehicleDto = new VehicleDTO(result);

        return vehicleDto;
    }

    public void save(String image, String companyId, VehicleDTO dto) {

        //Verificar se a placa é válida

        VehicleImage vehicleImage = new VehicleImage();
        vehicleImage.setUrl(image);

        VehicleImage savedVehicleImage = vehicleImageRepository.save(vehicleImage);

        Company company = companyRepository.findByExternalId(companyId);

        VehicleStatus vehicleStatus = vehicleStatusRepository.findByVehicleStatusByType(TypeVehicleStatusEnum.ACTIVE.toString());

        System.out.println("Vehicle status id: " + vehicleStatus.getId());

        Vehicle vehicle = new Vehicle(
            dto.plate(),
            dto.brand(),
            dto.model(),
            dto.typeFuel(),
            dto.km(),
            dto.category(),
            true,
            savedVehicleImage,
            company,
            vehicleStatus
        );

        vehicleRepository.save(vehicle);

        //vehicle.setPlate(dto.plate());

        //return image;
    }

    public void updateVehicleStatus(UpdateVehicleDTO dto) {
        Vehicle vehicle = vehicleRepository.findById(dto.id()).orElseThrow(() -> new VehicleNotFoundException("Vehicle not found"));

        //Verifica vehicle status se existe em TypeVehicleStatusEnum

        VehicleStatus vehicleStatus = vehicleStatusRepository.findByVehicleStatusByType(dto.vehicleStatus().toUpperCase());


        vehicle.setVehicleStatus(vehicleStatus);

        vehicleRepository.save(vehicle);
    }

    public void deleteVehicle(String companyId, Long vehicleId) {
        Vehicle vehicle = vehicleRepository.findInfosByVehicleIdAndCompany(companyId, vehicleId);

        if(vehicle == null) throw new VehicleNotFoundException("Vehicle not found");

        firebaseImageService.deleteImage(vehicle.getVehicleImage().getUrl());

        vehicleRepository.delete(vehicle);
    }
}



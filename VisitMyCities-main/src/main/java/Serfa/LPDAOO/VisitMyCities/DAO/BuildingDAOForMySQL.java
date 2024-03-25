package Serfa.LPDAOO.VisitMyCities.DAO;

import Serfa.LPDAOO.VisitMyCities.controller.BuildingDTO;
import Serfa.LPDAOO.VisitMyCities.models.Architect;
import Serfa.LPDAOO.VisitMyCities.models.Building;
import Serfa.LPDAOO.VisitMyCities.models.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BuildingDAOForMySQL extends JpaRepository<Building, Long> {

    default ResponseEntity<Building> save(BuildingDTO buildingDTO) {
        if(buildingDTO.latitude() == 0 || buildingDTO.longitude() == 0) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        Building newBuilding = new Building();
        if(buildingDTO.name() != null) {
            newBuilding.setName(buildingDTO.name());
        }
        if(buildingDTO.address() != null) {
            newBuilding.setAddress(buildingDTO.address());
        }
        if(buildingDTO.startBuild() != 0) {
            newBuilding.setStartBuild(buildingDTO.startBuild());
        }
        if(buildingDTO.endBuild() != 0) {
            newBuilding.setEndBuild(buildingDTO.endBuild());
        }
        if(buildingDTO.description() != null) {
            newBuilding.setDescription(buildingDTO.description());
        }
        newBuilding.setLatitude(buildingDTO.latitude());
        newBuilding.setLongitude(buildingDTO.longitude());
        if(buildingDTO.architects() != null) {
            newBuilding.setArchitects(buildingDTO.architects());
        }
        if(buildingDTO.architect() != null) {
            newBuilding.getArchitects().add(buildingDTO.architect());
        }
        if(buildingDTO.photos() != null) {
            newBuilding.setPhotos(buildingDTO.photos());
        }
        if(buildingDTO.photo() != null) {
            newBuilding.getPhotos().add(buildingDTO.photo());
        }
        save(newBuilding);
        return new ResponseEntity<>(newBuilding, HttpStatus.OK);
    }

    default ResponseEntity<Building> update(long id, BuildingDTO buildingDTOFromAPI) {
        Optional<Building> buildingToUpdate = findById(id);
        if(buildingToUpdate.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if(buildingDTOFromAPI.name() != null) {
            buildingToUpdate.get().setName(buildingDTOFromAPI.name());
        }
        if(buildingDTOFromAPI.address() != null) {
            buildingToUpdate.get().setAddress(buildingDTOFromAPI.address());
        }
        if(buildingDTOFromAPI.startBuild() != 0) {
            buildingToUpdate.get().setStartBuild(buildingDTOFromAPI.startBuild());
        }
        if(buildingDTOFromAPI.endBuild() != 0) {
            buildingToUpdate.get().setEndBuild(buildingDTOFromAPI.endBuild());
        }
        if(buildingDTOFromAPI.description() != null) {
            buildingToUpdate.get().setDescription(buildingDTOFromAPI.description());
        }
        if(buildingDTOFromAPI.latitude() != 0) {
            buildingToUpdate.get().setLatitude(buildingDTOFromAPI.latitude());
        }
        if(buildingDTOFromAPI.longitude() != 0) {
            buildingToUpdate.get().setLongitude(buildingDTOFromAPI.longitude());
        }
        if(buildingDTOFromAPI.architect() != null) {
            buildingToUpdate.get().getArchitects().add(buildingDTOFromAPI.architect());
        }
        if(buildingDTOFromAPI.photo() != null) {
            buildingToUpdate.get().getPhotos().add(buildingDTOFromAPI.photo());
        }
        save(buildingToUpdate.get());
        return new ResponseEntity<>(buildingToUpdate.get(), HttpStatus.OK);
    }

    default ResponseEntity<Building> addArchitectToOneBuilding(long id, Architect architectToAdd) {
        Optional<Building> buildingToUpdate = findById(id);
        if(buildingToUpdate.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        buildingToUpdate.get().getArchitects().add(architectToAdd);
        save(buildingToUpdate.get());
        return new ResponseEntity<>(buildingToUpdate.get(), HttpStatus.OK);
    }

    default ResponseEntity<Building> removeAchitectFromOneBuilding(long id, Architect architectToRemove) {
        Optional<Building> buildingToUpdate = findById(id);
        if(buildingToUpdate.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        buildingToUpdate.get().getArchitects().remove(architectToRemove);
        save(buildingToUpdate.get());
        return new ResponseEntity<>(buildingToUpdate.get(), HttpStatus.OK);
    }

    // Récupérer tous les bâtiments à partir de l'id d'un architect
    List<Building> findByArchitects_Id(Long id);

    // Méthode qui supprime une photo de la liste d'un bâtiment...
    // et donc de la BDD comme une photo est obligatoirement liée à un bâtiment.
    default ResponseEntity<Building> removeOnePhoto(long buildingId, Photo photoToRemove) {
        Optional<Building> buildingOptional = findById(buildingId);
        if(buildingOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Building buildingToUpdate = buildingOptional.get();
        buildingToUpdate.getPhotos().remove(photoToRemove);
        save(buildingToUpdate);
        return new ResponseEntity<>(buildingToUpdate, HttpStatus.OK);
    }

    @Query("select b.architects from Building b where b.id = :id")
    List<Architect> findArchitectsByBuildingId(@Param("id") long id);

    @Query("select b.photos from Building b where b.id = :id")
    List<Photo> findPhotosByBuildingId(@Param("id") long id);
}

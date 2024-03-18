package Serfa.LPDAOO.VisitMyCities.DAO;

import Serfa.LPDAOO.VisitMyCities.controller.BuildingDTO;
import Serfa.LPDAOO.VisitMyCities.models.Building;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BuildingDAOForMySQL extends JpaRepository<Building, Long> {

    default Building save(BuildingDTO buildingDTO) {
        if(buildingDTO.latitude() == 0 || buildingDTO.longitude() == 0) {
            throw new RuntimeException("Coordonnées du bâtiment manquantes");
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
        if(buildingDTO.architect() != null) {
            newBuilding.setArchitect(buildingDTO.architect());
        }
        save(newBuilding);
        return newBuilding;
    }

    default Building update(int id, BuildingDTO buildingDTOFromAPI) {
        Optional<Building> buildingToUpdate = findById((long) id);
        if(buildingToUpdate.isEmpty()) {
            throw new RuntimeException("Architecte inconnu");
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
            buildingToUpdate.get().setArchitect(buildingDTOFromAPI.architect());
        }
        save(buildingToUpdate.get());
        return buildingToUpdate.get();
    }
}

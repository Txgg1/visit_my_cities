package Serfa.LPDAOO.VisitMyCities.DAO;

import Serfa.LPDAOO.VisitMyCities.controller.CityDTO;
import Serfa.LPDAOO.VisitMyCities.models.Building;
import Serfa.LPDAOO.VisitMyCities.models.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CityDAOForMySQL extends JpaRepository<City, Long> {

    default ResponseEntity<City> save(CityDTO cityDTO) {
        if(cityDTO.name() == null) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        City newCity = new City();
        newCity.setName(cityDTO.name());
        if(cityDTO.description() != null) {
            newCity.setDescription(cityDTO.description());
        }
        if(cityDTO.latitude() != 0) {
            newCity.setLatitude(cityDTO.latitude());
        }
        if(cityDTO.longitude() != 0) {
            newCity.setLongitude(cityDTO.longitude());
        }
        save(newCity);
        return new ResponseEntity<>(newCity, HttpStatus.OK);
    }

    default ResponseEntity<City> update(long id, CityDTO cityDTOFromAPI) {
        Optional<City> cityOptional = findById(id);
        if (cityOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        City cityToUpdate = cityOptional.get();
        if(cityDTOFromAPI.name() != null) {
            cityToUpdate.setName(cityDTOFromAPI.name());
        }
        if(cityDTOFromAPI.description() != null) {
            cityToUpdate.setDescription(cityDTOFromAPI.description());
        }
        if(cityDTOFromAPI.latitude() != 0) {
            cityToUpdate.setLatitude(cityDTOFromAPI.latitude());
        }
        if(cityDTOFromAPI.longitude() != 0) {
            cityToUpdate.setLongitude(cityDTOFromAPI.longitude());
        }
        save(cityToUpdate);
        return new ResponseEntity<>(cityToUpdate, HttpStatus.OK);
    }

    // Méthode qui ajoute un bâtiment déjà existant à une ville
    default ResponseEntity<City> addOneExistingBuildingToCity(long cityId, Building buildingToAdd) {
        Optional<City> cityOptional = findById(cityId);
        if(cityOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        City cityToUpdate = cityOptional.get();
        System.out.println(cityToUpdate.getName() + ", " + cityToUpdate.getDescription());
        cityToUpdate.getBuildings().add(buildingToAdd);
        save(cityToUpdate);
        return new ResponseEntity<>(cityToUpdate, HttpStatus.OK);
    }

    // Méthode qui enlève un bâtiment de la liste d'une ville
    default ResponseEntity<City> removeOneBuilding(long cityId, Building buildingToRemove) {
        Optional<City> cityOptional = findById(cityId);
        if(cityOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        City cityToUpdate = cityOptional.get();
        cityToUpdate.getBuildings().remove(buildingToRemove);
        save(cityToUpdate);
        return new ResponseEntity<>(cityToUpdate, HttpStatus.OK);
    }

    // Méthode qui renvoie la ville où se situe le bâtiment.
    // S'il n'appartient à aucune ville, renvoie null.
    City findByBuildings_Id(Long id);

    // Renvoie une liste de bâtiments en fonction de la ville
    @Query("select c.buildings from City c where c.id = :id")
    List<Building> findBuildingByCityId(@Param("id") long id);

    // Récupérer une ville en fonction de son nom
    City findByNameLike(String name);

}

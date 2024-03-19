package Serfa.LPDAOO.VisitMyCities.DAO;
import Serfa.LPDAOO.VisitMyCities.controller.CityDTO;
import Serfa.LPDAOO.VisitMyCities.models.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CityDAOForMySQL extends JpaRepository<City, Long> {

    default City save(CityDTO cityDTO) {
        if(cityDTO.name() == null) {
            throw new RuntimeException("Nom de la localité manquant");
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
        return newCity;
    }

    default City update(int id, CityDTO cityDTOFromAPI) {
        Optional<City> cityToUpdate = findById((long) id);
        if(cityToUpdate.isEmpty()) {
            throw new RuntimeException("Ville inconnue");
        }
        if(cityDTOFromAPI.name() != null) {
            cityToUpdate.get().setName(cityDTOFromAPI.name());
        }
        if(cityDTOFromAPI.description() != null) {
            cityToUpdate.get().setDescription(cityDTOFromAPI.description());
        }
        if(cityDTOFromAPI.latitude() != 0) {
            cityToUpdate.get().setLatitude(cityDTOFromAPI.latitude());
        }
        if(cityDTOFromAPI.longitude() != 0) {
            cityToUpdate.get().setLongitude(cityDTOFromAPI.longitude());
        }
        save(cityToUpdate.get());
        return cityToUpdate.get();
    }
}

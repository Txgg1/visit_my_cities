package Serfa.LPDAOO.VisitMyCities.controller;

import Serfa.LPDAOO.VisitMyCities.DAO.BuildingDAOForMySQL;
import Serfa.LPDAOO.VisitMyCities.DAO.CityDAOForMySQL;
import Serfa.LPDAOO.VisitMyCities.models.Building;
import Serfa.LPDAOO.VisitMyCities.models.City;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cities")
public class CityController {

    private CityDAOForMySQL cities;
    private BuildingDAOForMySQL buildings;

    public CityController(CityDAOForMySQL cities, BuildingDAOForMySQL buildings) {
        this.cities = cities;
        this.buildings = buildings;
    }

    @GetMapping("")
    public List<City> getCities() {
        return this.cities.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<City> getCityById(@PathVariable long id) {
        Optional<City> city = this.cities.findById(id);
        if (city.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(city.get(), HttpStatus.OK);
    }

    // Récupérer une ville en fonction de son nom
    @GetMapping("/name/{name}")
    public ResponseEntity<City> getCityByName(@PathVariable String name) {
        City city = this.cities.findByNameLike(name);
        if (city == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(city, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<City> addCity(@RequestBody CityDTO cityDTOFromAPI) {
        return cities.save(cityDTOFromAPI);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<City> deleteCity(@PathVariable long id) {
        Optional<City> cityToDelete = this.cities.findById(id);
        if (cityToDelete.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        this.cities.deleteById(id);
        return new ResponseEntity<>(cityToDelete.get(), HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<City> updateCity(@PathVariable long id, @RequestBody CityDTO cityDTOFromAPI) {
        return this.cities.update(id, cityDTOFromAPI);
    }

    // Chemin pour ajouter un bâtiment déjà existant à une ville
    @PatchMapping("/{id}/buildingToAdd/{building_id}")
    public ResponseEntity<City> addOneExistingBuilding(@PathVariable long id, @PathVariable long building_id) {
        Optional<Building> buildingOptional = this.buildings.findById(building_id);
        if(buildingOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Building buildingToAdd = buildingOptional.get();
        return this.cities.addOneExistingBuildingToCity(id, buildingToAdd);
    }

    @PatchMapping("/{id}/buildingToRemove/{building_id}")
    public ResponseEntity<City> removeOneBuilding(@PathVariable long id, @PathVariable long building_id) {
        Optional<Building> buildingOptional = this.buildings.findById(building_id);
        if(buildingOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Building buildingToRemove = buildingOptional.get();
        return this.cities.removeOneBuilding(id, buildingToRemove);
    }

    // Renvoie la ville où se situe le bâtiment envoyé en paramètre
    @GetMapping("/building/{building_id}")
    public ResponseEntity<City> getCityWithThatBuilding(@PathVariable long building_id) {
        Optional<Building> buildingOptional = this.buildings.findById(building_id);
        if(buildingOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(this.cities.findByBuildings_Id(building_id), HttpStatus.OK);
    }

    @GetMapping("/buildings/{id}")
    public ResponseEntity<List<Building>> getAllBuilduingsFromOneCity(@PathVariable long id) {
        Optional<City> cityOptional = this.cities.findById(id);
        if (cityOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(this.cities.findBuildingByCityId(id), HttpStatus.OK);
    }
}

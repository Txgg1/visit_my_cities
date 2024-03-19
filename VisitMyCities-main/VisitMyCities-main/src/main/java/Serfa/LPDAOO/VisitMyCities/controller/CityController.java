package Serfa.LPDAOO.VisitMyCities.controller;

import Serfa.LPDAOO.VisitMyCities.DAO.CityDAOForMySQL;
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

    public CityController(CityDAOForMySQL cities) {
        this.cities = cities;
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

    @PostMapping("")
    public City addCity(@RequestBody CityDTO cityDTOFromAPI) {
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
    public City updateCity(@PathVariable int id, @RequestBody CityDTO cityDTOFromAPI) {
        return this.cities.update(id, cityDTOFromAPI);
    }
}

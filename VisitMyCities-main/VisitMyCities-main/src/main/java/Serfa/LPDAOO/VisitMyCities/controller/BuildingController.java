package Serfa.LPDAOO.VisitMyCities.controller;

import Serfa.LPDAOO.VisitMyCities.DAO.BuildingDAOForMySQL;
import Serfa.LPDAOO.VisitMyCities.models.Building;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/buildings")
public class BuildingController {

    private BuildingDAOForMySQL buildings;

    public BuildingController(BuildingDAOForMySQL buildings) {
        this.buildings = buildings;
    }

    @GetMapping("")
    public List<Building> getBuildings() {
        return this.buildings.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Building> getBuildingById(@PathVariable long id) {
        Optional<Building> building = this.buildings.findById(id);
        if (building.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(building.get(), HttpStatus.OK);
    }

    @PostMapping("")
    public Building addBuilding(@RequestBody BuildingDTO buildingDTOFromAPI) {
        return buildings.save(buildingDTOFromAPI);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Building> deleteBuilding(@PathVariable long id) {
        Optional<Building> buildingToDelete = this.buildings.findById(id);
        if (buildingToDelete.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        this.buildings.deleteById(id);
        return new ResponseEntity<>(buildingToDelete.get(), HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public Building updateBuilding(@PathVariable int id, @RequestBody BuildingDTO buildingDTOFromAPI) {
        return this.buildings.update(id, buildingDTOFromAPI);
    }
}

package Serfa.LPDAOO.VisitMyCities.controller;

import Serfa.LPDAOO.VisitMyCities.DAO.ArchitectDAOForMySQL;
import Serfa.LPDAOO.VisitMyCities.DAO.BuildingDAOForMySQL;
import Serfa.LPDAOO.VisitMyCities.DAO.PhotoDAOForMySQL;
import Serfa.LPDAOO.VisitMyCities.DAO.TypeDAOForMySQL;
import Serfa.LPDAOO.VisitMyCities.models.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/buildings")
public class BuildingController {

    private BuildingDAOForMySQL buildings;
    private TypeDAOForMySQL types;
    private ArchitectDAOForMySQL architects;
    private PhotoDAOForMySQL photos;

    public BuildingController(BuildingDAOForMySQL buildings, TypeDAOForMySQL types, ArchitectDAOForMySQL architects, PhotoDAOForMySQL photos) {
        this.buildings = buildings;
        this.types = types;
        this.architects = architects;
        this.photos = photos;
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

    // Récupérer tous les bâtiments à partir de l'id du type
    @GetMapping("/type/{type_id}")
    public ResponseEntity<List<Building>> getBuildingsByTypeId(@PathVariable long type_id) {
        Optional<Type> typeOptional = this.types.findById(type_id);
        if (typeOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(this.buildings.findByType_Id(typeOptional.get().getId()), HttpStatus.OK);
    }

    // Récupérer tous les bâtiments à partir de l'id d'un architect
    @GetMapping("/architect/{architect_id}")
    public ResponseEntity<List<Building>> getBuildingsByArchitectId(@PathVariable long architect_id) {
        Optional<Architect> architectOptional = this.architects.findById(architect_id);
        if (architectOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(this.buildings.findByArchitects_Id(architectOptional.get().getId()), HttpStatus.OK);
    }


    @GetMapping("/{id}/architects")
    public ResponseEntity<List<Architect>> getAllArchitectsFromOneBuilduing(@PathVariable long id) {
        Optional<Building> buildingOptional = this.buildings.findById(id);
        if (buildingOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(this.buildings.findArchitectsByBuildingId(id), HttpStatus.OK);
    }

    @GetMapping("/{id}/photos")
    public ResponseEntity<List<Photo>> getAllPhotosFromOneBuilduing(@PathVariable long id) {
        Optional<Building> buildingOptional = this.buildings.findById(id);
        if (buildingOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(this.buildings.findPhotosByBuildingId(id), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Building> addBuilding(@RequestBody BuildingDTO buildingDTOFromAPI) {
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
    public ResponseEntity<Building> updateBuilding(@PathVariable long id, @RequestBody BuildingDTO buildingDTOFromAPI) {
        return this.buildings.update(id, buildingDTOFromAPI);
    }

    @PatchMapping("/{id}/typeToSet/{type_id}")
    public ResponseEntity<Building> setTypeToOneBuilding(@PathVariable long id, @PathVariable long type_id) {
        Optional<Type> typeToSet = this.types.findById(type_id);
        if (typeToSet.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        BuildingDTO buildingDTO = new BuildingDTO(null, null, 0, 0, null, 0, 0, typeToSet.get(), null, null, null, null);
        return this.buildings.update(id, buildingDTO);
    }

    @PatchMapping("/{id}/architectToAdd/{architect_id}")
    public ResponseEntity<Building> addArchitectToOneBuilding(@PathVariable long id, @PathVariable long architect_id) {
        Optional<Architect> architectToAdd = this.architects.findById(architect_id);
        if (architectToAdd.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return this.buildings.addArchitectToOneBuilding(id, architectToAdd.get());
    }

    @PatchMapping("/{id}/architectToRemove/{architect_id}")
    public ResponseEntity<Building> removeArchitectFromOneBuilding(@PathVariable long id, @PathVariable long architect_id) {
        Optional<Architect> architectToRemove = this.architects.findById(architect_id);
        if (architectToRemove.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return this.buildings.removeAchitectFromOneBuilding(id, architectToRemove.get());
    }

    @PatchMapping("/{id}/photoToRemove/{photo_id}")
    public ResponseEntity<Building> removePhotoFromOneBuilding(@PathVariable long id, @PathVariable long photo_id) {
        Optional<Photo> photoToRemove = this.photos.findById(photo_id);
        if (photoToRemove.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return this.buildings.removeOnePhoto(id, photoToRemove.get());
    }

}

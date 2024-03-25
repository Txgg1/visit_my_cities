package Serfa.LPDAOO.VisitMyCities.controller;

import Serfa.LPDAOO.VisitMyCities.controller.PhotoDTO;

import Serfa.LPDAOO.VisitMyCities.DAO.BuildingDAOForMySQL;
import Serfa.LPDAOO.VisitMyCities.DAO.PhotoDAOForMySQL;
import Serfa.LPDAOO.VisitMyCities.models.Building;
import Serfa.LPDAOO.VisitMyCities.models.Photo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/photos")
public class PhotoController {

    private PhotoDAOForMySQL photos;
    private BuildingDAOForMySQL buildings;

    public PhotoController(PhotoDAOForMySQL photos, BuildingDAOForMySQL buildings) {
        this.photos = photos;
        this.buildings = buildings;
    }

    @GetMapping("")
    public List<Photo> getPhotos() {
        return this.photos.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Photo> getPhotoById(@PathVariable long id) {
        Optional<Photo> photoOptional = this.photos.findById(id);
        if (photoOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(photoOptional.get(), HttpStatus.OK);
    }

    // Comme une photo est obligatoirement rattachée à un bâtiment
    // L'id du bâtiment est passé dans la route au moment de la création de la photo
    // Pour l'intégrer directement à la liste de photos du bâtiment
    @PostMapping("/building/{building_id}")
    public ResponseEntity<Photo> addPhoto(@PathVariable long building_id, @RequestBody PhotoDTO photoDTOFromAPI) {
        Optional<Building> buildingOptional = this.buildings.findById(building_id);
        if(buildingOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Building building = buildingOptional.get();

        photoDTOFromAPI.setImagePath("C:\\Users\\Togg1\\Desktop\\Mobile\\ProjectTwo\\ImagesBuildingsBDD\\building_photo_" + building_id + ".jpeg");

        return this.photos.save(photoDTOFromAPI, building);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Photo> deletePhoto(@PathVariable long id) {
        return this.photos.delete(id);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Photo> updatePhoto(@PathVariable long id, @RequestBody PhotoDTO photoDTOFromAPI) {
        return this.photos.update(id, photoDTOFromAPI);
    }
}

package Serfa.LPDAOO.VisitMyCities.DAO;

import Serfa.LPDAOO.VisitMyCities.controller.PhotoDTO;
import Serfa.LPDAOO.VisitMyCities.models.Building;
import Serfa.LPDAOO.VisitMyCities.models.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PhotoDAOForMySQL extends JpaRepository<Photo, Long> {

    default ResponseEntity<Photo> save(PhotoDTO photoDTO, Building building) {
        if(photoDTO.url() == null) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        Photo newPhoto = new Photo();
        newPhoto.setUrl(photoDTO.url());
        building.getPhotos().add(newPhoto);
        save(newPhoto);
        return new ResponseEntity<>(newPhoto, HttpStatus.OK);
    }

    default ResponseEntity<Photo> delete(long id) {
        Optional<Photo> photoToDelete = findById(id);
        if(photoToDelete.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        deleteById(id);
        return new ResponseEntity<>(photoToDelete.get(), HttpStatus.OK);
    }

    default ResponseEntity<Photo> update(long id, PhotoDTO photoDTO) {
        Optional<Photo> photoToUpdate = findById(id);
        if(photoToUpdate.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if(photoDTO.url() != null) {
            photoToUpdate.get().setUrl(photoDTO.url());
        }
        save(photoToUpdate.get());
        return new ResponseEntity<>(photoToUpdate.get(), HttpStatus.OK);
    }
}

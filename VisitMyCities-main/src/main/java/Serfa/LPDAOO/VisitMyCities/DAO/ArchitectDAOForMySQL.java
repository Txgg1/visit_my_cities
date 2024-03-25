package Serfa.LPDAOO.VisitMyCities.DAO;

import Serfa.LPDAOO.VisitMyCities.controller.ArchitectDTO;
import Serfa.LPDAOO.VisitMyCities.models.Architect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArchitectDAOForMySQL extends JpaRepository<Architect, Long> {

    default ResponseEntity<Architect> save(ArchitectDTO architectDTO) {
        if(architectDTO.name() == null && architectDTO.firstname() == null) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        Architect newArchitect = new Architect();
        if(architectDTO.name() != null) {
            newArchitect.setName(architectDTO.name());
        }
        if(architectDTO.firstname() != null) {
            newArchitect.setFirstname(architectDTO.firstname());
        }
        save(newArchitect);
        return new ResponseEntity<>(newArchitect, HttpStatus.OK);
    }

    default ResponseEntity<Architect> update(long id, ArchitectDTO architectDTOFromAPI) {
        Optional<Architect> architectToUpdate = findById(id);
        if(architectToUpdate.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if(architectDTOFromAPI.name() != null) {
            architectToUpdate.get().setName(architectDTOFromAPI.name());
        }
        if(architectDTOFromAPI.firstname() != null) {
            architectToUpdate.get().setFirstname(architectDTOFromAPI.firstname());
        }
        save(architectToUpdate.get());
        return new ResponseEntity<>(architectToUpdate.get(), HttpStatus.OK);
    }
}

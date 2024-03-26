package Serfa.LPDAOO.VisitMyCities.DAO;

import Serfa.LPDAOO.VisitMyCities.controller.TypeDTO;
import Serfa.LPDAOO.VisitMyCities.models.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TypeDAOForMySQL extends JpaRepository<Type, Long> {

    default ResponseEntity<Type> save(TypeDTO typeDTO) {
        if(typeDTO.label() == null) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        Type newType = new Type();
        newType.setLabel(typeDTO.label());
        save(newType);
        return new ResponseEntity<>(newType, HttpStatus.OK);
    }

    default ResponseEntity<Type> delete(long id) {
        Optional<Type> typeToDelete = findById(id);
        if(typeToDelete.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        deleteById(id);
        return new ResponseEntity<>(typeToDelete.get(), HttpStatus.OK);
    }

    default ResponseEntity<Type> update(long id, TypeDTO typeDTO) {
        Optional<Type> typeToUpdate = findById(id);
        if(typeToUpdate.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if(typeDTO.label() != null) {
            typeToUpdate.get().setLabel(typeDTO.label());
        }
        save(typeToUpdate.get());
        return new ResponseEntity<>(typeToUpdate.get(), HttpStatus.OK);
    }
}

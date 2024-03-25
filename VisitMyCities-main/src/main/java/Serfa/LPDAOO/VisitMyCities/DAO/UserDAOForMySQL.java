package Serfa.LPDAOO.VisitMyCities.DAO;

import Serfa.LPDAOO.VisitMyCities.controller.UserDTO;
import Serfa.LPDAOO.VisitMyCities.models.Building;
import Serfa.LPDAOO.VisitMyCities.models.ERole;
import Serfa.LPDAOO.VisitMyCities.models.Photo;
import Serfa.LPDAOO.VisitMyCities.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserDAOForMySQL extends JpaRepository<User, Long> {

    default ResponseEntity<User> save(UserDTO userDTO) {
        if(userDTO.mail() == null) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
        User newUser = new User();
        newUser.setMail(userDTO.mail());
        if(userDTO.name() != null) {
            newUser.setName(userDTO.name());
        }
        if(userDTO.firstname() != null) {
            newUser.setFirstname(userDTO.firstname());
        }
        if(userDTO.password() != null) {
            newUser.setPassword(userDTO.password());
        }
        save(newUser);
        return new ResponseEntity<>(newUser, HttpStatus.OK);
    }

    default ResponseEntity<User> delete(long id) {
        Optional<User> userToDelete = findById(id);
        if(userToDelete.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        deleteById(id);
        return new ResponseEntity<>(userToDelete.get(), HttpStatus.OK);
    }

    default ResponseEntity<User> update(long id, UserDTO userDTO) {
        Optional<User> userToUpdate = findById(id);
        if(userToUpdate.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if(userDTO.mail() != null) {
            userToUpdate.get().setMail(userDTO.mail());
        }
        if(userDTO.name() != null) {
            userToUpdate.get().setName(userDTO.name());
        }
        if(userDTO.firstname() != null) {
            userToUpdate.get().setFirstname(userDTO.firstname());
        }
        if(userDTO.password() != null) {
            userToUpdate.get().setPassword(userDTO.password());
        }
        save(userToUpdate.get());
        return new ResponseEntity<>(userToUpdate.get(), HttpStatus.OK);
    }

    Optional<User> findByMail(String mail);

    default ResponseEntity<User> promoteToExpert(long id) {
        Optional<User> userOptional = findById(id);
        if(userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        User userToPromote = userOptional.get();
        userToPromote.setRole(ERole.EXPERT);
        save(userToPromote);
        return new ResponseEntity<>(userToPromote, HttpStatus.OK);
    }

    default ResponseEntity<User> demoteToVisitor(long id) {
        Optional<User> userOptional = findById(id);
        if(userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        User userToDemote = userOptional.get();
        userToDemote.setRole(ERole.VISITEUR);
        save(userToDemote);
        return new ResponseEntity<>(userToDemote, HttpStatus.OK);
    }

    default ResponseEntity<User> addBuildingToAUser(long id, Building buildingToAdd) {
        Optional<User> UserToUpdate = findById(id);
        if(UserToUpdate.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        UserToUpdate.get().getBuildings().add(buildingToAdd);
        save(UserToUpdate.get());
        return new ResponseEntity<>(UserToUpdate.get(), HttpStatus.OK);
    }

    default ResponseEntity<User> removeBuildingFromAUser(long id, Building buildingToRemove) {
        Optional<User> UserToUpdate = findById(id);
        if(UserToUpdate.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        UserToUpdate.get().getBuildings().remove(buildingToRemove);
        save(UserToUpdate.get());
        return new ResponseEntity<>(UserToUpdate.get(), HttpStatus.OK);
    }

    @Query("select u.buildings from User u where u.id = :id")
    List<Building> findBuildingsByUserId(@Param("id") long id);
}

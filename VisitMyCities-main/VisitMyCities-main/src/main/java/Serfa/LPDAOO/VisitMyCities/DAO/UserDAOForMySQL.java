package Serfa.LPDAOO.VisitMyCities.DAO;

import Serfa.LPDAOO.VisitMyCities.controller.UserDTO;
import Serfa.LPDAOO.VisitMyCities.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDAOForMySQL extends UserDAO, JpaRepository<User, Long> {

    @Override
    default UserDTO save(UserDTO userDTO) {
        if(userDTO.mail() == null) {
            throw new RuntimeException("Mail manquant");
        }
        User newUser = new User(userDTO.mail());
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
        return userDTO;
    }

    @Override
    default User delete(int id) {
        Optional<User> UserToDelete = findById((long) id);
        if(UserToDelete.isEmpty()) {
            throw new RuntimeException("Utilisateur inconnu");
        }
        deleteById((long) id);
        return UserToDelete.get();
    }

    @Override
    default User update(int id, UserDTO userDTO) {
        Optional<User> UserToUpdate = findById((long) id);
        if(UserToUpdate.isEmpty()) {
            throw new RuntimeException("Utilisateur inconnu");
        }
        if(userDTO.mail() != null) {
            UserToUpdate.get().setMail(userDTO.mail());
        }
        if(userDTO.name() != null) {
            UserToUpdate.get().setName(userDTO.name());
        }
        if(userDTO.firstname() != null) {
            UserToUpdate.get().setFirstname(userDTO.firstname());
        }
        if(userDTO.password() != null) {
            UserToUpdate.get().setPassword(userDTO.password());
        }
        save(UserToUpdate.get());
        return UserToUpdate.get();
    }
}

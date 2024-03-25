package Serfa.LPDAOO.VisitMyCities.controller;

import Serfa.LPDAOO.VisitMyCities.DAO.BuildingDAOForMySQL;
import Serfa.LPDAOO.VisitMyCities.DAO.UserDAOForMySQL;
import Serfa.LPDAOO.VisitMyCities.models.Building;
import Serfa.LPDAOO.VisitMyCities.models.Photo;
import Serfa.LPDAOO.VisitMyCities.models.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserDAOForMySQL users;
    private BuildingDAOForMySQL buildings;

    public UserController(UserDAOForMySQL users, BuildingDAOForMySQL buildings) {
        this.users = users;
        this.buildings = buildings;
    }

    @GetMapping("")
    public List<User> getUsers() {
        return this.users.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable long id) {
        Optional<User> user = this.users.findById(id);
        if (user.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user.get(), HttpStatus.OK);
    }

    @GetMapping("/mail/{mail}")
    public ResponseEntity<User> getUserByMail(@PathVariable String mail) {
        Optional<User> user = this.users.findByMail(mail);
        if (user.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user.get(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable long id) {
        return this.users.delete(id);
    }

    @PostMapping("")
    public ResponseEntity<User> addUser(@RequestBody UserDTO userDTOFromAPI) {
        return this.users.save(userDTOFromAPI);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable long id, @RequestBody UserDTO userDTOFromAPI) {
        return this.users.update(id, userDTOFromAPI);
    }

    @PatchMapping("/role/{id}")
    public ResponseEntity<User> promoteToExpert(@PathVariable long id) {
        return this.users.promoteToExpert(id);
    }

    @PatchMapping("/role/demote/{id}")
    public ResponseEntity<User> demoteToVisitor(@PathVariable long id) {
        return this.users.demoteToVisitor(id);
    }

    @PatchMapping("/{id}/buildingToAdd/{building_id}")
    public ResponseEntity<User> addBuildingToAUser(@PathVariable long id, @PathVariable long building_id) {
        Optional<Building> buildingToAdd = this.buildings.findById(building_id);
        if (buildingToAdd.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return this.users.addBuildingToAUser(id, buildingToAdd.get());
    }

    @PatchMapping("/{id}/buildingToRemove/{building_id}")
    public ResponseEntity<User> removeBuildingFromAUser(@PathVariable long id, @PathVariable long building_id) {
        Optional<Building> buildingToRemove = this.buildings.findById(building_id);
        if (buildingToRemove.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return this.users.removeBuildingFromAUser(id, buildingToRemove.get());
    }

    @GetMapping("/{id}/buildings")
    public ResponseEntity<List<Building>> getAllBuildingsFromOneUser(@PathVariable long id) {
        Optional<User> userOptional = this.users.findById(id);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(this.users.findBuildingsByUserId(id), HttpStatus.OK);
    }
}

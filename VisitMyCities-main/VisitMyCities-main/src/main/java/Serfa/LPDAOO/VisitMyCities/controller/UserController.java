package Serfa.LPDAOO.VisitMyCities.controller;

import Serfa.LPDAOO.VisitMyCities.DAO.UserDAOForMySQL;
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

    public UserController(UserDAOForMySQL users) {
        this.users = users;
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
    public User deleteUser(@PathVariable int id) {
        return this.users.delete(id);
    }

    @PostMapping("")
    public User addUser(@RequestBody UserDTO userDTOFromAPI) {
        return this.users.save(userDTOFromAPI);
    }

    @PatchMapping("/{id}")
    public User updateUser(@PathVariable int id, @RequestBody UserDTO userDTOFromAPI) {
        return this.users.update(id, userDTOFromAPI);
    }
}

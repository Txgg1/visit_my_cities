package Serfa.LPDAOO.VisitMyCities.controller;

import Serfa.LPDAOO.VisitMyCities.DAO.TypeDAOForMySQL;
import Serfa.LPDAOO.VisitMyCities.models.Building;
import Serfa.LPDAOO.VisitMyCities.models.Type;
import Serfa.LPDAOO.VisitMyCities.models.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/types")
public class TypeController {

    private TypeDAOForMySQL types;

    public TypeController(TypeDAOForMySQL types) {
        this.types = types;
    }

    @GetMapping("")
    public List<Type> getTypes() {
        return this.types.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Type> getTypeById(@PathVariable long id) {
        Optional<Type> typeOptional = this.types.findById(id);
        if (typeOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(typeOptional.get(), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Type> addType(@RequestBody TypeDTO typeDTOFromAPI) {
        return types.save(typeDTOFromAPI);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Type> deleteType(@PathVariable long id) {
        return this.types.delete(id);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Type> updateType(@PathVariable long id, @RequestBody TypeDTO typeDTOFromAPI) {
        return this.types.update(id, typeDTOFromAPI);
    }
}
package Serfa.LPDAOO.VisitMyCities.controller;

import Serfa.LPDAOO.VisitMyCities.DAO.ArchitectDAOForMySQL;
import Serfa.LPDAOO.VisitMyCities.models.Architect;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/architects")
public class ArchitectController {

    private ArchitectDAOForMySQL architects;

    public ArchitectController(ArchitectDAOForMySQL architects) {
        this.architects = architects;
    }

    @GetMapping("")
    public List<Architect> getArchitects() {
        return this.architects.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Architect> getAchitectById(@PathVariable long id) {
        Optional<Architect> architect = this.architects.findById(id);
        if (architect.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(architect.get(), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Architect> addArchitect(@RequestBody ArchitectDTO architectDTOFromAPI) {
        return architects.save(architectDTOFromAPI);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Architect> deleteArchitectById(@PathVariable long id) {
        Optional<Architect> architectToDelete = this.architects.findById(id);
        if (architectToDelete.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        this.architects.deleteById(id);
        return new ResponseEntity<>(architectToDelete.get(), HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Architect> updateArchitect(@PathVariable long id, @RequestBody ArchitectDTO architectDTOFromAPI) {
        return this.architects.update(id, architectDTOFromAPI);
    }
}

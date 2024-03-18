package Serfa.LPDAOO.VisitMyCities.DAO;

import Serfa.LPDAOO.VisitMyCities.controller.ArchitectDTO;
import Serfa.LPDAOO.VisitMyCities.models.Architect;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ArchitectDAOForMySQL extends JpaRepository<Architect, Long> {

    default Architect save(ArchitectDTO architectDTO) {
        if(architectDTO.name() == null) {
            throw new RuntimeException("Nom de l'architecte manquant");
        }
        Architect newArchitect = new Architect();
        newArchitect.setName(architectDTO.name());
        if(architectDTO.firstname() != null) {
            newArchitect.setFirstname(architectDTO.firstname());
        }
        save(newArchitect);
        return newArchitect;
    }

    default Architect update(int id, ArchitectDTO architectDTOFromAPI) {
        Optional<Architect> architectToUpdate = findById((long) id);
        if(architectToUpdate.isEmpty()) {
            throw new RuntimeException("Architecte inconnu");
        }
        if(architectDTOFromAPI.name() != null) {
            architectToUpdate.get().setName(architectDTOFromAPI.name());
        }
        if(architectDTOFromAPI.firstname() != null) {
            architectToUpdate.get().setFirstname(architectDTOFromAPI.firstname());
        }
        save(architectToUpdate.get());
        return architectToUpdate.get();
    }
}

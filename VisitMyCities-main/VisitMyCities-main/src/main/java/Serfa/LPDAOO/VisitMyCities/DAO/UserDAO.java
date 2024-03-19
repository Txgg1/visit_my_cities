package Serfa.LPDAOO.VisitMyCities.DAO;

import Serfa.LPDAOO.VisitMyCities.controller.UserDTO;
import Serfa.LPDAOO.VisitMyCities.models.User;

public interface UserDAO {

    public User save(UserDTO userDTO);
    public User delete(int id);
    public User update(int id, UserDTO UserDTO);
}

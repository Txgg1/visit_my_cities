package Serfa.LPDAOO.VisitMyCities.models;

public class Role {

    private Long id;
    private ERole role;

    public Role() {}

    public Role(ERole role) {
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ERole getRole() {
        return role;
    }

    public void setRole(ERole role) {
        this.role = role;
    }
}

package Serfa.LPDAOO.VisitMyCities.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "V_User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String name;
    private String firstname;
    @Column(unique=true)
    private String mail;
    private String password;
    @Enumerated(EnumType.STRING)
    private ERole role;
    @ManyToMany
    @JoinTable(name = "user_building",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "building_id"))
    private List<Building> buildings;

    public User() {
        this.role = ERole.VISITEUR;
    }

    public User(Long id, String name, String firstname, String mail, String password, ERole role, List<Building> buildings) {
        this.id = id;
        this.name = name;
        this.firstname = firstname;
        this.mail = mail;
        this.password = password;
        this.role = role;
        this.buildings = buildings;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public ERole getRole() {
        return role;
    }

    public void setRole(ERole role) {
        this.role = role;
    }

    public List<Building> getBuildings() {
        return buildings;
    }

    public void setBuildings(List<Building> buildings) {
        this.buildings = buildings;
    }
}

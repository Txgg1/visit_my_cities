package Serfa.LPDAOO.VisitMyCities.models;

import jakarta.persistence.*;

@Entity
public class Architect {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    private String name;
    private String firstname;

    public Architect() {
    }

    public Architect(String name, String firstname) {
        this.name = name;
        this.firstname = firstname;
    }

    public Architect(Long id, String name, String firstname) {
        this.id = id;
        this.name = name;
        this.firstname = firstname;
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
}

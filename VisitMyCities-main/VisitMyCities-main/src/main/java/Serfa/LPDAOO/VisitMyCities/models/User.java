package Serfa.LPDAOO.VisitMyCities.models;

import jakarta.persistence.*;

@Entity
@Table(name = "V_User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    private String name;
    private String firstname;
    private String mail;
    private String password;

    //private Role role;

    public User() {}

    public User(String mail) {
        this.mail = mail;
    }

    public User(Long id, String name, String firstname, String mail, String password, Role role) {
        this.id = id;
        this.name = name;
        this.firstname = firstname;
        this.mail = mail;
        this.password = password;
        //this.role = role;
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

    /*public Role getRole() {
        return role;
    }*/

    /*public void setRole(Role role) {
        this.role = role;
    }*/
}

package Serfa.LPDAOO.VisitMyCities.models;

import jakarta.persistence.*;

@Entity
public class Building {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    private String name;
    private String address;
    private int startBuild;
    private int endBuild;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;
    private double latitude;
    private double longitude;
    @OneToOne
    @JoinColumn(name="architect_id")
    private Architect architect;

    public Building() {
    }

    public Building(Long id, String name, String address, int startBuild, int endBuild, String description, double latitude, double longitude, Architect architect) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.startBuild = startBuild;
        this.endBuild = endBuild;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.architect = architect;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getStartBuild() {
        return startBuild;
    }

    public void setStartBuild(int startBuild) {
        this.startBuild = startBuild;
    }

    public int getEndBuild() {
        return endBuild;
    }

    public void setEndBuild(int endBuild) {
        this.endBuild = endBuild;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public Architect getArchitect() {
        return architect;
    }

    public void setArchitect(Architect architect) {
        this.architect = architect;
    }
}

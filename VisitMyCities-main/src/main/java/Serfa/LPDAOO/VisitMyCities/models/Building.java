package Serfa.LPDAOO.VisitMyCities.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Building {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @ManyToOne
    @JoinColumn(name = "type_id")
    private Type type;
    @ManyToMany
    @JoinTable(name = "building_architect",
            joinColumns = @JoinColumn( name = "building_id" ),
            inverseJoinColumns = @JoinColumn( name = "architect_id" ))
    private List<Architect> architects = new ArrayList<>();
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "building_id")
    private List<Photo> photos = new ArrayList<>();

    public Building() {
    }

    public Building(Long id, String name, String address, int startBuild, int endBuild, String description, double latitude, double longitude, Type type, List<Architect> architects, List<Photo> photos) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.startBuild = startBuild;
        this.endBuild = endBuild;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.type = type;
        this.architects = architects;
        this.photos = photos;
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

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public List<Architect> getArchitects() {
        return architects;
    }

    public void setArchitects(List<Architect> architects) {
        this.architects = architects;
    }

    public List<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(List<Photo> photos) {
        this.photos = photos;
    }
}

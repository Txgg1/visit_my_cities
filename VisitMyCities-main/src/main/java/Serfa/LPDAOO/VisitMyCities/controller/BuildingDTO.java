package Serfa.LPDAOO.VisitMyCities.controller;

import Serfa.LPDAOO.VisitMyCities.models.Architect;
import Serfa.LPDAOO.VisitMyCities.models.Photo;

import java.util.List;

public record BuildingDTO(String name, String address, int startBuild, int endBuild, String description, double latitude, double longitude, Architect architect, List<Architect> architects, Photo photo, List<Photo> photos) {
}

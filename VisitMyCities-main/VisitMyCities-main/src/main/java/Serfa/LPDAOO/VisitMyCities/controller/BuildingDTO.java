package Serfa.LPDAOO.VisitMyCities.controller;

import Serfa.LPDAOO.VisitMyCities.models.Architect;

public record BuildingDTO(String name, String address, int startBuild, int endBuild, String description, double latitude, double longitude, Architect architect) {
}

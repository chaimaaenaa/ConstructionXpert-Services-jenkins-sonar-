package com.ConstructionXpert.ServiceProjets.repository;

import com.ConstructionXpert.ServiceProjets.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}

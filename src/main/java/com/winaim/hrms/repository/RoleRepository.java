package com.winaim.hrms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.winaim.hrms.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    // Additional custom queries can be defined here
}

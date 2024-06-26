package com.winaim.hrms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.winaim.hrms.model.Department;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    // Additional custom queries can be defined here
}
